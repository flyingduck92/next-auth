"use server"

import { auth } from "@/auth"
import db from "@/db/drizzle"
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

  // for security reason, if user don't exists tell email address doesn't exist in our db
  // only show notification if account is exist, send passwordReset email
  if (!user) {
    return
  }

  const passwordResetToken = randomBytes(32).toString("hex")

  console.log({ passwordResetToken })
}

export default passwordReset
