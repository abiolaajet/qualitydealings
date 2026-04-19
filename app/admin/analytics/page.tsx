'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line
} from 'recharts';

const categoryData = [
  { name: 'Electronics', value: 45 },
  { name: 'Computers', value: 25 },
  { name: 'Phones', value: 20 },
  { name: 'Appliances', value: 10 },
];
const COLORS = ['#0046be', '#00C49F', '#FFBB28', '#FF8042'];

const revenueData = [
  { name: 'Jan', sales: 4000, traffic: 2400 },
  { name: 'Feb', sales: 3000, traffic: 1398 },
  { name: 'Mar', sales: 2000, traffic: 9800 },
  { name: 'Apr', sales: 2780, traffic: 3908 },
  { name: 'May', sales: 1890, traffic: 4800 },
  { name: 'Jun', sales: 2390, traffic: 3800 },
  { name: 'Jul', sales: 3490, traffic: 4300 },
];

const AdminAnalyticsPage = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        <div className="mb-10">
           <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Analytics & Reports</h1>
           <p className="text-sm text-gray-500 font-medium">Deep insights into your store's performance and audience.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
           {/* Revenue Chart */}
           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black mb-6">Monthly Revenue & Traffic</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend />
                      <Bar dataKey="sales" fill="#0046be" radius={[4, 4, 0, 0]} name="Sales (£)" />
                      <Bar dataKey="traffic" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Traffic (Visits)" />
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Sales by Category Pie */}
           <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black mb-6">Sales Distribution by Category</h3>
              <div className="h-80 w-full flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                         {categoryData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend />
                   </PieChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
           <h3 className="text-lg font-black mb-6">Customer Engagement Trends</h3>
           <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} />
                   <YAxis axisLine={false} tickLine={false} />
                   <Tooltip />
                   <Legend />
                   <Line type="monotone" dataKey="sales" stroke="#0046be" strokeWidth={3} dot={{ r: 4 }} name="Conversion Volume" />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

      </main>
    </div>
  );
};

export default AdminAnalyticsPage;
