'use client'

import { useCart } from '@/store/useCart'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { OrderForm } from '../comps/OrderForm'

export default function OrderPage() {
  const { items } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) {
      router.push('/order/success')
    }
  }, [items, router])

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">
        Complete Your Order
      </h1>
      <div className="grid grid-cols-1 gap-8">
        <OrderForm />
      </div>
    </div>
  )
}
