'use client';

import Link from 'next/link';
import { X, PhoneCall } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#202820]/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xs bg-[#F8F7F0] h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-[#E8EBDD]">
          <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">GLOWIA</span>
          <button onClick={onClose} className="p-2 text-[#202820] hover:text-[#56734A]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-4 py-6 text-base font-medium text-[#202820]">
          <Link href="/" onClick={onClose} className="hover:text-[#56734A]">Home</Link>
          <Link href="/shop" onClick={onClose} className="hover:text-[#56734A]">Shop All Products</Link>
          <div className="pl-4 flex flex-col space-y-2 border-l-2 border-[#56734A]/30 text-sm">
            <Link href="/categories/skin-care" onClick={onClose} className="hover:text-[#56734A]">Skin Care</Link>
            <Link href="/categories/hair-care" onClick={onClose} className="hover:text-[#56734A]">Hair Care</Link>
            <Link href="/categories/womens-health" onClick={onClose} className="hover:text-[#56734A]">Women's Health</Link>
            <Link href="/categories/holistic-wellness" onClick={onClose} className="hover:text-[#56734A]">Holistic Wellness</Link>
          </div>
          <Link href="/about" onClick={onClose} className="hover:text-[#56734A]">About Dr. S. Sathya</Link>
          <Link href="/consultation" onClick={onClose} className="hover:text-[#56734A]">Consultation</Link>
          <Link href="/contact" onClick={onClose} className="hover:text-[#56734A]">Contact</Link>
          <Link href="/faq" onClick={onClose} className="hover:text-[#56734A]">FAQ</Link>
        </div>

        <div className="mt-auto pt-6 border-t border-[#E8EBDD]">
          <Link 
            href="/consultation" 
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full bg-[#25452D] text-[#FFFFFF] py-3 rounded-md text-sm font-medium hover:bg-[#56734A]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
