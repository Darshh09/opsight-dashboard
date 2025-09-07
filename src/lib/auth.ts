import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-client-secret',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        (session.user as { id: string }).id = user.id
      }
      return session
    },
    async signIn({ user, account }) {
      // Auto-create usage tracking for new users
      if (account?.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { usageTracking: true }
          })

          if (existingUser && !existingUser.usageTracking) {
            await prisma.usageTracking.create({
              data: {
                userId: existingUser.id,
                aiQueriesUsed: 0,
                alertRulesCreated: 0,
                csvFilesUploaded: 0,
              }
            })
          }
        } catch (error) {
          console.error('Error creating usage tracking:', error)
        }
      }
      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'database',
  },
  secret: process.env.NEXTAUTH_SECRET || 'demo-nextauth-secret',
}
