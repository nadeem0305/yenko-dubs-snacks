'use client'

import { PaystackButton } from 'react-paystack'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { toast } from 'sonner'
import { updateOrderStatus } from '@/app/actions/order'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/useCart'
import dynamic from 'next/dynamic'

interface PaystackPaymentProps {
  email: string
  amount: number // This will be the GHS value (e.g., 45.50)
  orderId: string
}

const schema = z.object({
  email: z.email('Invalid email address'),
  amount: z
    .number()
    .positive('Amount must be positive')
    .min(40, 'Minimum amount is 40.00')
    .max(100000, 'Maximum amount is 100,000'),
})
type FormData = z.infer<typeof schema>

const PaystackButton = dynamic(() => import('@/components/PaystackPayment'), {
  ssr: false,
})

export default function PaystackPayment({
  email,
  amount,
  orderId,
}: PaystackPaymentProps) {
  const router = useRouter()
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''

  const clearCart = useCart((state) => state.clearCart)

  const paystackConfig = {
    email,
    amount: Math.round(amount * 100),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    currency: 'GHS',
    channels: ['mobile_money'],
    metadata: {
      custom_fields: [
        {
          display_name: 'Order ID',
          variable_name: 'order_id',
          value: orderId,
        },
      ],
      order_id: orderId,
    },
    onSuccess: async (reference: any) => {
      // 1. Show a loading toast while we talk to Neon DB
      const updatingToast = toast.loading('Finalizing your Dub...')

      // 2. Call the server action to update status to 'paid'
      const result = await updateOrderStatus(orderId, reference.reference)

      if (result.success) {
        clearCart()
        toast.success('Payment Verified!', { id: updatingToast })
        // 3. Clear the cart (if using Zustand/Context) and redirect
        // useCartStore.getState().clearCart()
        router.push('/order/success')
      } else {
        toast.error('Payment recorded, but DB update failed. Contact support.')
      }
    },
    onClose: () => toast.error('Payment Canceled'),
  }

  return (
    <Card className="rounded-3xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center font-black uppercase italic tracking-tighter">
          Finalize <span className="text-primary">Order</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-100 dark:border-zinc-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold uppercase opacity-40">
              Account
            </span>
            <span className="text-xs font-medium truncate ml-4">{email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase opacity-40">
              Total Amount
            </span>
            <span className="text-lg font-black text-primary italic">
              ₵{amount}
            </span>
          </div>
        </div>

        <PaystackButton
          {...paystackConfig}
          text="Pay Now"
          className="w-full h-16 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-primary/20
          bg-zinc-950 text-white hover:opacity-90 
             dark:bg-primary dark:text-zinc-950 dark:hover:scale-[1.02]
         hover:cursor-pointer "
        />

        <p className="text-[9px] text-center uppercase font-bold opacity-30 tracking-widest">
          Secure Encrypted Transaction
        </p>
      </CardContent>
    </Card>
  )
}
