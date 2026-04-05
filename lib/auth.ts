import NextAuth from 'next-auth'
import type { Provider } from 'next-auth/providers'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Twitter from 'next-auth/providers/twitter'
import { db } from '@/lib/db'

// Custom Instagram OAuth provider (Meta Graph API)
const InstagramProvider = {
  id: 'instagram',
  name: 'Instagram',
  type: 'oauth' as const,
  authorization: {
    url: 'https://api.instagram.com/oauth/authorize',
    params: {
      scope: 'user_profile,user_media',
      response_type: 'code',
    },
  },
  token: 'https://api.instagram.com/oauth/access_token',
  userinfo: {
    url: 'https://graph.instagram.com/me',
    params: { fields: 'id,username,account_type,profile_picture_url' },
  },
  profile(profile: { id: string; username: string; profile_picture_url?: string }) {
    return {
      id: profile.id,
      name: profile.username,
      email: null,
      image: profile.profile_picture_url ?? null,
    }
  },
  clientId: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
}

// Custom TikTok OAuth provider
const TikTokProvider = {
  id: 'tiktok',
  name: 'TikTok',
  type: 'oauth' as const,
  authorization: {
    url: 'https://www.tiktok.com/v2/auth/authorize',
    params: {
      scope: 'user.info.basic,user.info.profile',
      response_type: 'code',
    },
  },
  token: 'https://open.tiktokapis.com/v2/oauth/token/',
  userinfo: {
    url: 'https://open.tiktokapis.com/v2/user/info/',
    params: { fields: 'open_id,union_id,avatar_url,display_name' },
  },
  profile(profile: { data?: { user?: { open_id: string; display_name: string; avatar_url?: string } } }) {
    const user = profile?.data?.user
    return {
      id: user?.open_id ?? '',
      name: user?.display_name ?? '',
      email: null,
      image: user?.avatar_url ?? null,
    }
  },
  clientId: process.env.TIKTOK_CLIENT_ID,
  clientSecret: process.env.TIKTOK_CLIENT_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/youtube.readonly',
          ].join(' '),
        },
      },
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    InstagramProvider as Provider,
    TikTokProvider as Provider,
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider
        token.accessToken = account.access_token
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
