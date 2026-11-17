'use client';

import { notFound, useParams } from 'next/navigation';
import { products } from '../../../data/products';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { openWhatsApp, getProductEnquiryMessage } from '../../../lib/whatsapp';
import ProductCard from '../../../components/shop/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleWhatsAppEnquiry = () => {
    openWhatsApp(getProductEnquiryMessage(product.name));
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white border border-[#E8EBDD] rounded-2xl h-[450px] flex items-center justify-center relative shadow-sm">
            <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">
              {product.name} Image
            </span>
            <span className="absolute top-4 left-4 bg-[#E8EBDD] text-[#25452D] text-xs font-semibold px-3 py-1 rounded-md">
              {product.category.replace('-', ' ').toUpperCase()}
            </span>
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
                  Illustrative Demo Price
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

            <div className="pt-4">
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full flex items-center justify-center gap-2 bg-[#25452D] hover:bg-[#56734A] text-white py-3.5 rounded-md text-sm font-medium transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enquire About This Product on WhatsApp</span>
              </button>
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
