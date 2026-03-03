'use server'

import { sql } from '@/db'
import { currentUser } from '@clerk/nextjs/server'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export async function createOrder(
  cartItems: CartItem[],
  email: string,
  // 1. Add these parameters to the function
  deliveryData: { name: string; location: string; phone: string },
) {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  try {
    const result = await sql`
  INSERT INTO orders (
    user_email, 
    user_name, 
    location, 
    phone_number, 
    amount, 
    items, 
    status
  )
  VALUES (
    ${email}, 
    ${deliveryData.name}, 
    ${deliveryData.location}, 
    ${deliveryData.phone}, 
    ${total}, 
    ${JSON.stringify(cartItems)}, 
    'pending'
  )
  RETURNING id
`

    return { success: true, orderId: result[0].id }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false }
  }
}

export async function updateOrderStatus(orderId: string, reference: string) {
  try {
    await sql`
      UPDATE orders 
      SET status = 'paid', paystack_reference = ${reference}
      WHERE id = ${orderId}
    `
    return { success: true }
  } catch (error) {
    console.error('Failed to update order:', error)
    return { success: false }
  }
}

export async function getUserOrders() {
  const user = await currentUser()

  // 1. Check if user is logged in
  if (!user || !user.emailAddresses[0]?.emailAddress) {
    throw new Error('User not authenticated')
  }

  const email = user.emailAddresses[0].emailAddress

  try {
    // 2. Fetch orders sorted by newest first
    const orders = await sql`
      SELECT * FROM orders 
      WHERE user_email = ${email} 
      ORDER BY created_at DESC
    `

    return { success: true, orders }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return { success: false, orders: [] }
  }
}
