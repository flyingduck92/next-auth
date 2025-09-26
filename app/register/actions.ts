'use server'

import db from '@/db/drizzle'
import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import z from 'zod'

export const registerUser = async (
  {
    email,
    password,
    passwordConfirm
  }: {
    email: string
    password: string
    passwordConfirm: string
  }) => {

  // connect to db
  const result = await db.select()

  const newUserSchema = z.object({
    email: z.email(),
  }).and(passwordMatchSchema)

  const newUserValidation = newUserSchema.safeParse({ email, password, passwordConfirm })

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? 'An error occurred',
    }
  }



}