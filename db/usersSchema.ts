import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique(),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow(),
  twoFactorSecret: text('2fa_secret'),
  twoFactorActivated: boolean('2fa_activated').default(false)
})