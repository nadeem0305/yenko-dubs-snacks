'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu } from 'lucide-react'
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs'

import { useCart } from '@/store/useCart'
import { Button } from '@/components/ui/button'
import { CartItem } from './CartItem'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import { ThemeToggle } from './ToggleThemeButton'

const emptySubscribe = () => () => {}

export function Navbar() {
  const router = useRouter()
  const items = useCart((state) => state.items)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push('/order')
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Orders', href: '/my-orders' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LEFT SECTION: Mobile Menu & Logo */}
        <div className="flex items-center gap-2 flex-1 justify-start">
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:cursor-pointer"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-75 flex flex-col p-0">
                <SheetHeader className="text-left border-b p-6">
                  <SheetTitle className="text-xl font-black italic tracking-tighter">
                    YENKO<span className="text-primary">DUBS</span>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation Menu
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4 px-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-bold uppercase tracking-widest px-4 py-4 rounded-xl transition-all duration-200 hover:bg-primary/5 hover:text-primary active:bg-primary/10 active:scale-[0.98] flex items-center"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* LOGO: Added 'hidden md:flex' to hide on mobile screens */}
          <Link href="/" className="hidden md:flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Yenko Dubs Logo"
              width={40}
              height={40}
              className="object-contain md:w-12 md:h-12 transition-transform hover:scale-105"
              priority
            />
            <span className="hidden lg:block text-lg font-black tracking-tighter italic">
              YENKO<span className="text-primary">DUBS</span>
            </span>
          </Link>
        </div>

        {/* CENTER SECTION: Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION: Actions (Theme, Cart, Auth) */}
        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
          <ThemeToggle />

          {/* Cart Sheet */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative group transition-all duration-300 hover:bg-primary/10 hover:cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-active:scale-90" />
                {isClient && totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 
    flex h-5 w-5 items-center justify-center rounded-full 
    bg-[#10b981] 
    text-zinc-950 
    text-[11px] font-black 
     ring-zinc-950 
    animate-in zoom-in duration-300"
                  >
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0">
              <div className="p-6 border-b">
                <SheetHeader>
                  <SheetTitle className="text-xl font-black uppercase tracking-tight italic">
                    My Cart
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Your selected snacks
                  </SheetDescription>
                </SheetHeader>
              </div>

              <div className="flex-1 overflow-y-auto px-6">
                {isClient && items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-2 opacity-40">
                    <ShoppingCart className="h-10 w-10" />
                    <p className="font-bold tracking-tighter">
                      Your basket is empty
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {isClient &&
                      items.map((item) => (
                        <CartItem key={item.name} item={item} />
                      ))}
                  </div>
                )}
              </div>

              {isClient && items.length > 0 && (
                <div className="p-6 border-t bg-background space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-bold uppercase text-xs tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-xl font-black">
                      ₵{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full py-7 text-md font-black uppercase tracking-[0.2em] hover:cursor-pointer transition-all hover:scale-[1.01] bg-primary text-white dark:text-black hover:bg-primary/90"
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2 pl-2 border-l ml-1">
            {isClient ? (
              <>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonPopoverCard:
                          'dark:bg-zinc-950 dark:border-zinc-800',
                        userButtonPopoverActionButtonText: 'dark:text-zinc-100',
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </SignedIn>
                <SignedOut>
                  <div className="flex items-center gap-2">
                    <SignInButton mode="modal">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:cursor-pointer font-bold uppercase text-[10px] md:text-xs px-2 md:px-3"
                      >
                        Log In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        size="sm"
                        className="hover:cursor-pointer font-bold uppercase text-[10px] md:text-xs px-3 md:px-4 h-8 md:h-9"
                      >
                        Join
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </>
            ) : (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
