import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { dark } from '@clerk/themes'
import Script from 'next/script'

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#f9f9f9',
          colorBackground: '#09090b',
          colorInputBackground: '#18181b',
        },
        elements: {
          card: 'bg-zinc-950 border border-zinc-800 shadow-2xl',
          headerTitle: 'italic font-black tracking-tighter',
          socialButtonsBlockButton:
            'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white',
          formButtonPrimary:
            'bg-primary hover:bg-primary/90 text-white font-bold uppercase',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="w-full min-h-screen antialiased">
          <Script
            src="https://js.paystack.co/v1/inline.js"
            strategy="beforeInteractive"
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <Navbar />
            </header>

            <main className="pt-8">{children}</main>
            <Toaster position="top-center" richColors />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
