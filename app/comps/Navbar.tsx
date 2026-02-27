'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
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

// 1. A specialized empty subscriber for the client check
const emptySubscribe = () => () => {}

export function Navbar() {
  const router = useRouter()
  const items = useCart((state) => state.items)

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push('/order')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filte:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="SnackShop Logo"
              width={100} // Adjust width as needed
              height={100} // Adjust height as needed
              className="object-contain"
              priority // Ensures the logo loads immediately
            />
            {/* <span className="text-xl font-black tracking-tighter text-primary hidden sm:block">
              YENKO DUBS&nbsp;<span className="text-foreground">SNACKS</span>
            </span> */}
          </Link>

          <div className="flex-1 flex justify-center items-center gap-6">
            <Link
              href="/"
              className="hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95"
            >
              About
            </Link>
          </div>
        </div>

        {/* <div className="">
          <ThemeToggle />
        </div> */}

        <div className="flex-1 flex justify-end items-center gap-4">
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative group transition-all duration-300 hover:bg-primary/10"
              >
                {/* Icon scales up on hover */}
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-active:scale-90" />

                {isClient && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0">
              <div className="p-6 border-b">
                <SheetHeader>
                  <SheetTitle className="text-xl font-black uppercase tracking-tight">
                    My Cart
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    View your selected snacks.
                  </SheetDescription>
                </SheetHeader>
              </div>

              <div className="flex-1 overflow-y-auto px-6">
                {isClient && items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-2 opacity-40">
                    <ShoppingCart className="hover:cursor-pointer h-10 w-10" />
                    <p className="font-medium">Your basket is empty</p>
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
                    <span className="text-muted-foreground font-medium">
                      Subtotal
                    </span>
                    <span className="text-xl font-bold">
                      ₵{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full py-7 text-md font-bold uppercase tracking-widest hover:cursor-pointer"
                  >
                    Checkout Now
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Auth */}
          {/* Auth Section */}
          <div className="flex items-center gap-3 pl-2 border-l">
            {isClient ? (
              <>
                <SignedIn>
                  <div className="p-1 rounded-full transition-all duration-300 hover:bg-primary/10 hover:ring-2 hover:ring-primary/20">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox:
                            'h-8 w-8 transition-transform duration-300 hover:scale-105 hover:cursor-pointer',
                        },
                      }}
                    />
                  </div>
                </SignedIn>
                <SignedOut>
                  {/* We use both for maximum visibility */}
                  <div className="flex gap-2">
                    <SignInButton mode="modal">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex hover:cursor-pointer"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="hover:cursor-pointer" size="sm">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </>
            ) : (
              /* Skeleton loader while mounting to prevent layout shift */
              <div className="h-8 w-20 rounded-md bg-muted animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
