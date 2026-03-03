export type Order = {
  id: string
  user_email: string
  amount: number
  ocation: string
  phone_number: string
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
  items: Record<string, unknown>[]
  created_at: Date
}
