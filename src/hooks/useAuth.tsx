import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, getCurrentUser, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    getCurrentUser().then(({ user, error }) => {
      if (user && !error) {
        setUser({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name,
          created_at: user.created_at
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name,
            created_at: session.user.created_at
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabaseSignIn(email, password);
      
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message || "Failed to sign in. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      if (data?.user) {
        toast({
          title: "Welcome Back!",
          description: "You have successfully signed in to AetherScope.",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabaseSignUp(email, password, fullName);
      
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message || "Failed to create account. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      if (data?.user) {
        toast({
          title: "Account Created!",
          description: "Welcome to AetherScope! Please check your email to verify your account.",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign Up Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabaseSignOut();
      
      if (error) {
        toast({
          title: "Sign Out Failed",
          description: error.message || "Failed to sign out. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign Out Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for checking authentication status
export const useAuthStatus = () => {
  const { user, loading } = useAuth();
  return {
    isAuthenticated: !!user,
    user,
    loading
  };
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { isAuthenticated, loading } = useAuthStatus();
    
    if (loading) {
      return (
        <div className="min-h-screen bg-background neural-grid flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-background neural-grid flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">Please sign in to access this page.</p>
            <a href="/auth" className="cyber-button inline-flex items-center px-6 py-3">
              Sign In
            </a>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};