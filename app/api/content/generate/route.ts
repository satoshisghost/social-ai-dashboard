import { auth } from '@/lib/auth'
import { generateContent, generateImagePrompt, type Platform, type ContentType } from '@/lib/claude'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { anthropicApiKey: true },
  })

  const apiKey = user?.anthropicApiKey || process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No Anthropic API key configured. Please add your key in Settings.' }, { status: 400 })
  }

  const { platform, type, topic, tone, audience, generateImg, socialAccountId } = await req.json()

  if (!platform || !type || !topic) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Generate content and optionally an image prompt — in parallel
  const [body, imgPrompt] = await Promise.all([
    generateContent({ platform: platform as Platform, type: type as ContentType, topic, tone, audience, apiKey }),
    generateImg ? generateImagePrompt(topic, platform as Platform, apiKey) : Promise.resolve(''),
  ])

  const item = await db.contentItem.create({
    data: {
      userId: session.user.id,
      socialAccountId: socialAccountId ?? null,
      type: type.toUpperCase() as 'POST',
      body,
      prompt: topic,
      status: 'DRAFT',
    },
  })

  return NextResponse.json({ body, imagePrompt: imgPrompt, id: item.id })
}
