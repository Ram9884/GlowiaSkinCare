'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { products } from '../../../data/products';
import { ShoppingBag, CheckCircle2, Check, Plus, Minus, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import ProductCard from '../../../components/shop/ProductCard';
import { useCart } from '../../../context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = products.find(p => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, openCart } = useCart();

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white border border-[#E8EBDD] rounded-2xl h-[450px] overflow-hidden relative shadow-sm group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202820]/40 via-transparent to-transparent pointer-events-none" />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#25452D] text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
              {product.category.replace('-', ' ').toUpperCase()}
            </span>
            {product.originalPrice && (
              <span className="absolute top-4 right-4 bg-[#56734A] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                Special Offer
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">
                {product.availabilityLabel}
              </span>
              <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#25452D]">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl font-bold text-[#25452D]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-base text-[#737B70] line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-xs text-[#56734A] bg-[#E8EBDD] px-2.5 py-1 rounded-md font-medium">
                  Demo Price
                </span>
              </div>
            </div>

            <p className="text-sm text-[#737B70] leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#E8EBDD]">
              <h3 className="font-['Cormorant_Garamond'] text-lg font-bold text-[#25452D]">Key Botanical Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span key={idx} className="bg-white border border-[#E8EBDD] text-[#202820] text-xs px-3 py-1.5 rounded-md">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8EBDD]">
              <h3 className="font-['Cormorant_Garamond'] text-lg font-bold text-[#25452D]">Key Benefits</h3>
              <ul className="space-y-1.5 text-xs text-[#737B70]">
                {product.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#56734A] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8EBDD]">
              <h3 className="font-['Cormorant_Garamond'] text-lg font-bold text-[#25452D]">How to Use</h3>
              <p className="text-xs text-[#737B70] leading-relaxed">{product.usage}</p>
            </div>

            {/* Purchase & Add to Cart Controls */}
            <div className="pt-4 border-t border-[#E8EBDD] space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#202820] uppercase">Quantity:</span>
                <div className="flex items-center border border-[#E8EBDD] rounded-md bg-white">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 text-sm text-[#202820] hover:text-[#56734A]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-[#202820] min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 text-sm text-[#202820] hover:text-[#56734A]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-[#737B70]">
                  Subtotal: <strong className="text-[#25452D]">₹{product.price * quantity}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-md text-sm font-semibold transition-all ${
                    justAdded
                      ? 'bg-[#56734A] text-white ring-2 ring-[#56734A]/30'
                      : 'bg-[#25452D] hover:bg-[#56734A] text-white shadow-md'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-5 h-5 animate-in zoom-in" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#25452D] text-[#25452D] hover:bg-[#25452D] hover:text-white py-3.5 rounded-md text-sm font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {justAdded && (
                <button
                  onClick={openCart}
                  className="text-xs text-[#56734A] hover:underline font-medium block text-center w-full"
                >
                  View your bag & proceed to checkout →
                </button>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#737B70]">
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-[#E8EBDD]">
                  <Truck className="w-4 h-4 text-[#56734A] shrink-0" />
                  <span>Free delivery over ₹499</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-[#E8EBDD]">
                  <ShieldCheck className="w-4 h-4 text-[#56734A] shrink-0" />
                  <span>Secure Demo Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="space-y-8 pt-12 border-t border-[#E8EBDD]">
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">Related Essentials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
