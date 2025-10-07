"use server"

import { auth } from "@/auth"
import db from "@/db/drizzle"
import { passwordResetTokens } from "@/db/passwordResetTokensSchema"
import { users } from "@/db/usersSchema"
import { randomBytes } from "crypto"
import { eq } from "drizzle-orm"

const passwordReset = async (emailAdrress: string) => {
  const session = await auth()

  if (!!session?.user?.id) {
    return {
      error: true,
      message: "You are already loggedin",
    }
  }

  const [user] = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, emailAdrress))

  // for security reason, if no user don't tell email address doesn't exist in our db
  // only show notification if account is exists, send passwordReset email
  if (!user) {
    return
  }

  const passwordResetToken = randomBytes(32).toString("hex")
  const tokenExpiry = new Date(Date.now() + 3600000)

  await db
    .insert(passwordResetTokens)
    .values({
      userId: user.id,
      token: passwordResetToken,
      tokenExpiry,
    })
    .onConflictDoUpdate({
      target: passwordResetTokens.userId,
      set: {
        token: passwordResetToken,
        tokenExpiry,
      },
    })

  console.log({ passwordResetToken })
}

export default passwordReset
