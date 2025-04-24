"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Link from 'next/link';

export default function Education() {
  const [activeTab, setActiveTab] = useState('basics');
  
  const tabs = [
    { id: 'basics', name: 'Equity Basics' },
    { id: 'templates', name: 'Agreement Templates' },
    { id: 'metrics', name: 'Performance Metrics' },
    { id: 'case-studies', name: 'Case Studies' },
    { id: 'faq', name: 'FAQ' },
  ];
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Educational Resources</h1>
          <p className="text-gray-500">Learn about equity agreements and influencer partnerships</p>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'basics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Understanding Equity for Influencers</h2>
                <div className="prose max-w-none">
                  <h3>What is equity?</h3>
                  <p>
                    Equity represents ownership in a company. When a startup offers equity to an influencer, they're offering a percentage of ownership in the business, which may become valuable if the company grows or gets acquired.
                  </p>
                  
                  <h3>Key equity concepts</h3>
                  <ul>
                    <li><strong>Vesting</strong>: The process by which an influencer earns their equity over time or based on achieving specific milestones.</li>
                    <li><strong>Cliff</strong>: A period after which the first portion of equity vests. For example, with a 1-year cliff, no equity vests until the 1-year mark.</li>
                    <li><strong>Dilution</strong>: As companies raise more funding, new shares are created, which reduces the percentage ownership of existing shareholders.</li>
                    <li><strong>Liquidation preference</strong>: Determines the order in which different shareholders get paid in the event of a company sale.</li>
                  </ul>
                  
                  <h3>Equity vs. cash compensation</h3>
                  <p>
                    Unlike cash, equity's value is tied to the company's future success. It could become worth much more than the equivalent cash payment if the company grows significantly, but it could also become worth nothing if the company fails.
                  </p>
                  
                  <h3>Taxable events</h3>
                  <p>
                    Receiving and selling equity can trigger tax obligations. It's important for influencers to consult with a tax professional to understand their responsibilities.
                  </p>
                  
                  <div className="mt-6 border-t pt-6">
                    <h3>Equity Agreement Calculators</h3>
                    <p>Use our calculators to better understand the potential value of equity compensation:</p>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Link
                        href="#"
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">Equity Value Calculator</p>
                          <p className="text-sm text-gray-500">Estimate future value based on growth projections</p>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">Vesting Schedule Calculator</p>
                          <p className="text-sm text-gray-500">Visualize equity vesting over time</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'templates' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Agreement Templates</h2>
                <div className="prose max-w-none">
                  <p>
                    Our platform offers several agreement templates designed for different types of influencer partnerships. Each template is legally sound and can be customized to fit your specific needs.
                  </p>
                  
                  <h3>Available Templates</h3>
                  <div className="mt-4 space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-bold">Standard Influencer Equity Agreement</h4>
                      <p className="text-sm text-gray-500">
                        Basic template with time-based vesting. Suitable for long-term partnerships with established influencers.
                      </p>
                      <div className="mt-2">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          View template
                        </Link>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-bold">Performance-Based Equity Agreement</h4>
                      <p className="text-sm text-gray-500">
                        Links equity vesting to specific performance metrics like views, engagement, or conversions.
                      </p>
                      <div className="mt-2">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          View template
                        </Link>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-bold">Milestone-Based Equity Agreement</h4>
                      <p className="text-sm text-gray-500">
                        Ties equity vesting to achieving specific campaign milestones rather than continuous metrics.
                      </p>
                      <div className="mt-2">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          View template
                        </Link>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-bold">Hybrid Cash/Equity Agreement</h4>
                      <p className="text-sm text-gray-500">
                        Combines upfront cash payment with equity incentives for balanced compensation.
                      </p>
                      <div className="mt-2">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          View template
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="mt-8">Customization Guidelines</h3>
                  <p>
                    When customizing an agreement template, consider the following key factors:
                  </p>
                  <ul>
                    <li>Equity amount: Typically ranges from 0.1% to 2% depending on the influencer's reach and the company's stage</li>
                    <li>Vesting period: Usually 12-36 months depending on the partnership duration</li>
                    <li>Performance metrics: Choose metrics that align with your business goals (views, engagement, click-through rates, etc.)</li>
                    <li>Cliff period: Commonly 3-6 months to ensure commitment before any equity vests</li>
                    <li>Termination conditions: Define what happens if either party ends the relationship early</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Understanding Performance Metrics</h2>
                <div className="prose max-w-none">
                  <p>
                    Selecting the right performance metrics is crucial for an effective influencer equity agreement. 
                    Here's guidance on choosing and tracking the most relevant metrics.
                  </p>
                  
                  <h3>Key Performance Metrics</h3>
                  <div className="mt-4 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platforms</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Considerations</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Views/Impressions</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Brand awareness</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All platforms</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Easy to measure but doesn't indicate engagement quality</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Engagement Rate</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Audience interaction</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Instagram, Facebook, Twitter</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Combines likes, comments, shares; better indicator of resonance</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Click-Through Rate</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Traffic generation</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All platforms with link options</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Measures action beyond passive viewing</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Conversions</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Direct sales</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All platforms</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Requires tracking codes or dedicated landing pages</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Follower Growth</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Long-term value</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All platforms</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Indicates sustained interest in your brand</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h3 className="mt-8">Setting Realistic Targets</h3>
                  <p>
                    When establishing performance targets for equity vesting:
                  </p>
                  <ul>
                    <li>Research industry benchmarks for the influencer's niche and platform</li>
                    <li>Consider the influencer's historical performance metrics</li>
                    <li>Start with conservative targets and adjust based on initial results</li>
                    <li>Create tiered vesting levels to reward overperformance</li>
                  </ul>
                  
                  <h3>Tracking and Attribution</h3>
                  <p>
                    Our platform integrates with major social media platforms to automatically track performance. 
                    For platforms without direct API access, we provide:
                  </p>
                  <ul>
                    <li>Custom UTM link generators</li>
                    <li>Unique discount/promo codes</li>
                    <li>Manual data input options with verification</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'case-studies' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Case Studies</h2>
                <div className="prose max-w-none">
                  <p>
                    Explore real-world examples of successful influencer equity partnerships.
                    These case studies demonstrate how startups have effectively structured agreements
                    and the results they've achieved.
                  </p>
                  
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-lg">FitTech & @FitnessGuru</h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium">Industry: Health & Fitness</p>
                        <p>Equity Offered: 1.5% with 2-year vesting</p>
                        <p>Campaign Type: Product demonstrations & workout integration</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium">Results:</h4>
                        <ul className="mt-2 list-disc pl-5">
                          <li>350,000+ views across 12 posts</li>
                          <li>5.2% average engagement rate</li>
                          <li>8,200+ product sales attributed</li>
                          <li>ROI: 3.7x compared to traditional marketing</li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          Read full case study
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-lg">EcoBeauty & Beauty Influencer Network</h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium">Industry: Cosmetics</p>
                        <p>Equity Offered: 0.25% each to 5 micro-influencers</p>
                        <p>Campaign Type: Product reviews & tutorials</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium">Results:</h4>
                        <ul className="mt-2 list-disc pl-5">
                          <li>1.2M+ combined views</li>
                          <li>62% increase in social media followers</li>
                          <li>42% increase in website traffic</li>
                          <li>ROI: 2.8x compared to traditional marketing</li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          Read full case study
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-lg">TechGadget & @TechReviewer</h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium">Industry: Consumer Electronics</p>
                        <p>Equity Offered: 0.75% with performance acceleration</p>
                        <p>Campaign Type: In-depth product reviews & comparisons</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium">Results:</h4>
                        <ul className="mt-2 list-disc pl-5">
                          <li>500,000+ YouTube views</li>
                          <li>11,500+ sales with influencer discount code</li>
                          <li>4.1% conversion rate (2x industry average)</li>
                          <li>ROI: 4.2x compared to traditional marketing</li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          Read full case study
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-lg">SaaS Platform & @B2BThought</h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium">Industry: B2B Software</p>
                        <p>Equity Offered: 0.5% with milestone-based vesting</p>
                        <p>Campaign Type: Thought leadership content & webinars</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium">Results:</h4>
                        <ul className="mt-2 list-disc pl-5">
                          <li>150,000+ LinkedIn impressions</li>
                          <li>3,200+ webinar attendees</li>
                          <li>185 enterprise leads generated</li>
                          <li>ROI: 5.7x compared to traditional marketing</li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                          Read full case study
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                <div className="prose max-w-none">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium">What is an Influencer Equity Agreement (IEA)?</h3>
                      <p>
                        An IEA is a legal agreement between a startup and an influencer that offers company equity in exchange for marketing services. 
                        It specifies the amount of equity, vesting schedule, and performance requirements.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">How much equity should I offer an influencer?</h3>
                      <p>
                        Equity offers typically range from 0.1% to 2% depending on the influencer's reach, the company's stage, 
                        and the scope of the marketing campaign. For early-stage startups, 0.5-1% is common for significant partnerships.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">What's the difference between time-based and performance-based vesting?</h3>
                      <p>
                        Time-based vesting releases equity based on the passage of time (e.g., monthly over 2 years). 
                        Performance-based vesting releases equity when specific metrics or milestones are achieved (e.g., reaching 100,000 views).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Do I need a lawyer to review my agreement?</h3>
                      <p>
                        While our templates are designed to be legally sound, we recommend having a lawyer review agreements, 
                        especially for larger equity grants or complex arrangements. The platform allows you to share agreements with legal advisors before finalization.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">What happens if an influencer doesn't meet the performance requirements?</h3>
                      <p>
                        If performance requirements aren't met, the specified portion of equity doesn't vest. 
                        Agreements can be structured with partial vesting for partial achievement or all-or-nothing conditions.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">How do influencers report and pay taxes on equity?</h3>
                      <p>
                        Tax implications vary by country and equity structure. Generally, influencers may owe taxes when equity vests (for RSUs) 
                        or when they sell shares. We recommend both parties consult with tax professionals.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Can I combine cash and equity compensation?</h3>
                      <p>
                        Yes, hybrid models are common and often effective. Our platform supports creating agreements with 
                        both cash and equity components, allowing for balanced compensation that meets immediate needs while offering long-term incentives.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">What metrics should I track for performance-based agreements?</h3>
                      <p>
                        The most relevant metrics depend on your business goals. Common options include views/impressions, engagement rate, 
                        click-through rate, conversions, or follower growth. Our platform can help you determine appropriate metrics and targets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
