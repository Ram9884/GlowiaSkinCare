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

const categoryTitles: Record<string, { title: string; desc: string }> = {
  'skin-care': { title: 'Skin Care Collection', desc: 'Gentle cleansers, nourishing serums, and daily moisturizers crafted with pure botanical ingredients.' },
  'hair-care': { title: 'Hair Care Rituals', desc: 'Traditional herbal hair oils, sulfate-free cleansers, and deep repair masks for scalp vitality.' },
  'womens-health': { title: "Women's Health Essentials", desc: 'Thoughtful herbal blends and personal care items supporting daily hormonal balance and vitality.' },
  'holistic-wellness': { title: 'Holistic Wellness Collection', desc: 'Calming herbal teas, aromatherapy balms, and self-care kits for mindful relaxation.' }
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
        <div className="bg-[#E8EBDD]/60 border border-[#E8EBDD] rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">Glowia Botanicals</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#25452D]">{categoryInfo.title}</h1>
          <p className="text-sm text-[#737B70] max-w-2xl mx-auto leading-relaxed">{categoryInfo.desc}</p>
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
