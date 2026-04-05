import { auth } from '@/lib/auth'
import { generateContent, generateImage, type Platform, type ContentType } from '@/lib/openai'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { platform, type, topic, tone, audience, generateImg, socialAccountId } = await req.json()

  if (!platform || !type || !topic) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const [body, imageUrl] = await Promise.all([
    generateContent({ platform: platform as Platform, type: type as ContentType, topic, tone, audience }),
    generateImg ? generateImage(`${topic} — ${platform} marketing visual, vibrant, professional`) : Promise.resolve(''),
  ])

  const item = await db.contentItem.create({
    data: {
      userId: session.user.id,
      socialAccountId: socialAccountId ?? null,
      type: type.toUpperCase() as 'POST',
      body,
      imageUrl: imageUrl || null,
      prompt: topic,
      status: 'DRAFT',
    },
  })

  return NextResponse.json({ body, imageUrl, id: item.id })
}
