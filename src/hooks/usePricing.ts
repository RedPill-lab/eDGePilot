import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  PlanType, 
  BillingInterval, 
  UserSubscription,
  SubscriptionCheckoutOptions 
} from '../types/pricing';
import { pricingConfig, calculatePrice } from '../config/pricing';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const usePricing = () => {
  const [currentPlan, setCurrentPlan] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (options: SubscriptionCheckoutOptions) => {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not initialized');

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });

    const { sessionId } = await response.json();
    return stripe.redirectToCheckout({ sessionId });
  };

  const startTrial = useCallback(async (planId: PlanType) => {
    const plan = pricingConfig.plans.find(p => p.id === planId);
    if (!plan?.trialEnabled) return false;

    setIsLoading(true);
    try {
      await createCheckoutSession({
        planId,
        billingInterval: BillingInterval.MONTHLY,
        isTrial: true,
        successUrl: `${window.location.origin}/dashboard?trial=success`,
        cancelUrl: `${window.location.origin}/pricing?trial=cancelled`
      });
      return true;
    } catch (error) {
      console.error('Failed to start trial:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const subscribe = useCallback(async (
    planId: PlanType,
    billingInterval: BillingInterval,
    addOnIds: string[] = []
  ) => {
    setIsLoading(true);
    try {
      await createCheckoutSession({
        planId,
        billingInterval,
        addOnIds,
        successUrl: `${window.location.origin}/dashboard?subscription=success`,
        cancelUrl: `${window.location.origin}/pricing?subscription=cancelled`
      });
      return true;
    } catch (error) {
      console.error('Failed to subscribe:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelSubscription = useCallback(async () => {
    if (!currentPlan?.stripeSubscriptionId) return false;

    setIsLoading(true);
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: currentPlan.stripeSubscriptionId })
      });

      if (!response.ok) throw new Error('Failed to cancel subscription');
      
      setCurrentPlan(prev => prev ? {
        ...prev,
        cancelAtPeriodEnd: true
      } : null);
      
      return true;
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentPlan]);

  const updateSubscription = useCallback(async (
    planId: PlanType,
    billingInterval: BillingInterval,
    addOnIds: string[] = []
  ) => {
    if (!currentPlan?.stripeSubscriptionId) return false;

    setIsLoading(true);
    try {
      const response = await fetch('/api/update-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: currentPlan.stripeSubscriptionId,
          planId,
          billingInterval,
          addOnIds
        })
      });

      if (!response.ok) throw new Error('Failed to update subscription');
      
      const updatedSubscription = await response.json();
      setCurrentPlan(updatedSubscription);
      
      return true;
    } catch (error) {
      console.error('Failed to update subscription:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentPlan]);

  return {
    currentPlan,
    startTrial,
    subscribe,
    cancelSubscription,
    updateSubscription,
    isSubscribed: !!currentPlan,
    isPro: currentPlan?.planId === PlanType.FUNDED || currentPlan?.planId === PlanType.INSTITUTIONAL,
    isLoading
  };
};