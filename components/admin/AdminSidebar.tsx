'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  PieChart,
  ArrowLeft
} from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Customers', icon: Users, href: '/admin/customers' },
    { name: 'Analytics', icon: PieChart, href: '/admin/analytics' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-[#0046be] text-white min-h-screen flex flex-col pt-8">
      <div className="px-6 mb-10">
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-all">
           <ArrowLeft size={16} />
           <span className="text-xs font-bold uppercase tracking-widest">Storefront</span>
        </Link>
        <h2 className="text-xl font-black mt-4 tracking-tighter">Admin Portal</h2>
      </div>

      <nav className="flex-grow space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all ${
                isActive 
                  ? 'bg-white text-[#0046be] rounded-l-full ml-4 shadow-lg' 
                  : 'hover:bg-[#003399]'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10 opacity-60 text-[10px] font-bold uppercase tracking-widest">
         QualityDealings v1.0
      </div>
    </aside>
  );
};

export default AdminSidebar;
