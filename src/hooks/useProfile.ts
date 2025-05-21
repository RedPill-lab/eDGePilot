import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { PlanType } from '../types/pricing';

export const useProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePlan = async (plan: PlanType) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ plan })
        .eq('id', user.id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating plan:', err);
      setError('Failed to update plan');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStripeCustomerId = async (stripeCustomerId: string) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', user.id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating Stripe customer ID:', err);
      setError('Failed to update Stripe customer ID');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updatePlan,
    updateStripeCustomerId,
    isLoading,
    error
  };
};