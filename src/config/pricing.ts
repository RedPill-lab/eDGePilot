import { PlanType, PricingConfig } from '../types/pricing';

export const pricingConfig: PricingConfig = {
  plans: [
    {
      id: PlanType.STARTER,
      name: 'Starter',
      description: 'Perfect for learning the ropes',
      monthlyPrice: 0,
      features: [
        { name: 'Full AI Pipeline', included: true },
        { name: '3 signals/day (EUR/USD only)', included: true },
        { name: 'Dashboard preview', included: true },
        { name: 'Prop Firm Mode', included: false },
        { name: 'Telegram alerts', included: false }
      ],
      maxSignalsPerDay: 3,
      trialEnabled: false,
      referralReward: 0
    },
    {
      id: PlanType.FUNDED,
      name: 'Pro',
      description: 'For serious traders',
      monthlyPrice: 79,
      annualPrice: 799,
      features: [
        { name: 'Unlimited signals', included: true },
        { name: 'All assets (Forex, Indices, Metals)', included: true },
        { name: 'Prop Firm Mode', included: true },
        { name: '100+ strategy backtests', included: true },
        { name: 'Custom agent workflows', included: true },
        { name: 'Telegram alerts', included: true }
      ],
      maxSignalsPerDay: -1, // Unlimited
      trialEnabled: true,
      trialPrice: 1,
      trialDays: 7,
      referralReward: 20
    },
    {
      id: PlanType.INSTITUTIONAL,
      name: 'Edge+',
      description: 'Advanced trading intelligence',
      monthlyPrice: 149,
      features: [
        { name: 'All Pro features', included: true },
        { name: 'Live strategy audits', included: true },
        { name: 'Broker spread arbitrage alerts', included: true },
        { name: '1:1 onboarding call', included: true },
        { name: 'Priority support', included: true }
      ],
      maxSignalsPerDay: -1,
      trialEnabled: false,
      referralReward: 40
    }
  ],
  addOns: [
    {
      id: 'prop-tools',
      name: 'Prop Tools',
      description: 'Essential tools for prop firm challenges',
      price: 29,
      features: [
        { name: 'FTMO/MFF challenge analytics', included: true },
        { name: 'Drawdown tracking', included: true },
        { name: 'Simulated payout reports', included: true }
      ]
    }
  ],
  referralEnabled: true,
  trialEnabled: true
};

export const getPlan = (planId: PlanType): Plan | undefined => {
  return pricingConfig.plans.find(plan => plan.id === planId);
};

export const getAddOn = (addOnId: string): AddOn | undefined => {
  return pricingConfig.addOns.find(addOn => addOn.id === addOnId);
};

export const calculatePrice = (
  planId: PlanType,
  billingInterval: BillingInterval,
  addOnIds: string[] = []
): number => {
  const plan = getPlan(planId);
  if (!plan) return 0;

  let price = billingInterval === BillingInterval.ANNUAL 
    ? (plan.annualPrice || plan.monthlyPrice * 12)
    : plan.monthlyPrice;

  // Add price of add-ons
  price += addOnIds.reduce((total, addOnId) => {
    const addOn = getAddOn(addOnId);
    return total + (addOn?.price || 0);
  }, 0);

  return price;
};