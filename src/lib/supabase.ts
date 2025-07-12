import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These values should be replaced with your actual Supabase project credentials
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key-here';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Authentication functions
export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { data: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    console.error('Get user error:', error);
    return { user: null, error };
  }
};

// Database functions for agent activities
export const saveAgentActivity = async (activityData: {
  agent_address: string;
  action: string;
  summary: string;
  platform: string;
  status: string;
  metadata?: any;
}) => {
  try {
    const { data, error } = await supabase
      .from('agent_activities')
      .insert([activityData])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Save agent activity error:', error);
    return { data: null, error };
  }
};

export const getAgentActivities = async (limit = 50) => {
  try {
    const { data, error } = await supabase
      .from('agent_activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get agent activities error:', error);
    return { data: null, error };
  }
};

// Real-time subscriptions
export const subscribeToAgentActivities = (callback: (payload: any) => void) => {
  return supabase
    .channel('agent_activities')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'agent_activities'
    }, callback)
    .subscribe();
};

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { user } = await getCurrentUser();
  return !!user;
};

// Configuration object for easy access to Supabase settings
export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseKey,
  features: {
    auth: true,
    database: true,
    realtime: true,
    storage: true
  }
};