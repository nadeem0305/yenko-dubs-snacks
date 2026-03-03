import { SnackHero } from '../components/SnackHero'
import { getSnacks } from '@/app/actions/snacks'

export default async function Home() {
  const snacks = await getSnacks()
  return (
    <div className="flex min-h-screen items-center justify-center flex-col font-sans dark:bg-black">
      <SnackHero snacks={snacks} />
    </div>
  )
}
