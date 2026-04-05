import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { apiKey } = await req.json()

  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    return NextResponse.json({ error: 'Invalid Anthropic API key format' }, { status: 400 })
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { anthropicApiKey: apiKey },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { anthropicApiKey: null },
  })

  return NextResponse.json({ ok: true })
}
