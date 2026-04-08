import { z } from "zod";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  pgTable,
  bigserial,
  text,
  bigint,
  timestamp,
  index,
  unique,
  pgPolicy,
  foreignKey,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const abandonedCartEmails = pgTable(
  "abandoned_cart_emails",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: text("user_id").notNull(),
    stripeSessionId: text("stripe_session_id").notNull(),
    customerEmail: text("customer_email").notNull(),
    cartTotal: bigint("cart_total", { mode: "number" }),
    sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "abandoned_cart_emails_user_id_fkey",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
    unique("abandoned_cart_emails_session_unique").on(table.stripeSessionId),
    index("idx_abandoned_cart_emails_user_id").on(table.userId),
    index("idx_abandoned_cart_emails_sent_at").on(table.sentAt),
    index("idx_abandoned_cart_emails_user_sent").on(table.userId, table.sentAt),
    pgPolicy("Allow all abandoned cart email operations", {
      as: "permissive",
      for: "all",
      to: "public",
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ]
);

// Zod Schemas
export const selectAbandonedCartEmailSchema = createSelectSchema(abandonedCartEmails, {
  sentAt: z.coerce.string(),
  createdAt: z.coerce.string(),
});

export const insertAbandonedCartEmailSchema = createInsertSchema(abandonedCartEmails, {
  customerEmail: z.string().email(),
}).omit({
  id: true,
  createdAt: true,
});

// Types
export type AbandonedCartEmail = z.infer<typeof selectAbandonedCartEmailSchema>;
export type InsertAbandonedCartEmail = z.infer<typeof insertAbandonedCartEmailSchema>;
