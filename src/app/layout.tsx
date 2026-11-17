import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppFloatingButton from '../components/layout/WhatsAppFloatingButton';

export const metadata: Metadata = {
  title: 'Glowia | Natural Skincare, Haircare & Holistic Wellness',
  description: "Glow Naturally. Shine Confidently. Specialist-led skin care, haircare, and women's health by Dr. S. Sathya, B.S.M.S in Kallakurichi.",
  openGraph: {
    title: 'Glowia | Natural Skincare & Wellness',
    description: 'Glow Naturally. Shine Confidently.',
    url: 'https://glowia.example.com',
    siteName: 'Glowia',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F8F7F0] text-[#202820] font-['Inter'] antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
