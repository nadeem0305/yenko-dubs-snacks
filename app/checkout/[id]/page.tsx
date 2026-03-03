// app/checkout/[id]/page.tsx
import { sql } from '@/db'
import PaystackPayment from '@/components/PaystackPayment'
import { notFound } from 'next/navigation'

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // 1. UNWRAP the params first
  const { id } = await params

  // 2. Now use the 'id' variable in your query
  const result = await sql`
    SELECT * FROM orders WHERE id = ${id}
  `

  if (!result || result.length === 0) {
    return notFound()
  }

  const order = result[0]

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <PaystackPayment
          email={order.user_email}
          amount={Number(order.amount)}
          orderId={order.id}
        />

        <p className="mt-6 text-center text-[10px] font-bold uppercase opacity-30 tracking-[0.3em]">
          Reference ID: {order.id}
        </p>
      </div>
    </main>
  )
}
