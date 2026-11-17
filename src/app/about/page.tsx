import Link from 'next/link';
import { Calendar, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F0] py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">About Glowia</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#25452D]">
            Glow Naturally. Shine Confidently.
          </h1>
          <p className="text-sm text-[#737B70] max-w-2xl mx-auto leading-relaxed">
            Founded on the principles of traditional Siddha wisdom and modern botanical care, Glowia is dedicated to helping you achieve lasting skin, hair, and holistic wellness.
          </p>
        </div>

        <div className="bg-white border border-[#E8EBDD] rounded-2xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-sm">
          <div className="h-64 bg-[#E8EBDD] rounded-xl flex items-center justify-center font-['Cormorant_Garamond'] font-bold text-xl text-[#25452D]">
            Dr. S. Sathya Portrait
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">Lead Medical Specialist</span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">Dr. S. Sathya, B.S.M.S</h2>
            </div>
            <p className="text-sm text-[#737B70] leading-relaxed">
              Dr. S. Sathya holds a Bachelor of Siddha Medicine and Surgery (B.S.M.S). Specializing in comprehensive skin care, haircare, and women's health, Dr. Sathya provides compassionate, personalized consultations designed to address the root causes of wellness concerns.
            </p>
            <div className="pt-2">
              <Link 
                href="/consultation"
                className="inline-flex items-center gap-2 bg-[#25452D] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#56734A] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D] text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Pure Botanicals', desc: 'Sourcing ingredients that respect your skin and natural biological balance.', icon: Sparkles },
              { title: 'Specialist Guidance', desc: 'Expert consultations rooted in authentic Siddha medical knowledge.', icon: UserCheck },
              { title: 'Holistic Well-being', desc: 'Nurturing inner health alongside external beauty routines for lasting confidence.', icon: ShieldCheck }
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-xl border border-[#E8EBDD] space-y-3">
                  <div className="w-10 h-10 bg-[#E8EBDD] rounded-lg flex items-center justify-center text-[#25452D]">
                    <Icon className="w-5 h-5 text-[#56734A]" />
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D]">{v.title}</h3>
                  <p className="text-xs text-[#737B70] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
