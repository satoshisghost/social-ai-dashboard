import { auth } from '@/lib/auth'
import { Settings, User, Key, Bell } from 'lucide-react'
import Image from 'next/image'

export default async function SettingsPage() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-white/60" />
          Settings
        </h1>
        <p className="text-white/50 text-sm mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <div className="glass-card p-6">
        <h2 className="font-semibold mb-5 flex items-center gap-2">
          <User className="w-4 h-4 text-purple-400" />
          Profile
        </h2>
        <div className="flex items-center gap-4">
          {user?.image && (
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-purple-500/30">
              <Image src={user.image} alt={user.name ?? ''} fill className="object-cover" />
            </div>
          )}
          <div>
            <div className="font-semibold text-lg">{user?.name}</div>
            <div className="text-white/50 text-sm">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* API Keys Info */}
      <div className="glass-card p-6">
        <h2 className="font-semibold mb-5 flex items-center gap-2">
          <Key className="w-4 h-4 text-blue-400" />
          API Keys
        </h2>
        <div className="space-y-3 text-sm">
          {[
            { name: 'Anthropic API Key', env: 'ANTHROPIC_API_KEY', desc: 'Powers AI content generation via Claude Opus 4.6' },
            { name: 'Google Client ID', env: 'GOOGLE_CLIENT_ID', desc: 'YouTube OAuth authentication' },
            { name: 'Twitter Client ID', env: 'TWITTER_CLIENT_ID', desc: 'X (Twitter) OAuth authentication' },
            { name: 'Instagram Client ID', env: 'INSTAGRAM_CLIENT_ID', desc: 'Instagram OAuth authentication' },
            { name: 'TikTok Client ID', env: 'TIKTOK_CLIENT_ID', desc: 'TikTok OAuth authentication' },
          ].map((key) => (
            <div key={key.env} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div>
                <div className="font-medium text-white/80">{key.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{key.desc}</div>
              </div>
              <code className="text-xs text-purple-300 bg-purple-500/10 px-2 py-1 rounded-lg">{key.env}</code>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/30 mt-4">
          Configure these in your <code className="text-white/50">.env.local</code> file or Railway environment variables.
        </p>
      </div>

      {/* Notification Placeholder */}
      <div className="glass-card p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-yellow-400" />
          Notifications
        </h2>
        <p className="text-white/40 text-sm">Email notifications and webhook integrations — coming soon.</p>
      </div>
    </div>
  )
}
