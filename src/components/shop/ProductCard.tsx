'use client';

import Link from 'next/link';
import { Product } from '../../types/product';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp, getProductEnquiryMessage } from '../../lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp(getProductEnquiryMessage(product.name));
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

      <div className="p-5 pt-0">
        <button
          onClick={handleWhatsAppEnquiry}
          className="w-full flex items-center justify-center gap-2 bg-[#25452D] hover:bg-[#56734A] text-white py-2.5 rounded-md text-xs font-medium transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
