import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/db'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(JSON.stringify(body))
    .digest('hex')

  // 1. Verify the request actually came from Paystack
  if (hash !== req.headers.get('x-paystack-signature')) {
    return new NextResponse('Invalid signature', { status: 401 })
  }

  // 2. Listen for the 'charge.success' event
  if (body.event === 'charge.success') {
    const reference = body.data.reference
    const orderId = body.data.metadata?.order_id // We'll add this in the config

    // 3. Update the DB to 'paid' (Idempotent: won't hurt if already paid)
    await sql`
      UPDATE orders 
      SET status = 'paid', paystack_reference = ${reference}
      WHERE id = ${orderId} AND status = 'pending'
    `
  }

  return new NextResponse('OK', { status: 200 })
}
