'use client'

import Image from 'next/image' // Using next/image for better perf
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { data } from '@/utils/data'
import { toast } from 'sonner'
import { useCart } from '@/store/useCart'

export function SnackHero() {
  const featured = [...data].sort((a, b) => b.price - a.price).slice(0, 3)
  const addItem = useCart((state) => state.addItem)

  return (
    <section className="px-2 md:px-4 pt-2 pb-8 md:pt-4 md:pb-20 w-full overflow-hidden">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {featured.map((snack, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-none bg-secondary/30">
                  <CardContent className="flex flex-col-reverse md:flex-row items-center p-6 md:p-12 gap-6 md:gap-8">
                    {/* Text Content */}
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none h-[2.4em] md:h-[2.2em] line-clamp-2">
                        {snack.name}
                      </h2>
                      <p className="text-base md:text-xl text-muted-foreground line-clamp-2 md:line-clamp-none">
                        Experience the premium crunch of our most loved
                        selection.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
                        <span className="text-2xl md:text-3xl font-bold text-primary">
                          ₵{snack.price.toFixed(2)}
                        </span>
                        <Button
                          size="lg"
                          className="rounded-full px-8 w-full sm:w-auto shadow-lg hover:cursor-pointer"
                          onClick={() => {
                            addItem(snack)
                            toast.success(`${snack.name} added to cart`, {
                              description:
                                'Check your cart to proceed to checkout.',
                            })
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-1 w-full flex justify-center">
                      <div className="relative w-full max-w-[250px] md:max-w-md aspect-square">
                        <Image
                          src={snack.src}
                          alt={snack.name}
                          fill
                          priority
                          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Hidden on mobile to prevent layout breaking, visible on md+ */}
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </section>
  )
}
