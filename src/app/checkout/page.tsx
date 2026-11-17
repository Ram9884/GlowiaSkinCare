'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { DeliveryAddress, PaymentMethod, OrderDetails } from '../../types/cart';
import { 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  AlertCircle,
  Tag
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, discount: initialDiscount, total, totalCount, clearCart, setLastOrder } = useCart();

  // Address State
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: 'Kallakurichi',
    state: 'Tamil Nadu',
    pincode: '606202',
    addressType: 'Home'
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Delivery option
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('demo@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardName, setCardName] = useState('Demo Customer');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');

  const couponDiscount = couponApplied ? 100 : 0;
  const activeDiscount = initialDiscount + couponDiscount;
  const finalTotal = Math.max(0, subtotal + shipping - activeDiscount);

  // Quick fill sample data for easy testing
  const handlePrefillDemoAddress = () => {
    setAddress({
      fullName: 'Aarav Sundaram',
      phone: '9840123456',
      email: 'aarav.demo@example.com',
      addressLine1: 'No. 24, Thiruvarangan Nagar',
      addressLine2: 'Durugam Road',
      landmark: 'Near Govt Boys School',
      city: 'Kallakurichi',
      state: 'Tamil Nadu',
      pincode: '606202',
      addressType: 'Home'
    });
    setErrors({});
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'GLOWIA100' || code === 'NATURAL100' || code === 'DEMO') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "GLOWIA100"');
    }
  };

  const validateAddress = (): boolean => {
    const errs: Record<string, string> = {};
    if (!address.fullName.trim()) errs.fullName = 'Full name is required';
    if (!address.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(address.phone.trim().replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!address.addressLine1.trim()) errs.addressLine1 = 'Street address is required';
    if (!address.city.trim()) errs.city = 'City is required';
    if (!address.state.trim()) errs.state = 'State is required';
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode.trim())) {
      errs.pincode = 'Valid 6-digit PIN code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProcessDemoPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setProcessingStage('Connecting to secure demo payment gateway...');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessingStage('Authorizing demo transaction with bank...');

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setProcessingStage('Payment verified! Confirming your order...');

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate random 5-digit Order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `GLW-${randomNum}`;

    // Estimated delivery 3 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const newOrder: OrderDetails = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [...items],
      address,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending COD' : 'Paid (Demo)',
      subtotal,
      shipping,
      discount: activeDiscount,
      total: finalTotal,
      estimatedDelivery
    };

    setLastOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    router.push('/order-success');
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] py-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 bg-[#E8EBDD] text-[#56734A] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10 opacity-70" />
          </div>
          <div className="space-y-2">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#25452D]">
              Your Bag is Empty
            </h1>
            <p className="text-sm text-[#737B70]">
              Add any of our botanical skin care, haircare, or wellness items before proceeding to checkout.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#25452D] text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-[#56734A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#56734A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#737B70]">
            <Lock className="w-3.5 h-3.5 text-[#56734A]" />
            <span>256-bit Encrypted Demo Checkout</span>
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-[#E8EBDD] border border-[#56734A]/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#56734A] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#25452D]">
                Interactive Demo Store & Payment Simulator
              </p>
              <p className="text-[11px] text-[#737B70]">
                Feel free to fill any dummy address and test the payment gateway. No real money is transferred.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePrefillDemoAddress}
            className="text-xs font-semibold text-[#25452D] bg-white border border-[#56734A]/40 px-3 py-1.5 rounded-md hover:bg-[#F8F7F0] shrink-0"
          >
            ⚡ Auto-Fill Sample Address
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Checkout Form Column */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleProcessDemoPayment} className="space-y-8">
              {/* Step 1: Delivery Address */}
              <div className="bg-white border border-[#E8EBDD] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8EBDD] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#25452D] text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">
                      Shipping & Delivery Details
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sundaram"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    />
                    {errors.phone && <p className="text-[11px] text-red-600">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      Email Address (for Order Updates & Receipt)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      Flat, House No., Building, Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. No. 24, Thiruvarangan Nagar, Durugam Road"
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    />
                    {errors.addressLine1 && <p className="text-[11px] text-red-600">{errors.addressLine1}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Govt School"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      City / District *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kallakurichi"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    />
                    {errors.city && <p className="text-[11px] text-red-600">{errors.city}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      State *
                    </label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Other States">Other States</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#202820] uppercase">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="606202"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md px-3.5 py-2 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                    />
                    {errors.pincode && <p className="text-[11px] text-red-600">{errors.pincode}</p>}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-[#202820] uppercase">Address Type</span>
                  <div className="flex gap-3">
                    {(['Home', 'Office', 'Other'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAddress({ ...address, addressType: type })}
                        className={`px-4 py-1.5 text-xs font-medium rounded-md border transition-all ${
                          address.addressType === type
                            ? 'bg-[#25452D] text-white border-[#25452D]'
                            : 'bg-[#F8F7F0] text-[#737B70] border-[#E8EBDD] hover:bg-[#E8EBDD]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Speed */}
              <div className="bg-white border border-[#E8EBDD] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center gap-3 border-b border-[#E8EBDD] pb-4">
                  <span className="w-7 h-7 rounded-full bg-[#25452D] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">
                    Shipping Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`cursor-pointer p-4 rounded-xl border flex items-start gap-3 transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#25452D] bg-[#E8EBDD]/30 ring-1 ring-[#25452D]'
                        : 'border-[#E8EBDD] bg-white hover:bg-[#F8F7F0]'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#56734A] shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#25452D]">Standard Tracked Delivery</span>
                        <span className="text-[10px] bg-[#56734A] text-white px-1.5 py-0.2 rounded font-semibold">FREE</span>
                      </div>
                      <p className="text-[11px] text-[#737B70] mt-1">
                        Dispatched in eco-friendly packaging • Arrives in 2-4 business days
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`cursor-pointer p-4 rounded-xl border flex items-start gap-3 transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#25452D] bg-[#E8EBDD]/30 ring-1 ring-[#25452D]'
                        : 'border-[#E8EBDD] bg-white hover:bg-[#F8F7F0]'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-[#56734A] shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#25452D]">Clinic Express Dispatch</span>
                        <span className="text-[10px] bg-[#E8EBDD] text-[#25452D] px-1.5 py-0.2 rounded font-semibold">FREE DEMO</span>
                      </div>
                      <p className="text-[11px] text-[#737B70] mt-1">
                        Direct priority parcel from Kallakurichi • 1-2 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Options (Demo Mode) */}
              <div className="bg-white border border-[#E8EBDD] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8EBDD] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#25452D] text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">
                      Select Payment Method (Demo)
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-[#56734A] bg-[#E8EBDD] px-2.5 py-1 rounded-md">
                    Demo Mode Active
                  </span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = paymentMethod === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setPaymentMethod(tab.id as PaymentMethod)}
                        className={`flex flex-col items-center justify-center p-3.5 rounded-xl border gap-2 transition-all ${
                          isSelected
                            ? 'bg-[#25452D] text-white border-[#25452D] shadow-xs'
                            : 'bg-[#F8F7F0] text-[#737B70] border-[#E8EBDD] hover:bg-[#E8EBDD] hover:text-[#202820]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab content: UPI */}
                {paymentMethod === 'upi' && (
                  <div className="p-5 bg-[#F8F7F0] rounded-xl border border-[#E8EBDD] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#25452D]">Enter Demo UPI ID</span>
                      <span className="text-[10px] text-[#737B70]">Instant Verification</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full bg-white border border-[#E8EBDD] rounded-md px-3.5 py-2.5 text-sm text-[#202820] focus:outline-none focus:border-[#25452D]"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['@okhdfcbank', '@okaxis', '@paytm', '@ybl'].map((handle) => (
                        <button
                          key={handle}
                          type="button"
                          onClick={() => setUpiId(`demo${handle}`)}
                          className="text-[11px] bg-white border border-[#E8EBDD] px-2.5 py-1 rounded text-[#737B70] hover:text-[#25452D] hover:border-[#25452D]"
                        >
                          demo{handle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab content: Card */}
                {paymentMethod === 'card' && (
                  <div className="p-5 bg-[#F8F7F0] rounded-xl border border-[#E8EBDD] space-y-4">
                    <span className="text-xs font-bold text-[#25452D] block">Demo Card Details</span>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-[#737B70]">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-white border border-[#E8EBDD] rounded-md px-3 py-2 text-sm text-[#202820] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-[#737B70]">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-[#E8EBDD] rounded-md px-3 py-2 text-sm text-[#202820] focus:outline-none font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-[#737B70]">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-white border border-[#E8EBDD] rounded-md px-3 py-2 text-sm text-[#202820] focus:outline-none text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-[#737B70]">CVV</label>
                          <input
                            type="password"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-white border border-[#E8EBDD] rounded-md px-3 py-2 text-sm text-[#202820] focus:outline-none text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab content: Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div className="p-5 bg-[#F8F7F0] rounded-xl border border-[#E8EBDD] space-y-3">
                    <span className="text-xs font-bold text-[#25452D] block">Select Demo Bank</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Bank'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 text-xs rounded-lg border text-left font-medium transition-all ${
                            selectedBank === bank
                              ? 'bg-[#25452D] text-white border-[#25452D]'
                              : 'bg-white text-[#202820] border-[#E8EBDD] hover:bg-[#E8EBDD]'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab content: COD */}
                {paymentMethod === 'cod' && (
                  <div className="p-5 bg-[#F8F7F0] rounded-xl border border-[#E8EBDD] space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#56734A]" />
                      <span className="text-xs font-bold text-[#25452D]">Cash on Delivery Available</span>
                    </div>
                    <p className="text-xs text-[#737B70] leading-relaxed">
                      You can pay via Cash or UPI QR Code directly to the delivery partner upon arrival at your doorstep in {address.city || 'your city'}.
                    </p>
                  </div>
                )}

                {/* Pay Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-[#25452D] hover:bg-[#56734A] text-white py-4 rounded-xl text-base font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{processingStage}</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {paymentMethod === 'cod'
                            ? `Place Order • ₹${finalTotal} (Pay on Delivery)`
                            : `Pay ₹${finalTotal} (Demo Mode)`}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#737B70] text-center mt-2.5">
                    By confirming this order, you agree to Glowia Wellness demo terms & shipping policy.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8EBDD] rounded-2xl p-6 sm:p-7 space-y-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between border-b border-[#E8EBDD] pb-4">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#25452D]">
                  Order Summary
                </h3>
                <span className="text-xs font-semibold text-[#56734A] bg-[#E8EBDD] px-2.5 py-0.5 rounded-full">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 bg-[#E8EBDD] rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#202820] truncate">{item.product.name}</p>
                        <p className="text-[#737B70]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#25452D] shrink-0">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div className="border-t border-[#E8EBDD] pt-4">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#737B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon: GLOWIA100"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-[#F8F7F0] border border-[#E8EBDD] rounded-md pl-9 pr-3 py-2 text-xs text-[#202820] focus:outline-none uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#25452D] text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-[#56734A] transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-[11px] text-[#56734A] font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Coupon GLOWIA100 applied! You saved ₹100
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </p>
                )}
              </div>

              {/* Financial Calculation */}
              <div className="border-t border-[#E8EBDD] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#737B70]">
                  <span>Items Subtotal</span>
                  <span className="font-medium text-[#202820]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#737B70]">
                  <span>Standard Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-[#56734A] font-semibold">FREE</span>
                  ) : (
                    <span className="font-medium text-[#202820]">₹{shipping}</span>
                  )}
                </div>
                {activeDiscount > 0 && (
                  <div className="flex justify-between text-[#56734A] font-medium">
                    <span>Total Discount & Savings</span>
                    <span>-₹{activeDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#25452D] pt-2 border-t border-[#E8EBDD]">
                  <span>Total Payable</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-[#F8F7F0] rounded-xl p-4 space-y-2.5 border border-[#E8EBDD] text-[11px] text-[#737B70]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#56734A] shrink-0" />
                  <span>100% Ayurvedic & Herbal Specialist Formulations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#56734A] shrink-0" />
                  <span>Fast Tracked Dispatch from Kallakurichi, TN</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#56734A] shrink-0" />
                  <span>Formulated & Supervised by Dr. S. Sathya, B.S.M.S</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
