'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, type CartItem as CartItemType } from '@/store/useCart'

export function CartItem({ item }: { item: CartItemType }) {
  const { addItem, removeItem, deleteItem } = useCart()

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-16 w-16 min-w-16 overflow-hidden rounded-md bg-secondary/50">
        <Image
          src={item.src}
          alt={item.name}
          fill
          className="object-contain p-2"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
        <p className="text-sm text-primary font-black">
          ₵{(item.price * item.quantity).toFixed(2)}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full"
            onClick={() => removeItem(item.name)} // Logic to decrease quantity or remove
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-xs font-bold w-4 text-center">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full"
            onClick={() => addItem(item)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => deleteItem(item.name)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
