import { useState, useCallback } from 'react';
import { PlanType, BillingInterval, UserSubscription } from '../types/pricing';
import { pricingConfig, calculatePrice } from '../config/pricing';

export const usePricing = () => {
  const [currentPlan, setCurrentPlan] = useState<UserSubscription | null>(null);

  const startTrial = useCallback(async (planId: PlanType) => {
    const plan = pricingConfig.plans.find(p => p.id === planId);
    if (!plan?.trialEnabled) return false;

    try {
      // TODO: Implement Stripe integration
      return true;
    } catch (error) {
      console.error('Failed to start trial:', error);
      return false;
    }
  }, []);

  const subscribe = useCallback(async (
    planId: PlanType,
    billingInterval: BillingInterval,
    addOnIds: string[] = []
  ) => {
    const price = calculatePrice(planId, billingInterval, addOnIds);
    
    try {
      // TODO: Implement Stripe integration
      return true;
    } catch (error) {
      console.error('Failed to subscribe:', error);
      return false;
    }
  }, []);

  const cancelSubscription = useCallback(async () => {
    try {
      // TODO: Implement Stripe integration
      return true;
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      return false;
    }
  }, []);

  const updateSubscription = useCallback(async (
    planId: PlanType,
    billingInterval: BillingInterval,
    addOnIds: string[] = []
  ) => {
    try {
      // TODO: Implement Stripe integration
      return true;
    } catch (error) {
      console.error('Failed to update subscription:', error);
      return false;
    }
  }, []);

  return {
    currentPlan,
    startTrial,
    subscribe,
    cancelSubscription,
    updateSubscription,
    isSubscribed: !!currentPlan,
    isPro: currentPlan?.planId === PlanType.FUNDED || currentPlan?.planId === PlanType.INSTITUTIONAL,
  };
};