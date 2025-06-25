import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "חטיבת יהודה - נעים להכיר",
  description: "האתר הרשמי של חטיבת יהודה",
  keywords: 'חטיבת יהודה, צה"ל, יהודה ושומרון, מורשת, היסטוריה',
  authors: [{ name: "חטיבת יהודה" }],
  robots: "index, follow",
  icons: {
    icon: '/images/judah-brigade-logo-new.png',
    shortcut: '/images/judah-brigade-logo-new.png',
    apple: '/images/judah-brigade-logo-new.png',
  },
  openGraph: {
    title: "חטיבת יהודה - נעים להכיר",
    description: "האתר הרשמי של חטיבת יהודה",
    type: "website",
    locale: "he_IL",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  )
}
