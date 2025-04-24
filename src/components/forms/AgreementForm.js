"use client";

import { useState } from 'react';

export default function AgreementForm({ agreement, onUpdateAgreement, onUpdateDeliverables, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested values
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      onUpdateAgreement({
        [parent]: {
          ...agreement[parent],
          [child]: value
        }
      });
    } else {
      onUpdateAgreement({ [name]: value });
    }
  };

  const handleEquityChange = (e) => {
    const { name, value } = e.target;
    onUpdateAgreement({
      equityDetails: {
        ...agreement.equityDetails,
        [name]: parseFloat(value)
      }
    });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    onUpdateAgreement({
      influencer: {
        ...agreement.influencer,
        socialMediaHandles: {
          ...agreement.influencer.socialMediaHandles,
          [name]: value
        }
      }
    });
  };

  const handleDeliverableChange = (index, field, value) => {
    const updatedDeliverables = [...agreement.deliverables];
    
    if (field === 'metrics.type' || field === 'metrics.target') {
      const [metricsField, metricsSubfield] = field.split('.');
      updatedDeliverables[index] = {
        ...updatedDeliverables[index],
        [metricsField]: {
          ...updatedDeliverables[index][metricsField],
          [metricsSubfield]: metricsSubfield === 'target' ? parseInt(value) : value
        }
      };
    } else {
      updatedDeliverables[index] = {
        ...updatedDeliverables[index],
        [field]: value
      };
    }
    
    onUpdateDeliverables(updatedDeliverables);
  };

  const addDeliverable = () => {
    const newId = Math.max(0, ...agreement.deliverables.map(d => d.id)) + 1;
    const newDeliverable = {
      id: newId,
      description: '',
      dueDate: '',
      metrics: { type: 'views', target: 1000 }
    };
    
    onUpdateDeliverables([...agreement.deliverables, newDeliverable]);
  };

  const removeDeliverable = (id) => {
    if (agreement.deliverables.length <= 1) return;
    
    const updatedDeliverables = agreement.deliverables.filter(d => d.id !== id);
    onUpdateDeliverables(updatedDeliverables);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Agreement Details</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Agreement Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={agreement.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. Instagram Product Promotion Campaign"
            />
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium mb-4">Influencer Information</h3>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="influencer.name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="influencer.name"
                  id="influencer.name"
                  value={agreement.influencer.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="influencer.email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="influencer.email"
                  id="influencer.email"
                  value={agreement.influencer.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram Handle</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">@</span>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    value={agreement.influencer.socialMediaHandles.instagram}
                    onChange={handleSocialMediaChange}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">TikTok Handle</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">@</span>
                  <input
                    type="text"
                    name="tiktok"
                    id="tiktok"
                    value={agreement.influencer.socialMediaHandles.tiktok}
                    onChange={handleSocialMediaChange}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">YouTube Channel</label>
                <input
                  type="text"
                  name="youtube"
                  id="youtube"
                  value={agreement.influencer.socialMediaHandles.youtube}
                  onChange={handleSocialMediaChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium mb-4">Equity Details</h3>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label htmlFor="percentageOffered" className="block text-sm font-medium text-gray-700">Equity Percentage</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="percentageOffered"
                    id="percentageOffered"
                    step="0.1"
                    min="0.1"
                    max="10"
                    value={agreement.equityDetails.percentageOffered}
                    onChange={handleEquityChange}
                    className="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="vestingPeriod" className="block text-sm font-medium text-gray-700">Vesting Period</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="vestingPeriod"
                    id="vestingPeriod"
                    min="1"
                    max="48"
                    value={agreement.equityDetails.vestingPeriod}
                    onChange={handleEquityChange}
                    className="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">months</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="cliffPeriod" className="block text-sm font-medium text-gray-700">Cliff Period</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="cliffPeriod"
                    id="cliffPeriod"
                    min="0"
                    max="12"
                    value={agreement.equityDetails.cliffPeriod}
                    onChange={handleEquityChange}
                    className="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium">Deliverables & Metrics</h3>
              <button
                type="button"
                onClick={addDeliverable}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Add Deliverable
              </button>
            </div>
            
            {agreement.deliverables.map((deliverable, index) => (
              <div key={deliverable.id} className="mb-6 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-gray-700">Deliverable {index + 1}</h4>
                  {agreement.deliverables.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDeliverable(deliverable.id)}
                      className="text-red-600 hover:text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor={`deliverable-${index}-description`} className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      type="text"
                      id={`deliverable-${index}-description`}
                      value={deliverable.description}
                      onChange={(e) => handleDeliverableChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="e.g. Create 3 Instagram posts featuring our product"
                    />
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor={`deliverable-${index}-dueDate`} className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                      type="date"
                      id={`deliverable-${index}-dueDate`}
                      value={deliverable.dueDate}
                      onChange={(e) => handleDeliverableChange(index, 'dueDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor={`deliverable-${index}-metrics-type`} className="block text-sm font-medium text-gray-700">Metric Type</label>
                    <select
                      id={`deliverable-${index}-metrics-type`}
                      value={deliverable.metrics.type}
                      onChange={(e) => handleDeliverableChange(index, 'metrics.type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="views">Views</option>
                      <option value="likes">Likes</option>
                      <option value="comments">Comments</option>
                      <option value="shares">Shares</option>
                      <option value="clicks">Clicks</option>
                      <option value="conversions">Conversions</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <label htmlFor={`deliverable-${index}-metrics-target`} className="block text-sm font-medium text-gray-700">Target</label>
                    <input
                      type="number"
                      id={`deliverable-${index}-metrics-target`}
                      value={deliverable.metrics.target}
                      onChange={(e) => handleDeliverableChange(index, 'metrics.target', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <label htmlFor="additionalTerms" className="block text-sm font-medium text-gray-700">Additional Terms (Optional)</label>
            <textarea
              name="additionalTerms"
              id="additionalTerms"
              rows="3"
              value={agreement.additionalTerms}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Any additional terms or conditions for this agreement..."
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {/* Handle cancel */}}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={onSubmit}
            >
              Create Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
