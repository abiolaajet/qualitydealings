import React from 'react';
import Link from 'next/link';
import { Apple, Smartphone, Laptop, Tv, Camera, Speaker } from 'lucide-react';

export default function BrandsPage() {
  const brands = [
    { name: 'Apple', icon: <Apple size={40} />, count: 120 },
    { name: 'Samsung', icon: <Smartphone size={40} />, count: 85 },
    { name: 'Sony', icon: <Tv size={40} />, count: 64 },
    { name: 'Dell', icon: <Laptop size={40} />, count: 42 },
    { name: 'Logitech', icon: <Speaker size={40} />, count: 38 },
    { name: 'Canon', icon: <Camera size={40} />, count: 25 },
    { name: 'LG', icon: <Tv size={40} />, count: 56 },
    { name: 'Microsoft', icon: <Laptop size={40} />, count: 31 },
    { name: 'Bose', icon: <Speaker size={40} />, count: 19 },
    { name: 'Canon', icon: <Camera size={40} />, count: 22 },
    { name: 'Nikon', icon: <Camera size={40} />, count: 15 },
    { name: 'HP', icon: <Laptop size={40} />, count: 48 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-[#1d1d1f] tracking-tighter mb-4">Shop by Brand</h1>
          <p className="text-xl text-gray-500">Explore products from your favorite technology leaders.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <Link 
              key={index} 
              href={`/shop?search=${brand.name}`}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center group"
            >
              <div className="text-gray-400 group-hover:text-[#0046be] transition-colors mb-6">
                {brand.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">{brand.name}</h3>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{brand.count} Products</p>
            </Link>
          ))}
        </div>

        <div className="mt-20 p-12 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
           <div className="flex-grow">
              <h2 className="text-3xl font-black text-[#1d1d1f] mb-4">QualityDealings Certified Brands</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                 We partner with the world's leading technology brands to ensure you get authentic products with full UK manufacturer warranties. Every brand on our platform has been vetted for quality and reliability.
              </p>
              <Link href="/shop" className="bg-[#0046be] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#003399] transition-colors inline-block">
                 View All Products
              </Link>
           </div>
           <div className="w-full md:w-1/3 grid grid-cols-3 gap-4 opacity-20 grayscale">
              {/* Decorative mini icons */}
              <Apple size={32} />
              <Smartphone size={32} />
              <Laptop size={32} />
              <Tv size={32} />
              <Speaker size={32} />
              <Camera size={32} />
           </div>
        </div>
      </div>
    </div>
  );
}
