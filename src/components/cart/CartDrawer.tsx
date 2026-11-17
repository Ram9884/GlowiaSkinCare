'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    shipping,
    discount,
    total,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 499;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#202820]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <aside 
        className="relative w-full max-w-md bg-[#F8F7F0] h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-in-out border-l border-[#E8EBDD]"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E8EBDD] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E8EBDD] flex items-center justify-center text-[#25452D]">
              <ShoppingBag className="w-4 h-4 text-[#56734A]" />
            </div>
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D]">
                Your Shopping Bag
              </h2>
              <p className="text-[11px] text-[#737B70]">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 text-[#737B70] hover:text-[#25452D] hover:bg-[#F8F7F0] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-[#E8EBDD]/50 border-b border-[#E8EBDD] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              {amountNeededForFreeShipping > 0 ? (
                <span className="text-[#202820] flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#56734A]" />
                  Add <strong className="text-[#25452D]">₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery</strong>
                </span>
              ) : (
                <span className="text-[#56734A] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#56734A]" />
                  🎉 You have unlocked <strong>FREE Delivery!</strong>
                </span>
              )}
              <span className="text-[10px] text-[#737B70]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-[#E8EBDD] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#56734A] h-full rounded-full transition-all duration-300" 
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E8EBDD] flex items-center justify-center text-[#56734A]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#737B70] max-w-xs">
                  Discover botanical skincare, haircare, and wellness products crafted by Dr. S. Sathya.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-[#25452D] text-white px-6 py-2.5 rounded-md text-xs font-medium hover:bg-[#56734A] transition-colors"
              >
                <span>Browse Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white border border-[#E8EBDD] rounded-xl p-3.5 flex gap-3.5 shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#E8EBDD] rounded-lg flex items-center justify-center shrink-0 p-2 text-center">
                    <span className="font-['Cormorant_Garamond'] text-[11px] font-bold text-[#25452D] line-clamp-2">
                      {item.product.name}
                    </span>
                  </div>

                  {/* Info & controls */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#56734A] font-medium">
                          {item.product.category.replace('-', ' ')}
                        </span>
                        <Link 
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-['Cormorant_Garamond'] text-base font-bold text-[#25452D] hover:text-[#56734A] line-clamp-1 block"
                        >
                          {item.product.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#737B70] hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E8EBDD] rounded-md bg-[#F8F7F0]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-[#202820] hover:text-[#56734A]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-[#202820] min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-[#202820] hover:text-[#56734A]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line price */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#25452D]">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-[#737B70] block">
                            (₹{item.product.price} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-[#737B70] hover:text-red-600 underline"
                >
                  Clear bag
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with totals & checkout button */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E8EBDD] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#737B70]">
                <span>Subtotal</span>
                <span className="font-medium text-[#202820]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#737B70]">
                <span>Estimated Delivery</span>
                {shipping === 0 ? (
                  <span className="text-[#56734A] font-semibold">FREE</span>
                ) : (
                  <span className="font-medium text-[#202820]">₹{shipping}</span>
                )}
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#56734A] font-medium">
                  <span>Botanical Care Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#25452D] pt-2 border-t border-[#E8EBDD]">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 bg-[#25452D] hover:bg-[#56734A] text-white py-3 rounded-md text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={closeCart}
                className="w-full py-2 text-xs text-[#737B70] hover:text-[#25452D] font-medium text-center"
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#737B70] pt-1 border-t border-[#E8EBDD]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#56734A]" />
              <span>Safe & Secure Demo Checkout • 100% Specialist Formulated</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
