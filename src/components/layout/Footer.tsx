import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import InstagramIcon from '../icons/InstagramIcon';

export default function Footer() {
  return (
    <footer className="bg-[#202820] text-[#F8F7F0] pt-16 pb-12 border-t border-[#25452D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold tracking-wider text-[#FFFFFF]">GLOWIA</h3>
          <p className="text-sm text-[#737B70] leading-relaxed">
            &quot;Glow Naturally. Shine Confidently.&quot; Specialist-led skin care, haircare, women's health and holistic wellness solutions by Dr. S. Sathya, B.S.M.S.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a 
              href="https://www.instagram.com/glowia_skins/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-[#25452D] rounded-full hover:bg-[#56734A] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5 text-[#FFFFFF]" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-lg text-[#FFFFFF]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#737B70]">
            <li><Link href="/" className="hover:text-[#FFFFFF] transition-colors">Home</Link></li>
            <li><Link href="/shop" className="hover:text-[#FFFFFF] transition-colors">Shop Collection</Link></li>
            <li><Link href="/about" className="hover:text-[#FFFFFF] transition-colors">About Dr. S. Sathya</Link></li>
            <li><Link href="/consultation" className="hover:text-[#FFFFFF] transition-colors">Book Consultation</Link></li>
            <li><Link href="/contact" className="hover:text-[#FFFFFF] transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-[#FFFFFF] transition-colors">Frequently Asked Questions</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-lg text-[#FFFFFF]">Categories</h4>
          <ul className="space-y-2 text-sm text-[#737B70]">
            <li><Link href="/categories/skin-care" className="hover:text-[#FFFFFF] transition-colors">Skin Care Essentials</Link></li>
            <li><Link href="/categories/hair-care" className="hover:text-[#FFFFFF] transition-colors">Hair Care Rituals</Link></li>
            <li><Link href="/categories/womens-health" className="hover:text-[#FFFFFF] transition-colors">Women's Health</Link></li>
            <li><Link href="/categories/holistic-wellness" className="hover:text-[#FFFFFF] transition-colors">Holistic Wellness</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-lg text-[#FFFFFF]">Clinic & Timings</h4>
          <div className="space-y-3 text-sm text-[#737B70]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#56734A] shrink-0 mt-1" />
              <span>Thiruvarangan Nagar, Durugam Road, Kallakurichi, Tamil Nadu 606202, India</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#56734A] shrink-0 mt-1" />
              <div>
                <p className="font-medium text-[#FFFFFF]">Online Consultation Hours:</p>
                <p>11:00 AM – 12:00 PM</p>
                <p>7:00 PM – 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#25452D] text-center text-xs text-[#737B70]">
        <p>&copy; {new Date().getFullYear()} Glowia (@glowia_skins). All rights reserved. Demonstration website concept.</p>
      </div>
    </footer>
  );
}
