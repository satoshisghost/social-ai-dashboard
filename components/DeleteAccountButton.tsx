'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Loader2, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DeleteAccountButton() {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      const res = await fetch('/api/user/delete', { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Account deleted.')
      await signOut({ callbackUrl: '/' })
    } catch {
      toast.error('Failed to delete account. Try again.')
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/60">Are you sure? This is permanent.</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          {loading ? 'Deleting...' : 'Yes, delete everything'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      Delete Account
    </button>
  )
}
