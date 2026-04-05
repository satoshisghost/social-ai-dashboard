import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export type Platform = 'instagram' | 'tiktok' | 'x' | 'youtube'
export type ContentType = 'post' | 'caption' | 'script' | 'blog' | 'tweet'

const platformInstructions: Record<Platform, string> = {
  instagram: 'Write for Instagram. Use a conversational, visual-first tone. Include relevant hashtags (5-10) at the end. Keep captions engaging and story-driven.',
  tiktok: 'Write for TikTok. Use short punchy sentences. Include trending hooks at the start. Add relevant hashtags. Script should feel natural for video narration.',
  x: 'Write for X (Twitter). Be concise, max 280 characters per tweet. Be witty, direct, and engaging. Use 1-2 hashtags max.',
  youtube: 'Write for YouTube. Create an engaging video script with a strong hook in the first 10 seconds. Structure: Hook → Content → Call to Action. Include suggested tags.',
}

export async function generateContent({
  platform,
  type,
  topic,
  tone = 'professional',
  audience = 'general',
}: {
  platform: Platform
  type: ContentType
  topic: string
  tone?: string
  audience?: string
}) {
  const systemPrompt = `You are an expert social media content creator specializing in ${platform} content.
${platformInstructions[platform]}
Tone: ${tone}
Target audience: ${audience}
Always return clean, ready-to-post content.`

  const userPrompt = `Create a ${type} about: ${topic}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.8,
    max_tokens: 1000,
  })

  return response.choices[0]?.message?.content ?? ''
}

export async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    size: '1024x1024',
    quality: 'standard',
    n: 1,
  })
  return response.data?.[0]?.url ?? ''
}
