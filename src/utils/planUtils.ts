import { PlanType, UserSubscription } from '../types/pricing';

export const canAccessFeature = (
  feature: string,
  subscription: UserSubscription | null
): boolean => {
  if (!subscription) return false;

  // Define feature access by plan
  const featureAccess: Record<string, PlanType[]> = {
    'prop-mode': [PlanType.FUNDED, PlanType.INSTITUTIONAL],
    'unlimited-signals': [PlanType.FUNDED, PlanType.INSTITUTIONAL],
    'strategy-audit': [PlanType.INSTITUTIONAL],
    'arbitrage-alerts': [PlanType.INSTITUTIONAL],
    'telegram-alerts': [PlanType.FUNDED, PlanType.INSTITUTIONAL],
    'backtest': [PlanType.FUNDED, PlanType.INSTITUTIONAL],
  };

  const allowedPlans = featureAccess[feature];
  if (!allowedPlans) return false;

  return allowedPlans.includes(subscription.planId);
};

export const getRemainingSignals = (
  subscription: UserSubscription | null
): number => {
  if (!subscription) return 0;
  
  switch (subscription.planId) {
    case PlanType.STARTER:
      return 3; // 3 signals per day
    case PlanType.FUNDED:
    case PlanType.INSTITUTIONAL:
      return -1; // Unlimited
    default:
      return 0;
  }
};

export const isTrialEligible = (
  subscription: UserSubscription | null,
  planId: PlanType
): boolean => {
  if (!subscription) return true;
  
  // Users can only trial Funded tier
  if (planId !== PlanType.FUNDED) return false;
  
  // Users who had or have Funded/Institutional are not eligible
  if ([PlanType.FUNDED, PlanType.INSTITUTIONAL].includes(subscription.planId)) {
    return false;
  }
  
  // Check if trial period has ended
  return !subscription.trialEndsAt || subscription.trialEndsAt < new Date();
};