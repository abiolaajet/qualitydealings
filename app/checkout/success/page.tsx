'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function SuccessPage() {
  const { cart, clearCart } = useCart();
  const hasLogged = React.useRef(false);

  useEffect(() => {
    const saveOrder = async () => {
      if (cart.length > 0 && !hasLogged.current) {
        hasLogged.current = true;
        try {
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderItems: cart.map((item: any) => ({
                name: item.name,
                quantity: item.quantity,
                image: item.images ? item.images[0] : '',
                price: item.price,
                product: item._id
              }))
            })
          });
          clearCart();
        } catch (err) {
          console.error(err);
        }
      }
    };
    saveOrder();
  }, [cart, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 size={64} className="text-green-600 animate-bounce" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-[#1d1d1f] tracking-tighter mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8 font-medium">
          Thank you for shopping with QualityDealings. Your order has been placed successfully and is being processed.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl border mb-8 text-left space-y-4">
           <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Order Status</span>
              <span className="text-green-600 font-black uppercase text-[10px]">Processing</span>
           </div>
           <p className="text-xs text-gray-600 leading-relaxed">
              We've sent a confirmation email to your registered address. You'll receive another update once your items are dispatched.
           </p>
        </div>

        <div className="space-y-3">
          <Link 
            href="/orders" 
            className="w-full flex justify-center items-center gap-2 bg-[#0046be] text-white py-4 rounded-lg font-black text-lg hover:bg-[#003399] transition-all"
          >
            <ShoppingBag size={20} /> View My Orders
          </Link>
          <Link 
            href="/" 
            className="w-full flex justify-center items-center gap-2 text-[#0046be] py-2 rounded-lg font-bold text-sm hover:underline"
          >
            Return to Homepage <ArrowRight size={16} />
          </Link>
        </div>

        <div className="pt-10 border-t mt-10 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
           <ShieldCheck size={14} /> QualityDealings Verified Purchase
        </div>
      </div>
    </div>
  );
}
