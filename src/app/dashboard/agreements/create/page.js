"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AgreementForm from '@/components/forms/AgreementForm';
import AgreementCalculator from '@/components/agreements/AgreementCalculator';

export default function CreateAgreement() {
  const [agreement, setAgreement] = useState({
    title: '',
    influencer: {
      name: '',
      email: '',
      socialMediaHandles: {
        instagram: '',
        tiktok: '',
        youtube: ''
      }
    },
    equityDetails: {
      percentageOffered: 0.5,
      vestingPeriod: 12, // months
      cliffPeriod: 3 // months
    },
    deliverables: [
      { id: 1, description: '', dueDate: '', metrics: { type: 'views', target: 1000 } }
    ],
    additionalTerms: ''
  });

  const handleUpdateAgreement = (updatedValues) => {
    setAgreement({ ...agreement, ...updatedValues });
  };

  const handleUpdateDeliverables = (deliverables) => {
    setAgreement({ ...agreement, deliverables });
  };

  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log('Creating agreement:', agreement);
    // Redirect to agreements list after creation
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Agreement</h1>
          <p className="text-gray-500">Set up an equity agreement with an influencer</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AgreementForm 
              agreement={agreement} 
              onUpdateAgreement={handleUpdateAgreement}
              onUpdateDeliverables={handleUpdateDeliverables}
              onSubmit={handleSubmit}
            />
          </div>
          <div>
            <div className="bg-white shadow rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-medium mb-4">Equity Calculation</h2>
              <AgreementCalculator agreement={agreement} />
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                      Understanding equity for influencers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                      Best practices for performance metrics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                      Template agreement examples
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
