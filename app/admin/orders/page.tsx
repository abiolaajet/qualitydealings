'use client';

import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { formatCurrency } from '@/lib/utils';
import { Eye, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders/admin');
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching admin orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleAction = async (id: string, action: 'pay' | 'deliver') => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        // Update local state without re-fetching
        setOrders(orders.map(o => {
          if (o._id === id) {
            return {
              ...o,
              isPaid: action === 'pay' ? true : o.isPaid,
              isDelivered: action === 'deliver' ? true : o.isDelivered,
            };
          }
          return o;
        }));
      }
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'paid': return <CheckCircle size={14} className="text-green-600" />;
      case 'delivered': return <Truck size={14} className="text-blue-600" />;
      case 'cancelled': return <XCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-yellow-600" />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        <div className="mb-10">
           <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Orders</h1>
           <p className="text-sm text-gray-500 font-medium">Track and manage customer purchases.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full text-left font-sans">
              <thead className="bg-gray-50 border-b">
                 <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y text-sm">
                 {loading ? (
                    <tr><td colSpan={6} className="p-10 text-center animate-pulse font-bold text-gray-400 uppercase tracking-widest">Fetching Orders...</td></tr>
                 ) : orders.length === 0 ? (
                    <tr><td colSpan={6} className="p-10 text-center font-bold text-gray-400">No orders found yet.</td></tr>
                 ) : (
                    orders.map((o) => (
                       <tr key={o._id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4 font-mono text-xs text-gray-500 font-bold">{o._id.substring(0, 8)}...</td>
                          <td className="px-6 py-4">
                             <div className="font-bold text-gray-900">{o.shippingAddress.fullName}</div>
                             <div className="text-[10px] text-gray-400">{o.user?.email}</div>
                          </td>
                          <td className="px-6 py-4 font-black">
                             {formatCurrency(o.totalPrice)}
                          </td>
                          <td className="px-6 py-4">
                             <div className={`flex items-center gap-1.5 px-2 py-1 rounded inline-flex font-black text-[10px] uppercase tracking-tight ${
                               o.isDelivered ? 'bg-blue-50 text-blue-700' : (o.isPaid ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700')
                             }`}>
                                {getStatusIcon(o.isDelivered ? 'delivered' : (o.isPaid ? 'paid' : 'pending'))}
                                {o.isDelivered ? 'Delivered' : (o.isPaid ? 'Paid' : 'Pending Payment')}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                             {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2">
                               {!o.isPaid && (
                                 <button 
                                   onClick={() => handleAction(o._id, 'pay')}
                                   className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-3 py-1.5 rounded hover:bg-green-100 transition-colors"
                                 >
                                    Mark Paid
                                 </button>
                               )}
                               {o.isPaid && !o.isDelivered && (
                                 <button 
                                   onClick={() => handleAction(o._id, 'deliver')}
                                   className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors"
                                 >
                                    Dispatch
                                 </button>
                               )}
                               <button className="p-2 text-gray-400 hover:text-[#0046be] hover:bg-white rounded transition-all shadow-sm ring-1 ring-gray-100">
                                  <Eye size={16} />
                               </button>
                             </div>
                          </td>
                       </tr>
                    ))
                 )}
              </tbody>
           </table>
        </div>
      </main>
    </div>
  );
};

export default AdminOrdersPage;
