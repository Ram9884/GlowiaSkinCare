'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { CartItem, OrderDetails } from '../types/cart';

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'glowia_cart_items';
const LAST_ORDER_KEY = 'glowia_last_order';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrderState] = useState<OrderDetails | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedOrder = localStorage.getItem(LAST_ORDER_KEY);
      if (storedOrder) {
        setLastOrderState(JSON.parse(storedOrder));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, isInitialized]);

  const setLastOrder = (order: OrderDetails | null) => {
    setLastOrderState(order);
    try {
      if (order) {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      } else {
        localStorage.removeItem(LAST_ORDER_KEY);
      }
    } catch (e) {
      console.error('Failed to save last order', e);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (quantity <= 0) return;
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  // Free delivery for orders above ₹499 or flat ₹49; demo promo discount ₹50 on orders above ₹600
  const shipping = subtotal === 0 || subtotal >= 499 ? 0 : 49;
  const discount = subtotal >= 600 ? 50 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        shipping,
        discount,
        total,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
