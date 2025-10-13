"use server"

import { auth } from "@/auth"
import db from "@/db/drizzle"
import { passwordResetTokens } from "@/db/passwordResetTokensSchema"
import { users } from "@/db/usersSchema"
import { passwordMatchSchema } from "@/validation/passwordMatchSchema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"

type UpdatePasswordProps = {
  token: string
  password: string
  passwordConfirm: string
}

const updatePassword = async ({
  token,
  password,
  passwordConfirm,
}: UpdatePasswordProps) => {
  const passwordValidation = passwordMatchSchema.safeParse({
    password,
    passwordConfirm,
  })

  if (!passwordValidation.success) {
    return {
      error: true,
      message:
        passwordValidation.error.issues[0]?.message ?? "An error occured",
    }
  }

  const session = await auth()

  if (session?.user?.id) {
    return {
      error: true,
      message:
        "Already logged in. Please log out first to reset your password.",
    }
  }

  let isTokenValid = false
  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))

    const now = Date.now()

    if (
      !!passwordResetToken?.tokenExpiry &&
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      isTokenValid = true
    }

    if (!isTokenValid) {
      return {
        error: true,
        message: "Your token is invalid or already expired",
        tokenInvalid: true,
      }
    }

    const hashedPassword = await hash(password, 10)
    // update password user based on token
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, passwordResetTokens.userId))

    // remove token from passwordResetToken table
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, passwordResetTokens.id))
  }
}

export default updatePassword
