import Link from 'next/link';
import { products } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import { Sparkles, ShieldCheck, HeartPulse, UserCheck, Calendar, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F8F7F0] text-[#202820]">
      <section className="relative bg-[#E8EBDD]/40 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#56734A] bg-[#E8EBDD] px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Specialist-Led Wellness
            </span>
            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#25452D] leading-tight">
              Glow Naturally. <br />Shine Confidently.
            </h1>
            <p className="text-base sm:text-lg text-[#737B70] max-w-xl leading-relaxed">
              Discover thoughtful skincare, haircare and holistic wellness essentials designed to complement your self-care journey, led by Dr. S. Sathya, B.S.M.S.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-[#25452D] text-white px-8 py-3.5 rounded-md font-medium hover:bg-[#56734A] transition-colors"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#25452D] text-[#25452D] px-8 py-3.5 rounded-md font-medium hover:bg-[#25452D] hover:text-white transition-colors"
              >
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-full max-w-md h-[420px] bg-[#E8EBDD] rounded-2xl shadow-xl flex items-center justify-center border border-[#56734A]/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#25452D]/20 to-transparent flex items-center justify-center p-8 text-center">
                <div className="space-y-3">
                  <span className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">GLOWIA BOTANICALS</span>
                  <p className="text-xs tracking-wider text-[#56734A] uppercase">Pure Ingredients & Specialist Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#25452D]">
          Rooted in Nature, Guided by Expertise
        </h2>
        <p className="text-[#737B70] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          At Glowia, we believe true radiance stems from balanced internal health and nurturing daily routines. Operating from Kallakurichi, Tamil Nadu, we provide specialist consultations and meticulously crafted botanical regimens for your skin, hair, and overall vitality.
        </p>
      </section>

      <section className="py-16 bg-[#FFFFFF] border-y border-[#E8EBDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">Shop by Category</h2>
            <p className="text-sm text-[#737B70]">Explore our specialist-curated wellness collections</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Skin Care', slug: 'skin-care', desc: 'Nourishing cleansers, serums & daily moisturizers' },
              { name: 'Hair Care', slug: 'hair-care', desc: 'Traditional hair oils, herbal washes & repair masks' },
              { name: "Women's Health", slug: 'womens-health', desc: 'Hormonal balance blends & personal care essentials' },
              { name: 'Holistic Wellness', slug: 'holistic-wellness', desc: 'Calming herbal teas & aromatherapy self-care kits' }
            ].map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="group bg-[#F8F7F0] border border-[#E8EBDD] rounded-xl p-6 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="h-40 bg-[#E8EBDD] rounded-lg flex items-center justify-center text-[#25452D] font-['Cormorant_Garamond'] font-bold text-xl group-hover:scale-[1.02] transition-transform">
                  {cat.name}
                </div>
                <div className="space-y-2">
                  <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D] group-hover:text-[#56734A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#737B70] leading-relaxed">{cat.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#56734A]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">Featured Essentials</h2>
            <p className="text-sm text-[#737B70]">Handpicked botanical formulations for your daily ritual</p>
          </div>
          <Link href="/shop" className="text-sm font-medium text-[#56734A] hover:underline flex items-center gap-1">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#E8EBDD]/40 border-y border-[#E8EBDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">Why Choose Glowia</h2>
            <p className="text-sm text-[#737B70]">Commitment to authenticity, specialist guidance, and natural care</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Specialist-Led Care', desc: 'Consultations and formulations guided by Dr. S. Sathya, B.S.M.S.', icon: UserCheck },
              { title: 'Thoughtful Wellness', desc: 'Carefully curated botanical ingredients with proven traditional wisdom.', icon: ShieldCheck },
              { title: 'Personalized Approach', desc: 'Tailored guidance suited to your specific skin, hair, and health goals.', icon: HeartPulse },
              { title: 'Holistic Harmony', desc: 'Addressing overall well-being alongside external beauty routines.', icon: Sparkles }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E8EBDD] space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-[#E8EBDD] rounded-lg flex items-center justify-center text-[#25452D]">
                    <Icon className="w-6 h-6 text-[#56734A]" />
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D]">{item.title}</h3>
                  <p className="text-xs text-[#737B70] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E8EBDD] rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center shadow-sm">
          <div className="h-72 bg-[#E8EBDD] rounded-xl flex items-center justify-center text-[#25452D] font-['Cormorant_Garamond'] font-bold text-xl">
            Dr. S. Sathya Portrait
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">Founder & Medical Specialist</span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">Dr. S. Sathya, B.S.M.S</h2>
            </div>
            <p className="text-sm text-[#737B70] leading-relaxed">
              Specializing in comprehensive skin care, haircare, and women's health, Dr. S. Sathya brings traditional Siddha medical expertise and holistic wellness principles to every patient interaction.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-[#25452D]">
              <span className="bg-[#E8EBDD] px-3 py-1.5 rounded-md">Skin Care Specialist</span>
              <span className="bg-[#E8EBDD] px-3 py-1.5 rounded-md">Hair Care Specialist</span>
              <span className="bg-[#E8EBDD] px-3 py-1.5 rounded-md">Women's Health Expert</span>
            </div>
            <div>
              <Link 
                href="/consultation"
                className="inline-flex items-center gap-2 bg-[#25452D] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#56734A] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation with Dr. S. Sathya</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
