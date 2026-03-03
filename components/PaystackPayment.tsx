'use client'

import { PaystackButton } from 'react-paystack'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { updateOrderStatus } from '@/app/actions/order'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/useCart'

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

// export default function PaystackPayment() {
//   const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''
//   if (!publicKey) toast.error('public key for paystack not set.')

//   const {
//     register,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   })

//   const email = useWatch({ control, name: 'email' })
//   const amount = useWatch({ control, name: 'amount' })

//   const paystackConfig = {
//     email,
//     amount: amount * 100,
//     publicKey,
//     currency: 'GHS',
//     channels: ['mobile_money'],
//     metadata: {
//       custom_fields: [
//         {
//           display_name: 'Email',
//           variable_name: 'email',
//           value: email,
//         },
//         {
//           display_name: 'Amount',
//           variable_name: 'amount',
//           value: amount,
//         },
//       ],
//     },
//     onSuccess: () => {
//       toast.success('Payment processed successfully.')
//       reset()
//     },
//     onClose: () => toast.error('Payment canceled.'),
//     onError: () => toast.error('Payment failed.'),
//   }

//   // return (
//   //   <div>
//   //     <Card>
//   //       <CardHeader>Pay with PayStack</CardHeader>
//   //       <CardContent>
//   //         <div>
//   //           <Input
//   //             {...register('email')}
//   //             placeholder="Email Address..."
//   //             required
//   //             type="email"
//   //             name="email"
//   //           />
//   //           {errors.email && <p>{errors.email.message}</p>}

//   //           <Input
//   //             {...register('amount')}
//   //             placeholder="Amount..."
//   //             required
//   //             type="number"
//   //             name="amount"
//   //           />
//   //           {errors.amount && <p>{errors.amount.message}</p>}
//   //         </div>
//   //       </CardContent>
//   //     </Card>

//   //     {email && amount !== undefined && (
//   //       <PaystackButton text="Pay Now" {...paystackConfig} />
//   //     )}
//   //   </div>
//   // )

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <Card
//         className="rounded-3xl overflow-hidden shadow-xl transition-colors duration-300
//         /* Light Mode Styles */
//         bg-white border-zinc-200
//         /* Dark Mode Styles */
//         dark:bg-zinc-950 dark:border-zinc-800"
//       >
//         <CardHeader className="border-b border-zinc-100 dark:border-zinc-900 pb-6">
//           <CardTitle
//             className="text-xl font-black uppercase tracking-tighter italic
//             text-zinc-900 dark:text-zinc-100"
//           >
//             Momo <span className="text-primary">Checkout</span>
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="pt-6 space-y-5">
//           {/* Email Input */}
//           <div className="space-y-1">
//             <Input
//               {...register('email')}
//               placeholder="Email Address"
//               className="h-12 rounded-xl focus:ring-primary
//                 /* Light Mode Input */
//                 bg-zinc-50 border-zinc-200 text-zinc-900
//                 /* Dark Mode Input */
//                 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
//             />
//             {errors.email && (
//               <p className="text-[10px] text-red-500 font-bold uppercase pl-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Amount Input */}
//           <div className="space-y-1">
//             <Input
//               {...register('amount')}
//               placeholder="Amount (GHS)"
//               type="number"
//               className="h-12 rounded-xl focus:ring-primary
//                 /* Light Mode Input */
//                 bg-zinc-50 border-zinc-200 text-zinc-900
//                 /* Dark Mode Input */
//                 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
//             />
//             {errors.amount && (
//               <p className="text-[10px] text-red-500 font-bold uppercase pl-1">
//                 {errors.amount.message}
//               </p>
//             )}
//           </div>

//           {/* Pay Button Logic */}
//           <div className="pt-2">
//             {email && amount >= 40 ? (
//               <PaystackButton
//                 {...paystackConfig}
//                 className="w-full h-14 rounded-xl font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center
//       bg-zinc-900 dark:bg-primary
//       text-zinc-100 dark:text-zinc-950
//       hover:brightness-110 shadow-lg hover:cursor-pointer hover:scale-102"
//               >
//                 Pay ₵{amount} Now
//               </PaystackButton>
//             ) : (
//               <button
//                 disabled
//                 className="w-full h-14 rounded-xl font-bold uppercase text-sm cursor-not-allowed border
//     bg-zinc-100 text-zinc-400 border-zinc-200
//     dark:bg-zinc-900 dark:text-zinc-600 dark:border-zinc-800"
//               >
//                 Enter Details
//               </button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

export default function PaystackPayment({
  email,
  amount,
  orderId,
}: PaystackPaymentProps) {
  const router = useRouter()
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''

  const clearCart = useCart((state) => state.clearCart)

  // const paystackConfig = {
  //   email,
  //   amount: Math.round(amount * 100), // Convert GHS to Pesewas for Paystack
  //   publicKey,
  //   currency: 'GHS',
  //   channels: ['mobile_money'],
  //   text: `Confirm & Pay ₵${amount}`,
  //   onSuccess: (reference: any) => {
  //     toast.success('Payment Successful!')
  //     // In the next step, we will trigger a server action here
  //     // to update the DB status to 'paid'
  //     router.push('/order/success')
  //   },
  //   onClose: () => toast.error('Payment Canceled'),
  // }

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
            <span className="text-lg font-black text-primary italic italic">
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
