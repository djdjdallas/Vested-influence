import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase/client';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Fetch agreement
    const { data, error } = await supabase
      .from('agreements')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
      }
      throw error;
    }
    
    // In a real app, check if user has access to this agreement
    // if (data.creator_id !== user.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }
    
    return NextResponse.json({ agreement: data });
  } catch (error) {
    console.error('Error fetching agreement:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // In a real app, check if user has access to update this agreement
    
    // Update agreement
    const { data, error } = await supabase
      .from('agreements')
      .update(body)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
    }
    
    return NextResponse.json({ agreement: data[0] });
  } catch (error) {
    console.error('Error updating agreement:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Get user ID from auth session (in a real app)
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // In a real app, check if user has access to delete this agreement
    
    // Delete agreement
    const { error } = await supabase
      .from('agreements')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting agreement:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
