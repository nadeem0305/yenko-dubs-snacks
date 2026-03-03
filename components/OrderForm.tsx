'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createOrder } from '@/app/actions/order'
import { useCart } from '@/store/useCart'

const orderSchema = z.object({
  location: z.string().min(2, 'Location is required'),
  phone: z.string().min(10, 'Valid phone number required'),
})

type OrderFormValues = z.infer<typeof orderSchema>

export default function OrderForm() {
  const { user } = useUser()
  const router = useRouter()

  const cartItems = useCart((state) => state.items)
  const email = user?.primaryEmailAddress?.emailAddress || ''

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
  })

  const onSubmit = async (data: OrderFormValues) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    const loadingToast = toast.loading('Setting up your Dub...')

    const result = await createOrder(cartItems as any, email, {
      name: user?.fullName || 'Anonymous',
      location: data.location,
      phone: data.phone,
    })

    if (result.success) {
      toast.success('Order initiated!', { id: loadingToast })
      router.push(`/checkout/${result.orderId}`)
    } else {
      toast.error('Something went wrong. Try again.', { id: loadingToast })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Name (Prefilled from Clerk) */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase opacity-50">
            Full Name
          </label>
          <Input
            value={user?.fullName || ''}
            readOnly
            className="bg-zinc-100 dark:bg-zinc-900 cursor-not-allowed opacity-70"
          />
        </div>

        {/* Email (Prefilled from Clerk) */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase opacity-50">
            Email
          </label>
          <Input
            value={email}
            readOnly
            className="bg-zinc-100 dark:bg-zinc-900 cursor-not-allowed opacity-70"
          />
        </div>

        {/* Delivery Info */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase opacity-50">
            Delivery Location
          </label>
          <Input
            {...register('location')}
            placeholder="eg, New Weija"
            className="h-12"
          />
          {errors.location && (
            <p className="text-red-500 text-[10px] font-bold uppercase">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase opacity-50">
            Phone Number
          </label>
          <Input
            {...register('phone')}
            placeholder="024 000 0000"
            className="h-12"
          />
          {errors.phone && (
            <p className="text-red-500 text-[10px] font-bold uppercase">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* The "Locked" Momo Option */}
        <div className="p-4 border border-primary/20 bg-primary/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-4 border-primary bg-zinc-950" />
            <span className="text-xs font-black uppercase italic">
              Pay with Mobile Money
            </span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-tighter opacity-40">
            Standard
          </span>
        </div>
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full h-14 font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all hover:cursor-pointer
             bg-zinc-950 text-white hover:opacity-90 
             dark:bg-primary dark:text-zinc-950 dark:hover:scale-[1.02]"
      >
        {isSubmitting ? 'Processing...' : 'Continue to Payment'}
      </Button>
    </form>
  )
}
