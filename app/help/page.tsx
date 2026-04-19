import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#1d1d1f] tracking-tighter mb-4">Help Centre</h1>
          <p className="text-lg text-gray-500">How can we help you today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0046be] mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
            <p className="text-gray-500 mb-4">Chat with our experts for immediate assistance.</p>
            <button className="text-[#0046be] font-bold hover:underline">Start Chatting &rarr;</button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-500 mb-4">Available 24/7 for all your technical queries.</p>
            <p className="text-[#1d1d1f] font-bold">0800 123 4567</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-gray-500 mb-4">Send us a message and we'll get back to you within 24 hours.</p>
            <button className="text-[#0046be] font-bold hover:underline">Send Email &rarr;</button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">FAQs</h3>
            <p className="text-gray-500 mb-4">Browse our frequently asked questions for quick answers.</p>
            <button className="text-[#0046be] font-bold hover:underline">View FAQs &rarr;</button>
          </div>
        </div>

        <div className="mt-16 bg-[#0046be] text-white p-10 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Need help with an order?</h2>
            <p className="mb-6 opacity-90">Track your delivery, request a return, or view your order history.</p>
            <a href="/orders" className="bg-white text-[#0046be] px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block">
              Go to Orders
            </a>
          </div>
          <HelpCircle size={150} className="absolute -right-10 -bottom-10 text-white/10" />
        </div>
      </div>
    </div>
  );
}
