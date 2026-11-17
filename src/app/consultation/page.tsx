'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Clock, UserCheck, MessageCircle, CheckCircle2 } from 'lucide-react';
import { openWhatsApp, getConsultationEnquiryMessage } from '../../lib/whatsapp';

const zodResolver = (schema: z.ZodSchema<any>) => async (values: any) => {
  const result = await schema.safeParseAsync(values);
  if (result.success) {
    return { values: result.data, errors: {} };
  }
  const errors: Record<string, { type: string; message?: string }> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] || 'root');
    if (!errors[key]) {
      errors[key] = {
        type: issue.code,
        message: issue.message,
      };
    }
  }
  return { values: {}, errors };
};

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  consultationType: z.enum(['Skin Consultation', 'Hair Consultation', "Women's Health Consultation", 'General Wellness Consultation']),
  consultationMode: z.enum(['Online', 'In-person']),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.enum(['11:00 AM – 12:00 PM', '7:00 PM – 8:00 PM']),
  message: z.string().optional()
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function ConsultationPage() {
  const [submittedData, setSubmittedData] = useState<BookingFormValues | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      consultationType: 'Skin Consultation',
      consultationMode: 'Online',
      preferredTime: '11:00 AM – 12:00 PM'
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    setSubmittedData(data);
  };

  const handleWhatsAppSubmission = () => {
    if (submittedData) {
      const msg = getConsultationEnquiryMessage(
        submittedData.fullName,
        submittedData.consultationType,
        submittedData.consultationMode,
        submittedData.preferredDate,
        submittedData.preferredTime
      );
      openWhatsApp(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">Specialist Consultation</span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#25452D]">
            Book Your Consultation with Dr. S. Sathya
          </h1>
          <p className="text-sm text-[#737B70] max-w-xl mx-auto leading-relaxed">
            Receive expert guidance tailored to your skin, hair, and women's health needs. Available both online and in-person at Kallakurichi.
          </p>
        </div>

        <div className="bg-white border border-[#E8EBDD] rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">Consultation Timings</h3>
            <div className="flex items-start gap-3 text-sm text-[#737B70]">
              <Clock className="w-5 h-5 text-[#56734A] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#202820]">Daily Online Slots:</p>
                <p>11:00 AM – 12:00 PM</p>
                <p>7:00 PM – 8:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#737B70]">
              <UserCheck className="w-5 h-5 text-[#56734A] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#202820]">Specialist:</p>
                <p>Dr. S. Sathya, B.S.M.S</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">Consultation Modes</h3>
            <ul className="space-y-2 text-sm text-[#737B70]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#56734A]" />
                <span><strong>Online Consultation:</strong> Connect remotely from anywhere.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#56734A]" />
                <span><strong>In-Person Consultation:</strong> Visit our clinic at Durugam Road, Kallakurichi.</span>
              </li>
            </ul>
          </div>
        </div>

        {!submittedData ? (
          <div className="bg-white border border-[#E8EBDD] rounded-2xl p-8 sm:p-12 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#202820] uppercase">Full Name *</label>
                  <input 
                    type="text" 
                    {...register('fullName')} 
                    placeholder="Enter your full name" 
                    className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2.5 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                  />
                  {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#202820] uppercase">Phone Number (10-digit) *</label>
                  <input 
                    type="tel" 
                    {...register('phone')} 
                    placeholder="9876543210" 
                    className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2.5 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                  />
                  {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#202820] uppercase">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    {...register('email')} 
                    placeholder="your@email.com" 
                    className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2.5 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#202820] uppercase">Consultation Type *</label>
                  <select 
                    {...register('consultationType')} 
                    className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2.5 text-sm text-[#202820] focus:outline-none"
                  >
                    <option value="Skin Consultation">Skin Consultation</option>
                    <option value="Hair Consultation">Hair Consultation</option>
                    <option value="Women's Health Consultation">Women's Health Consultation</option>
                    <option value="General Wellness Consultation">General Wellness Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#202820] uppercase">Consultation Mode *</label>
                  <select 
                    {...register('consultationMode')} 
                    className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2.5 text-sm text-[#202820] focus:outline-none"
                  >
                    <option value="Online">Online</option>
                    <option value="In-person">In-person</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#202820] uppercase">Preferred Date *</label>
                  <input 
                    type="date" 
                    {...register('preferredDate')} 
                    className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2.5 text-sm text-[#202820] focus:outline-none"
                  />
                  {errors.preferredDate && <p className="text-xs text-red-600">{errors.preferredDate.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#202820] uppercase">Preferred Time Slot *</label>
                  <select 
                    {...register('preferredTime')} 
                    className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-4 py-2.5 text-sm text-[#202820] focus:outline-none"
                  >
                    <option value="11:00 AM – 12:00 PM">11:00 AM – 12:00 PM</option>
                    <option value="7:00 PM – 8:00 PM">7:00 PM – 8:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#202820] uppercase">Additional Notes or Symptoms (Optional)</label>
                <textarea 
                  {...register('message')} 
                  rows={4} 
                  placeholder="Share any specific concerns or questions..." 
                  className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md p-4 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#25452D] hover:bg-[#56734A] text-white py-3.5 rounded-md text-sm font-medium transition-colors shadow-md"
              >
                Submit Consultation Enquiry
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white border border-[#E8EBDD] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-[#E8EBDD] text-[#25452D] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#56734A]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">Enquiry Submitted Successfully</h3>
              <p className="text-sm text-[#737B70] max-w-md mx-auto">
                Thank you, <strong>{submittedData.fullName}</strong>. Your demo consultation preference for <strong>{submittedData.consultationType}</strong> ({submittedData.consultationMode}) on <strong>{submittedData.preferredDate}</strong> at <strong>{submittedData.preferredTime}</strong> has been received.
              </p>
              <p className="text-xs text-[#56734A]">Note: This is a frontend demo. No appointment is permanently booked without direct confirmation.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleWhatsAppSubmission}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25452D] hover:bg-[#56734A] text-white px-8 py-3 rounded-md text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Enquiry via WhatsApp</span>
              </button>
              <button 
                onClick={() => setSubmittedData(null)}
                className="w-full sm:w-auto bg-[#F8F7F0] border border-[#E8EBDD] text-[#202820] px-6 py-3 rounded-md text-sm font-medium hover:bg-[#E8EBDD]"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
