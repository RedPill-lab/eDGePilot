import { Stripe } from '@stripe/stripe-js';

export enum PlanType {
  STARTER = 'starter',
  FUNDED = 'funded',
  INSTITUTIONAL = 'institutional'
}

export enum BillingInterval {
  MONTHLY = 'monthly',
  ANNUAL = 'annual'
}

export interface PlanFeature {
  name: string;
  description?: string;
  included: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
  features: PlanFeature[];
}

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice?: number;
  stripePriceId: {
    monthly: string;
    annual?: string;
  };
  features: PlanFeature[];
  maxSignalsPerDay: number;
  trialEnabled: boolean;
  trialPrice?: number;
  trialDays?: number;
  referralReward: number;
}

export interface UserSubscription {
  planId: PlanType;
  billingInterval: BillingInterval;
  addOns: string[];
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  trialEndsAt?: Date;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date;
}

export interface PricingConfig {
  plans: Plan[];
  addOns: AddOn[];
  referralEnabled: boolean;
  trialEnabled: boolean;
}

export interface SubscriptionCheckoutOptions {
  planId: PlanType;
  billingInterval: BillingInterval;
  addOnIds?: string[];
  isTrial?: boolean;
  successUrl: string;
  cancelUrl: string;
}