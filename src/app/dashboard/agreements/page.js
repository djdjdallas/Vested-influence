"use client";

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AgreementCard from '@/components/agreements/AgreementCard';

export default function Agreements() {
  // Mock data for demonstration
  const [agreements, setAgreements] = useState([
    { 
      id: '1', 
      title: 'Fitness Product Campaign', 
      influencer: 'Alex Fitness', 
      status: 'active', 
      equityOffered: '1.0%', 
      milestones: { completed: 2, total: 5 },
      createdAt: '2025-03-15',
    },
    { 
      id: '2', 
      title: 'Tech Review Series', 
      influencer: 'Jordan Smith', 
      status: 'active', 
      equityOffered: '0.5%', 
      milestones: { completed: 1, total: 3 },
      createdAt: '2025-03-20',
    },
    { 
      id: '3', 
      title: 'Fashion Collection Promotion', 
      influencer: 'Mia Johnson', 
      status: 'pending', 
      equityOffered: '0.75%', 
      milestones: { completed: 0, total: 4 },
      createdAt: '2025-04-01',
    },
    { 
      id: '4', 
      title: 'Cooking Show Integration', 
      influencer: 'Chef Taylor', 
      status: 'completed', 
      equityOffered: '0.25%', 
      milestones: { completed: 3, total: 3 },
      createdAt: '2025-02-10',
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredAgreements = agreements.filter(agreement => {
    if (filter === 'all') return true;
    return agreement.status === filter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Agreements</h1>
            <p className="text-gray-500">Manage your influencer equity agreements</p>
          </div>
          <Link 
            href="/dashboard/agreements/create"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Agreement
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex space-x-4">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  filter === 'all' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('active')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  filter === 'active' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  filter === 'pending' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setFilter('completed')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  filter === 'completed' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredAgreements.length > 0 ? (
              filteredAgreements.map((agreement) => (
                <AgreementCard key={agreement.id} agreement={agreement} />
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No agreements found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
