'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { Percent, Tag, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch('/api/products?deals=true');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching deals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Deals Hero */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16 mb-12 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-4 mb-4">
             <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                <Zap size={24} className="text-yellow-300 fill-current" />
             </div>
             <span className="uppercase font-black tracking-widest text-sm">Flash Sale</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Big Savings.<br />Bigger Tech.</h1>
          <p className="text-xl opacity-90 max-w-xl mb-8 leading-relaxed">
            Get up to 50% off on your favorite brands including Apple, Samsung, and Sony. Limited time only.
          </p>
          <div className="flex gap-4">
             <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-lg hover:shadow-xl transition-all">
                Shop All Deals
             </button>
             <div className="bg-black/20 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                Ends in: <span className="font-bold font-mono">14:22:05</span>
             </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10">
           <Percent size={400} strokeWidth={4} />
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <div className="container-custom">
        <div className="flex justify-between items-end mb-10">
           <div>
              <h2 className="text-3xl font-black text-[#1d1d1f] tracking-tight">Today's Hot Deals</h2>
              <p className="text-gray-500">Hand-picked savings just for you.</p>
           </div>
           <Link href="/shop" className="text-[#0046be] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Products <ArrowRight size={18} />
           </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 skeleton rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
                <Tag size={64} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Check back soon!</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                   We're currently updating our special offers. Join our newsletter to be the first to know about new deals.
                </p>
                <Link href="/shop" className="mt-8 bg-[#0046be] text-white px-8 py-3 rounded-lg font-bold inline-block">
                   Continue Shopping
                </Link>
              </div>
            )}
          </>
        )}

        {/* Promotional Banner */}
        <div className="mt-20 bg-[#1d1d1f] rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center gap-12">
           <div className="bg-red-600 w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <span className="text-3xl font-black">50%</span>
           </div>
           <div className="flex-grow">
              <h3 className="text-3xl font-bold mb-2">Clearance Event</h3>
              <p className="text-gray-400">Massive markdowns on previous generation products. While stocks last.</p>
           </div>
           <Link href="/shop?category=clearance" className="bg-white text-black px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-colors whitespace-nowrap">
              SHOP CLEARANCE
           </Link>
        </div>
      </div>
    </div>
  );
}
