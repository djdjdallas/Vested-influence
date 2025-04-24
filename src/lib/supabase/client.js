import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
// In a real app, you would set these in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

// Auth helper functions
export const signUp = async ({ email, password, metadata }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  
  return { data, error };
};

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
};

// Database helper functions for agreements
export const getAgreements = async (userId) => {
  const { data, error } = await supabase
    .from('agreements')
    .select('*')
    .eq('creator_id', userId);
    
  return { data, error };
};

export const getAgreementById = async (id) => {
  const { data, error } = await supabase
    .from('agreements')
    .select('*')
    .eq('id', id)
    .single();
    
  return { data, error };
};

export const createAgreement = async (agreement) => {
  const { data, error } = await supabase
    .from('agreements')
    .insert([agreement])
    .select();
    
  return { data, error };
};

export const updateAgreement = async (id, updates) => {
  const { data, error } = await supabase
    .from('agreements')
    .update(updates)
    .eq('id', id)
    .select();
    
  return { data, error };
};

// Database helper functions for metrics
export const getMetrics = async (agreementId) => {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('agreement_id', agreementId);
    
  return { data, error };
};

export const createMetricRecord = async (metric) => {
  const { data, error } = await supabase
    .from('metrics')
    .insert([metric])
    .select();
    
  return { data, error };
};
