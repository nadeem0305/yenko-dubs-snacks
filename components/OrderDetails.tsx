'use client'
import { useState } from 'react'
import { Eye, X } from 'lucide-react'

// Define the shape of a snack item
interface CartItem {
  name: string
  price: number
  quantity: number
}

export default function OrderDetails({ items }: { items: CartItem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary hover:opacity-80 transition-all hover:cursor-pointer"
      >
        <Eye size={14} /> View Order Items
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Modal content as we wrote before */}
          <div className="bg-white dark:bg-zinc-950 border ... w-full max-w-md rounded-[2.5rem] shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black uppercase tracking-tight text-xl">
                Order List
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between font-bold text-sm"
                >
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-zinc-500">
                    GH₵ {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
