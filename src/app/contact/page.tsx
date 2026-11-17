import { MapPin, Clock } from 'lucide-react';
import InstagramIcon from '../../components/icons/InstagramIcon';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F0] py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">Get in Touch</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#25452D]">Contact Glowia</h1>
          <p className="text-sm text-[#737B70] max-w-xl mx-auto leading-relaxed">
            We would love to hear from you. Visit our clinic or reach out via WhatsApp and Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[#E8EBDD] space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-[#E8EBDD] rounded-lg flex items-center justify-center text-[#25452D]">
              <MapPin className="w-6 h-6 text-[#56734A]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D]">Clinic Address</h3>
            <p className="text-xs text-[#737B70] leading-relaxed">
              Thiruvarangan Nagar, Durugam Road, Kallakurichi, Tamil Nadu 606202, India
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E8EBDD] space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-[#E8EBDD] rounded-lg flex items-center justify-center text-[#25452D]">
              <Clock className="w-6 h-6 text-[#56734A]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D]">Consultation Hours</h3>
            <div className="text-xs text-[#737B70] space-y-1">
              <p className="font-medium text-[#202820]">Online Daily Windows:</p>
              <p>11:00 AM – 12:00 PM</p>
              <p>7:00 PM – 8:00 PM</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E8EBDD] space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-[#E8EBDD] rounded-lg flex items-center justify-center text-[#25452D]">
              <InstagramIcon className="w-6 h-6 text-[#56734A]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D]">Social & Community</h3>
            <p className="text-xs text-[#737B70] leading-relaxed">
              Instagram: <a href="https://www.instagram.com/glowia_skins/" target="_blank" rel="noopener noreferrer" className="text-[#56734A] underline">@glowia_skins</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
