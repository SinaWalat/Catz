import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { GsapProvider } from '@/components/gsap-provider'

import './globals.css'

const _playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Catz Restaurant & Bar | Erbil',
  description:
    'Vibe, Dine, Unwind. Catz is Erbil\'s premier destination for premium dining, signature cocktails, and unforgettable nightlife experiences.',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_playfair.variable} ${_inter.variable}`}>
      <body className="font-sans antialiased">
        <GsapProvider>{children}</GsapProvider>
      </body>
    </html>
  )
}
