'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { data } from '@/utils/data'
import { useCart } from '@/store/useCart'
import { toast } from 'sonner'

// 1. Define the Interface
interface Product {
  name: string
  price: number
  src: string
}

export function ProductGrid() {
  const addItem = useCart((state) => state.addItem)

  return (
    <section className="w-full max-w-full overflow-hidden px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {data.map((snack: Product) => (
          <Card
            key={snack.name}
            className="group flex flex-col justify-between overflow-hidden border-none shadow-sm"
          >
            {/* ... rest of your card content */}
            <div className="relative aspect-square bg-[#f9f9f9] dark:bg-zinc-800">
              <Image
                src={snack.src}
                alt={snack.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                priority={false}
              />
            </div>

            <CardContent className="p-3 md:p-4 space-y-1">
              {/* Reduced text size for mobile so it doesn't wrap awkwardly */}
              <h3 className="font-bold text-xs md:text-sm uppercase line-clamp-2">
                {snack.name}
              </h3>
              <p className="text-lg md:text-2xl font-black text-primary">
                ₵{snack.price.toFixed(2)}
              </p>
            </CardContent>

            <CardFooter className="p-2 md:p-4 pt-0">
              <Button
                className="w-full py-7 uppercase font-black tracking-[0.2em] text-xs
    hover:cursor-pointer transition-all duration-300 
    hover:scale-[1.02] active:scale-[0.98]
    bg-primary text-white hover:bg-primary/90
    dark:bg-primary dark:text-zinc-950 dark:hover:bg-primary/90
    dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                onClick={() => {
                  addItem(snack)
                  toast.success(`${snack.name} added to cart`, {
                    description: 'Check your cart to proceed to checkout.',
                  })
                }}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
