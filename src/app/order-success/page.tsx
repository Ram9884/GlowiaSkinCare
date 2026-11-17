'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { 
  CheckCircle2, 
  Package, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Printer, 
  ArrowRight, 
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Clock
} from 'lucide-react';
import { openWhatsApp } from '../../lib/whatsapp';

export default function OrderSuccessPage() {
  const { lastOrder } = useCart();

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSupport = () => {
    if (!lastOrder) return;
    const msg = `Hello Glowia Team, I have just placed order ${lastOrder.orderId} for ₹${lastOrder.total}. I would like to get an update on delivery to ${lastOrder.address.city}.`;
    openWhatsApp(msg);
  };

  if (!lastOrder) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] py-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-[#E8EBDD] text-[#56734A] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 opacity-60" />
          </div>
          <div className="space-y-2">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">
              No Active Order Found
            </h1>
            <p className="text-sm text-[#737B70]">
              You haven&apos;t placed an order yet in this session. Explore our catalogue to get started!
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#25452D] text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-[#56734A] transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(lastOrder.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-12 print:bg-white print:py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Celebration Header */}
        <div className="text-center space-y-3 print:space-y-1">
          <div className="w-16 h-16 bg-[#56734A] text-white rounded-full flex items-center justify-center mx-auto shadow-md print:hidden">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-[#56734A] uppercase">
            Order Confirmed • Demo Simulation
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#25452D]">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[#737B70] max-w-lg mx-auto">
            Your demonstration order has been successfully placed and received by our clinic system.
          </p>
        </div>

        {/* Primary Order Card */}
        <div className="bg-white border border-[#E8EBDD] rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs print:border-none print:shadow-none print:p-0">
          {/* Top Quick Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F8F7F0] rounded-xl border border-[#E8EBDD] text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#737B70] block">Order ID</span>
              <strong className="text-[#25452D] font-mono text-sm">{lastOrder.orderId}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#737B70] block">Order Date</span>
              <span className="text-[#202820] font-medium">{formattedDate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#737B70] block">Payment Status</span>
              <span className="inline-block bg-[#E8EBDD] text-[#56734A] font-bold px-2 py-0.5 rounded text-[11px] mt-0.5">
                {lastOrder.paymentStatus}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#737B70] block">Est. Delivery</span>
              <span className="text-[#25452D] font-semibold">{lastOrder.estimatedDelivery}</span>
            </div>
          </div>

          {/* Two columns: Address & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3 bg-[#F8F7F0]/60 p-5 rounded-xl border border-[#E8EBDD]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#25452D] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#56734A]" />
                <span>Delivery Address</span>
              </div>
              <div className="text-xs text-[#202820] space-y-1">
                <p className="font-bold text-sm text-[#25452D]">{lastOrder.address.fullName}</p>
                <p>{lastOrder.address.addressLine1}</p>
                {lastOrder.address.addressLine2 && <p>{lastOrder.address.addressLine2}</p>}
                {lastOrder.address.landmark && <p className="text-[#737B70]">Landmark: {lastOrder.address.landmark}</p>}
                <p>{lastOrder.address.city}, {lastOrder.address.state} – {lastOrder.address.pincode}</p>
                <p className="pt-1 text-[#737B70]">Phone: <strong className="text-[#202820]">{lastOrder.address.phone}</strong></p>
                {lastOrder.address.email && <p className="text-[#737B70]">Email: {lastOrder.address.email}</p>}
              </div>
            </div>

            <div className="space-y-3 bg-[#F8F7F0]/60 p-5 rounded-xl border border-[#E8EBDD]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#25452D] uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-[#56734A]" />
                <span>Payment & Dispatch Details</span>
              </div>
              <div className="text-xs text-[#202820] space-y-2">
                <div>
                  <span className="text-[#737B70] block">Payment Method:</span>
                  <span className="font-semibold uppercase text-[#25452D]">
                    {lastOrder.paymentMethod === 'upi' ? 'UPI Instant Demo Transfer' :
                     lastOrder.paymentMethod === 'card' ? 'Credit / Debit Card (Demo)' :
                     lastOrder.paymentMethod === 'netbanking' ? 'Net Banking (Demo)' :
                     'Cash on Delivery (Pay at Doorstep)'}
                  </span>
                </div>
                <div>
                  <span className="text-[#737B70] block">Dispatch Facility:</span>
                  <span className="font-medium text-[#202820]">
                    Glowia Clinic Dispatch, Durugam Road, Kallakurichi 606202
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#56734A] pt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Quality inspected & blessed with botanical purity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Order Breakdown */}
          <div className="space-y-4 pt-2">
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#25452D] border-b border-[#E8EBDD] pb-3">
              Items Ordered ({lastOrder.items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
            <div className="space-y-3">
              {lastOrder.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-4 py-2 border-b border-[#E8EBDD]/50 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#E8EBDD] rounded-md overflow-hidden shrink-0 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#202820] text-sm">{item.product.name}</p>
                      <p className="text-[#737B70]">Category: {item.product.category.replace('-', ' ')} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#25452D] text-sm">₹{item.product.price * item.quantity}</span>
                    <span className="text-[10px] text-[#737B70] block">(₹{item.product.price} each)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 text-xs max-w-xs ml-auto">
              <div className="flex justify-between text-[#737B70]">
                <span>Items Subtotal:</span>
                <span className="font-medium text-[#202820]">₹{lastOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#737B70]">
                <span>Shipping:</span>
                <span className="text-[#56734A] font-semibold">
                  {lastOrder.shipping === 0 ? 'FREE' : `₹${lastOrder.shipping}`}
                </span>
              </div>
              {lastOrder.discount > 0 && (
                <div className="flex justify-between text-[#56734A] font-medium">
                  <span>Special Demo Savings:</span>
                  <span>-₹{lastOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#25452D] pt-2 border-t border-[#E8EBDD]">
                <span>Total Amount:</span>
                <span>₹{lastOrder.total}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#E8EBDD] print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#25452D] bg-[#F8F7F0] border border-[#E8EBDD] px-4 py-2.5 rounded-md hover:bg-[#E8EBDD] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleWhatsAppSupport}
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#56734A] hover:bg-[#25452D] px-4 py-2.5 rounded-md transition-colors flex-1 sm:flex-initial"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Support</span>
              </button>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#25452D] hover:bg-[#56734A] px-5 py-2.5 rounded-md transition-colors flex-1 sm:flex-initial"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Doctor S. Sathya Greeting */}
        <div className="bg-[#E8EBDD]/60 border border-[#E8EBDD] rounded-2xl p-6 text-center space-y-2 print:hidden">
          <p className="font-['Cormorant_Garamond'] text-lg font-bold text-[#25452D]">
            &quot;True radiance blooms from nature&apos;s harmony and attentive self-care.&quot;
          </p>
          <p className="text-xs text-[#737B70]">
            Dr. S. Sathya, B.S.M.S • Glowia Botanicals, Kallakurichi
          </p>
        </div>
      </div>
    </div>
  );
}
