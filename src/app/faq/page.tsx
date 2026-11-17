'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'General' | 'Products' | 'Consultation';
}

const faqs: FaqItem[] = [
  {
    category: 'General',
    q: 'What is Glowia?',
    a: "Glowia is a specialist-led skin care, haircare, women's health, and holistic wellness brand led by Dr. S. Sathya, B.S.M.S, located in Kallakurichi, Tamil Nadu."
  },
  {
    category: 'General',
    q: 'Where is Glowia located?',
    a: 'Our clinic is located at Thiruvarangan Nagar, Durugam Road, Kallakurichi, Tamil Nadu 606202, India.'
  },
  {
    category: 'Products',
    q: 'How can I explore and purchase products?',
    a: 'You can browse our complete catalogue on the Shop page, click "Add to Bag" on any product, and proceed through our interactive demo checkout with address filing and simulated payment (UPI, Card, Net Banking, or COD).'
  },
  {
    category: 'Products',
    q: 'Are payments real or simulated?',
    a: 'This website features an interactive demo store and payment simulator. You can test the full checkout flow and place sample orders without any real monetary charges.'
  },
  {
    category: 'Consultation',
    q: 'How can I request a consultation?',
    a: 'You can easily request an online or in-person consultation by visiting our Consultation page and submitting your preferred date, time slot, and details.'
  },
  {
    category: 'Consultation',
    q: 'What are the consultation timings?',
    a: 'Online consultations are available daily from 11:00 AM – 12:00 PM and 7:00 PM – 8:00 PM.'
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">Support</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#25452D]">Frequently Asked Questions</h1>
          <p className="text-sm text-[#737B70] max-w-xl mx-auto">
            Find honest answers regarding our products, specialist consultations, and clinic location.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white border border-[#E8EBDD] rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D]">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#56734A]" /> : <ChevronDown className="w-5 h-5 text-[#56734A]" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#737B70] leading-relaxed border-t border-[#E8EBDD] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
