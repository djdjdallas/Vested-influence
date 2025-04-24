import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase/client';

export async function GET(request) {
  try {
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Get current user profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Update profile
    const { data, error } = await supabase
      .from('profiles')
      .update(body)
      .eq('id', user.id)
      .select();
    
    if (error) throw error;
    
    return NextResponse.json({ profile: data[0] });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
