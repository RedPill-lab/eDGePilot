import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubscriptionStatus } from '../lib/stripe';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    async function fetchSubscription() {
      try {
        const data = await getSubscriptionStatus();
        setSubscription(data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError('Failed to load subscription status');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubscription();
  }, [user]);

  return {
    subscription,
    isLoading,
    error,
    isActive: subscription?.subscription_status === 'active',
    isTrialing: subscription?.subscription_status === 'trialing',
    isCanceled: subscription?.subscription_status === 'canceled',
    willCancel: subscription?.cancel_at_period_end,
    currentPeriodEnd: subscription?.current_period_end
      ? new Date(subscription.current_period_end * 1000)
      : null,
  };
}