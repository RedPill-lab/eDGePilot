import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createCheckoutSession(priceId: string, mode: 'subscription' | 'payment') {
  try {
    const { data: { session_id } } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: priceId,
        mode,
        success_url: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/pricing?canceled=true`,
      },
    });

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not initialized');

    const { error } = await stripe.redirectToCheckout({ sessionId: session_id });
    if (error) throw error;
  } catch (err) {
    console.error('Error creating checkout session:', err);
    throw err;
  }
}

export async function getSubscriptionStatus() {
  try {
    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching subscription status:', err);
    throw err;
  }
}