"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function Analytics() {
  // Mock data for demonstration
  const conversionData = [
    { platform: 'Instagram', conversions: 250, engagementRate: 3.2 },
    { platform: 'TikTok', conversions: 420, engagementRate: 5.7 },
    { platform: 'YouTube', conversions: 180, engagementRate: 2.8 },
    { platform: 'Twitter', conversions: 120, engagementRate: 1.9 },
  ];
  
  const equityDistribution = [
    { name: 'Fitness Campaign', value: 1.0 },
    { name: 'Tech Reviews', value: 0.5 },
    { name: 'Fashion Promotion', value: 0.75 },
    { name: 'Cooking Show', value: 0.25 },
  ];
  
  const campaignPerformance = [
    { name: 'Jan', fitness: 12000, tech: 18000, fashion: 0, cooking: 0 },
    { name: 'Feb', fitness: 15000, tech: 24000, fashion: 0, cooking: 14000 },
    { name: 'Mar', fitness: 21000, tech: 35000, fashion: 0, cooking: 28000 },
    { name: 'Apr', fitness: 24000, tech: 42000, fashion: 180000, cooking: 32000 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'ytd', label: 'Year to Date' },
  ];
  
  const [timeRange, setTimeRange] = useState('30d');
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-gray-500">Detailed insights and ROI analysis</p>
          </div>
          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Campaign Performance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={campaignPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="fitness" name="Fitness Campaign" fill="#0088FE" />
                  <Bar dataKey="tech" name="Tech Reviews" fill="#00C49F" />
                  <Bar dataKey="fashion" name="Fashion Promotion" fill="#FFBB28" />
                  <Bar dataKey="cooking" name="Cooking Show" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Equity Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={equityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {equityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="text-lg font-medium mb-4">Conversion by Platform</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conversionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="conversions" name="Conversions" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="engagementRate" name="Engagement Rate (%)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="text-lg font-medium mb-4">ROI Analysis</h2>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equity Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Cash Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI Multiple</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fitness Campaign</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.0% ($50,000)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$12,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">72,000 views</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.2x</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tech Reviews</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.5% ($25,000)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$18,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">119,000 views</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.4x</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fashion Promotion</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.75% ($37,500)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$35,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">180,000 views</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.1x</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cooking Show</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.25% ($12,500)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$8,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">74,000 views</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.6x</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
