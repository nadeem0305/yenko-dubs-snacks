import { getUserOrders } from '@/app/actions/order'
import OrderDetails from '@/components/OrderDetails'
import { Badge } from '@/components/ui/badge'

export default async function OrdersPage() {
  const { orders, success } = await getUserOrders()

  if (!success)
    return <div className="p-10 text-center">Failed to load orders.</div>

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
          <p className="text-zinc-500 italic">
            No snacks found in your history.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                  Order #{order.id.slice(0, 8)}
                </p>
                <h3 className="font-bold text-lg">{order.items.length}</h3>

                <OrderDetails items={order.items} />
                <p className="text-sm text-zinc-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className="font-black text-xl">GH₵ {order.amount}</span>
                <Badge
                  className={`
                  px-4 py-1 rounded-full uppercase text-[10px] font-black
                  ${order.status === 'paid' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}
                `}
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
