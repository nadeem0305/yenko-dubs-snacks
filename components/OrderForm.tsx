// 'use client'

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { useRouter } from 'next/navigation'
// import { useUser } from '@clerk/nextjs'
// import { toast } from 'sonner'

// import { useCart } from '@/store/useCart'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'

// // 1. Define Validation Schema
// const formSchema = z.object({
//   fullName: z.string().min(2, 'Please enter your full name'),
//   phone: z
//     .string()
//     .min(10, 'Please enter a valid phone number (min 10 digits)'),
//   address: z.string().min(5, 'Please provide a detailed delivery address'),
//   notes: z.string().optional(),
// })

// type OrderFormValues = z.infer<typeof formSchema>

// export function OrderForm() {
//   const router = useRouter()
//   const { user } = useUser()
//   const { items, clearCart } = useCart()

//   // Calculate total for the email/summary
//   const totalAmount = items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   )

//   // 2. Initialize Form
//   const form = useForm<OrderFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fullName: user?.fullName || '', // Smart pre-fill from Clerk
//       phone: '',
//       address: '',
//       notes: '',
//     },
//   })

//   // 3. Handle Submission
//   async function onSubmit(values: OrderFormValues) {
//     try {
//       const response = await fetch('/api/send-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           customer: values,
//           items: items,
//           total: totalAmount,
//         }),
//       })

//       if (response.ok) {
//         toast.success('Order request sent!')

//         // 1. Clear the cart state first
//         setTimeout(() => {
//           clearCart()
//         }, 100)

//         // 2. Route to the success page folder
//         router.push('/order/success')
//       } else {
//         const errorData = await response.json()
//         toast.error(errorData.error || 'Failed to send order')
//       }
//     } catch (error) {
//       toast.error('Something went wrong. Please try again.')
//     }
//   }

//   return (
//     <div className="bg-card p-6 rounded-xl border shadow-sm">
//       <Form {...form}>
//         <form
//           autoComplete="off"
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               control={form.control}
//               name="fullName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Full Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="John Doe..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <Input placeholder="050 000 0000" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="address"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Delivery Address</FormLabel>
//                 <FormControl>
//                   <Input placeholder="House No, Street Name, Area" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="notes"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Additional Notes (Optional)</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Any specific delivery instructions?"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="pt-4 border-t">
//             <div className="flex justify-between items-center mb-6">
//               <span className="text-muted-foreground font-medium">
//                 Final Total
//               </span>
//               <span className="text-2xl font-black text-primary">
//                 ₵{totalAmount.toFixed(2)}
//               </span>
//             </div>

//             <Button
//               type="submit"
//               className="hover:cursr-pointer w-full py-7 text-lg font-bold uppercase tracking-widest"
//               disabled={form.formState.isSubmitting}
//             >
//               {form.formState.isSubmitting ? 'Processing...' : 'Confirm Order'}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   )
// }

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

// interface OrderFormProps {
//   cartItems: any[] // Pass your cart items here from Zustand/Context
// }

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

    // // 1. Trigger your Server Action
    // const result = await createOrder(cartItems, email)

    // if (result.success) {
    //   toast.success('Order initiated!', { id: loadingToast })
    //   // 2. Redirect to the SECURE checkout page with the UUID
    //   router.push(`/checkout/${result.orderId}`)
    // } else {
    //   toast.error('Something went wrong. Try again.', { id: loadingToast })
    // }

    const result = await createOrder(cartItems, email, {
      name: user?.fullName || 'Anonymous', // From Clerk
      location: data.location, // From Form
      phone: data.phone, // From Form
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
