import { notFound } from 'next/navigation';
import { products } from '../../../data/products';
import ProductCard from '../../../components/shop/ProductCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: 'skin-care' },
    { slug: 'hair-care' },
    { slug: 'womens-health' },
    { slug: 'holistic-wellness' }
  ];
}

const categoryTitles: Record<string, { title: string; desc: string; image: string }> = {
  'skin-care': { 
    title: 'Skin Care Collection', 
    desc: 'Gentle cleansers, nourishing serums, and daily moisturizers crafted with pure botanical ingredients.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&auto=format&fit=crop&q=80'
  },
  'hair-care': { 
    title: 'Hair Care Rituals', 
    desc: 'Traditional herbal hair oils, sulfate-free cleansers, and deep repair masks for scalp vitality.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1200&auto=format&fit=crop&q=80'
  },
  'womens-health': { 
    title: "Women's Health Essentials", 
    desc: 'Thoughtful herbal blends and personal care items supporting daily hormonal balance and vitality.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80'
  },
  'holistic-wellness': { 
    title: 'Holistic Wellness Collection', 
    desc: 'Calming herbal teas, aromatherapy balms, and self-care kits for mindful relaxation.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&auto=format&fit=crop&q=80'
  }
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = categoryTitles[slug];

  if (!categoryInfo) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category === slug);

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center justify-center text-center p-8 sm:p-14 shadow-md">
          <img
            src={categoryInfo.image}
            alt={categoryInfo.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#202820]/65 backdrop-blur-[1px]" />
          <div className="relative z-10 text-white space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-[#E8EBDD] uppercase">Glowia Botanicals</span>
            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-white">{categoryInfo.title}</h1>
            <p className="text-sm text-[#E8EBDD]/90 leading-relaxed">{categoryInfo.desc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="bg-[#25452D] text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold">Need Personal Guidance?</h3>
          <p className="text-sm text-[#E8EBDD]/80 max-w-xl mx-auto">
            Book an online or in-person consultation with Dr. S. Sathya to discuss your specific skincare and wellness needs.
          </p>
          <Link 
            href="/consultation" 
            className="inline-block bg-white text-[#25452D] px-8 py-3 rounded-md text-sm font-medium hover:bg-[#E8EBDD] transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
