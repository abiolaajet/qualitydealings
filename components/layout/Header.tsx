'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, MapPin, Heart, LogOut, ChevronDown, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

// Ordered list so nav matches the 8 store categories in a logical order
const NAV_SLUGS = [
  'electronics',
  'computers-tablets',
  'appliances',
  'tv-home-theatre',
  'video-games',
  'cell-phones',
  'smart-home',
  'clearance',
];

const Header = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  // Sort categories into the desired nav order
  const navCategories = NAV_SLUGS
    .map(slug => categories.find(c => c.slug === slug))
    .filter(Boolean) as Category[];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="glass-header">
      {/* Top Strip */}
      <div className="bg-[#003399] py-1 text-[11px] font-medium border-b border-white/10">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="/shop" className="hover:opacity-80">Shop</Link>
            <Link href="/brands" className="hover:opacity-80">Brands</Link>
            <Link href="/deals" className="hover:opacity-80">Deals</Link>
            <Link href="/services" className="hover:opacity-80">Services</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/orders" className="hover:opacity-80">Order Status</Link>
            <Link href="/help" className="hover:opacity-80">Help Centre</Link>
            <Link href="/stores" className="flex items-center gap-1 hover:opacity-80">
              <MapPin size={10} /> Find a Store
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <div className="container-custom flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tighter">
              Quality<span className="text-[var(--accent)]">Dealings</span>
            </h1>
          </Link>

          {/* Menu Button */}
          <Link href="/shop" className="flex items-center gap-2 font-semibold hover:opacity-80 text-sm">
            <Menu size={20} />
            <span>Menu</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-grow max-w-2xl relative group">
            <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search QualityDealings..."
                className="w-full px-4 py-2.5 text-black outline-none text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="bg-white p-2.5 text-[#0046be] hover:bg-gray-100 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* User Account */}
            <div className="relative group">
              {user ? (
                <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="w-8 h-8 bg-[var(--accent)] text-[#0046be] rounded-full flex items-center justify-center font-black text-xs">
                    {user.name[0]}
                  </div>
                  <div className="hidden lg:flex flex-col text-[10px] leading-tight font-normal">
                    <span className="opacity-80">Hi, {user.name.split(' ')[0]}</span>
                    <span className="font-bold text-xs flex items-center gap-0.5">My Account <ChevronDown size={10} /></span>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 hover:opacity-80">
                  <User size={22} strokeWidth={2.5} />
                  <div className="hidden lg:flex flex-col text-[10px] leading-tight font-normal">
                    <span className="opacity-80">Account</span>
                    <span className="font-bold text-xs">Sign In</span>
                  </div>
                </Link>
              )}

              {/* Dropdown menu if logged in */}
              {user && isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border overflow-hidden z-[100]">
                   <Link href="/profile" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 font-bold">Profile</Link>
                   <Link href="/orders" className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 font-bold">Orders</Link>
                   {user.role === 'admin' && (
                     <Link href="/admin" className="block px-4 py-2 text-xs text-red-600 hover:bg-gray-100 font-bold border-t">Admin Panel</Link>
                   )}
                   <button
                     onClick={logout}
                     className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 font-bold flex items-center gap-2 border-t"
                   >
                     <LogOut size={14} /> Logout
                   </button>
                </div>
              )}
            </div>

            <Link href="/wishlist" className="hover:opacity-80 relative group flex items-center gap-2">
              <div className="relative">
                <Heart size={22} strokeWidth={2.5} className="group-hover:fill-current" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-sm font-semibold">Wishlist</span>
            </Link>

            <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 relative">
              <div className="relative">
                <ShoppingCart size={22} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[var(--accent)] text-[#0046be] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-sm font-semibold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Nav Bar — dynamically linked */}
      <nav className="bg-[#003399]/50 py-2 hidden md:block border-t border-white/5">
        <div className="container-custom">
          <ul className="flex gap-8 text-[13px] font-semibold overflow-x-auto whitespace-nowrap scrollbar-hide">
            {navCategories.length > 0 ? (
              navCategories.map(cat => (
                <li key={cat._id}>
                  <Link
                    href={`/shop?category=${cat._id}`}
                    className={`hover:underline underline-offset-4 cursor-pointer transition-colors ${
                      cat.slug === 'clearance' ? 'text-[var(--accent)]' : 'hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))
            ) : (
              // Fallback static links while categories load
              <>
                <li><Link href="/shop" className="hover:underline underline-offset-4">Electronics</Link></li>
                <li><Link href="/shop" className="hover:underline underline-offset-4">Computers &amp; Tablets</Link></li>
                <li><Link href="/shop" className="hover:underline underline-offset-4">Appliances</Link></li>
                <li><Link href="/shop" className="hover:underline underline-offset-4">TV &amp; Home Theatre</Link></li>
                <li><Link href="/shop" className="hover:underline underline-offset-4">Video Games</Link></li>
                <li><Link href="/shop" className="hover:underline underline-offset-4">Cell Phones</Link></li>
                <li><Link href="/shop" className="hover:underline underline-offset-4">Smart Home</Link></li>
                <li><Link href="/shop" className="text-[var(--accent)] hover:underline underline-offset-4">Clearance</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
