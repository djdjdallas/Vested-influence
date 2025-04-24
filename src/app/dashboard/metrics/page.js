"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MetricsChart from '@/components/metrics/MetricsChart';
import MetricsTable from '@/components/metrics/MetricsTable';
import SocialMediaConnector from '@/components/metrics/SocialMediaConnector';

export default function Metrics() {
  // Mock data for demonstration
  const [agreements, setAgreements] = useState([
    { 
      id: '1', 
      title: 'Fitness Product Campaign', 
      influencer: 'Alex Fitness',
      platform: 'Instagram'
    },
    { 
      id: '2', 
      title: 'Tech Review Series', 
      influencer: 'Jordan Smith',
      platform: 'YouTube'
    },
    { 
      id: '3', 
      title: 'Fashion Collection Promotion', 
      influencer: 'Mia Johnson',
      platform: 'TikTok'
    }
  ]);
  
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [metrics, setMetrics] = useState([]);
  
  // Mock metrics data
  const mockMetricsData = {
    '1': [
      { date: '2025-03-01', views: 15000, likes: 1200, comments: 300, shares: 150 },
      { date: '2025-03-08', views: 18000, likes: 1500, comments: 350, shares: 180 },
      { date: '2025-03-15', views: 21000, likes: 1800, comments: 420, shares: 210 },
      { date: '2025-03-22', views: 19000, likes: 1600, comments: 380, shares: 190 },
      { date: '2025-03-29', views: 22000, likes: 1900, comments: 450, shares: 230 },
      { date: '2025-04-05', views: 24000, likes: 2100, comments: 480, shares: 250 },
      { date: '2025-04-12', views: 28000, likes: 2400, comments: 520, shares: 280 },
    ],
    '2': [
      { date: '2025-03-10', views: 45000, likes: 3200, comments: 850, shares: 1200 },
      { date: '2025-03-24', views: 52000, likes: 3800, comments: 920, shares: 1400 },
      { date: '2025-04-07', views: 58000, likes: 4200, comments: 980, shares: 1600 },
    ],
    '3': [
      { date: '2025-04-01', views: 120000, likes: 15000, comments: 3200, shares: 8500 },
      { date: '2025-04-08', views: 180000, likes: 22000, comments: 4500, shares: 12000 },
      { date: '2025-04-15', views: 210000, likes: 26000, comments: 5300, shares: 14000 },
    ]
  };
  
  // Set default selected agreement
  useEffect(() => {
    if (agreements.length > 0 && !selectedAgreement) {
      setSelectedAgreement(agreements[0].id);
    }
  }, [agreements, selectedAgreement]);
  
  // Update metrics when selected agreement changes
  useEffect(() => {
    if (selectedAgreement) {
      setMetrics(mockMetricsData[selectedAgreement] || []);
    }
  }, [selectedAgreement]);
  
  const handleSelectAgreement = (agreementId) => {
    setSelectedAgreement(agreementId);
  };
  
  const handleRefreshMetrics = () => {
    // In a real app, this would fetch fresh data from social platforms
    console.log('Refreshing metrics for agreement:', selectedAgreement);
    // For demo, we'll just show the same data
  };
  
  // Get the selected agreement object
  const currentAgreement = agreements.find(a => a.id === selectedAgreement);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Performance Metrics</h1>
            <p className="text-gray-500">Track and analyze influencer marketing performance</p>
          </div>
          <button
            onClick={handleRefreshMetrics}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Refresh Metrics
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <label htmlFor="agreement-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Agreement
                </label>
                <select
                  id="agreement-select"
                  value={selectedAgreement || ''}
                  onChange={(e) => handleSelectAgreement(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {agreements.map((agreement) => (
                    <option key={agreement.id} value={agreement.id}>
                      {agreement.title} ({agreement.influencer})
                    </option>
                  ))}
                </select>
              </div>
              {currentAgreement && (
                <SocialMediaConnector platform={currentAgreement.platform} />
              )}
            </div>
          </div>
          
          {selectedAgreement && metrics.length > 0 ? (
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Performance Over Time</h3>
                <div className="h-80">
                  <MetricsChart data={metrics} />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Detailed Metrics</h3>
                <MetricsTable data={metrics} />
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">
                {selectedAgreement 
                  ? "No metrics data available for this agreement yet."
                  : "Please select an agreement to view metrics."}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
