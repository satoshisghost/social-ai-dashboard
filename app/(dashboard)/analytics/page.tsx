import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { BarChart3, TrendingUp, FileText, CheckCircle2, Clock, XCircle } from 'lucide-react'

const platformColors: Record<string, string> = {
  INSTAGRAM: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  TIKTOK: 'from-[#010101] to-[#69C9D0]',
  X: 'from-[#1a1a1a] to-[#555]',
  YOUTUBE: 'from-[#FF0000] to-[#CC0000]',
}

const platformIcons: Record<string, string> = {
  INSTAGRAM: '📸', TIKTOK: '🎵', X: '𝕏', YOUTUBE: '▶',
}

export default async function AnalyticsPage() {
  const session = await auth()
  const userId = session!.user!.id as string

  const [accounts, allContent] = await Promise.all([
    db.socialAccount.findMany({ where: { userId, isActive: true } }),
    db.contentItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { socialAccount: true },
    }),
  ])

  const total = allContent.length
  const published = allContent.filter(c => c.status === 'PUBLISHED').length
  const scheduled = allContent.filter(c => c.status === 'SCHEDULED').length
  const drafts = allContent.filter(c => c.status === 'DRAFT').length
  const failed = allContent.filter(c => c.status === 'FAILED').length

  const byType = allContent.reduce<Record<string, number>>((acc, c) => {
    acc[c.type] = (acc[c.type] ?? 0) + 1
    return acc
  }, {})

  const byPlatform = allContent.reduce<Record<string, number>>((acc, c) => {
    const p = c.socialAccount?.platform ?? 'UNLINKED'
    acc[p] = (acc[p] ?? 0) + 1
    return acc
  }, {})

  // Last 7 days activity
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d
  })

  const activityByDay = days.map((day) => {
    const count = allContent.filter((c) => {
      const cd = new Date(c.createdAt)
      return cd.toDateString() === day.toDateString()
    }).length
    return { label: day.toLocaleDateString('en', { weekday: 'short' }), count }
  })

  const maxActivity = Math.max(...activityByDay.map(d => d.count), 1)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-pink-400" />
          Analytics
        </h1>
        <p className="text-white/50 text-sm mt-1">Track your content performance across all platforms.</p>
      </div>

      {/* Status Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Content', value: total, icon: <FileText className="w-5 h-5" />, color: 'text-purple-400', bg: 'from-purple-600/20 to-purple-600/5' },
          { label: 'Published', value: published, icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-green-400', bg: 'from-green-600/20 to-green-600/5' },
          { label: 'Scheduled', value: scheduled, icon: <Clock className="w-5 h-5" />, color: 'text-yellow-400', bg: 'from-yellow-600/20 to-yellow-600/5' },
          { label: 'Drafts', value: drafts, icon: <TrendingUp className="w-5 h-5" />, color: 'text-blue-400', bg: 'from-blue-600/20 to-blue-600/5' },
        ].map((s) => (
          <div key={s.label} className={`glass-card p-5 bg-gradient-to-br ${s.bg}`}>
            <div className={`${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-white/50 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity Chart (last 7 days) */}
        <div className="glass-card p-6">
          <h2 className="font-semibold mb-5 text-white/80">Content Created — Last 7 Days</h2>
          <div className="flex items-end gap-3 h-32">
            {activityByDay.map(({ label, count }) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: count === 0 ? '4px' : `${(count / maxActivity) * 80}px`,
                      background: 'linear-gradient(to top, #7C3AED, #3B82F6)',
                      opacity: count === 0 ? 0.2 : 0.9,
                    }}
                  />
                </div>
                <span className="text-xs text-white/40">{label}</span>
                <span className="text-xs font-medium text-white/60">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content by Platform */}
        <div className="glass-card p-6">
          <h2 className="font-semibold mb-5 text-white/80">Content by Platform</h2>
          {Object.keys(byPlatform).length === 0 ? (
            <div className="flex items-center justify-center h-32 text-white/30 text-sm">
              No content yet — start creating!
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(byPlatform).map(([platform, count]) => (
                <div key={platform} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platformColors[platform] ?? 'from-gray-600 to-gray-800'} flex items-center justify-center text-xs shrink-0`}>
                    {platformIcons[platform] ?? '📄'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">{platform}</span>
                      <span className="text-white/50">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${platformColors[platform] ?? 'from-gray-600 to-gray-800'}`}
                        style={{ width: `${(count / total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Content by Type */}
        <div className="glass-card p-6">
          <h2 className="font-semibold mb-5 text-white/80">Content by Type</h2>
          {Object.keys(byType).length === 0 ? (
            <div className="flex items-center justify-center h-24 text-white/30 text-sm">No content yet</div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(byType).map(([type, count]) => (
                <div key={type} className="glass-card p-4 text-center">
                  <div className="text-xl font-bold text-gradient">{count}</div>
                  <div className="text-xs text-white/40 mt-1">{type}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connected Accounts */}
        <div className="glass-card p-6">
          <h2 className="font-semibold mb-5 text-white/80">Connected Accounts</h2>
          {accounts.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-white/30 text-sm">No accounts connected</div>
          ) : (
            <div className="space-y-3">
              {accounts.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${platformColors[a.platform]} flex items-center justify-center text-sm`}>
                    {platformIcons[a.platform]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">@{a.accountName}</div>
                    <div className="text-xs text-white/40">{a.platform}</div>
                  </div>
                  {a.followerCount && (
                    <div className="text-xs text-white/50 font-medium">{a.followerCount.toLocaleString()} followers</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
