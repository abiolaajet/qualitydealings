'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency, getPriceData } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { final, original, hasDiscount, discountPercent } = getPriceData(product.price, product.discount);
  
  const isWishlisted = isInWishlist(product._id);

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group relative">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          SAVE {discountPercent}%
        </div>
      )}

      {/* Wishlist Toggle */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-all shadow-sm ${
          isWishlisted ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'
        }`}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative h-48 w-full block overflow-hidden">
        <Image 
          src={product.images[0]} 
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      {/* Product Body */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
        </div>
        
        <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-[#1d1d1f] line-clamp-2 mb-2 hover:text-[#0046be] min-h-[40px]">
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-[var(--accent)]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.numReviews})</span>
        </div>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-black text-[#1d1d1f]">{formatCurrency(final)}</span>
            {hasDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through">{formatCurrency(original)}</span>
                <span className="text-[10px] font-bold text-red-600">Save {formatCurrency(product.discount)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-4 w-full bg-[#0046be] text-white py-2 rounded font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#003399] transition-colors"
        >
          <ShoppingCart size={14} />
          View &amp; Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
