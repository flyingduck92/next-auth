'use server'

import { auth } from '@/auth'
import db from '@/db/drizzle'
import { users } from '@/db/usersSchema'
import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { passwordSchema } from '@/validation/passwordSchema'
import { compare, hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import z from 'zod'

const changePasword = async ({
  currentPassword, password, passwordConfirm
}: {
  currentPassword: string
  password: string
  passwordConfirm: string
}) => {

  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: true,
      message: 'You must be logged-in to change your password'
    }
  }

  const formSchema = z
    .object({
      currentPassword: passwordSchema
    }).and(passwordMatchSchema)

  const passwordValidation = formSchema.safeParse({
    currentPassword, password, passwordConfirm
  })

  if (passwordValidation?.error) {
    return {
      error: true,
      message: passwordValidation.error.issues[0]?.message ?? 'An error occurred.'
    }
  }

  // check if user is exists
  const [user] = await db.select()
    .from(users)
    .where(eq(users.id, session.user.id))

  if (!user) {
    return {
      error: true,
      message: 'User not found'
    }
  }

  // check if user currentPassword is valid 
  const passwordMatch = await compare(currentPassword, user.password!)

  if (!passwordMatch) {
    return {
      error: true,
      message: 'Current Password is incorrect'
    }
  }

  // if user currentPassword is valid 
  // encrypt a new password to update user password
  const saltRound = 10
  const hashedPassword = await hash(password, saltRound)

  await db.update(users)
    .set({
      password: hashedPassword
    }).where(eq(users.id, session.user.id))

}

export default changePasword