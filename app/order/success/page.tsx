import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 animate-bounce">
        <CheckCircle2 className="w-20 h-20 text-primary" />
      </div>

      <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
        That&apos;s a <span className="text-primary">Dub!</span>
      </h1>
      <p className="text-zinc-500 uppercase font-bold text-[10px] tracking-[0.3em] mb-8">
        Your order is being prepared
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 max-w-xs w-full mb-8">
        <p className="text-xs font-medium">
          We&apos;ll call your number to proceed with delivery.
        </p>
      </div>

      <div className="space-x-5">
        {/* PRIMARY BUTTON: Solid style */}
        <Button
          asChild
          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest bg-zinc-950 text-white dark:bg-primary dark:text-zinc-950"
        >
          <Link href="/my-orders">View My Orders</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    </div>
  )
}
