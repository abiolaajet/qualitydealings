'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useRouter, useParams } from 'next/navigation';
import { Save, X, ImageIcon, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Category as CategoryType } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
  'electronics':       '⚡',
  'computers-tablets': '💻',
  'appliances':        '🏠',
  'tv-home-theatre':   '📺',
  'video-games':       '🎮',
  'cell-phones':       '📱',
  'smart-home':        '🌐',
  'clearance':         '🏷️',
};

interface FormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  discount: string;
  stock: string;
  brand: string;
  selectedCategories: string[];
  imageUrl: string;
  condition: 'new' | 'used';
  isFeatured: boolean;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    price: '',
    discount: '0',
    stock: '',
    brand: '',
    selectedCategories: [],
    imageUrl: '',
    condition: 'new',
    isFeatured: false,
  });

  // Fetch categories and existing product in parallel
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, productRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/products/${slug}`),
        ]);

        const catData = await catRes.json();
        const cats: CategoryType[] = Array.isArray(catData) ? catData : [];
        setCategories(cats);

        if (!productRes.ok) {
          const errData = await productRes.json().catch(() => ({}));
          setError(errData.message || `Failed to load product (status ${productRes.status}).`);
          setFetching(false);
          return;
        }

        const { product } = await productRes.json();

        // Build the selectedCategories array from the product's categories array
        // falling back to the legacy single `category` field
        let selectedIds: string[] = [];
        if (Array.isArray(product.categories) && product.categories.length > 0) {
          selectedIds = product.categories.map((c: any) =>
            typeof c === 'object' ? c._id : c
          );
        } else if (product.category) {
          const catId = typeof product.category === 'object' ? product.category._id : product.category;
          selectedIds = [catId];
        }

        setFormData({
          name: product.name || '',
          slug: product.slug || '',
          description: product.description || '',
          price: String(product.price ?? ''),
          discount: String(product.discount ?? '0'),
          stock: String(product.stock ?? ''),
          brand: product.brand || '',
          selectedCategories: selectedIds,
          imageUrl: product.images?.[0] || '',
          condition: (product.condition === 'used' ? 'used' : 'new') as 'new' | 'used',
          isFeatured: !!product.isFeatured,
        });
      } catch (err) {
        setError('Failed to load product data.');
      } finally {
        setFetching(false);
      }
    };

    if (slug) fetchAll();
  }, [slug]);

  const updateField = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, name: val }));
  };

  const toggleCategory = (id: string) => {
    setFormData(prev => {
      const already = prev.selectedCategories.includes(id);
      return {
        ...prev,
        selectedCategories: already
          ? prev.selectedCategories.filter(c => c !== id)
          : [...prev.selectedCategories, id],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) { setError('Product name is required.'); return; }
    if (!formData.price || isNaN(Number(formData.price))) { setError('A valid price is required.'); return; }
    if (!formData.stock || isNaN(Number(formData.stock))) { setError('A valid stock count is required.'); return; }
    if (!formData.brand.trim()) { setError('Brand is required.'); return; }
    if (!formData.description.trim()) { setError('Description is required.'); return; }

    setLoading(true);

    try {
      const payload: any = {
        name: formData.name.trim(),
        slug: formData.slug.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formData.description.trim(),
        price: Number(formData.price),
        discount: Number(formData.discount) || 0,
        stock: Number(formData.stock),
        brand: formData.brand.trim(),
        isFeatured: formData.isFeatured,
        images: [
          formData.imageUrl.trim() ||
            'https://images.unsplash.com/photo-1526733170373-be78f0f2e8f1?auto=format&fit=crop&q=80&w=800',
        ],
        categories: formData.selectedCategories,
        category: formData.selectedCategories[0] ?? null,
        condition: formData.condition,
      };

      const res = await fetch(`/api/products/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Product updated successfully! Redirecting...');
        setTimeout(() => router.push('/admin/products'), 1200);
      } else {
        setError(data.message || 'Failed to update product. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0046be] focus:border-transparent outline-none transition-all';

  if (fetching) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <AdminSidebar />
        <main className="flex-grow p-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-gray-400">
            <Loader2 size={40} className="animate-spin text-[#0046be]" />
            <p className="font-bold">Loading product...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Edit Product</h1>
            <p className="text-sm text-gray-500 font-medium">
              Editing: <span className="text-[#0046be] font-bold">{formData.name || slug}</span>
            </p>
          </div>
          <Link
            href="/admin/products"
            className="bg-white border text-gray-600 px-6 py-3 rounded-lg font-black text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
          >
            <X size={18} /> Cancel
          </Link>
        </div>

        {/* Banners */}
        {error && (
          <div className="max-w-4xl mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl font-medium text-sm">
            <AlertCircle size={18} className="flex-shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="max-w-4xl mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl font-medium text-sm">
            <CheckCircle size={18} className="flex-shrink-0" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left column */}
            <div className="space-y-6">

              {/* Product Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. iPhone 15 Pro Max"
                  className={inputClass}
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => updateField('slug', e.target.value)}
                  className={`${inputClass} font-mono text-gray-500`}
                />
                <p className="mt-1 text-xs text-gray-400">Changing the slug will break existing links to this product.</p>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Brand <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  list="brand-suggestions"
                  value={formData.brand}
                  onChange={e => updateField('brand', e.target.value)}
                  placeholder="e.g. Apple, Samsung, Sony"
                  autoComplete="off"
                  className={inputClass}
                />
                <datalist id="brand-suggestions">
                  {['Apple','Samsung','Sony','Dell','HP','Lenovo','Asus','Acer','Microsoft','Google','OnePlus','Xiaomi','LG','Huawei','Razer'].map(b => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={e => updateField('description', e.target.value)}
                  placeholder="Tell customers about this product..."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">

              {/* Price, Discount, Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Price (£) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number" min="0" step="0.01"
                    value={formData.price}
                    onChange={e => updateField('price', e.target.value)}
                    placeholder="0.00"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Discount (£)
                  </label>
                  <input
                    type="number" min="0" step="0.01"
                    value={formData.discount}
                    onChange={e => updateField('discount', e.target.value)}
                    placeholder="0.00"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Stock <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number" min="0"
                    value={formData.stock}
                    onChange={e => updateField('stock', e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Categories multi-select */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                  Categories
                </label>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {categories.filter(c => c.slug !== 'clearance').map(c => {
                    const checked = formData.selectedCategories.includes(c._id);
                    return (
                      <button
                        key={c._id}
                        type="button"
                        onClick={() => toggleCategory(c._id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-semibold text-left transition-all ${
                          checked
                            ? 'bg-[#0046be] text-white border-[#0046be] shadow-md'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0046be] hover:text-[#0046be]'
                        }`}
                      >
                        <span>{CATEGORY_ICONS[c.slug] ?? '📦'}</span>
                        <span className="leading-tight">{c.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Clearance special toggle */}
                {(() => {
                  const clearanceCat = categories.find(c => c.slug === 'clearance');
                  if (!clearanceCat) return null;
                  const checked = formData.selectedCategories.includes(clearanceCat._id);
                  return (
                    <button
                      type="button"
                      onClick={() => toggleCategory(clearanceCat._id)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                        checked
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                          : 'bg-orange-50 text-orange-600 border-orange-200 hover:border-orange-400'
                      }`}
                    >
                      <span>🏷️</span>
                      <span>Clearance</span>
                      <span className="ml-auto text-[10px] uppercase tracking-widest opacity-70">Can combine with any category</span>
                    </button>
                  );
                })()}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Main Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={e => updateField('imageUrl', e.target.value)}
                    placeholder="https://..."
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {formData.imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.imageUrl}
                      alt="preview"
                      className="h-20 object-contain"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              {/* Condition toggle */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                  Item Condition
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => updateField('condition', 'new')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-bold transition-all ${
                      formData.condition === 'new'
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    <span>✨</span> New
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('condition', 'used')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-bold transition-all ${
                      formData.condition === 'used'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-amber-300 hover:text-amber-600'
                    }`}
                  >
                    <span>🔄</span> Used
                  </button>
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={e => updateField('isFeatured', e.target.checked)}
                  className="w-5 h-5 text-[#0046be] rounded border-gray-300 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-sm font-bold text-gray-700 cursor-pointer">
                  Display in Featured Section on Home
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-12 flex justify-end gap-4">
            <Link
              href="/admin/products"
              className="px-8 py-4 rounded-xl font-black text-sm border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0046be] text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-[#003399] transition-all shadow-xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
