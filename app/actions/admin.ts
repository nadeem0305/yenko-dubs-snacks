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
