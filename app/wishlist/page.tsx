'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency, getPriceData } from '@/lib/utils';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product._id);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop" className="p-2 bg-white rounded-full shadow-sm hover:text-[#0046be] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black text-[#1d1d1f]">My Wishlist</h1>
          <span className="bg-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Save items you're interested in to keep track of them and see when they go on sale.
            </p>
            <Link 
              href="/shop" 
              className="inline-block bg-[#0046be] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#003399] transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const { final, original, hasDiscount } = getPriceData(product.price, product.discount);
              return (
                <div key={product._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all group">
                  <div className="relative h-48 w-full bg-white p-4">
                    <Link href={`/product/${product.slug}`}>
                      <Image 
                        src={product.images[0]} 
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <button 
                      onClick={() => removeFromWishlist(product._id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
                    </div>
                    
                    <Link href={`/product/${product.slug}`} className="text-sm font-bold text-[#1d1d1f] line-clamp-2 mb-4 hover:text-[#0046be] min-h-[40px]">
                      {product.name}
                    </Link>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-lg font-black text-[#1d1d1f]">{formatCurrency(final)}</span>
                        {hasDiscount && (
                          <span className="text-xs text-gray-400 line-through">{formatCurrency(original)}</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleMoveToCart(product)}
                          className="flex-grow bg-[#0046be] text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#003399] transition-colors"
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recently Viewed or Suggestions (Optional/Placeholder) */}
        {wishlist.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6">You might also like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
               <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
               <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
               <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
               <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
