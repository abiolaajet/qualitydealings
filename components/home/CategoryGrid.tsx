'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
  'electronics':       '⚡',
  'computers-tablets': '💻',
  'appliances':        '🏠',
  'tv-home-theatre':   '📺',
  'video-games':       '🎮',
  'cell-phones':       '📱',
  'smart-home':        '🌐',
  'clearance':         '🏷️',
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container-custom">
        <h2 className="text-xl font-black text-[#1d1d1f] mb-8 tracking-tight">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/shop?category=${cat._id}`}
              className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100"
            >
              <div className="w-14 h-14 relative mb-3 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform text-2xl">
                {CATEGORY_ICONS[cat.slug] ?? '📦'}
              </div>
              <span className="text-xs font-bold text-center text-[#1d1d1f] group-hover:text-[#0046be] leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}

          {/* Skeleton placeholders while loading */}
          {categories.length === 0 && (
            <div className="col-span-full flex gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-24 h-24 skeleton rounded-xl" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
