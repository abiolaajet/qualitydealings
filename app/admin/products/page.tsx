'use client';

import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Product } from '@/types';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching admin products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.slug !== slug));
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        <div className="flex justify-between items-center mb-10">
           <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Products</h1>
              <p className="text-sm text-gray-500 font-medium">Manage your inventory and product listings.</p>
           </div>
           <Link 
             href="/admin/products/new" 
             className="bg-[#0046be] text-white px-6 py-3 rounded-lg font-black text-sm flex items-center gap-2 hover:bg-[#003399] transition-all shadow-lg"
           >
             <Plus size={18} /> Add New Product
           </Link>
        </div>

        {/* Filters/Search Row */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8 flex gap-4">
           <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or brand..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-[#0046be] transition-all outline-none"
              />
           </div>
           <select className="bg-gray-50 border-transparent rounded-lg text-sm px-4 focus:bg-white focus:ring-2 focus:ring-[#0046be] outline-none font-bold">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Appliances</option>
           </select>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                 <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y text-sm">
                 {loading ? (
                    <tr><td colSpan={5} className="p-10 text-center animate-pulse font-bold text-gray-400">Loading your catalog...</td></tr>
                 ) : filteredProducts.length === 0 ? (
                    <tr><td colSpan={5} className="p-10 text-center font-bold text-gray-400">No products found.</td></tr>
                 ) : (
                    filteredProducts.map((p) => (
                       <tr key={p._id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4 flex items-center gap-4">
                             <div className="w-12 h-12 bg-white border rounded p-1 flex-shrink-0">
                                <Image src={p.images[0]} alt={p.name} width={40} height={40} className="object-contain w-full h-full" />
                             </div>
                             <div>
                                <div className="font-black text-gray-900 group-hover:text-[#0046be]">{p.name}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase">{p.brand}</div>
                             </div>
                          </td>
                          <td className="px-6 py-4 font-black">
                             {p.stock} <span className="text-[10px] text-gray-400 font-normal uppercase">in stock</span>
                          </td>
                          <td className="px-6 py-4 font-black text-gray-900">
                             {formatCurrency(p.price - p.discount)}
                          </td>
                          <td className="px-6 py-4">
                             {p.stock > 0 ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-black uppercase">Active</span>
                             ) : (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-black uppercase">Out of Stock</span>
                             )}
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2">
                                <Link 
                                  href={`/product/${p.slug}`} 
                                  target="_blank"
                                  className="p-2 text-gray-400 hover:text-[#0046be] hover:bg-white rounded transition-all shadow-sm"
                                >
                                   <ExternalLink size={16} />
                                </Link>
                                <Link 
                                  href={`/admin/products/${p.slug}/edit`}
                                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-white rounded transition-all shadow-sm"
                                >
                                  <Edit size={16} />
                                </Link>
                                <button onClick={() => handleDelete(p.slug)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded transition-all shadow-sm">
                                   <Trash2 size={16} />
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

export default AdminProductsPage;
