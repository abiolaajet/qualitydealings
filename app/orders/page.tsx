'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ArrowLeft, Watch, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (authLoading || loading) {
    return <div className="container-custom py-20 text-center text-gray-500 animate-pulse">Loading orders...</div>;
  }

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0046be]">
              <Package size={24} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-[#1d1d1f] tracking-tighter">Your Orders</h1>
              <p className="text-sm text-gray-500">View and track your recent purchases.</p>
           </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border mt-8">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't bought anything yet.</p>
            <Link href="/shop" className="bg-[#0046be] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#003399]">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row justify-between text-sm text-gray-500 gap-4">
                   <div className="flex gap-8">
                      <div>
                         <p className="font-bold text-[10px] uppercase tracking-widest mb-1">Order Placed</p>
                         <p className="text-[#1d1d1f] font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                         <p className="font-bold text-[10px] uppercase tracking-widest mb-1">Total</p>
                         <p className="text-[#1d1d1f] font-medium">{formatCurrency(order.totalPrice)}</p>
                      </div>
                   </div>
                   <div className="text-left sm:text-right">
                      <p className="font-bold text-[10px] uppercase tracking-widest mb-1">Order ID</p>
                      <p className="text-[#1d1d1f] font-mono text-xs">{order._id}</p>
                   </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                   <div className="flex items-center gap-2 mb-6">
                      {order.isDelivered ? (
                         <span className="flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-bold w-max border border-green-200">
                           <CheckCircle size={14} /> Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                         </span>
                      ) : (
                         <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold w-max border border-blue-200">
                           <Watch size={14} /> Processing
                         </span>
                      )}
                   </div>

                   <div className="space-y-4">
                      {order.orderItems.map((item: any, index: number) => (
                         <div key={index} className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gray-50 rounded border flex-shrink-0 relative overflow-hidden">
                               {item.image ? (
                                  <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                               ) : (
                                  <Package className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                               )}
                            </div>
                            <div className="flex-grow">
                               <Link href={`/product/${item.product}`} className="font-bold text-sm text-[#0046be] hover:underline">
                                 {item.name}
                               </Link>
                               <div className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</div>
                            </div>
                            <div className="font-black text-[#1d1d1f]">
                               {formatCurrency(item.price)}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
