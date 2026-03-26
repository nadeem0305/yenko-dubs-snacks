'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Search, X, ShoppingBasket } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { useCart } from '@/store/useCart'
import { toast } from 'sonner'

interface Product {
  id: number | string
  name: string
  price: number
  image_url: string
  is_available?: boolean
}

export function ProductGrid({ snacks }: { snacks: Product[] }) {
  const addItem = useCart((state) => state.addItem)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSnacks = useMemo(() => {
    return snacks.filter((snack) =>
      snack.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, snacks])

  return (
    <section className="w-full max-w-full overflow-hidden px-4 py-6 space-y-8">
      {/* SEARCH SECTION */}
      <div className="relative max-w-md mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-[#efbec6] transition-colors" />
          <Input
            type="text"
            placeholder="Search for your favorite dub..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-12 rounded-2xl border-zinc-200 bg-white shadow-sm focus-visible:ring-[#efbec6] focus-visible:border-[#efbec6] text-white font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-zinc-400" />
            </button>
          )}
        </div>
      </div>

      {/* GRID SECTION */}
      {filteredSnacks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {filteredSnacks.map((snack: Product) => (
            <Card
              key={snack.id || snack.name}
              className="group flex flex-col justify-between overflow-hidden border-none shadow-sm"
            >
              <div className="relative aspect-square bg-[#f9f9f9] dark:bg-zinc-800">
                <Image
                  src={snack.image_url}
                  alt={snack.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                  priority={false}
                />
              </div>

              <CardContent className="p-3 md:p-4 space-y-1">
                <h3 className="font-bold text-sm md:text-sm uppercase line-clamp-2 text-[#dfc8cc]">
                  {snack.name}
                </h3>
                <p className="text-lg md:text-2xl font-black">₵{snack.price}</p>
              </CardContent>

              <CardFooter className="p-2 md:p-4 pt-0">
                {snack.is_available ? (
                  <Button
                    className="w-full py-7 uppercase font-black tracking-[0.2em] text-xs
                    hover:cursor-pointer transition-all duration-300 text-black
                    hover:scale-[1.02] active:scale-[0.98] bg-[#efbec6] hover:bg-[#fcd4db] hover:text-black
                    dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    onClick={() => {
                      addItem(snack as Product)
                      toast.success(`${snack.name} added to cart`, {
                        description: 'Check your cart to proceed to checkout.',
                      })
                    }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full py-7 uppercase font-black tracking-[0.2em] text-xs
    bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
                  >
                    Sold Out
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-zinc-100 p-6 rounded-full mb-4">
            <Search className="h-10 w-10 text-zinc-300" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter">
            No snacks found
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Try searching for something else!
          </p>
          <Button
            variant="link"
            className="mt-4 text-[#efbec6] font-bold uppercase tracking-widest text-xs"
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </Button>
        </div>
      )}
    </section>
  )
}
