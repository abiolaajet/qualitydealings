'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Lock, ShoppingBag, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, authLoading, router]);

  const handleCheckout = async () => {
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          email: user?.email,
          userId: user?.id
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // Redirect to Stripe Checkout session URL
        window.location.href = data.url;
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to connect to checkout service.');
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[#0046be] p-10 text-white text-center">
             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
             </div>
             <h1 className="text-3xl font-black tracking-tighter mb-2">Secure Checkout</h1>
             <p className="opacity-80">You are one step away from completing your order.</p>
          </div>

          <div className="p-10">
             <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <h3 className="font-bold text-gray-500 uppercase text-[10px] tracking-widest mb-4">Order Summary</h3>
                <div className="space-y-3">
                   {cart.map(item => (
                      <div key={item._id} className="flex justify-between text-sm">
                         <span className="text-gray-600 font-medium">{item.name} x {item.quantity}</span>
                         <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                   ))}
                   <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-lg font-black">
                      <span>Total Amount</span>
                      <span className="text-[#0046be]">{formatCurrency(cartTotal)}</span>
                   </div>
                </div>
             </div>

             {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                   {error}
                </div>
             )}

             <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#0046be] text-white py-4 rounded-xl font-black text-xl hover:bg-[#003399] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
             >
                {loading ? (
                   <>
                      <Loader2 className="animate-spin" size={24} />
                      Processing...
                   </>
                ) : (
                   <>Pay with Stripe</>
                )}
             </button>

             <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
                <ShoppingBag size={12} /> Your order will be processed securely.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
