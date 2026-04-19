'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const SidebarFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get('brand') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentPriceSort = searchParams.get('sort') || '';

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCategories(data); })
      .catch(() => {});
  }, []);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      {/* Category Filter */}
      <div>
        <h4 className="font-black text-sm uppercase tracking-wider mb-4 border-b pb-2">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={currentCategory === cat._id}
                onChange={() => updateFilter('category', cat._id)}
                className="w-4 h-4 text-[#0046be]"
              />
              <span className={`text-sm font-medium group-hover:text-[#0046be] ${
                currentCategory === cat._id ? 'text-[#0046be] font-bold' : 'text-gray-600'
              }`}>
                {cat.name}
              </span>
            </label>
          ))}
          {currentCategory && (
            <button
              onClick={() => updateFilter('category', '')}
              className="text-xs text-[#0046be] font-bold hover:underline pt-2"
            >
              Clear Category
            </button>
          )}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="font-black text-sm uppercase tracking-wider mb-4 border-b pb-2">Brand</h4>
        <div className="space-y-2">
          {['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Lenovo', 'Dyson', 'Microsoft', 'Google'].map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={currentBrand === brand}
                onChange={() => updateFilter('brand', currentBrand === brand ? '' : brand)}
                className="w-4 h-4 rounded border-gray-300 text-[#0046be]"
              />
              <span className={`text-sm font-medium group-hover:text-[#0046be] ${
                currentBrand === brand ? 'text-[#0046be] font-bold' : 'text-gray-600'
              }`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Sort */}
      <div>
        <h4 className="font-black text-sm uppercase tracking-wider mb-4 border-b pb-2">Sort by Price</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="sort"
              checked={currentPriceSort === 'priceLow'}
              onChange={() => updateFilter('sort', 'priceLow')}
              className="w-4 h-4 text-[#0046be]"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#0046be]">Price: Low to High</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="sort"
              checked={currentPriceSort === 'priceHigh'}
              onChange={() => updateFilter('sort', 'priceHigh')}
              className="w-4 h-4 text-[#0046be]"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#0046be]">Price: High to Low</span>
          </label>
          {currentPriceSort && (
            <button
              onClick={() => updateFilter('sort', '')}
              className="text-xs text-[#0046be] font-bold hover:underline pt-1"
            >
              Clear Sort
            </button>
          )}
        </div>
      </div>

      {/* Customer Ratings */}
      <div>
        <h4 className="font-black text-sm uppercase tracking-wider mb-4 border-b pb-2">Customer Rating</h4>
        <div className="space-y-2 text-xs font-bold text-gray-500">
          4 Stars &amp; Up
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
