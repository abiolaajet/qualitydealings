'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { Landmark, Users, ShoppingCart, Package } from 'lucide-react';

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 12 },
  { name: 'Thu', sales: 2780, orders: 19 },
  { name: 'Fri', sales: 1890, orders: 15 },
  { name: 'Sat', sales: 2390, orders: 20 },
  { name: 'Sun', sales: 3490, orders: 28 },
];

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setRecentItems(data.products?.slice(0, 5) || []);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setItemsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const stats = [
    { name: 'Total Revenue', value: '£45,231.89', change: '+20.1% from last month', icon: Landmark, color: 'text-green-600' },
    { name: 'Total Orders', value: '1,234', change: '+12.5% from last month', icon: ShoppingCart, color: 'text-blue-600' },
    { name: 'New Customers', value: '456', change: '+5.4% from last month', icon: Users, color: 'text-purple-600' },
    { name: 'Stock Alerts', value: '5', change: '3 items out of stock', icon: Package, color: 'text-red-600' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        <div className="flex justify-between items-center mb-10">
           <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 font-medium">Monitoring your store's performance in real-time.</p>
           </div>
           <div className="flex gap-4">
              <button className="bg-white border px-4 py-2 rounded-md font-bold text-xs hover:bg-gray-50">Download Report</button>
              <button className="bg-[#0046be] text-white px-4 py-2 rounded-md font-bold text-xs hover:bg-[#003399]">Manage Store</button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 bg-gray-50 rounded-lg ${stat.color}`}>
                     <stat.icon size={20} />
                  </div>
               </div>
               <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.name}</h3>
               <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
               <span className="text-[10px] text-gray-400 font-medium">{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black mb-6">Revenue Growth</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="sales" fill="#0046be" radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black mb-6">Order Volume</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke="#0046be" strokeWidth={3} dot={{ fill: '#0046be' }} />
                   </LineChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Recent Items Platform */}
        <div className="mt-8 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-gray-900">Recent Items</h3>
              <button 
                onClick={() => router.push('/admin/products')}
                className="text-sm font-bold text-[#0046be] hover:underline"
              >
                View full catalog
              </button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                   <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-6 py-4 rounded-tl-lg">Picture</th>
                      <th className="px-6 py-4">Item Name</th>
                      <th className="px-6 py-4 rounded-tr-lg">Price</th>
                   </tr>
                </thead>
                <tbody className="divide-y text-sm">
                   {itemsLoading ? (
                      <tr><td colSpan={3} className="p-8 text-center text-gray-400 font-bold animate-pulse">Loading items...</td></tr>
                   ) : recentItems.length === 0 ? (
                      <tr><td colSpan={3} className="p-8 text-center text-gray-400 font-bold">No items found.</td></tr>
                   ) : (
                      recentItems.map((item) => (
                         <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                               <div className="w-16 h-16 bg-white border rounded p-1">
                                  <Image 
                                    src={item.images[0]} 
                                    alt={item.name} 
                                    width={64} 
                                    height={64} 
                                    className="object-contain w-full h-full rounded" 
                                  />
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="font-black text-gray-900 text-base">{item.name}</div>
                               <div className="text-xs text-gray-400 font-bold uppercase mt-1">{item.brand}</div>
                            </td>
                            <td className="px-6 py-4 font-black text-gray-900 text-lg">
                               {formatCurrency(item.price - (item.discount || 0))}
                            </td>
                         </tr>
                      ))
                   )}
                </tbody>
             </table>
           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
