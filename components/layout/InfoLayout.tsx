import React from 'react';

const InfoLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-gray-50 min-h-screen py-20 pb-32">
    <div className="container-custom max-w-3xl">
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
        <h1 className="text-4xl font-black text-[#1d1d1f] tracking-tighter mb-8">{title}</h1>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default InfoLayout;
