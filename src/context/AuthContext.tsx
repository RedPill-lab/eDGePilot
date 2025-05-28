import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { PlanType } from '../types/pricing';

type Profile = {
  id: string;
  plan: PlanType;
  stripe_customer_id: string | null;
};

type AuthUser = User & {
  profile?: Profile;
  name: string;
  plan: PlanType;
  signalsRemaining: number;
};

type AuthContextType = {
  user: AuthUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { [key: string]: any }) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_SIGNALS = 5;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  };

  // Create enhanced user object with required properties
  const createEnhancedUser = (sessionUser: User, userProfile: Profile | null) => {
    return {
      ...sessionUser,
      profile: userProfile,
      name: sessionUser.user_metadata?.full_name || 'User',
      plan: userProfile?.plan || 'starter',
      signalsRemaining: userProfile?.plan === 'free' ? DEFAULT_SIGNALS : Infinity
    } as AuthUser;
  };

  // Handle auth state reset
  const resetAuthState = () => {
    setUser(null);
    setProfile(null);
    setError(null);
    setIsLoading(false);
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          const enhancedUser = createEnhancedUser(session.user, profile);
          setUser(enhancedUser);
          setProfile(profile);
        } else {
          resetAuthState();
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        if (err.message?.includes('refresh_token_not_found')) {
          resetAuthState();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
            resetAuthState();
            return;
          }

          if (event === 'TOKEN_REFRESHED' && !session) {
            resetAuthState();
            return;
          }

          if (session?.user) {
            const profile = await fetchProfile(session.user.id);
            const enhancedUser = createEnhancedUser(session.user, profile);
            setUser(enhancedUser);
            setProfile(profile);
          } else {
            resetAuthState();
          }
        } catch (err) {
          console.error('Auth state change error:', err);
          resetAuthState();
        } finally {
          setIsLoading(false);
        }
      }
    );

    // Subscribe to profile changes
    const profileSubscription = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: user ? `id=eq.${user.id}` : undefined
        },
        async (payload) => {
          if (payload.new && user) {
            const newProfile = payload.new as Profile;
            setProfile(newProfile);
            setUser(prev => prev ? createEnhancedUser(prev, newProfile) : null);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      profileSubscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        const profile = await fetchProfile(data.user.id);
        const enhancedUser = createEnhancedUser(data.user, profile);
        setUser(enhancedUser);
        setProfile(profile);
      }
    } catch (err) {
      setError('Invalid email or password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { [key: string]: any }) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      if (data.user) {
        const profile = await fetchProfile(data.user.id);
        const enhancedUser = createEnhancedUser(data.user, profile);
        setUser(enhancedUser);
        setProfile(profile);
      }
    } catch (err) {
      setError('Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      resetAuthState();
    } catch (err) {
      setError('Sign out failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};