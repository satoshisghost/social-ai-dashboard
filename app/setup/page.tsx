'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Key, ExternalLink, Loader2, CheckCircle2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function SetupPage() {
  const router = useRouter()
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    if (!apiKey.trim()) { toast.error('Enter your API key'); return }
    if (!apiKey.startsWith('sk-ant-')) {
      toast.error('Must start with sk-ant-')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/user/apikey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
      toast.success('API key saved!')
      setTimeout(() => router.push('/dashboard'), 1200)
    } catch {
      toast.error('Failed to save key. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSkip() {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#07071A] flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo + Step */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <Image src="/logo.svg" alt="ContentFlow" width={40} height={40} className="rounded-xl shadow-lg shadow-purple-500/30" />
            <span className="font-bold text-xl tracking-tight">ContentFlow</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 rounded-full bg-purple-500" />
            <div className="w-8 h-1 rounded-full bg-white/20" />
            <div className="w-8 h-1 rounded-full bg-white/20" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Add your Claude API key</h1>
          <p className="text-white/50 text-sm">Powers AI content generation. You keep full control — we never share your key.</p>
        </div>

        <div className="glass-card gradient-border p-8 space-y-6">
          {/* How to get key */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm text-purple-300 font-medium mb-2">How to get your key:</p>
            <ol className="text-xs text-white/60 space-y-1 list-decimal list-inside leading-relaxed">
              <li>Go to <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline inline-flex items-center gap-0.5">console.anthropic.com <ExternalLink className="w-3 h-3" /></a></li>
              <li>Click <strong className="text-white/80">Create Key</strong></li>
              <li>Copy the key (starts with <code className="text-purple-300">sk-ant-</code>)</li>
              <li>Paste it below</li>
            </ol>
          </div>

          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-purple-400" />
              Anthropic API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="sk-ant-api03-..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all font-mono"
            />
            <p className="text-xs text-white/30 mt-1.5">Stored securely and used only for your account</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSave}
              disabled={loading || saved}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saved ? (
                <><CheckCircle2 className="w-4 h-4" /> Saved! Redirecting...</>
              ) : loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              ) : (
                <>Save & Continue <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <button
              onClick={handleSkip}
              className="w-full btn-ghost py-3 text-sm"
            >
              Skip for now
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-white/25 mt-4">
          You can update this anytime in Settings
        </p>
      </div>
    </div>
  )
}
