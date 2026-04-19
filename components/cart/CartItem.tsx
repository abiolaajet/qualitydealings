'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col md:flex-row gap-6 py-6 border-b last:border-0 items-start md:items-center">
      <div className="w-24 h-24 bg-white border rounded p-2 flex-shrink-0">
        <Image src={item.images[0]} alt={item.name} width={80} height={80} className="object-contain w-full h-full" />
      </div>

      <div className="flex-grow space-y-1">
        <Link href={`/product/${item.slug}`} className="text-sm font-bold text-[#1d1d1f] hover:text-[#0046be] hover:underline">
          {item.name}
        </Link>
        <p className="text-xs text-[var(--text-muted)] font-medium">Brand: {item.brand}</p>
        <div className="flex items-center gap-4 pt-2">
           <button 
             onClick={() => removeFromCart(item._id)}
             className="flex items-center gap-1 text-xs text-[#0046be] font-bold hover:underline"
           >
             <Trash2 size={12} /> Remove
           </button>
           <button className="text-xs text-[#0046be] font-bold hover:underline">Save for Later</button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center border rounded-md overflow-hidden bg-white">
          <button 
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 px-2 hover:bg-gray-100 border-r disabled:opacity-30"
          ><Minus size={14} /></button>
          <span className="px-4 text-xs font-black">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="p-1 px-2 hover:bg-gray-100 border-l"
          ><Plus size={14} /></button>
        </div>
      </div>

      <div className="text-right flex flex-col items-end w-32">
        <span className="text-lg font-black text-[#1d1d1f]">{formatCurrency((item.price - item.discount) * item.quantity)}</span>
        {item.quantity > 1 && (
          <span className="text-[10px] text-gray-400 font-bold">{formatCurrency(item.price - item.discount)} each</span>
        )}
      </div>
    </div>
  );
};

export default CartItem;
