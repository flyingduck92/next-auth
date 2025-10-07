"use server"

import db from "@/db/drizzle"
import { passwordMatchSchema } from "@/validation/passwordMatchSchema"
import z from "zod"
import { hash } from "bcryptjs"
import { users } from "@/db/usersSchema"

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string
  password: string
  passwordConfirm: string
}) => {
  // connect to db
  const result = await db.select()

  const newUserSchema = z
    .object({
      email: z.email(),
    })
    .and(passwordMatchSchema)

  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    passwordConfirm,
  })

  if (!newUserValidation.success) {
    return {
      error: true,
      message:
        newUserValidation.error.issues[0]?.message ?? "An error occurred",
    }
  }

  const saltRound = 10
  const hashedPassword = await hash(password, saltRound)

  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
    })
  } catch (err: any) {
    // if already registered
    if (err?.cause?.code === "23505") {
      return {
        error: true,
        message: "An account is already registered.",
      }
    }

    // if other error (general error)
    return {
      error: true,
      message: "An error occurred.",
    }
  }
}
