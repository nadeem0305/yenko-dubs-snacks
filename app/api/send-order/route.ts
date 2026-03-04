import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { customer, items, total } = await req.json()

    // Format the snack list for the email body
    const itemList = items
      .map(
        (item: any) =>
          `${item.quantity}x ${item.name} - ₵${(item.price * item.quantity).toFixed(2)}`,
      )
      .join('\n')

    const { data, error } = await resend.emails.send({
      from: 'Yenko-Dubs-Snacks <orders@yenko-dubs-snacks.com>',
      to: 'mohammedtraoure85@gmail.com',
      subject: `New Order from ${customer.fullName}`,
      text: `New Order Received!
  
Customer Details:
Name: ${customer.fullName}
Phone: ${customer.phone}
Address: ${customer.address}
Notes: ${customer.notes || 'None'}

Order Summary:
${itemList}

Grand Total: ₵${total.toFixed(2)}`,
    })

    if (error) {
      console.error('Resend Error:', error)
    }

    if (error) return NextResponse.json({ error }, { status: 400 })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
