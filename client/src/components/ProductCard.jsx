import { useState } from 'react'
import { QuantityStepper } from './QuantityStepper'
import { formatPrice } from '../lib/format'
export function ProductCard({ product }) {
  const [qty, setQty] = useState(1)
  return (
    <article className="overflow-hidden rounded-2xl border border-line transition hover:shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="aspect-4/3 w-full object-cover sm:aspect-auto sm:h-[180px]"
      />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-ink-soft">{product.category}</p>
        <p className="mt-1 font-semibold text-ember">{formatPrice(product.priceCents)}</p>
        <div className="mt-3">
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
      </div>
    </article>
  )
}
