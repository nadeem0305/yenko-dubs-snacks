// 'use client'

// import Link from 'next/link'
// import { CheckCircle2, ArrowRight } from 'lucide-react'
// import { Button } from '@/components/ui/button'

// export default function SuccessPage() {
//   return (
//     <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
//       {/* Success Icon with a subtle bounce */}
//       <div className="mb-6 flex justify-center">
//         <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/20">
//           <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
//         </div>
//       </div>

//       {/* Main Text */}
//       <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
//         Order Received!
//       </h1>
//       <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
//         Your snack request has been sent to our team. We&apos;ll reach out to
//         you via WhatsApp or phone shortly to confirm delivery.
//       </p>

//       {/* Next Steps for the Customer */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl mb-12">
//         <div className="p-6 rounded-2xl border bg-card text-left">
//           <h3 className="font-bold flex items-center gap-2 mb-2">
//             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//               1
//             </span>
//             Wait for a Call
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             We usually confirm orders within 15-30 minutes during business
//             hours.
//           </p>
//         </div>
//         <div className="p-6 rounded-2xl border bg-card text-left">
//           <h3 className="font-bold flex items-center gap-2 mb-2">
//             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//               2
//             </span>
//             Prepare Payment
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             Have your cash or mobile money ready for when the rider arrives.
//           </p>
//         </div>
//         <div className="p-6 rounded-2xl border bg-card text-left">
//           <h3 className="font-bold flex items-center gap-2 mb-2">
//             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//               3
//             </span>
//             In Case of Delay
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             No feedback within 15-30 minutes? Contact us on: &nbsp;
//             <span className="text-black italic text-sm font-semibold">
//               +233-20-000-0000
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-4">
//         <Button asChild size="lg" className="rounded-full px-8 font-bold">
//           <Link href="/">Return Home</Link>
//         </Button>
//         <Button
//           asChild
//           variant="outline"
//           size="lg"
//           className="rounded-full px-8 font-bold"
//         >
//           <Link href="/shop" className="flex items-center gap-2">
//             Browse More Snacks <ArrowRight className="h-4 w-4" />
//           </Link>
//         </Button>
//       </div>
//     </div>
//   )
// }

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

      <Button
        asChild
        className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest"
      >
        <Link href="/shop">Back to Shop</Link>
      </Button>
    </div>
  )
}
