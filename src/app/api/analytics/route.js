import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase/client';

export async function GET(request) {
  try {
    // Get search params for filtering
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d'; // default to 30 days
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Mock user ID for demo
    const userId = 'mock-user-id';
    
    // Calculate date range based on timeRange
    const endDate = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case 'ytd':
        startDate = new Date(endDate.getFullYear(), 0, 1); // Jan 1 of current year
        break;
      default:
        startDate.setDate(endDate.getDate() - 30);
    }
    
    // Format dates for the database query
    const startDateStr = startDate.toISOString();
    const endDateStr = endDate.toISOString();
    
    // In a real app, these would be actual database queries
    
    // For demo purposes, we'll return mock data
    const mockAnalytics = {
      conversionData: [
        { platform: 'Instagram', conversions: 250, engagementRate: 3.2 },
        { platform: 'TikTok', conversions: 420, engagementRate: 5.7 },
        { platform: 'YouTube', conversions: 180, engagementRate: 2.8 },
        { platform: 'Twitter', conversions: 120, engagementRate: 1.9 },
      ],
      
      equityDistribution: [
        { name: 'Fitness Campaign', value: 1.0 },
        { name: 'Tech Reviews', value: 0.5 },
        { name: 'Fashion Promotion', value: 0.75 },
        { name: 'Cooking Show', value: 0.25 },
      ],
      
      campaignPerformance: [
        { name: 'Jan', fitness: 12000, tech: 18000, fashion: 0, cooking: 0 },
        { name: 'Feb', fitness: 15000, tech: 24000, fashion: 0, cooking: 14000 },
        { name: 'Mar', fitness: 21000, tech: 35000, fashion: 0, cooking: 28000 },
        { name: 'Apr', fitness: 24000, tech: 42000, fashion: 180000, cooking: 32000 },
      ],
      
      roiAnalysis: [
        {
          campaign: 'Fitness Campaign',
          equityValue: '$50,000',
          cashValue: '$12,000',
          engagement: '72,000 views',
          roiMultiple: '4.2x'
        },
        {
          campaign: 'Tech Reviews',
          equityValue: '$25,000',
          cashValue: '$18,000',
          engagement: '119,000 views',
          roiMultiple: '1.4x'
        },
        {
          campaign: 'Fashion Promotion',
          equityValue: '$37,500',
          cashValue: '$35,000',
          engagement: '180,000 views',
          roiMultiple: '1.1x'
        },
        {
          campaign: 'Cooking Show',
          equityValue: '$12,500',
          cashValue: '$8,000',
          engagement: '74,000 views',
          roiMultiple: '1.6x'
        }
      ]
    };
    
    return NextResponse.json(mockAnalytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
