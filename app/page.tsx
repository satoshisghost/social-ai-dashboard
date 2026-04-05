import Link from 'next/link'
import { Zap, BarChart3, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

const platforms = [
  { name: 'Instagram', color: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]', icon: '📸' },
  { name: 'TikTok', color: 'from-[#010101] to-[#69C9D0]', icon: '🎵' },
  { name: 'X', color: 'from-[#1a1a1a] to-[#555]', icon: '𝕏' },
  { name: 'YouTube', color: 'from-[#FF0000] to-[#CC0000]', icon: '▶' },
]

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI Content Generation',
    desc: 'Generate captions, scripts, and posts tailored for each platform using GPT-4o.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Multi-Account Management',
    desc: 'Connect and manage all your social accounts from one unified dashboard.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Cross-Platform Analytics',
    desc: 'View combined metrics, engagement, and growth across all your platforms.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Smart Scheduling',
    desc: 'Schedule posts at optimal times for maximum reach on each platform.',
  },
]

const benefits = [
  'Connect Instagram, TikTok, X & YouTube',
  'AI-generated captions & scripts',
  'Image generation with DALL-E 3',
  'Cross-platform analytics dashboard',
  'Multi-user team support',
  'Deploy-ready on Railway',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07071A] text-white overflow-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-pink-600/8 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">ContentFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm px-4 py-2">
            Sign In
          </Link>
          <Link href="/login" className="btn-primary text-sm px-4 py-2">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-20 pb-16 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Social Media Management
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          <span className="text-white">Your AI</span>{' '}
          <span className="text-gradient">Marketing Team</span>
          <br />
          <span className="text-white">in One Dashboard</span>
        </h1>

        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect Instagram, TikTok, X, and YouTube. Generate AI content, schedule posts,
          and track analytics — all from one beautiful dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
            Start for Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="#features" className="btn-ghost text-base px-8 py-4">
            See Features
          </Link>
        </div>

        {/* Platform Pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-12">
          {platforms.map((p) => (
            <div
              key={p.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${p.color} text-white text-sm font-medium shadow-lg`}
            >
              <span>{p.icon}</span>
              {p.name}
            </div>
          ))}
        </div>
      </section>

      {/* Mock Dashboard Preview */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="gradient-border glow-purple">
          <div className="bg-[#0D0D2B] rounded-2xl p-6 overflow-hidden">
            {/* Mock header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4 h-6 rounded-lg bg-white/5 flex items-center px-3">
                <span className="text-white/30 text-xs">contentflow.app/dashboard</span>
              </div>
            </div>
            {/* Mock dashboard grid */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {['2.4M', '18.3K', '94.2K', '312K'].map((stat, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <div className="text-xl font-bold text-gradient">{stat}</div>
                  <div className="text-xs text-white/40 mt-1">
                    {['Impressions', 'Followers', 'Likes', 'Views'][i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 glass-card p-4 h-32 flex items-center justify-center">
                <div className="flex gap-2 items-end h-16">
                  {[40, 60, 45, 80, 55, 90, 70, 85, 65, 95, 75, 88].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(to top, #7C3AED, #3B82F6)`,
                        opacity: 0.7 + i * 0.02,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="glass-card p-4 h-32 flex flex-col gap-2">
                {platforms.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${p.color}`} />
                    <span className="text-xs text-white/60">{p.name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${p.color}`}
                        style={{ width: `${[75, 60, 45, 85][platforms.indexOf(p)]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Everything you need to{' '}
          <span className="text-gradient">grow faster</span>
        </h2>
        <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">
          One AI agent with all the tools your marketing team needs — available 24/7.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card gradient-border p-6 hover:bg-white/[0.06] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits / CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="glass-card gradient-border p-10 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Launch your AI marketing team{' '}
            <span className="text-gradient">today</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-10 text-left max-w-lg mx-auto">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                {b}
              </div>
            ))}
          </div>
          <Link href="/login" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
            Connect Your Accounts <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-white/30 text-xs mt-4">No credit card required · Free to start</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-white/30 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Zap className="w-3 h-3" />
          </div>
          <span className="font-semibold text-white/50">ContentFlow</span>
        </div>
        <p>© {new Date().getFullYear()} ContentFlow. Built with Next.js · Deployed on Railway</p>
      </footer>
    </div>
  )
}
