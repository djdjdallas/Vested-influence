"use client";

import { useState } from 'react';
import Link from 'next/link';
import AgreementCalculator from './AgreementCalculator';

export default function AgreementDetails({ agreement }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getStatusBadge = (status) => {
    const styles = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'overdue': 'bg-red-100 text-red-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800'
    };
    
    return styles[status] || 'bg-gray-100 text-gray-800';
  };
  
  const getProgressPercentage = () => {
    if (!agreement.deliverables || agreement.deliverables.length === 0) return 0;
    
    const completed = agreement.deliverables.filter(d => d.status === 'completed').length;
    return Math.round((completed / agreement.deliverables.length) * 100);
  };
  
  const getVestedPercentage = () => {
    return Math.round((agreement.equityDetails.vestedToDate / agreement.equityDetails.percentageOffered) * 100);
  };
  
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'deliverables'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Deliverables
          </button>
          <button
            onClick={() => setActiveTab('equity')}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'equity'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Equity Details
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'terms'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Terms
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-2 flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(agreement.status)}`}>
                    {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <p className="mt-2 text-sm text-gray-900">{formatDate(agreement.createdAt)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Equity Offered</h3>
                <p className="mt-2 text-sm text-gray-900">{agreement.equityDetails.percentageOffered}%</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Progress</h3>
              <div className="mt-4 relative">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-900 font-medium">{getProgressPercentage()}%</span>
                    <span className="text-gray-500"> of deliverables completed</span>
                  </div>
                  <div className="text-gray-500">
                    {agreement.deliverables.filter(d => d.status === 'completed').length} of {agreement.deliverables.length}
                  </div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Vesting Progress</h3>
              <div className="mt-4 relative">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-900 font-medium">{getVestedPercentage()}%</span>
                    <span className="text-gray-500"> of equity vested</span>
                  </div>
                  <div className="text-gray-500">
                    {agreement.equityDetails.vestedToDate}% of {agreement.equityDetails.percentageOffered}%
                  </div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${getVestedPercentage()}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Influencer Information</h3>
              <div className="mt-4 border rounded-md overflow-hidden">
                <dl className="divide-y divide-gray-200">
                  <div className="py-3 px-4 grid grid-cols-2">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="text-sm text-gray-900">{agreement.influencer.name}</dd>
                  </div>
                  <div className="py-3 px-4 grid grid-cols-2">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{agreement.influencer.email}</dd>
                  </div>
                  <div className="py-3 px-4 grid grid-cols-2">
                    <dt className="text-sm font-medium text-gray-500">Social Media</dt>
                    <dd className="text-sm text-gray-900 space-y-1">
                      {agreement.influencer.socialMediaHandles.instagram && (
                        <div>Instagram: @{agreement.influencer.socialMediaHandles.instagram}</div>
                      )}
                      {agreement.influencer.socialMediaHandles.tiktok && (
                        <div>TikTok: @{agreement.influencer.socialMediaHandles.tiktok}</div>
                      )}
                      {agreement.influencer.socialMediaHandles.youtube && (
                        <div>YouTube: {agreement.influencer.socialMediaHandles.youtube}</div>
                      )}
                      {agreement.influencer.socialMediaHandles.twitter && (
                        <div>Twitter: @{agreement.influencer.socialMediaHandles.twitter}</div>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <Link 
                    href={`/dashboard/metrics?agreement=${agreement.id}`}
                    className="block text-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    View Performance Metrics
                  </Link>
                  <button
                    type="button"
                    className="block text-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Update Agreement
                  </button>
                  <button
                    type="button"
                    className="block text-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Add Deliverable
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Recent Activity</h3>
                <div className="mt-4 flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                              <span className="text-lg">📊</span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <p className="text-sm text-gray-900">
                                <span className="font-medium">Metrics updated</span>
                              </p>
                              <p className="mt-0.5 text-sm text-gray-500">Yesterday at 2:30 PM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                              <span className="text-lg">✅</span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <p className="text-sm text-gray-900">
                                <span className="font-medium">Deliverable completed</span>
                              </p>
                              <p className="mt-0.5 text-sm text-gray-500">3 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative">
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                              <span className="text-lg">💬</span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <p className="text-sm text-gray-900">
                                <span className="font-medium">Message received</span>
                              </p>
                              <p className="mt-0.5 text-sm text-gray-500">1 week ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'deliverables' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Deliverables & Performance Metrics</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Add Deliverable
              </button>
            </div>
            
            <div className="space-y-4">
              {agreement.deliverables.map((deliverable) => (
                <div key={deliverable.id} className="border rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-md font-medium">{deliverable.description}</h4>
                        <p className="text-sm text-gray-500">Due: {formatDate(deliverable.dueDate)}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(deliverable.status)}`}>
                        {deliverable.status.charAt(0).toUpperCase() + deliverable.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500">Target Metrics</div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">{deliverable.metrics.type.charAt(0).toUpperCase() + deliverable.metrics.type.slice(1)}:</span> {deliverable.metrics.target.toLocaleString()}
                      </div>
                    </div>
                    
                    {deliverable.actualMetrics && (
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-500">Actual Performance</div>
                        <div className="mt-2 grid grid-cols-3 gap-4">
                          <div className="text-sm">
                            <span className="font-medium">Views:</span> {deliverable.actualMetrics.views.toLocaleString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Likes:</span> {deliverable.actualMetrics.likes.toLocaleString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Comments:</span> {deliverable.actualMetrics.comments.toLocaleString()}
                          </div>
                        </div>
                        
                        {deliverable.metrics.type === 'views' && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <div>
                                <span className="text-gray-900 font-medium">
                                  {Math.round((deliverable.actualMetrics.views / deliverable.metrics.target) * 100)}%
                                </span>
                                <span className="text-gray-500"> of target</span>
                              </div>
                              <div className="text-gray-500">
                                {deliverable.actualMetrics.views.toLocaleString()} of {deliverable.metrics.target.toLocaleString()}
                              </div>
                            </div>
                            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-2 bg-indigo-600 rounded-full"
                                style={{ width: `${Math.min(100, Math.round((deliverable.actualMetrics.views / deliverable.metrics.target) * 100))}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end space-x-3">
                      {deliverable.status === 'pending' && (
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Mark In Progress
                        </button>
                      )}
                      {deliverable.status === 'in-progress' && (
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'equity' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium">Equity Terms</h3>
                <div className="mt-4 border rounded-md overflow-hidden">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 px-4 grid grid-cols-2">
                      <dt className="text-sm font-medium text-gray-500">Total Equity Offered</dt>
                      <dd className="text-sm text-gray-900">{agreement.equityDetails.percentageOffered}%</dd>
                    </div>
                    <div className="py-3 px-4 grid grid-cols-2">
                      <dt className="text-sm font-medium text-gray-500">Vesting Period</dt>
                      <dd className="text-sm text-gray-900">{agreement.equityDetails.vestingPeriod} months</dd>
                    </div>
                    <div className="py-3 px-4 grid grid-cols-2">
                      <dt className="text-sm font-medium text-gray-500">Cliff Period</dt>
                      <dd className="text-sm text-gray-900">{agreement.equityDetails.cliffPeriod} months</dd>
                    </div>
                    <div className="py-3 px-4 grid grid-cols-2">
                      <dt className="text-sm font-medium text-gray-500">Monthly Vesting Rate</dt>
                      <dd className="text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered / agreement.equityDetails.vestingPeriod).toFixed(3)}% per month
                      </dd>
                    </div>
                    <div className="py-3 px-4 grid grid-cols-2">
                      <dt className="text-sm font-medium text-gray-500">Vested to Date</dt>
                      <dd className="text-sm text-gray-900">{agreement.equityDetails.vestedToDate}%</dd>
                    </div>
                    <div className="py-3 px-4 grid grid-cols-2">
                      <dt className="text-sm font-medium text-gray-500">Remaining to Vest</dt>
                      <dd className="text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered - agreement.equityDetails.vestedToDate).toFixed(2)}%
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Vesting Visualization</h3>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <AgreementCalculator agreement={{ equityDetails: agreement.equityDetails }} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Vesting Schedule</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Vesting</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative Vested</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Generate vesting schedule rows here - this is just an example */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">June 15, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3 (Cliff)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered * (agreement.equityDetails.cliffPeriod / agreement.equityDetails.vestingPeriod)).toFixed(3)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered * (agreement.equityDetails.cliffPeriod / agreement.equityDetails.vestingPeriod)).toFixed(3)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Vested
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">July 15, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered / agreement.equityDetails.vestingPeriod).toFixed(3)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered * ((agreement.equityDetails.cliffPeriod + 1) / agreement.equityDetails.vestingPeriod)).toFixed(3)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">August 15, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered / agreement.equityDetails.vestingPeriod).toFixed(3)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(agreement.equityDetails.percentageOffered * ((agreement.equityDetails.cliffPeriod + 2) / agreement.equityDetails.vestingPeriod)).toFixed(3)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Agreement Terms</h3>
              <div className="mt-4 prose prose-indigo max-w-none">
                <p>This Influencer Equity Agreement is entered into between the Company and the Influencer for marketing services in exchange for conditional equity.</p>
                
                <h4>Key Terms:</h4>
                <ul>
                  <li><strong>Total Equity Offered:</strong> {agreement.equityDetails.percentageOffered}% of Company common stock</li>
                  <li><strong>Vesting Period:</strong> {agreement.equityDetails.vestingPeriod} months</li>
                  <li><strong>Cliff Period:</strong> {agreement.equityDetails.cliffPeriod} months</li>
                  <li><strong>Performance Requirements:</strong> As defined in the Deliverables section</li>
                </ul>
                
                <h4>Deliverables:</h4>
                <ul>
                  {agreement.deliverables.map((deliverable) => (
                    <li key={deliverable.id}>
                      {deliverable.description} - Due {formatDate(deliverable.dueDate)}
                      {deliverable.metrics && (
                        <span> ({deliverable.metrics.target.toLocaleString()} {deliverable.metrics.type})</span>
                      )}
                    </li>
                  ))}
                </ul>
                
                <h4>Additional Terms:</h4>
                <p>{agreement.additionalTerms || 'No additional terms specified.'}</p>
                
                <h4>Termination:</h4>
                <p>Either party may terminate this agreement with 14 days written notice. Upon termination:</p>
                <ul>
                  <li>Influencer retains any equity that has already vested prior to termination date.</li>
                  <li>Influencer forfeits rights to any unvested equity.</li>
                  <li>All content created during the agreement period remains available on agreed platforms unless otherwise specified.</li>
                </ul>
                
                <h4>Intellectual Property:</h4>
                <p>Company retains rights to promotional content created under this agreement, while acknowledging Influencer's creative input. Influencer grants Company limited license to use Influencer's name, likeness, and social media handles in connection with the campaign.</p>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium">Agreement History</h3>
              <div className="mt-4 flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="relative flex items-start space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                            <span className="text-lg">📄</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">Agreement created</span>
                            </p>
                            <p className="mt-0.5 text-sm text-gray-500">{formatDate(agreement.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="relative flex items-start space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                            <span className="text-lg">✅</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">Agreement signed by Influencer</span>
                            </p>
                            <p className="mt-0.5 text-sm text-gray-500">{formatDate(agreement.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative">
                      <div className="relative flex items-start space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                            <span className="text-lg">🚀</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">Agreement activated</span>
                            </p>
                            <p className="mt-0.5 text-sm text-gray-500">{formatDate(agreement.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
