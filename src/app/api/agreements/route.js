import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase/client';

export async function GET(request) {
  try {
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Mock user ID for demo
    const userId = 'mock-user-id';
    
    // Get search params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Build query
    let query = supabase.from('agreements').select('*').eq('creator_id', userId);
    
    // Add filters if provided
    if (status) {
      query = query.eq('status', status);
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({ agreements: data });
  } catch (error) {
    console.error('Error fetching agreements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Mock user ID for demo
    const userId = 'mock-user-id';
    
    // Add creator ID to agreement data
    const agreementData = {
      ...body,
      creator_id: userId,
      created_at: new Date().toISOString()
    };
    
    // Insert agreement
    const { data, error } = await supabase
      .from('agreements')
      .insert([agreementData])
      .select();
    
    if (error) throw error;
    
    return NextResponse.json({ agreement: data[0] });
  } catch (error) {
    console.error('Error creating agreement:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
