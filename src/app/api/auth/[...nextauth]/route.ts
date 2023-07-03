import NextAuth, { type AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
// @ts-ignore
import { compare } from 'bcrypt'
import { db } from '@lib'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        name: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        try {
          const user = await db.user.findFirst({
            where: {
              name: credentials?.name,
            },
          })
          if (!user) throw Error('Invalid credentials')

          if (!(await compare(credentials?.password!, user.password)))
            throw Error('Invalid credentials')

          return user
        } catch (error) {
          // @ts-ignore
          throw Error(`Error: ${error?.message}`)
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  // debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
