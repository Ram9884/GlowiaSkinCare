'use client';

import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../../lib/whatsapp';

export default function WhatsAppFloatingButton() {
  const handleClick = () => {
    openWhatsApp('Hello Glowia, I am visiting your website and would like to enquire about your wellness products and specialist consultations.');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25452D] hover:bg-[#56734A] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
