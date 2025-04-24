"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AgreementDetails from '@/components/agreements/AgreementDetails';
import Link from 'next/link';

export default function AgreementDetailsPage() {
  const params = useParams();
  const agreementId = params.id;
  
  // Mock data for demonstration
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulated data fetch based on ID
  useEffect(() => {
    // In a real app, this would be an API call to fetch the specific agreement
    const mockAgreements = {
      '1': { 
        id: '1', 
        title: 'Fitness Product Campaign', 
        influencer: {
          name: 'Alex Fitness',
          email: 'alex@fitness.example.com',
          socialMediaHandles: {
            instagram: 'alexfitness',
            tiktok: 'alexfitpro',
            youtube: 'AlexFitnessChannel'
          }
        },
        status: 'active', 
        createdAt: '2025-03-15',
        equityDetails: {
          percentageOffered: 1.0,
          vestingPeriod: 24,
          cliffPeriod: 3,
          vestedToDate: 0.25
        },
        deliverables: [
          { 
            id: 1, 
            description: 'Instagram post featuring product', 
            dueDate: '2025-04-15', 
            metrics: { type: 'views', target: 50000 },
            status: 'completed',
            actualMetrics: { views: 72000, likes: 9500, comments: 1200 }
          },
          { 
            id: 2, 
            description: 'YouTube detailed review', 
            dueDate: '2025-05-01', 
            metrics: { type: 'views', target: 75000 },
            status: 'in-progress',
            actualMetrics: { views: 32000, likes: 4100, comments: 780 }
          },
          { 
            id: 3, 
            description: 'TikTok demo series (3 videos)', 
            dueDate: '2025-06-01', 
            metrics: { type: 'views', target: 100000 },
            status: 'pending'
          }
        ],
        additionalTerms: 'Influencer will be provided with product samples. All content must be approved by company before posting.'
      },
      '2': { 
        id: '2', 
        title: 'Tech Review Series', 
        influencer: {
          name: 'Jordan Smith',
          email: 'jordan@techreviews.example.com',
          socialMediaHandles: {
            youtube: 'JordanTechReviews',
            twitter: 'jordantechreviews'
          }
        },
        status: 'active', 
        createdAt: '2025-03-20',
        equityDetails: {
          percentageOffered: 0.5,
          vestingPeriod: 12,
          cliffPeriod: 2,
          vestedToDate: 0.125
        },
        deliverables: [
          { 
            id: 1, 
            description: 'YouTube in-depth product review', 
            dueDate: '2025-04-10', 
            metrics: { type: 'views', target: 40000 },
            status: 'completed',
            actualMetrics: { views: 52000, likes: 4800, comments: 950 }
          },
          { 
            id: 2, 
            description: 'Comparison video with competitors', 
            dueDate: '2025-05-15', 
            metrics: { type: 'views', target: 35000 },
            status: 'pending'
          }
        ],
        additionalTerms: 'Review must include benchmark testing and feature comparison with at least 2 competing products.'
      }
    };
    
    // Simulate API fetch delay
    setTimeout(() => {
      if (mockAgreements[agreementId]) {
        setAgreement(mockAgreements[agreementId]);
      }
      setLoading(false);
    }, 500);
  }, [agreementId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading agreement details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!agreement) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Agreement Not Found</h2>
          <p className="mt-2 text-gray-500">The agreement you're looking for doesn't exist or you don't have access to it.</p>
          <div className="mt-6">
            <Link
              href="/dashboard/agreements"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Back to Agreements
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{agreement.title}</h1>
            <p className="text-gray-500">Agreement with {agreement.influencer.name}</p>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Download PDF
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Send Message
            </button>
          </div>
        </div>
        
        <AgreementDetails agreement={agreement} />
      </div>
    </DashboardLayout>
  );
}
