import { SnackHero } from '../components/SnackHero'
import { getSnacks } from '@/app/actions/snacks'
interface Snack {
  id: number
  name: string
  price: number
  image_url: string
  category: string
  is_available: boolean
}

export default async function Home() {
  const snacks = await getSnacks() as Snack[]
  return (
    <div className="flex min-h-screen items-center justify-center flex-col font-sans dark:bg-black">
      <SnackHero snacks={snacks} />
    </div>
  )
}
