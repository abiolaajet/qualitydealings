'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Plus, Minus, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency, getPriceData } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ShippingSettings {
  freeDeliveryThreshold: number;
  standardDeliveryTime: string;
  standardDeliveryNote: string;
  expressDeliveryAvailable: boolean;
  expressDeliveryTime: string;
  expressDeliveryPrice: number;
  returnWindowDays: number;
  returnPolicy: string;
  protectionPlanText: string;
}

const DEFAULT_SHIPPING: ShippingSettings = {
  freeDeliveryThreshold: 3500,
  standardDeliveryTime: 'Delivery starts from tomorrow',
  standardDeliveryNote: 'Check availability for your location.',
  expressDeliveryAvailable: false,
  expressDeliveryTime: 'Same-day delivery available',
  expressDeliveryPrice: 9.99,
  returnWindowDays: 30,
  returnPolicy: 'Items must be returned in their original condition.',
  protectionPlanText: 'Protect your investment with QualityCare+ accidental damage coverage for up to 3 years.',
};

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { final, original, hasDiscount, discountAmount } = getPriceData(product.price, product.discount);
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'shipping'>('overview');
  const [shipping, setShipping] = useState<ShippingSettings>(DEFAULT_SHIPPING);

  const isWishlisted = isInWishlist(product._id);

  useEffect(() => {
    fetch('/api/shipping-settings')
      .then(res => res.json())
      .then(data => { if (data && !data.message) setShipping(data); })
      .catch(() => {/* keep defaults */});
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Images */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="bg-white border rounded-xl overflow-hidden relative h-[400px] md:h-[600px]">
            <Image 
              src={product.images[0]} 
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
          </div>
          <div className="flex gap-4">
             {product.images.map((img, i) => (
                <div key={i} className="w-24 h-24 border rounded-md overflow-hidden p-2 cursor-pointer hover:border-[#0046be]">
                   <Image src={img} alt={`${product.name} ${i}`} width={80} height={80} className="object-contain w-full h-full" />
                </div>
             ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-2/5 flex flex-col">
          <div className="border-b pb-6 mb-6">
            <span className="text-sm font-bold text-[#0046be] uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-3xl font-black text-[#1d1d1f] mt-2 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex text-[var(--accent)]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#0046be] hover:underline cursor-pointer">{product.numReviews} Reviews</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#1d1d1f]">{formatCurrency(final)}</span>
                {hasDiscount && <span className="text-xl text-gray-400 line-through">{formatCurrency(original)}</span>}
              </div>
              {hasDiscount && (
                 <p className="text-red-600 font-black text-sm mt-1 uppercase tracking-tight">SAVE {formatCurrency(discountAmount)}</p>
              )}
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
               <div className="flex items-start gap-3">
                  <Truck size={18} className="mt-1 text-gray-600" />
                  <div>
                    <h5 className="text-sm font-bold underline cursor-pointer">{shipping.standardDeliveryTime}</h5>
                    <p className="text-xs text-gray-500">Free over £{shipping.freeDeliveryThreshold.toLocaleString()}. {shipping.standardDeliveryNote}</p>
                  </div>
               </div>
               {shipping.expressDeliveryAvailable && (
                 <div className="flex items-start gap-3">
                   <Truck size={18} className="mt-1 text-gray-600" />
                   <div>
                     <h5 className="text-sm font-bold">{shipping.expressDeliveryTime}</h5>
                     <p className="text-xs text-gray-500">From £{shipping.expressDeliveryPrice.toFixed(2)}</p>
                   </div>
                 </div>
               )}
               <div className="flex items-start gap-3">
                  <RefreshCcw size={18} className="mt-1 text-gray-600" />
                  <div>
                    <h5 className="text-sm font-bold">Free {shipping.returnWindowDays}-day returns</h5>
                  </div>
               </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-4">
                 <span className="text-sm font-bold">Quantity:</span>
                 <div className="flex items-center border rounded-md overflow-hidden">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 hover:bg-gray-100 border-r"
                    ><Minus size={16} /></button>
                    <span className="px-6 py-2 font-bold text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2 hover:bg-gray-100 border-l"
                    ><Plus size={16} /></button>
                 </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow bg-[#0046be] text-white py-4 rounded-lg font-black text-lg shadow-lg hover:bg-[#003399] transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center ${
                    isWishlisted 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500'
                  }`}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            <div className="pt-6">
               <h5 className="font-bold text-sm flex items-center gap-2 mb-2"><ShieldCheck size={18} className="text-green-600" /> Protection Plan</h5>
               <p className="text-xs text-gray-500">{shipping.protectionPlanText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Description */}
      <div className="mt-20">
         <div className="border-b flex gap-10 sticky top-20 bg-white z-10 overflow-x-auto whitespace-nowrap">
            <button onClick={() => setActiveTab('overview')} className={`py-4 text-sm uppercase tracking-widest px-1 ${activeTab === 'overview' ? 'border-b-4 border-[#0046be] font-black' : 'font-bold text-gray-400 hover:text-[#0046be]'}`}>Overview</button>
            <button onClick={() => setActiveTab('specifications')} className={`py-4 text-sm uppercase tracking-widest px-1 ${activeTab === 'specifications' ? 'border-b-4 border-[#0046be] font-black' : 'font-bold text-gray-400 hover:text-[#0046be]'}`}>Specifications</button>
            <button onClick={() => setActiveTab('shipping')} className={`py-4 text-sm uppercase tracking-widest px-1 ${activeTab === 'shipping' ? 'border-b-4 border-[#0046be] font-black' : 'font-bold text-gray-400 hover:text-[#0046be]'}`}>Shipping &amp; Returns</button>
         </div>
         
         <div className="py-12 flex flex-col gap-16">
            {activeTab === 'overview' && (
              <div className="max-w-4xl">
                 <h3 className="text-2xl font-black mb-6">Product Description</h3>
                 <p className="text-[#1d1d1f] leading-relaxed whitespace-pre-line text-sm">
                    {product.description}
                 </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="max-w-4xl">
                 <h3 className="text-2xl font-black mb-6 border-b pb-4">Specifications</h3>
                 <div className="space-y-4">
                    {Object.entries(product.specifications || {}).map(([key, val]) => (
                       <div key={key} className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                          <span className="text-gray-700 font-bold">{key}</span>
                          <span className="text-[#1d1d1f] font-medium">{val}</span>
                       </div>
                    ))}
                    {Object.keys(product.specifications || {}).length === 0 && (
                       <p className="text-gray-500 text-sm">No specifications available for this product.</p>
                    )}
                 </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="max-w-4xl space-y-8">
                 <h3 className="text-2xl font-black mb-6 border-b pb-4">Shipping &amp; Returns</h3>

                 {/* Standard Delivery */}
                 <div className="flex gap-4">
                   <Truck size={22} className="text-[#0046be] mt-0.5 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-gray-900 mb-1">{shipping.standardDeliveryTime}</h4>
                     <p className="text-gray-600 text-sm">Free delivery on orders over £{shipping.freeDeliveryThreshold.toLocaleString()}. {shipping.standardDeliveryNote}</p>
                   </div>
                 </div>

                 {/* Express Delivery (conditional) */}
                 {shipping.expressDeliveryAvailable && (
                   <div className="flex gap-4">
                     <Truck size={22} className="text-[#0046be] mt-0.5 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-gray-900 mb-1">{shipping.expressDeliveryTime}</h4>
                       <p className="text-gray-600 text-sm">Express delivery from £{shipping.expressDeliveryPrice.toFixed(2)}.</p>
                     </div>
                   </div>
                 )}

                 {/* Returns */}
                 <div className="flex gap-4">
                   <RefreshCcw size={22} className="text-[#0046be] mt-0.5 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-gray-900 mb-1">Free {shipping.returnWindowDays}-Day Returns</h4>
                     <p className="text-gray-600 text-sm">{shipping.returnPolicy}</p>
                   </div>
                 </div>

                 {/* Protection */}
                 <div className="flex gap-4">
                   <ShieldCheck size={22} className="text-green-600 mt-0.5 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-gray-900 mb-1">Protection Plan</h4>
                     <p className="text-gray-600 text-sm">{shipping.protectionPlanText}</p>
                   </div>
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default ProductDetails;

