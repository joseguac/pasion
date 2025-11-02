import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pasión - Nightclub Experience',
  description: '3D nightclub scene powered by Three.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

