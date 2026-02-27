import { ProductGrid } from '../comps/ProductGrid'

export default function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black p-4 md:p-8">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">
        All Snacks
      </h1>
      <ProductGrid />
    </div>
  )
}
