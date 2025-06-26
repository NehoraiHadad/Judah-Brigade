import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Route Segment Config for better performance
export const dynamic = 'auto'
export const revalidate = 3600 // Revalidate every hour
export const fetchCache = 'default-cache'

export const metadata: Metadata = {
  title: "שביל יהודה - חטיבת יהודה",
  description: "חוויה היסטורית ייחודית על גדות נחל שורק - שביל יהודה חטיבת יהודה",
  keywords: ["שביל יהודה", "חטיבת יהודה", "נחל שורק", "היסטוריה", "מורשת"],
  authors: [{ name: "חטיבת יהודה" }],
  openGraph: {
    title: "שביל יהודה - חטיבת יהודה",
    description: "חוויה היסטורית ייחודית על גדות נחל שורק",
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
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
