import { sql } from '@/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { markAsDelivered } from '@/app/actions/admin'
import { Truck } from 'lucide-react'

export const metadata = {
  title: 'Kitchen Dashboard | Yenko Dubs',
  description: 'Order fulfillment center',
  refresh: 60,
}

export default async function AdminPage() {
  const user = await currentUser()
  const ADMIN_EMAIL = 'mohammedtraoure85@gmail.com'

  if (user?.emailAddresses[0].emailAddress !== ADMIN_EMAIL) {
    redirect('/')
  }

  // Fetch only Paid orders that aren't delivered yet
  const activeOrders = await sql`
    SELECT * FROM orders 
    WHERE status = 'paid' 
    ORDER BY created_at ASC
  `

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            Kitchen Dashboard
          </h1>
          <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mt-2">
            {activeOrders.length} Orders Pending Delivery
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between gap-8"
          >
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <span className="bg-primary text-zinc-950 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  New Order
                </span>
                <span className="text-zinc-400 text-xs font-mono">
                  {order.id.slice(0, 8)}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase">
                  {order.user_name || 'Anonymous Student'}
                </h2>
                <p className="text-zinc-500 font-bold">
                  {order.location} — {order.phone_number}
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase text-zinc-400 mb-2">
                  Items to Pack:
                </p>
                <ul className="space-y-1">
                  {order.items.map((item: any, i: number) => (
                    <li key={i} className="font-bold text-sm">
                      {item.quantity}x{' '}
                      <span className="uppercase">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-zinc-400">
                  Total Paid
                </p>
                <p className="text-3xl font-black italic">GH₵{order.amount}</p>
              </div>

              <form
                action={async () => {
                  'use server'
                  await markAsDelivered(order.id)
                }}
              >
                <button className="flex items-center gap-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all hover:cursor-pointer">
                  <Truck size={18} /> Done & Delivered
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
