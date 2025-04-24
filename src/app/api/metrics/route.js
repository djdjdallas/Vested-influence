import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase/client';

export async function GET(request) {
  try {
    // Get search params
    const { searchParams } = new URL(request.url);
    const agreementId = searchParams.get('agreementId');
    
    if (!agreementId) {
      return NextResponse.json({ error: 'Agreement ID is required' }, { status: 400 });
    }
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // In a real app, check if user has access to this agreement's metrics
    
    // Fetch metrics
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('agreement_id', agreementId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json({ metrics: data });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.agreementId || !body.date || !body.metrics) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // In a real app, check if user has access to add metrics to this agreement
    
    // Format metrics data
    const metricsData = {
      agreement_id: body.agreementId,
      date: body.date,
      metrics: body.metrics,
      created_at: new Date().toISOString(),
      source: body.source || 'manual'
    };
    
    // Insert metrics
    const { data, error } = await supabase
      .from('metrics')
      .insert([metricsData])
      .select();
    
    if (error) throw error;
    
    return NextResponse.json({ metric: data[0] });
  } catch (error) {
    console.error('Error creating metric:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
