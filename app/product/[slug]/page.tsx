'use client';

import React, { useEffect, useState } from 'react';
import ProductDetails from '@/components/layout/../product/ProductDetails';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { slug } = useParams();
  const [data, setData] = useState<{ product: Product; related: Product[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <div className="container-custom py-20 text-center animate-pulse">Loading Product Details...</div>;
  if (error || !data) return <div className="container-custom py-20 text-center text-red-600">{error || 'Something went wrong'}</div>;

  const { product, related } = data;

  return (
    <div className="bg-white">
      {/* Breadcrumbs - Best Buy style */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="container-custom flex gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           <a href="/" className="hover:text-[#0046be]">Home</a>
           <span>/</span>
           <a href="/shop" className="hover:text-[#0046be]">Electronics</a>
           <span>/</span>
           <span className="text-[#1d1d1f] truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <ProductDetails product={product} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="container-custom py-20 border-t">
          <h3 className="text-2xl font-black mb-10 tracking-tight">You might also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
