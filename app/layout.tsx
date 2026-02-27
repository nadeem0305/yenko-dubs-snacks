import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from './comps/Footer'
import { Navbar } from './comps/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Yenko Dubs Snacks',
  description:
    'Premium snacks delivered straight to your doorstep. Satisfying your cravings, one dub at a time.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="w-full min-h-screen antialiased">
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Navbar />
          </header>
          <main className="pt-8">{children}</main>
          <Toaster position="top-center" richColors />
          <Footer />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  )
}
