import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'ContentFlow — AI Social Media Dashboard',
  description: 'Manage Instagram, TikTok, X, and YouTube with AI-powered content creation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0D0D2B',
              color: '#fff',
              border: '1px solid rgba(124,58,237,0.3)',
            },
          }}
        />
      </body>
    </html>
  )
}
