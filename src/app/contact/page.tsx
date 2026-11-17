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

        <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E8EBDD] relative h-64 sm:h-80">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80"
            alt="Glowia Wellness Clinic Consultation Sanctuary, Kallakurichi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202820]/75 via-[#202820]/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <span className="text-xs uppercase tracking-widest text-[#E8EBDD] font-semibold">Specialist Clinic</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold">Kallakurichi Holistic Centre</h3>
            <p className="text-xs text-[#E8EBDD]/90 mt-1 max-w-lg">
              Visit our peaceful consultation space on Durugam Road for individualized Siddha diagnostics and botanical therapy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
