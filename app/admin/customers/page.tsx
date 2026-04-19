'use client';

import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Mail, CheckCircle, Clock } from 'lucide-react';

const AdminCustomersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data || []);
      } catch (err) {
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        <div className="mb-10">
           <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Customers</h1>
           <p className="text-sm text-gray-500 font-medium">Manage and view registered accounts across your platform.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full text-left font-sans">
              <thead className="bg-gray-50 border-b">
                 <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Account Role</th>
                    <th className="px-6 py-4">Addresses</th>
                    <th className="px-6 py-4">Joined Date</th>
                 </tr>
              </thead>
              <tbody className="divide-y text-sm">
                 {loading ? (
                    <tr><td colSpan={4} className="p-10 text-center animate-pulse font-bold text-gray-400 uppercase tracking-widest">Fetching Customers...</td></tr>
                 ) : users.length === 0 ? (
                    <tr><td colSpan={4} className="p-10 text-center font-bold text-gray-400">No customers found.</td></tr>
                 ) : (
                    users.map((u) => (
                       <tr key={u._id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="font-bold text-gray-900 text-base flex items-center gap-2">
                               {u.name}
                             </div>
                             <div className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mt-1">
                               <Mail size={12} /> {u.email}
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tight ${
                               u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-50 text-green-700'
                             }`}>
                               {u.role === 'admin' ? 'Administrator' : 'Customer'}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-gray-500">
                             {u.addresses?.length || 0} Saved
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-xs font-medium flex items-center gap-1.5 pt-6">
                             <Clock size={14} /> {new Date(u.createdAt).toLocaleDateString()}
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

export default AdminCustomersPage;
