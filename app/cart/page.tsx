'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="container-custom py-32 text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
           <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-black mb-4 tracking-tighter text-[#1d1d1f]">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Explore our latest deals to get started.</p>
        <Link href="/shop" className="bg-[#0046be] text-white px-8 py-3 rounded-md font-bold hover:bg-[#003399] transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-black text-[#1d1d1f] mb-8 tracking-tighter">Your Shopping Cart ({cartCount})</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Cart Area */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="hidden md:flex pb-4 border-b font-black text-[10px] text-gray-400 uppercase tracking-widest uppercase">
                <span className="flex-grow">Product</span>
                <span className="w-32 text-center">Quantity</span>
                <span className="w-32 text-right">Total Price</span>
              </div>
              
              <div className="flex flex-col">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>

              <div className="pt-8 flex justify-between">
                <Link href="/shop" className="flex items-center gap-2 text-sm font-bold text-[#0046be] hover:underline">
                  <ArrowLeft size={16} /> Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="mt-8 bg-[#0046be] p-6 rounded-xl text-white flex justify-between items-center transition-transform hover:scale-[1.01] cursor-pointer">
               <div>
                  <h4 className="font-bold text-lg">QualityCare+ Protection</h4>
                  <p className="text-xs opacity-80">Add accidental damage coverage for your tech starting from £2.99/mo.</p>
               </div>
               <button className="bg-white text-[#0046be] px-4 py-2 rounded font-black text-xs">Learn More</button>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 sticky top-24">
              <h3 className="text-xl font-black text-[#1d1d1f] tracking-tight">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Subtotal ({cartCount} items)</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Estimated Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Estimated Tax (VAT)</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-black tracking-tight">Order Total</span>
                  <span className="text-2xl font-black text-[#1d1d1f] tracking-tighter">{formatCurrency(cartTotal)}</span>
                </div>

                <Link 
                  href="/checkout"
                  className="block w-full text-center bg-[#0046be] text-white py-4 rounded-lg font-black text-lg hover:bg-[#003399] transition-all shadow-lg"
                >
                  Checkout Now
                </Link>
                
                <p className="text-[10px] text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck size={12} /> Securely checkout with Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
