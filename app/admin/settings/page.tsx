'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Save, Store, Mail, Lock, CheckCircle2, Image as ImageIcon, Plus, Trash2, Truck, RefreshCcw, ShieldCheck } from 'lucide-react';

interface ShippingSettings {
  freeDeliveryThreshold: number;
  standardDeliveryTime: string;
  standardDeliveryNote: string;
  expressDeliveryAvailable: boolean;
  expressDeliveryTime: string;
  expressDeliveryPrice: number;
  returnWindowDays: number;
  returnPolicy: string;
  protectionPlanText: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shippingSuccess, setShippingSuccess] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'Quality Dealings',
    supportEmail: 'qualitydealings@yahoo.co.uk',
    currency: 'GBP (£)',
    newPassword: '',
  });
  const [banners, setBanners] = useState<any[]>([]);
  const [shipping, setShipping] = useState<ShippingSettings>({
    freeDeliveryThreshold: 3500,
    standardDeliveryTime: 'Delivery starts from tomorrow',
    standardDeliveryNote: 'Check availability for your location.',
    expressDeliveryAvailable: false,
    expressDeliveryTime: 'Same-day delivery available',
    expressDeliveryPrice: 9.99,
    returnWindowDays: 30,
    returnPolicy: 'Items must be returned in their original condition.',
    protectionPlanText: 'Protect your investment with QualityCare+ accidental damage coverage for up to 3 years.',
  });

  useEffect(() => {
    fetch('/api/banners').then(res => res.json()).then(data => {
      if (data && data.length > 0) setBanners(data);
    });
    fetch('/api/shipping-settings').then(res => res.json()).then(data => {
      if (data && !data.message) setShipping(data);
    });
  }, []);

  const addBanner = () => {
    setBanners([...banners, { image: '', title: '', subtitle: '', cta: 'Shop Now', link: '/' }]);
  };

  const removeBanner = (index: number) => {
    setBanners(banners.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banners)
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShippingSave = async () => {
    setShippingLoading(true);
    try {
      await fetch('/api/shipping-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipping),
      });
      setShippingSuccess(true);
      setTimeout(() => setShippingSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setShippingLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-[#0046be] outline-none transition-all text-gray-900';

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        <div className="mb-10">
           <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Platform Settings</h1>
           <p className="text-sm text-gray-500 font-medium">Manage global store configurations and administrative access.</p>
        </div>

        <form onSubmit={handleSave} className="max-w-3xl space-y-8">
           {/* Store Profile */}
           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <Store size={20} className="text-[#0046be]" /> Store Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Store Name</label>
                    <input 
                      type="text" 
                      value={settings.storeName}
                      onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                      className={inputClass}
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Primary Currency</label>
                    <select 
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className={inputClass}
                    >
                       <option value="GBP (£)">GBP (£)</option>
                       <option value="USD ($)">USD ($)</option>
                       <option value="EUR (€)">EUR (€)</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Contact Info */}
           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <Mail size={20} className="text-[#0046be]" /> Communication
              </h3>
              <div>
                 <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Support Email Address</label>
                 <input 
                   type="email" 
                   value={settings.supportEmail}
                   onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                   className={inputClass}
                 />
                 <p className="mt-2 text-xs text-gray-400 font-medium">Customer inquiries and order notifications will be routed here.</p>
              </div>
           </div>

           {/* Security */}
           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-red-500">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-red-600">
                <Lock size={20} /> Administrative Security
              </h3>
              <div>
                 <label className="block text-xs font-black uppercase tracking-widest text-red-400 mb-2">Update Admin Password</label>
                 <input 
                   type="password" 
                   value={settings.newPassword}
                   onChange={(e) => setSettings({...settings, newPassword: e.target.value})}
                   placeholder="Enter new password to change..."
                   className="w-full px-4 py-3 bg-gray-50 border-red-100 focus:bg-white rounded-lg text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none transition-all"
                 />
                 <p className="mt-2 text-xs text-red-400 font-medium">Leave blank to keep your current hardcoded authentication intact.</p>
              </div>
           </div>

           {/* Banners */}
           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-black flex items-center gap-2">
                   <ImageIcon size={20} className="text-[#0046be]" /> Homepage Banners
                 </h3>
                 <button type="button" onClick={addBanner} className="text-sm font-bold text-[#0046be] flex items-center gap-1 hover:underline">
                    <Plus size={16} /> Add Banner
                 </button>
              </div>
              
              <div className="space-y-4">
                 {banners.map((b, index) => (
                    <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-100 relative shadow-sm">
                       <button type="button" onClick={() => removeBanner(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                       </button>
                       <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 mr-6">
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Image URL</label>
                              <input type="text" value={b.image} onChange={(e) => { const newB = [...banners]; newB[index].image = e.target.value; setBanners(newB); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm outline-none focus:border-[#0046be]" required />
                           </div>
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Title</label>
                              <input type="text" value={b.title} onChange={(e) => { const newB = [...banners]; newB[index].title = e.target.value; setBanners(newB); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm outline-none focus:border-[#0046be]" required />
                           </div>
                           <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-1">
                                 <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Subtitle</label>
                                 <input type="text" value={b.subtitle} onChange={(e) => { const newB = [...banners]; newB[index].subtitle = e.target.value; setBanners(newB); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm outline-none focus:border-[#0046be]" />
                              </div>
                              <div className="md:col-span-1">
                                 <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">CTA Text</label>
                                 <input type="text" value={b.cta} onChange={(e) => { const newB = [...banners]; newB[index].cta = e.target.value; setBanners(newB); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm outline-none focus:border-[#0046be]" />
                              </div>
                              <div className="md:col-span-1">
                                 <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Target Link</label>
                                 <input type="text" value={b.link} onChange={(e) => { const newB = [...banners]; newB[index].link = e.target.value; setBanners(newB); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm outline-none focus:border-[#0046be]" />
                              </div>
                           </div>
                       </div>
                    </div>
                 ))}
                 {banners.length === 0 && <p className="text-sm font-medium text-gray-400">No banners configured.</p>}
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button 
                type="submit"
                disabled={loading}
                className="bg-[#0046be] text-white px-8 py-3 rounded-lg font-black text-sm hover:bg-[#003399] transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={18} />
                {loading ? 'Saving Changes...' : 'Save All Settings'}
              </button>
              {success && (
                <span className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle2 size={18} /> Settings successfully updated!
                </span>
              )}
           </div>
        </form>

        {/* ── Shipping & Delivery Settings (separate save) ── */}
        <div className="max-w-3xl mt-12">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-[#0046be]">
            <h3 className="text-lg font-black mb-1 flex items-center gap-2">
              <Truck size={20} className="text-[#0046be]" /> Shipping &amp; Delivery
            </h3>
            <p className="text-xs text-gray-400 font-medium mb-8">These values appear on every product page and the homepage delivery badge.</p>

            <div className="space-y-8">

              {/* Standard Delivery */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <Truck size={15} className="text-gray-400" /> Standard Delivery
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Free Delivery Threshold (£)</label>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={shipping.freeDeliveryThreshold}
                      onChange={e => setShipping({ ...shipping, freeDeliveryThreshold: Number(e.target.value) })}
                      className={inputClass}
                    />
                    <p className="mt-1 text-xs text-gray-400">Orders at or above this amount qualify for free delivery.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Delivery Time Headline</label>
                    <input
                      type="text"
                      value={shipping.standardDeliveryTime}
                      onChange={e => setShipping({ ...shipping, standardDeliveryTime: e.target.value })}
                      placeholder="e.g. Delivery starts from tomorrow"
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Delivery Sub-note</label>
                    <input
                      type="text"
                      value={shipping.standardDeliveryNote}
                      onChange={e => setShipping({ ...shipping, standardDeliveryNote: e.target.value })}
                      placeholder="e.g. Check availability for your location."
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Express Delivery */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Truck size={15} className="text-gray-400" /> Express Delivery
                  </h4>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div
                      onClick={() => setShipping({ ...shipping, expressDeliveryAvailable: !shipping.expressDeliveryAvailable })}
                      className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${shipping.expressDeliveryAvailable ? 'bg-[#0046be]' : 'bg-gray-200'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${shipping.expressDeliveryAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-xs font-bold text-gray-500">{shipping.expressDeliveryAvailable ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-opacity ${shipping.expressDeliveryAvailable ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Express Delivery Label</label>
                    <input
                      type="text"
                      value={shipping.expressDeliveryTime}
                      onChange={e => setShipping({ ...shipping, expressDeliveryTime: e.target.value })}
                      placeholder="e.g. Same-day delivery available"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Express Delivery Price (£)</label>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={shipping.expressDeliveryPrice}
                      onChange={e => setShipping({ ...shipping, expressDeliveryPrice: Number(e.target.value) })}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Returns */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <RefreshCcw size={15} className="text-gray-400" /> Returns Policy
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Return Window (days)</label>
                    <input
                      type="number"
                      min={0}
                      value={shipping.returnWindowDays}
                      onChange={e => setShipping({ ...shipping, returnWindowDays: Number(e.target.value) })}
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Return Policy Description</label>
                    <textarea
                      rows={3}
                      value={shipping.returnPolicy}
                      onChange={e => setShipping({ ...shipping, returnPolicy: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Protection Plan */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <ShieldCheck size={15} className="text-gray-400" /> Protection Plan
                </h4>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Protection Plan Description</label>
                  <textarea
                    rows={2}
                    value={shipping.protectionPlanText}
                    onChange={e => setShipping({ ...shipping, protectionPlanText: e.target.value })}
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-gray-400">Shown on every product page beneath the Add to Cart button.</p>
                </div>
              </div>

            </div>

            {/* Save shipping */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleShippingSave}
                disabled={shippingLoading}
                className="bg-[#0046be] text-white px-8 py-3 rounded-lg font-black text-sm hover:bg-[#003399] transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={18} />
                {shippingLoading ? 'Saving...' : 'Save Shipping Settings'}
              </button>
              {shippingSuccess && (
                <span className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle2 size={18} /> Shipping settings saved!
                </span>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
