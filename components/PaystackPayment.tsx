'use client'

import { PaystackButton } from 'react-paystack'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const schema = z.object({
  email: z.email('Invalid email address'),
  amount: z
    .number()
    .positive('Amount must be positive')
    .min(40, 'Minimum amount is 40.00')
    .max(100000, 'Maximum amount is 100,000'),
})
type FormData = z.infer<typeof schema>

export default function PaystackPayment() {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''
  if (!publicKey) toast.error('public key for paystack not set.')

  const {
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const email = useWatch({ control, name: 'email' })
  const amount = useWatch({ control, name: 'amount' })

  const paystackConfig = {
    email,
    amount: amount * 100,
    publicKey,
    currency: 'GHS',
    channels: ['mobile_money'],
    metadata: {
      custom_fields: [
        {
          display_name: 'Email',
          variable_name: 'email',
          value: email,
        },
        {
          display_name: 'Amount',
          variable_name: 'amount',
          value: amount,
        },
      ],
    },
    onSuccess: () => {
      toast.success('Payment processed successfully.')
      reset()
    },
    onClose: () => toast.error('Payment canceled.'),
    onError: () => toast.error('Payment failed.'),
  }

  // return (
  //   <div>
  //     <Card>
  //       <CardHeader>Pay with PayStack</CardHeader>
  //       <CardContent>
  //         <div>
  //           <Input
  //             {...register('email')}
  //             placeholder="Email Address..."
  //             required
  //             type="email"
  //             name="email"
  //           />
  //           {errors.email && <p>{errors.email.message}</p>}

  //           <Input
  //             {...register('amount')}
  //             placeholder="Amount..."
  //             required
  //             type="number"
  //             name="amount"
  //           />
  //           {errors.amount && <p>{errors.amount.message}</p>}
  //         </div>
  //       </CardContent>
  //     </Card>

  //     {email && amount !== undefined && (
  //       <PaystackButton text="Pay Now" {...paystackConfig} />
  //     )}
  //   </div>
  // )

  return (
    <div className="max-w-md mx-auto p-6">
      <Card
        className="rounded-3xl overflow-hidden shadow-xl transition-colors duration-300
        /* Light Mode Styles */
        bg-white border-zinc-200 
        /* Dark Mode Styles */
        dark:bg-zinc-950 dark:border-zinc-800"
      >
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-900 pb-6">
          <CardTitle
            className="text-xl font-black uppercase tracking-tighter italic
            text-zinc-900 dark:text-zinc-100"
          >
            Momo <span className="text-primary">Checkout</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-5">
          {/* Email Input */}
          <div className="space-y-1">
            <Input
              {...register('email')}
              placeholder="Email Address"
              className="h-12 rounded-xl focus:ring-primary
                /* Light Mode Input */
                bg-zinc-50 border-zinc-200 text-zinc-900
                /* Dark Mode Input */
                dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold uppercase pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-1">
            <Input
              {...register('amount')}
              placeholder="Amount (GHS)"
              type="number"
              className="h-12 rounded-xl focus:ring-primary
                /* Light Mode Input */
                bg-zinc-50 border-zinc-200 text-zinc-900
                /* Dark Mode Input */
                dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
            />
            {errors.amount && (
              <p className="text-[10px] text-red-500 font-bold uppercase pl-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Pay Button Logic */}
          <div className="pt-2">
            {email && amount >= 40 ? (
              <PaystackButton
                {...paystackConfig}
                className="w-full h-14 rounded-xl font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center
      bg-zinc-900 dark:bg-primary 
      text-zinc-100 dark:text-zinc-950 
      hover:brightness-110 shadow-lg hover:cursor-pointer hover:scale-102"
              >
                Pay ₵{amount} Now
              </PaystackButton>
            ) : (
              <button
                disabled
                className="w-full h-14 rounded-xl font-bold uppercase text-sm cursor-not-allowed border 
    bg-zinc-100 text-zinc-400 border-zinc-200
    dark:bg-zinc-900 dark:text-zinc-600 dark:border-zinc-800"
              >
                Enter Details
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
