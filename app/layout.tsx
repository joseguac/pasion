import type { Metadata } from 'next'
import Script from 'next/script'
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
      <body>
        {/* Google tag (gtag.js) - placed in head automatically via beforeInteractive strategy */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JXLVBZ0PHD"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JXLVBZ0PHD');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}

