import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <section className="bg-gray-50 py-8 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <Truck size={32} className="text-[#0046be]" />
              <div>
                <h4 className="font-bold text-sm">Free Delivery</h4>
                <p className="text-xs text-[var(--text-muted)]">On orders over £3500</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck size={32} className="text-[#0046be]" />
              <div>
                <h4 className="font-bold text-sm">Secure Payment</h4>
                <p className="text-xs text-[var(--text-muted)]">Verified Stripe checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock size={32} className="text-[#0046be]" />
              <div>
                <h4 className="font-bold text-sm">24/7 Support</h4>
                <p className="text-xs text-[var(--text-muted)]">Dedicated UK support</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CreditCard size={32} className="text-[#0046be]" />
              <div>
                <h4 className="font-bold text-sm">0% Financing</h4>
                <p className="text-xs text-[var(--text-muted)]">Available on tech over £500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Deals */}
      <FeaturedProducts />

      {/* Brand Section / Services */}
      <section id="services" className="bg-[#0046be] py-16 text-white overflow-hidden relative">
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Expert Advice & Pro Installation.</h2>
            <p className="text-lg opacity-90 mb-8 italic">
              "We don't just sell technology, we help you master it. Our experts are ready to help you set up your dream home theatre or office today."
            </p>
            <button className="bg-white text-[#0046be] px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition-all">
              Book a Consultant
            </button>
          </div>
          <div className="hidden lg:block w-72 h-72 bg-white/10 rounded-full blur-3xl absolute -right-20 -top-20"></div>
          <div className="hidden lg:block w-96 h-96 bg-white/5 rounded-full blur-3xl absolute -left-40 -bottom-40"></div>
        </div>
      </section>

      {/* Recommended for You Placeholder */}
      <div className="bg-gray-50 py-4">
         {/* This will be populated by AI Recs later */}
      </div>
    </div>
  );
}
