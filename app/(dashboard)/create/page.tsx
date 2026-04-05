'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Copy, ImageIcon, RefreshCw, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: '📸', color: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-[#010101] to-[#69C9D0]' },
  { id: 'x', name: 'X (Twitter)', icon: '𝕏', color: 'from-[#1a1a1a] to-[#555]' },
  { id: 'youtube', name: 'YouTube', icon: '▶', color: 'from-[#FF0000] to-[#CC0000]' },
]

const contentTypes: Record<string, { id: string; label: string }[]> = {
  instagram: [
    { id: 'post', label: 'Caption / Post' },
    { id: 'story', label: 'Story Script' },
    { id: 'reel', label: 'Reel Script' },
  ],
  tiktok: [
    { id: 'post', label: 'Video Script' },
    { id: 'blog', label: 'Trending Hook' },
  ],
  x: [
    { id: 'tweet', label: 'Tweet' },
    { id: 'blog', label: 'Thread' },
  ],
  youtube: [
    { id: 'script', label: 'Video Script' },
    { id: 'blog', label: 'Description' },
  ],
}

const tones = ['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational', 'Controversial']

export default function CreatePage() {
  const [platform, setPlatform] = useState('instagram')
  const [contentType, setContentType] = useState('post')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Professional')
  const [audience, setAudience] = useState('')
  const [generateImg, setGenerateImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ body: string; imagePrompt?: string } | null>(null)
  const [copied, setCopied] = useState(false)

  async function generate() {
    if (!topic.trim()) { toast.error('Enter a topic first'); return }
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, type: contentType, topic, tone, audience, generateImg }),
      })
      if (!res.ok) throw new Error('Generation failed')
      const data = await res.json()
      setResult({ body: data.body, imagePrompt: data.imagePrompt })
      toast.success('Content generated!')
    } catch {
      toast.error('Generation failed. Check your OpenAI API key.')
    } finally {
      setLoading(false)
    }
  }

  function copy() {
    if (!result?.body) return
    navigator.clipboard.writeText(result.body)
    setCopied(true)
    toast.success('Copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const currentTypes = contentTypes[platform] ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-400" />
          AI Content Creator
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Generate platform-optimized content powered by GPT-4o.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-5">
          {/* Platform Select */}
          <div className="glass-card p-5">
            <label className="block text-sm font-medium text-white/70 mb-3">Platform</label>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPlatform(p.id); setContentType(contentTypes[p.id]?.[0]?.id ?? 'post') }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    platform === p.id
                      ? `bg-gradient-to-r ${p.color} text-white shadow-lg`
                      : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{p.icon}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type */}
          <div className="glass-card p-5">
            <label className="block text-sm font-medium text-white/70 mb-3">Content Type</label>
            <div className="flex flex-wrap gap-2">
              {currentTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setContentType(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    contentType === t.id
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                      : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div className="glass-card p-5">
            <label className="block text-sm font-medium text-white/70 mb-2">Topic / Prompt</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The benefits of morning routines for productivity..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 resize-none outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Tone + Audience */}
          <div className="glass-card p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      tone === t
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                        : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Target Audience (optional)</label>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. entrepreneurs, fitness enthusiasts, students..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Generate Image Toggle */}
          <div className="glass-card p-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setGenerateImg(!generateImg)}
                className={`relative w-10 h-6 rounded-full transition-colors ${generateImg ? 'bg-purple-600' : 'bg-white/20'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${generateImg ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
              <div>
                <div className="text-sm font-medium flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-pink-400" />
                  Generate Image Prompt (Claude)
                </div>
                <div className="text-xs text-white/40">AI-written prompt for any image tool</div>
              </div>
            </label>
          </div>

          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate Content</>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div>
          {result ? (
            <div className="space-y-4">
              {result.imagePrompt && (
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-medium text-white/60">Image Prompt (paste into Midjourney, DALL-E, etc.)</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed italic">{result.imagePrompt}</p>
                </div>
              )}

              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white/70">Generated Content</span>
                  <div className="flex gap-2">
                    <button
                      onClick={generate}
                      className="p-2 rounded-lg hover:bg-white/[0.08] text-white/50 hover:text-white transition-all"
                      title="Regenerate"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={copy}
                      className="p-2 rounded-lg hover:bg-white/[0.08] text-white/50 hover:text-white transition-all"
                      title="Copy"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-sm text-white/80 leading-relaxed max-h-96 overflow-y-auto">
                  {result.body}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card h-full min-h-64 flex flex-col items-center justify-center text-center p-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Ready to generate</h3>
              <p className="text-white/40 text-sm max-w-xs">
                Fill in the topic, pick your platform and tone, then hit Generate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
