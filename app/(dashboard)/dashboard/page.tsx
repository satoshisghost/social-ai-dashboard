import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { BarChart3, Sparkles, Link2, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

const platformColors: Record<string, string> = {
  INSTAGRAM: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  TIKTOK: 'from-[#010101] to-[#69C9D0]',
  X: 'from-[#1a1a1a] to-[#555]',
  YOUTUBE: 'from-[#FF0000] to-[#CC0000]',
}

const platformIcons: Record<string, string> = {
  INSTAGRAM: '📸',
  TIKTOK: '🎵',
  X: '𝕏',
  YOUTUBE: '▶',
}

export default async function DashboardPage() {
  const session = await auth()
  const userId = session!.user!.id as string

  const [socialAccounts, recentContent] = await Promise.all([
    db.socialAccount.findMany({ where: { userId, isActive: true } }),
    db.contentItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { socialAccount: true },
    }),
  ])

  const stats = [
    {
      label: 'Connected Accounts',
      value: socialAccounts.length,
      icon: <Link2 className="w-5 h-5" />,
      color: 'text-purple-400',
      bg: 'from-purple-600/20 to-purple-600/5',
    },
    {
      label: 'Content Created',
      value: await db.contentItem.count({ where: { userId } }),
      icon: <Sparkles className="w-5 h-5" />,
      color: 'text-blue-400',
      bg: 'from-blue-600/20 to-blue-600/5',
    },
    {
      label: 'Published',
      value: await db.contentItem.count({ where: { userId, status: 'PUBLISHED' } }),
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'text-green-400',
      bg: 'from-green-600/20 to-green-600/5',
    },
    {
      label: 'Scheduled',
      value: await db.contentItem.count({ where: { userId, status: 'SCHEDULED' } }),
      icon: <Clock className="w-5 h-5" />,
      color: 'text-yellow-400',
      bg: 'from-yellow-600/20 to-yellow-600/5',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {session?.user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Here&apos;s what&apos;s happening with your content today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`glass-card p-5 bg-gradient-to-br ${s.bg}`}>
            <div className={`${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-white/50 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Connected Accounts */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold flex items-center gap-2">
              <Link2 className="w-4 h-4 text-purple-400" />
              Connected Accounts
            </h2>
            <Link href="/connect" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              Manage →
            </Link>
          </div>

          {socialAccounts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40 text-sm mb-4">No accounts connected yet</p>
              <Link href="/connect" className="btn-primary text-sm px-4 py-2">
                Connect Your First Account
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {socialAccounts.map((account) => (
                <div key={account.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${platformColors[account.platform]} flex items-center justify-center text-sm`}>
                    {platformIcons[account.platform]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">@{account.accountName}</div>
                    <div className="text-white/40 text-xs">{account.platform}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Content */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Recent Content
            </h2>
            <Link href="/create" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              Create New →
            </Link>
          </div>

          {recentContent.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40 text-sm mb-4">No content created yet</p>
              <Link href="/create" className="btn-primary text-sm px-4 py-2">
                Generate AI Content
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentContent.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.socialAccount ? platformColors[item.socialAccount.platform] : 'from-purple-600 to-blue-600'} flex items-center justify-center text-xs shrink-0`}>
                    {item.socialAccount ? platformIcons[item.socialAccount.platform] : '✨'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 line-clamp-2 leading-snug">{item.body.slice(0, 80)}...</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'SCHEDULED' ? 'bg-yellow-500/20 text-yellow-400' :
                        item.status === 'FAILED' ? 'bg-red-500/20 text-red-400' :
                        'bg-white/10 text-white/40'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-white/30 text-xs">{item.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-pink-400" />
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Link href="/create?type=post" className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group">
            <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-medium">AI Post</div>
              <div className="text-xs text-white/40">Generate with GPT-4o</div>
            </div>
          </Link>
          <Link href="/connect" className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group">
            <Link2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-medium">Add Account</div>
              <div className="text-xs text-white/40">Connect a platform</div>
            </div>
          </Link>
          <Link href="/analytics" className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group">
            <BarChart3 className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-medium">View Analytics</div>
              <div className="text-xs text-white/40">Cross-platform stats</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
