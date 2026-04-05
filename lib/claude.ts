import Anthropic from '@anthropic-ai/sdk'

export type Platform = 'instagram' | 'tiktok' | 'x' | 'youtube'
export type ContentType = 'post' | 'caption' | 'script' | 'blog' | 'tweet'

const platformInstructions: Record<Platform, string> = {
  instagram:
    'Write for Instagram. Use a conversational, visual-first tone. Include relevant hashtags (5-10) at the end. Keep captions engaging and story-driven.',
  tiktok:
    'Write for TikTok. Use short punchy sentences. Include trending hooks at the start. Add relevant hashtags. Script should feel natural for video narration.',
  x: 'Write for X (Twitter). Be concise, max 280 characters per tweet. Be witty, direct, and engaging. Use 1-2 hashtags max.',
  youtube:
    'Write for YouTube. Create an engaging video script with a strong hook in the first 10 seconds. Structure: Hook → Content → Call to Action. Include suggested tags.',
}

function getClient(apiKey: string) {
  return new Anthropic({ apiKey })
}

export async function generateContent({
  platform,
  type,
  topic,
  tone = 'professional',
  audience = 'general',
  apiKey,
}: {
  platform: Platform
  type: ContentType
  topic: string
  tone?: string
  audience?: string
  apiKey: string
}): Promise<string> {
  const systemPrompt = `You are an expert social media content creator specialising in ${platform} content.
${platformInstructions[platform]}
Tone: ${tone}
Target audience: ${audience}
Always return clean, ready-to-post content with no extra commentary.`

  const response = await getClient(apiKey).messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: `Create a ${type} about: ${topic}` }],
  })

  const block = response.content[0]
  return block.type === 'text' ? block.text : ''
}

export async function generateImagePrompt(topic: string, platform: Platform, apiKey: string): Promise<string> {
  const response = await getClient(apiKey).messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: `Write a vivid, detailed image generation prompt for a ${platform} marketing visual about: ${topic}.
Output only the prompt text, no explanation.`,
      },
    ],
  })

  const block = response.content[0]
  return block.type === 'text' ? block.text : ''
}
