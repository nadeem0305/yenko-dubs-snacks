'use server'
import { sql } from '@/db'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function markAsDelivered(orderId: string) {
  const user = await currentUser()
  if (user?.emailAddresses[0].emailAddress !== 'mohammedtraoure85@gmail.com') {
    throw new Error('Unauthorized')
  }

  await sql`
    UPDATE orders 
    SET status = 'delivered' 
    WHERE id = ${orderId}
  `

  revalidatePath('/admin')
}

export async function toggleAvailability(id: number, currentStatus: boolean) {
  const user = await currentUser()
  if (user?.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL) return

  await sql`
    UPDATE snacks 
    SET is_available = ${!currentStatus} 
    WHERE id = ${id}
  `

  revalidatePath('/admin')
  revalidatePath('/shop')
  revalidatePath('/')
}
