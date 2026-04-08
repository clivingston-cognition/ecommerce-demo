import { stripe, Stripe } from "@/lib/stripe";
import {
  cartRepository,
  ordersRepository,
  abandonedCartEmailsRepository,
} from "@/lib/db/drizzle/repositories";
import { stripeLogger } from "@/lib/stripe/logger";
import type { OrderDetails } from "@/lib/email";
import {
  createOrderItem,
  saveCustomerInfo,
  saveOrderProducts,
} from "@/app/(user)/orders/action";
import type { MinimalCartItem } from "@/lib/db/drizzle/schema/cart";

export { stripe };

const customerIdCache = new Map<string, string>();

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
): Promise<string> {
  const cachedId = customerIdCache.get(userId);
  if (cachedId) return cachedId;

  try {
    const existing = await stripe.customers.list({ email, limit: 1 });

    if (existing.data.length > 0) {
      const customerId = existing.data[0].id;
      customerIdCache.set(userId, customerId);
      return customerId;
    }

    const customer = await stripe.customers.create({
      email,
      metadata: { userId, source: "ecommerce-template" },
    });

    stripeLogger.info(`Created Stripe customer ${customer.id}`);
    customerIdCache.set(userId, customer.id);
    return customer.id;
  } catch (error) {
    stripeLogger.error("Failed to get/create Stripe customer", error);
    throw error;
  }
}

// Parse cart item IDs from metadata
function parseCartItemIds(cartItemIdsStr: string): number[] {
  if (!cartItemIdsStr) return [];
  return cartItemIdsStr.split(",").map((id) => parseInt(id, 10));
}

export interface CreateStripeProductParams {
  productName: string;
  variantColor: string;
  description?: string;
  price: number;
  images?: string[];
  metadata?: Record<string, string>;
}

export interface StripeProductResult {
  productId: string;
  priceId: string;
}

export async function createStripeProductForVariant(
  params: CreateStripeProductParams,
): Promise<StripeProductResult> {
  const { productName, variantColor, description, price, images, metadata } =
    params;

  const stripeProduct = await stripe.products.create({
    name: `${productName} - ${variantColor}`,
    description: description || undefined,
    images: images?.slice(0, 8) || [],
    metadata: {
      variant_color: variantColor,
      ...metadata,
    },
  });

  const stripePrice = await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: Math.round(price * 100),
    currency: "eur",
  });

  stripeLogger.info(
    `Created Stripe product ${stripeProduct.id} with price ${stripePrice.id} for variant ${variantColor}`,
  );

  return {
    productId: stripeProduct.id,
    priceId: stripePrice.id,
  };
}

export async function updateStripeProduct(
  priceId: string,
  params: Partial<CreateStripeProductParams>,
): Promise<StripeProductResult | null> {
  try {
    const existingPrice = await stripe.prices.retrieve(priceId);
    const productId = existingPrice.product as string;

    const updateData: Stripe.ProductUpdateParams = {};

    if (params.productName && params.variantColor) {
      updateData.name = `${params.productName} - ${params.variantColor}`;
    }
    if (params.description !== undefined) {
      updateData.description = params.description || undefined;
    }
    if (params.images) {
      updateData.images = params.images.slice(0, 8);
    }
    if (params.metadata) {
      updateData.metadata = {
        variant_color: params.variantColor || "",
        ...params.metadata,
      };
    }

    if (Object.keys(updateData).length > 0) {
      await stripe.products.update(productId, updateData);
    }

    if (params.price !== undefined) {
      const existingAmount = existingPrice.unit_amount || 0;
      const newAmount = Math.round(params.price * 100);

      if (existingAmount !== newAmount) {
        await stripe.prices.update(priceId, { active: false });

        const newPrice = await stripe.prices.create({
          product: productId,
          unit_amount: newAmount,
          currency: "eur",
        });

        stripeLogger.info(
          `Updated Stripe product ${productId} with new price ${newPrice.id}`,
        );

        return {
          productId,
          priceId: newPrice.id,
        };
      }
    }

    return {
      productId,
      priceId,
    };
  } catch (error) {
    stripeLogger.error("Error updating Stripe product", error);
    return null;
  }
}

export async function archiveStripeProduct(priceId: string): Promise<boolean> {
  try {
    const price = await stripe.prices.retrieve(priceId);
    const productId = price.product as string;

    const prices = await stripe.prices.list({ product: productId });
    for (const p of prices.data) {
      await stripe.prices.update(p.id, { active: false });
    }

    await stripe.products.update(productId, { active: false });

    stripeLogger.info(`Archived Stripe product ${productId}`);
    return true;
  } catch (error) {
    stripeLogger.error("Error archiving Stripe product", error);
    return false;
  }
}

export type CheckoutStatus =
  | "success"
  | "pending"
  | "expired"
  | "canceled"
  | "failed"
  | "not_found"
  | "error";

export interface CheckoutResult {
  status: CheckoutStatus;
  session?: Stripe.Checkout.Session;
  error?: string;
}

export async function fetchCheckoutData(
  sessionId: string,
): Promise<CheckoutResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/checkout_sessions?session_id=${sessionId}`,
    );

    if (!res.ok) {
      if (res.status === 404) {
        return { status: "not_found", error: "Session not found" };
      }
      return { status: "error", error: `Server error: ${res.status}` };
    }

    const data = await res.json();

    // API returns error object on invalid session
    if ("statusCode" in data && data.statusCode === 500) {
      return { status: "not_found", error: data.message || "Invalid session" };
    }

    const session = data as Stripe.Checkout.Session;

    // Map Stripe session status to our status
    if (session.status === "complete" && session.payment_status === "paid") {
      return { status: "success", session };
    }

    if (session.status === "expired") {
      return { status: "expired", session };
    }

    if (session.payment_status === "unpaid") {
      return { status: "canceled", session };
    }

    if (session.status === "open") {
      return { status: "pending", session };
    }

    return { status: "failed", session };
  } catch (err) {
    stripeLogger.error("Error fetching checkout data", err);
    return { status: "error", error: "Could not connect to payment service" };
  }
}

async function getLineItemsFromSession(
  sessionId: string,
): Promise<Stripe.LineItem[]> {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    expand: ["data.price.product"],
  });

  if (!lineItems.data || lineItems.data.length === 0) {
    return [];
  }

  return lineItems.data;
}

async function clearUserCart(userId: string) {
  try {
    await cartRepository.clearByUserId(userId);
  } catch (error) {
    stripeLogger.error("Error clearing cart", error);
  }
}

// Fetch cart items from DB using IDs stored in metadata
async function getCartItemsFromMetadata(
  metadata: Stripe.Metadata | null,
  userId: string,
): Promise<MinimalCartItem[]> {
  if (!metadata?.cartItemIds) return [];

  const cartItemIds = parseCartItemIds(metadata.cartItemIds);
  if (cartItemIds.length === 0) return [];

  const userCartItems = await cartRepository.findByUserId(userId);

  return userCartItems
    .filter((item) => cartItemIds.includes(item.id))
    .map((item) => ({
      variantId: item.variantId,
      size: item.size,
      quantity: item.quantity,
      stripeId: item.stripeId,
    }));
}

// Idempotent: returns existing order if already processed
export async function processCompletedOrder(
  session: Stripe.Checkout.Session,
): Promise<OrderDetails> {
  const existingOrder = await ordersRepository.findByStripeSessionId(
    session.id,
  );
  if (existingOrder) {
    return {
      order: {
        id: existingOrder.id,
        userId: existingOrder.userId,
        orderNumber: existingOrder.orderNumber,
        deliveryDate: existingOrder.deliveryDate,
        createdAt: existingOrder.createdAt,
        updatedAt: existingOrder.updatedAt,
      },
      customerInfo: existingOrder.customerInfo,
      products: existingOrder.orderProducts.map((op) => ({
        id: op.id,
        orderId: op.orderId,
        variantId: op.variantId,
        quantity: op.quantity,
        size: op.size,
        createdAt: op.createdAt,
        updatedAt: op.updatedAt,
      })),
    };
  }

  const userId = session.metadata?.userId;
  if (!userId) throw new Error("Missing userId in session metadata");

  const cartItems = await getCartItemsFromMetadata(session.metadata, userId);
  if (!cartItems.length) throw new Error("No cart items found for user");

  const lineItems = await getLineItemsFromSession(session.id);
  if (lineItems.length === 0) throw new Error("No line items from Stripe");

  const orderNumber = await ordersRepository.getNextOrderNumber();
  const orderData = await createOrderItem(userId, orderNumber);
  const savedCustomerInfo = await saveCustomerInfo(orderData.id, session);
  const savedOrderProducts = await saveOrderProducts(
    orderData.id,
    lineItems,
    cartItems,
  );
  await clearUserCart(userId);

  return {
    order: orderData,
    customerInfo: savedCustomerInfo!,
    products: savedOrderProducts,
  };
}

// Hook for abandoned cart recovery (analytics, emails, etc.)
export async function handleExpiredSession(
  session: Stripe.Checkout.Session,
): Promise<void> {
  try {
    const userId = session.metadata?.userId;
    if (!userId) {
      stripeLogger.info("Session expired without userId, skipping abandoned cart email", {
        sessionId: session.id,
      });
      return;
    }

    // Idempotency check: don't send duplicate emails for the same session
    const alreadySent = await abandonedCartEmailsRepository.existsByStripeSessionId(session.id);
    if (alreadySent) {
      stripeLogger.info("Abandoned cart email already sent for this session", {
        sessionId: session.id,
        details: { userId },
      });
      return;
    }

    // Cooldown check: don't spam users with multiple emails
    const withinCooldown = await abandonedCartEmailsRepository.isWithinCooldown(userId, 24);
    if (withinCooldown) {
      stripeLogger.info("User within cooldown window, skipping abandoned cart email", {
        sessionId: session.id,
        details: { userId },
      });
      return;
    }

    const customerEmail =
      session.customer_details?.email || session.customer_email;
    const customerName =
      session.customer_details?.name || "Valued Customer";

    if (!customerEmail) {
      stripeLogger.info("No customer email available, skipping abandoned cart email", {
        sessionId: session.id,
        details: { userId },
      });
      return;
    }

    // Get line items for the abandoned cart
    const lineItems = await getLineItemsFromSession(session.id);

    const cartItemsHtml = lineItems
      .map((item) => {
        const product = item.price?.product as Stripe.Product | undefined;
        const name = product?.name || item.description || "Unknown item";
        const amount = item.amount_total ? (item.amount_total / 100).toFixed(2) : "0.00";
        return `<li>${name} — ${amount}€</li>`;
      })
      .join("");

    const totalAmount = session.amount_total
      ? (session.amount_total / 100).toFixed(2)
      : "0.00";

    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">You left something behind!</h2>
        <p>Hello <strong>${customerName}</strong>,</p>
        <p>We noticed you didn't complete your purchase. Here's what was in your cart:</p>
        
        <ul style="padding: 15px; background-color: #f5f5f5; border-radius: 5px; list-style: none;">
          ${cartItemsHtml || "<li>Your cart items</li>"}
        </ul>

        <p style="font-size: 18px;"><strong>Total: ${totalAmount}€</strong></p>
        
        <p>Ready to complete your purchase? Visit our store to pick up where you left off.</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          If you've already completed your purchase or no longer wish to receive these emails, please disregard this message.
        </p>
      </div>
    `;

    // Send the abandoned cart email
    const emailPayload = {
      name: customerName,
      email: customerEmail,
      message,
      subject: "You left items in your cart!",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/email`,
      {
        method: "POST",
        body: JSON.stringify(emailPayload),
      },
    );

    if (!response.ok) {
        stripeLogger.error("Failed to send abandoned cart email", undefined, {
          sessionId: session.id,
          details: { status: response.status },
        });
      return;
    }

    // Record the send for dedup/cooldown tracking
    await abandonedCartEmailsRepository.create({
      userId,
      stripeSessionId: session.id,
      customerEmail,
      cartTotal: session.amount_total ?? 0,
      sentAt: new Date(),
    });

    stripeLogger.info("Abandoned cart email sent successfully", {
      sessionId: session.id,
      details: { userId, customerEmail },
    });
  } catch (error) {
    stripeLogger.error("Error in handleExpiredSession", error);
  }
}
