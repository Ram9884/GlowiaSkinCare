'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, PhoneCall, ShoppingBag } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import MobileMenu from './MobileMenu';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <AnnouncementBar />
      <nav className={`w-full transition-all duration-300 bg-[#F8F7F0]/95 backdrop-blur-md border-b border-[#E8EBDD] ${isScrolled ? 'shadow-sm py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-bold tracking-wider text-[#25452D]">
              GLOWIA
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#56734A] -mt-1 font-medium">
              Natural Wellness
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#202820]">
            <Link href="/" className="hover:text-[#56734A] transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-[#56734A] transition-colors">Shop</Link>
            <div className="relative group py-2">
              <span className="cursor-pointer hover:text-[#56734A] transition-colors flex items-center gap-1">
                Categories
              </span>
              <div className="absolute top-full left-0 w-56 bg-[#F8F7F0] border border-[#E8EBDD] shadow-lg rounded-md py-2 hidden group-hover:block transition-all">
                <Link href="/categories/skin-care" className="block px-4 py-2 text-sm hover:bg-[#E8EBDD]/50 text-[#202820]">Skin Care</Link>
                <Link href="/categories/hair-care" className="block px-4 py-2 text-sm hover:bg-[#E8EBDD]/50 text-[#202820]">Hair Care</Link>
                <Link href="/categories/womens-health" className="block px-4 py-2 text-sm hover:bg-[#E8EBDD]/50 text-[#202820]">Women's Health</Link>
                <Link href="/categories/holistic-wellness" className="block px-4 py-2 text-sm hover:bg-[#E8EBDD]/50 text-[#202820]">Holistic Wellness</Link>
              </div>
            </div>
            <Link href="/about" className="hover:text-[#56734A] transition-colors">About</Link>
            <Link href="/consultation" className="hover:text-[#56734A] transition-colors">Consultation</Link>
            <Link href="/contact" className="hover:text-[#56734A] transition-colors">Contact</Link>
            <Link href="/faq" className="hover:text-[#56734A] transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="p-2 text-[#202820] hover:text-[#56734A] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={openCart}
              className="p-2 text-[#202820] hover:text-[#56734A] transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#56734A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </button>

            <Link 
              href="/consultation"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25452D] text-[#FFFFFF] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#56734A] transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Consultation</span>
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 lg:hidden text-[#202820] hover:text-[#56734A]"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="bg-[#FFFFFF] border-t border-[#E8EBDD] py-3 px-4 shadow-inner">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search products, categories, ingredients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
              />
              <button type="submit" className="bg-[#25452D] text-[#FFFFFF] px-4 py-2 rounded-md text-sm font-medium">
                Search
              </button>
            </form>
          </div>
        )}
      </nav>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
