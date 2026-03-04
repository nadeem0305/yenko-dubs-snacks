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
    'Order the best Dubs snacks in Ghana. Fast delivery, fresh taste, and easy online payment. Satisfy your cravings with Yenko Dubs.',
  keywords: [
    'Yenko Dubs',
    'Snacks Ghana',
    'Buy snacks online Accra',
    'Dubs Snacks',
  ],
  openGraph: {
    title: 'Yenko Dubs Snacks',
    description: 'The best snacks in Ghana, delivered to your door.',
    url: 'https://yenko-dubs-snacks.com',
    siteName: 'Yenko Dubs',
    images: [
      {
        url: 'https://yenko-dubs-snacks.com/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GH',
    type: 'website',
  },
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
