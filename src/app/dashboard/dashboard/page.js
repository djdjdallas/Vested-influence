"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import Link from 'next/link';

export default function Dashboard() {
  // Mock data for demonstration
  const stats = [
    { title: 'Active Agreements', value: '5', change: '+2', changeType: 'increase' },
    { title: 'Pending Approvals', value: '2', change: '-1', changeType: 'decrease' },
    { title: 'Completed Milestones', value: '12', change: '+3', changeType: 'increase' },
    { title: 'Total Equity Allocated', value: '2.5%', change: '+0.5%', changeType: 'increase' },
  ];

  // Mock activity data
  const activities = [
    { id: 1, type: 'agreement_created', user: 'You', target: 'Fitness Influencer Agreement', date: '2 hours ago' },
    { id: 2, type: 'milestone_completed', user: 'Jordan Smith', target: 'Tech Review Series', date: '1 day ago' },
    { id: 3, type: 'agreement_signed', user: 'Mia Johnson', target: 'Fashion Collection Promotion', date: '3 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome to your Influencer Equity Agreement Platform</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Recent Activity</h2>
              <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">View all</Link>
            </div>
            <ActivityFeed activities={activities} />
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <Link 
                href="/dashboard/agreements/create" 
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create New Agreement
              </Link>
              <Link 
                href="/dashboard/agreements" 
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Manage Existing Agreements
              </Link>
              <Link 
                href="/dashboard/education" 
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Learn About Equity Agreements
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
