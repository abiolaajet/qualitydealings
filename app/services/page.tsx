import React from 'react';
import { Shield, Wrench, Truck, CreditCard, Headphones, Laptop } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: 'Expert Installation',
      description: 'Professional setup for your home theatre, office, or smart home devices.',
      icon: <Wrench className="text-blue-600" size={32} />,
      color: 'bg-blue-50',
    },
    {
      title: 'Extended Warranty',
      description: 'Peace of mind with our comprehensive protection plans and accidental damage cover.',
      icon: <Shield className="text-green-600" size={32} />,
      color: 'bg-green-50',
    },
    {
      title: 'Fast Delivery',
      description: 'Next-day delivery available on thousands of items across the UK.',
      icon: <Truck className="text-purple-600" size={32} />,
      color: 'bg-purple-50',
    },
    {
      title: 'Tech Support',
      description: 'Remote and in-store technical assistance for all your devices.',
      icon: <Headphones className="text-orange-600" size={32} />,
      color: 'bg-orange-50',
    },
    {
      title: 'Trade-In Program',
      description: 'Get credit towards your next purchase by trading in your old tech.',
      icon: <Laptop className="text-red-600" size={32} />,
      color: 'bg-red-50',
    },
    {
      title: 'Flexible Financing',
      description: 'Buy now and pay later with our 0% interest financing options.',
      icon: <CreditCard className="text-indigo-600" size={32} />,
      color: 'bg-indigo-50',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl font-black text-[#1d1d1f] tracking-tight mb-6">Our Services</h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            We don't just sell technology—we help you get the most out of it. From installation to support, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1d1d1f]">{service.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {service.description}
              </p>
              <button className="text-[#0046be] font-bold hover:gap-3 flex items-center gap-2 transition-all">
                Learn More <span className="text-xl">→</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#0046be] rounded-[40px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="max-w-xl relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Need expert advice?</h2>
            <p className="text-lg opacity-90 mb-10 leading-relaxed">
              Book a free virtual or in-store consultation with one of our tech experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-white text-[#0046be] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all">
                Book a Consultant
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Contact Support
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative z-10">
             {/* Abstract tech-support-like graphic */}
             <div className="w-64 h-64 border-8 border-white/20 rounded-full animate-pulse relative">
                <div className="absolute inset-4 border-4 border-white/40 rounded-full animate-ping"></div>
                <div className="absolute inset-1/2 -ml-8 -mt-8 bg-white/20 w-16 h-16 rounded-full flex items-center justify-center">
                   <Headphones size={40} />
                </div>
             </div>
          </div>
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] -ml-48 -mb-48"></div>
        </div>
      </div>
    </div>
  );
}
