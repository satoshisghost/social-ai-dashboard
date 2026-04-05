'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Link2,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/connect', icon: Link2, label: 'Connect Accounts' },
  { href: '/create', icon: Sparkles, label: 'AI Creator' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col border-r border-white/[0.06] bg-[#0D0D2B]/60 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="ContentFlow" width={32} height={32} className="rounded-lg shadow-lg shadow-purple-500/30" />
          <span className="font-bold text-base tracking-tight">ContentFlow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = path === href || path.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/10 text-white border border-purple-500/20'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
              )}
            >
              <Icon
                className={cn('w-4 h-4 shrink-0', active ? 'text-purple-400' : 'text-current')}
              />
              {label}
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
