import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20 pt-16 pb-8 border-t border-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-6">Customer Support</h4>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/help" className="hover:underline">Help Centre</Link></li>
              <li><Link href="/returns" className="hover:underline">Returns & Exchanges</Link></li>
              <li><Link href="/shipping" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link href="/orders" className="hover:underline">Order Status</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-6">Your Account</h4>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><Link href="/account" className="hover:underline">Sign In / Create Account</Link></li>
              <li><Link href="/profile" className="hover:underline">Account Settings</Link></li>
              <li><Link href="/orders" className="hover:underline">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:underline">Wishlist</Link></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-6">About QualityDealings</h4>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><Link href="/about" className="hover:underline">Our Story</Link></li>
              <li><Link href="/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/business" className="hover:underline">QualityDealings for Business</Link></li>
              <li><Link href="/sustainability" className="hover:underline">Sustainability</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-6">Stay Connected</h4>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Sign up for our newsletter to get latest deals and updates.
            </p>
            <div className="flex gap-2 mb-6">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-[#0046be]"
              />
              <button className="bg-[#0046be] text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#003399]">
                Join
              </button>
            </div>
            <div className="flex gap-4">
              <a href="#" className="font-medium text-[#1d1d1f] hover:text-[#0046be]">FB</a>
              <a href="#" className="font-medium text-[#1d1d1f] hover:text-[#0046be]">TW</a>
              <a href="#" className="font-medium text-[#1d1d1f] hover:text-[#0046be]">IG</a>
              <a href="#" className="font-medium text-[#1d1d1f] hover:text-[#0046be]">YT</a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} QualityDealings UK Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
            <Link href="/accessibility" className="hover:underline">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
