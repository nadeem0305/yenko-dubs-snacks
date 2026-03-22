'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Product {
  name: string
  price: number
  image_url: string
  category?: string
  is_available?: boolean
}

export function SnackHero({ snacks }: { snacks: Product[] }) {
  const collageSnacks = snacks.slice(0, 6)

  return (
    <section className="px-4 md:px-6 pt-12 pb-16 md:py-24 w-full bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: TEXT CONTENT */}
        <div className="space-y-8 text-center lg:text-left order-1">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
              The <span className="text-[#db919d]">Ultimate</span> <br />
              <span className="text-primary">Snack Dub.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Premium snacks delivered straight to your doorstep. Satisfying
              your cravings, one dub at a time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-full px-8 h-14 text-lg shadow-xl group bg-[#efbec6] hover:bg-[#fcd4db] hover:text-black"
            >
              <Link href="/shop">
                Shop All Snacks
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* RIGHT: UNIFORM COLLAGE GRID */}
        {/* <div className="order-2 lg:order-2 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {collageSnacks.map((snack, index) => (
            <div
              key={index}
              className="aspect-square relative bg-secondary/40 rounded-2xl md:rounded-[2rem] overflow-hidden border border-border/50 group hover:bg-secondary/60 transition-colors duration-300"
            >
              <div className="absolute inset-0 p-4 md:p-6 flex items-center justify-center">
                <Image
                  src={snack.image_url}
                  alt={snack.name}
                  fill
                  className="object-contain p-4 md:p-6 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div> */}
        <div className="order-2 w-full flex items-center justify-center">
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-[600px] group">
            {/* Decorative Glow behind the image */}
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />

            <Image
              src="/images/img 4.png"
              alt="Yenko Dubs Premium Snacks"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
