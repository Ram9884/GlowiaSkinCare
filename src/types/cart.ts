import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'Home' | 'Office' | 'Other';
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid (Demo)' | 'Pending COD';
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
}
