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
  features: PlanFeature[];
}

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice?: number;
  features: PlanFeature[];
  maxSignalsPerDay: number;
  trialEnabled: boolean;
  trialPrice?: number;
  trialDays?: number;
  referralReward: number; // Amount in USD earned per referral
}

export interface UserSubscription {
  planId: PlanType;
  billingInterval: BillingInterval;
  addOns: string[]; // Array of add-on IDs
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