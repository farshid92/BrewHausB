import { useState } from 'react'
import { Link } from 'react-router'
import { QuantityStepper } from './QuantityStepper'
import { formatPrice } from '../lib/format'
export function ProductCard({ product }) {
  const [qty, setQty] = useState(1)
  return (
    <article className="overflow-hidden rounded-2xl border border-line transition hover:shadow-lg">
      <Link to={`/products/${product.slug}`} className="block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-4/3 w-full object-cover sm:aspect-auto sm:h-[180px]"
        />
        <div className="p-4 pb-0">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-ink-soft">{product.category}</p>
          <p className="mt-1 font-semibold text-ember">{formatPrice(product.priceCents)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-3">
        <QuantityStepper value={qty} onChange={setQty} />
      </div>
    </article>
  )
}
