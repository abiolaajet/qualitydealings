import React from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

export default function StoresPage() {
  const stores = [
    {
      name: 'QualityDealings London Flagship',
      address: '123 Oxford Street, London, W1D 1LT',
      phone: '020 7123 4567',
      hours: 'Mon-Sat: 9am-9pm, Sun: 11am-5pm',
    },
    {
      name: 'QualityDealings Manchester',
      address: 'Arndale Centre, Manchester, M4 3AQ',
      phone: '0161 789 0123',
      hours: 'Mon-Sat: 10am-8pm, Sun: 11am-5pm',
    },
    {
      name: 'QualityDealings Birmingham',
      address: 'Bullring, Birmingham, B5 4BU',
      phone: '0121 456 7890',
      hours: 'Mon-Sat: 10am-8pm, Sun: 11am-5pm',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#1d1d1f] tracking-tighter mb-4">Find a Store</h1>
            <p className="text-lg text-gray-500">Visit us in person for expert advice and hands-on demos.</p>
          </div>
          <div className="w-full md:w-96">
            <div className="flex bg-white rounded-lg shadow-sm border overflow-hidden">
              <input 
                type="text" 
                placeholder="Enter postcode or city" 
                className="flex-grow px-4 py-3 outline-none text-sm"
              />
              <button className="bg-[#0046be] text-white px-6 py-3 font-bold hover:bg-[#003399]">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {stores.map((store, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0046be] flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-3">{store.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><Navigation size={14} /> {store.address}</p>
                    <p className="flex items-center gap-2"><Phone size={14} /> {store.phone}</p>
                    <p className="flex items-center gap-2"><Clock size={14} /> {store.hours}</p>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <button className="bg-[#0046be] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#003399]">
                      Get Directions
                    </button>
                    <button className="text-[#0046be] border border-[#0046be] px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50">
                      Store Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-200 rounded-2xl overflow-hidden min-h-[400px] relative border border-gray-100 shadow-sm">
            {/* Mock Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-2">
              <MapPin size={48} />
              <p className="font-bold">Map View</p>
              <p className="text-xs">Interactive map loading...</p>
            </div>
            {/* Adding some "map" elements for visual appeal */}
            <div className="absolute top-20 left-20 w-8 h-8 bg-[#0046be] rounded-full border-4 border-white shadow-lg animate-bounce"></div>
            <div className="absolute bottom-40 right-40 w-8 h-8 bg-[#0046be] rounded-full border-4 border-white shadow-lg"></div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#0046be] rounded-full border-4 border-white shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
