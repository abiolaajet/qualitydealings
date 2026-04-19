'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products/featured');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="container-custom py-16">
      <div className="flex justify-between items-end mb-8">
        <div className="w-48 h-8 skeleton"></div>
        <div className="w-24 h-4 skeleton"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 skeleton"></div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="container-custom py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-[#1d1d1f] tracking-tight">Featured Deals</h2>
          <p className="text-sm text-[var(--text-muted)] font-medium">Top-rated tech at unbeatable prices.</p>
        </div>
        <Link href="/deals" className="text-[#0046be] font-bold text-sm flex items-center gap-1 hover:underline">
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
