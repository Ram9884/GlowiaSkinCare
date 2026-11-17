'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../types/product';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items, openCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const existingItem = items.find((item) => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1600);
  };

  return (
    <div className="group bg-[#FFFFFF] border border-[#E8EBDD] rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="h-64 bg-[#E8EBDD] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#202820]/10 to-transparent" />
          <span className="font-['Cormorant_Garamond'] text-lg font-bold text-[#25452D] px-4 text-center">
            {product.name}
          </span>
          {product.originalPrice && (
            <span className="absolute top-3 right-3 bg-[#56734A] text-white text-[10px] font-semibold px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>
        <div className="p-5 space-y-2">
          <span className="text-[10px] tracking-widest uppercase text-[#56734A] font-medium">
            {product.category.replace('-', ' ')}
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D] group-hover:text-[#56734A] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#737B70] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-sm font-bold text-[#25452D]">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#737B70] line-through">₹{product.originalPrice}</span>
            )}
            <span className="ml-auto text-[10px] text-[#56734A] bg-[#E8EBDD] px-2 py-0.5 rounded">
              Demo Price
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 pt-0 space-y-2">
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-medium transition-all ${
            justAdded 
              ? 'bg-[#56734A] text-white ring-2 ring-[#56734A]/30'
              : 'bg-[#25452D] hover:bg-[#56734A] text-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 animate-in zoom-in" />
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>
                {existingItem ? `Add More (${existingItem.quantity} in Bag)` : 'Add to Bag'}
              </span>
            </>
          )}
        </button>

        {existingItem && (
          <button
            onClick={(e) => {
              e.preventDefault();
              openCart();
            }}
            className="w-full text-center text-[11px] text-[#56734A] hover:underline font-medium block"
          >
            View in Bag →
          </button>
        )}
      </div>
    </div>
  );
}
