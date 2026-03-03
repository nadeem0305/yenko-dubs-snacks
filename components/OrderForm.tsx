'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

import { useCart } from '@/store/useCart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// 1. Define Validation Schema
const formSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number (min 10 digits)'),
  address: z.string().min(5, 'Please provide a detailed delivery address'),
  notes: z.string().optional(),
})

type OrderFormValues = z.infer<typeof formSchema>

export function OrderForm() {
  const router = useRouter()
  const { user } = useUser()
  const { items, clearCart } = useCart()

  // Calculate total for the email/summary
  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  // 2. Initialize Form
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || '', // Smart pre-fill from Clerk
      phone: '',
      address: '',
      notes: '',
    },
  })

  // 3. Handle Submission
  async function onSubmit(values: OrderFormValues) {
    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: values,
          items: items,
          total: totalAmount,
        }),
      })

      if (response.ok) {
        toast.success('Order request sent!')

        // 1. Clear the cart state first
        setTimeout(() => {
          clearCart()
        }, 100)

        // 2. Route to the success page folder
        router.push('/order/success')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to send order')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm">
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="050 000 0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input placeholder="House No, Street Name, Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific delivery instructions?"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground font-medium">
                Final Total
              </span>
              <span className="text-2xl font-black text-primary">
                ₵{totalAmount.toFixed(2)}
              </span>
            </div>

            <Button
              type="submit"
              className="hover:cursr-pointer w-full py-7 text-lg font-bold uppercase tracking-widest"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Processing...' : 'Confirm Order'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
