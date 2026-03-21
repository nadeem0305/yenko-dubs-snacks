import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

import Image from 'next/image'

const ItemCard = ({ name, src, price }) => {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={src}
          className="object-cover transition group-hover:scale-105"
          alt=""
        />
      </div>
      <CardHeader className="p-4 ">
        <CardTitle className="text-sm font-medium leading-tight">
          {name}
        </CardTitle>
        <p className="text-lg font-bold text-primary">₵{price.toFixed(2)}</p>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
export default ItemCard
