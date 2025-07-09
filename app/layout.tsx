import type { Metadata } from "next"
import { Heebo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

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
        {/* Add Eruda mobile console for production debugging */}
        {process.env.NODE_ENV === 'production' && (
          <script 
            dangerouslySetInnerHTML={{
              __html: `
                if (window.innerWidth < 768) {
                  const script = document.createElement('script');
                  script.src = 'https://cdn.jsdelivr.net/npm/eruda@3.0.1/eruda.min.js';
                  script.onload = function() { eruda.init(); };
                  document.head.appendChild(script);
                }
              `
            }}
          />
        )}
      </head>
      <body className={`min-h-screen bg-background font-heebo antialiased ${heebo.className}`}>
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
