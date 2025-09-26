'use server'

import db from '@/db/drizzle'
import { passwordSchema } from '@/validation/passwordSchema'
import { hash } from 'bcryptjs'
import z from 'zod'

const loginUser = async ({
  email, password }
  : {
    email: string
    password: string
  }) => {

  const loginSchema = z.object({
    email: z.email(),
    password: passwordSchema
  })

  const loginValidation = loginSchema.safeParse({ email, password })

  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error.issues[0]?.message ?? 'An error occurred',
    }
  }

  // const saltRound = 10
  // const hashedPassword = await hash(password, saltRound)


}

export default loginUser