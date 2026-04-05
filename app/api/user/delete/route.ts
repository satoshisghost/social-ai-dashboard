import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Cascade deletes all related records (accounts, sessions, socialAccounts, contentItems)
  await db.user.delete({ where: { id: session.user.id } })

  return NextResponse.json({ ok: true })
}
