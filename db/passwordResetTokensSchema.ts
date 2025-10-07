import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { users } from "./usersSchema"

export const passwordResetTokens = pgTable("password_reset_token", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .unique(),
  token: text("token"),
  tokenExpiry: timestamp("token_expiry"),
})
