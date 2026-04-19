'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SidebarFilters from '@/components/shop/SidebarFilters';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

const ShopContent = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = searchParams.toString();
        const res = await fetch(`/api/products?${query}`);
        const data = await res.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error('Error fetching shop products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <div className="container-custom py-12 flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <SidebarFilters />

      {/* Main Content */}
      <div className="flex-grow">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div className="text-sm font-medium">
            <span className="font-black text-xl">{total}</span> items found
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 border-r pr-4 border-gray-200">
               <button className="p-1.5 bg-gray-100 rounded text-[#0046be]"><LayoutGrid size={18} /></button>
               <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><List size={18} /></button>
            </div>
            <button className="lg:hidden flex items-center gap-2 text-sm font-bold border px-3 py-1.5 rounded-md hover:bg-gray-50">
               <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 skeleton"></div>
            ))}
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-custom py-20 text-center">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
