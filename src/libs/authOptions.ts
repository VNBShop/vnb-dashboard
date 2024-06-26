import { jwtDecode } from 'jwt-decode'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { toast } from 'sonner'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password' },
      },

      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_SERVER_API_SERVICE}/user-service/api/v1/account/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        )

        const data = await res.json()

        console.log('login response: ', res)

        if (data?.success) {
          if (
            !data?.metadata?.roles?.includes('ADMIN') &&
            !data?.metadata?.roles?.includes('STORE_OWNER') &&
            !data?.metadata?.roles?.includes('STORE_MEMBER')
          ) {
            throw new Error('You do not have permission')
          }

          const info = jwtDecode(data?.metadata?.accessToken)

          if (!!info) {
            return {
              ...info,
              ...data?.metadata,
            }
          }

          return data?.metadata
        } else {
          console.log('errr')

          throw new Error(data?.metadata?.message)
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SERECT as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }

      if (account?.provider === 'google') {
        const verifyWithBE = await fetch(
          `${process.env.NEXT_SERVER_API_SERVICE}/user-service/api/v1/account/google-login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: account?.id_token,
              platform: 'WEB',
            }),
          }
        )

        const data = await verifyWithBE?.json()

        if (data?.success) {
          if (!data?.metadata?.roles?.includes('ADMIN')) {
            return false
          }
          return data?.metadata
        }
      }

      if (user) return { ...token, ...user }

      return token
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },
  pages: {
    signIn: '/auth',
  },
}
