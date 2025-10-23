"use server"

import { auth } from "@/auth"
import db from "@/db/drizzle"
import { passwordResetTokens } from "@/db/passwordResetTokensSchema"
import { users } from "@/db/usersSchema"
import { mailer } from "@/lib/email"
import { randomBytes } from "crypto"
import { eq } from "drizzle-orm"

const passwordReset = async (emailAddress: string) => {
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
    .where(eq(users.email, emailAddress))

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

  const resetLink = `${process.env.SITE_BASE_URL}/password-update?token=${passwordResetToken}`

  await mailer.sendMail({
    from: `${process.env.EMAIL_CUSTOM_DOMAIN}`,
    subject: "Your Password Reset Request",
    to: emailAddress,
    html: `Hey, ${emailAddress}!<br><br>
      Your requested to reset your password.<br>
      Here's your password reset link.<br>
      This link will expired in 1 hour:<br> 
      <a href="${resetLink}">${resetLink}</a>
      `,
  })

  // console.log({ passwordResetToken })
}

export default passwordReset
