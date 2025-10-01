import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import db from './db/drizzle'
import { users } from './db/usersSchema'
import { eq } from 'drizzle-orm'
import { compare } from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        // get User from DB
        const [user] = await db.select()
          .from(users)
          .where(eq(users.email, credentials.email as string))

        // console.log("DB password", user.password)
        // console.log("Form password", credentials.password)

        if (!user) {
          throw new Error('Incorrect credentials')
        } else {
          // Check password is correct or not
          const passwordCorrect = await compare(credentials.password as string, user.password!)

          // console.log(`passwordCorrect: ${passwordCorrect}`)

          if (!passwordCorrect) {
            throw new Error('Incorrect credentials')
          }
        }

        return {
          id: user.id,
          email: user.email
        }
      }
    })
  ],
})