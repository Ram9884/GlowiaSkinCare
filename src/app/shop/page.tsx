'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '../../data/products';
import ProductCard from '../../components/shop/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CategoryId } from '../../types/product';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low' | 'alpha'>('featured');

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'low-high') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'high-low') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'alpha') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'featured') list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h1 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#25452D]">Product Catalogue</h1>
          <p className="text-sm text-[#737B70] max-w-xl mx-auto">
            Explore 26 sample botanical skincare, haircare, and wellness essentials curated for your demonstration.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E8EBDD] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737B70]" />
              <input 
                type="text"
                placeholder="Search products or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md pl-10 pr-4 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'skin-care', label: 'Skin Care' },
                { id: 'hair-care', label: 'Hair Care' },
                { id: 'womens-health', label: "Women's Health" },
                { id: 'holistic-wellness', label: 'Holistic Wellness' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
                    selectedCategory === cat.id 
                      ? 'bg-[#25452D] text-white' 
                      : 'bg-[#F8F7F0] text-[#202820] hover:bg-[#E8EBDD]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="ml-auto w-full md:w-auto flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#737B70]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3 py-2 text-xs text-[#202820] focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E8EBDD] space-y-4">
            <p className="text-lg font-['Cormorant_Garamond'] text-[#25452D]">No products found matching your search.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="bg-[#25452D] text-white px-6 py-2 rounded-md text-xs font-medium hover:bg-[#56734A]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F0] py-12 text-center text-sm text-[#737B70]">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
