import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  // Redirect to setup if no API key configured (skip for /setup itself)
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { anthropicApiKey: true },
  })
  if (!user?.anthropicApiKey) redirect('/setup')

  return (
    <div className="min-h-screen bg-[#07071A] flex">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
