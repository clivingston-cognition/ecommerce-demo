import { eq, desc, and, gte } from "drizzle-orm";
import { db } from "../connection";
import { abandonedCartEmails } from "../schema";
import type { InsertAbandonedCartEmail } from "../schema";

const DEFAULT_COOLDOWN_HOURS = 24;

export const abandonedCartEmailsRepository = {
  /**
   * Check if an email was already sent for this specific Stripe session (idempotency)
   */
  async existsByStripeSessionId(stripeSessionId: string): Promise<boolean> {
    const existing = await db.query.abandonedCartEmails.findFirst({
      where: eq(abandonedCartEmails.stripeSessionId, stripeSessionId),
    });
    return !!existing;
  },

  /**
   * Check if an abandonment email was sent to this user within the cooldown window.
   * Returns true if the user is still within cooldown (should NOT send).
   */
  async isWithinCooldown(
    userId: string,
    cooldownHours: number = DEFAULT_COOLDOWN_HOURS
  ): Promise<boolean> {
    const cutoff = new Date(Date.now() - cooldownHours * 60 * 60 * 1000);
    const recent = await db.query.abandonedCartEmails.findFirst({
      where: and(
        eq(abandonedCartEmails.userId, userId),
        gte(abandonedCartEmails.sentAt, cutoff)
      ),
      orderBy: [desc(abandonedCartEmails.sentAt)],
    });
    return !!recent;
  },

  /**
   * Record that an abandonment email was sent
   */
  async create(data: InsertAbandonedCartEmail) {
    const [result] = await db
      .insert(abandonedCartEmails)
      .values(data)
      .onConflictDoNothing({ target: abandonedCartEmails.stripeSessionId })
      .returning();
    return result ?? null;
  },

  /**
   * Find all abandonment emails for a user (for analytics/debugging)
   */
  async findByUserId(userId: string) {
    return db.query.abandonedCartEmails.findMany({
      where: eq(abandonedCartEmails.userId, userId),
      orderBy: [desc(abandonedCartEmails.sentAt)],
    });
  },
};
