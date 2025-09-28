'use server'

import { signIn } from '@/auth'
import { passwordSchema } from '@/validation/passwordSchema'
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

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })
  } catch (error) {

  }

}

export default loginUser