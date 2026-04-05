'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { CheckCircle2, Link2, Loader2, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

const platforms = [
  {
    id: 'google',
    provider: 'google',
    name: 'YouTube',
    handle: 'Google / YouTube',
    description: 'Connect your YouTube channel to manage videos, view analytics, and generate video scripts.',
    icon: '▶',
    gradient: 'from-[#FF0000] to-[#CC0000]',
    scopes: ['YouTube Analytics', 'Channel Management', 'Video Upload'],
    docsUrl: 'https://console.cloud.google.com',
  },
  {
    id: 'twitter',
    provider: 'twitter',
    name: 'X (Twitter)',
    handle: 'Twitter / X',
    description: 'Connect your X account to post tweets, threads, and view engagement metrics.',
    icon: '𝕏',
    gradient: 'from-[#1a1a1a] to-[#444]',
    scopes: ['Post Tweets', 'Read Timeline', 'View Analytics'],
    docsUrl: 'https://developer.x.com',
  },
  {
    id: 'instagram',
    provider: 'instagram',
    name: 'Instagram',
    handle: 'Meta / Instagram',
    description: 'Connect your Instagram Business account to post content, stories, and track followers.',
    icon: '📸',
    gradient: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    scopes: ['Post Content', 'View Insights', 'Manage Stories'],
    docsUrl: 'https://developers.facebook.com',
  },
  {
    id: 'tiktok',
    provider: 'tiktok',
    name: 'TikTok',
    handle: 'TikTok for Developers',
    description: 'Connect your TikTok account to upload videos, view analytics, and manage your profile.',
    icon: '🎵',
    gradient: 'from-[#010101] to-[#69C9D0]',
    scopes: ['Upload Videos', 'View Analytics', 'Profile Info'],
    docsUrl: 'https://developers.tiktok.com',
  },
]

const setupSteps = [
  { step: 1, title: 'Create a Developer App', desc: 'Visit the platform\'s developer portal and create a new application.' },
  { step: 2, title: 'Set Redirect URI', desc: 'Add your domain callback URL to the app settings.' },
  { step: 3, title: 'Copy Credentials', desc: 'Copy your Client ID and Client Secret to your .env file.' },
  { step: 4, title: 'Connect Account', desc: 'Click "Connect" above and authorize the app.' },
]

export default function ConnectPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function connect(provider: string) {
    setLoading(provider)
    try {
      await signIn(provider, { callbackUrl: '/dashboard' })
    } catch {
      toast.error('Connection failed. Check your OAuth credentials in .env')
      setLoading(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Link2 className="w-6 h-6 text-purple-400" />
          Connect Accounts
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Link your social media accounts to start managing content from one place.
        </p>
      </div>

      {/* Platform Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {platforms.map((platform) => (
          <div key={platform.id} className="glass-card p-6 hover:bg-white/[0.06] transition-colors">
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center text-xl shadow-lg shrink-0`}>
                {platform.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{platform.name}</h3>
                </div>
                <p className="text-white/40 text-xs">{platform.handle}</p>
              </div>
              <a
                href={platform.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 transition-colors"
                title="Developer Docs"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-white/60 text-sm mb-5 leading-relaxed">{platform.description}</p>

            {/* Scopes */}
            <div className="flex flex-wrap gap-2 mb-5">
              {platform.scopes.map((scope) => (
                <span
                  key={scope}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-white/50"
                >
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  {scope}
                </span>
              ))}
            </div>

            {/* Connect Button */}
            <button
              onClick={() => connect(platform.provider)}
              disabled={loading !== null}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 bg-gradient-to-r ${platform.gradient} hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading === platform.provider ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Link2 className="w-4 h-4" />
              )}
              {loading === platform.provider ? 'Connecting...' : `Connect ${platform.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Setup Guide */}
      <div className="glass-card p-6">
        <h2 className="font-semibold mb-5 text-white/80">Setup Guide</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {setupSteps.map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                {step}
              </div>
              <div>
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xs text-white/40 mt-1 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-yellow-300 text-xs leading-relaxed">
            <strong>Callback URLs to add in your developer apps:</strong><br />
            <code className="text-yellow-200/80">
              {'{YOUR_DOMAIN}'}/api/auth/callback/google<br />
              {'{YOUR_DOMAIN}'}/api/auth/callback/twitter<br />
              {'{YOUR_DOMAIN}'}/api/auth/callback/instagram<br />
              {'{YOUR_DOMAIN}'}/api/auth/callback/tiktok
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}
