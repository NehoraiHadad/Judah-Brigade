import type { Metadata } from "next"
import { Heebo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
// import { PerformanceMonitor } from "@/components/ui/performance-monitor"

// Configure Heebo font with Hebrew support
const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  variable: '--font-heebo',
})

// Route Segment Config for better performance
export const dynamic = 'auto'
export const revalidate = 3600 // Revalidate every hour
export const fetchCache = 'default-cache'

export const metadata: Metadata = {
  title: "חטיבת יהודה - נעים להכיר",
  description: "האתר הרשמי של חטיבת יהודה",
  keywords: 'חטיבת יהודה, צה"ל, יהודה ושומרון, מורשת, היסטוריה',
  authors: [{ name: "חטיבת יהודה" }],
  openGraph: {
    title: "חטיבת יהודה - נעים להכיר",
    description: "האתר הרשמי של חטיבת יהודה",
    type: "website",
    locale: "he_IL",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning className={`${heebo.variable}`}>
      <head>
        {/* Preload critical resources for better performance */}
        <link
          rel="preload"
          href="/images/judah-brigade-logo-new.webp"
          as="image"
          type="image/webp"
        />
        {/* Preload the first hero image that's actually shown initially */}
        <link
          rel="preload"
          href="/images/hero/hero-cave-machpelah-1.webp"
          as="image"
          type="image/webp"
        />
        {/* DNS prefetch for external resources */}
        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        

      </head>
      <body className={`min-h-screen bg-background font-heebo antialiased ${heebo.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          {/* <PerformanceMonitor /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
