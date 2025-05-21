import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import Stripe from 'npm:stripe@14.14.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    );

    switch (event.type) {
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;
        const attemptCount = invoice.attempt_count || 0;

        // After 3 failed attempts, downgrade to starter plan
        if (attemptCount >= 3) {
          // Get user profile by Stripe customer ID
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single();

          if (profiles?.id) {
            // Update plan to starter after 7-day grace period
            const gracePeriodEnd = new Date();
            gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 7);

            // Schedule plan downgrade
            await supabase.from('plan_downgrades')
              .insert({
                user_id: profiles.id,
                scheduled_for: gracePeriodEnd.toISOString(),
                reason: 'payment_failure'
              });

            // Send email notification
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: 'EdgePilot <billing@edgepilot.com>',
                to: invoice.customer_email,
                subject: 'Important: Your EdgePilot Plan Will Be Downgraded',
                html: `
                  <p>Hi there,</p>
                  <p>We've been unable to process your payment after multiple attempts. To avoid service interruption, please update your payment method within the next 7 days.</p>
                  <p>If no action is taken, your plan will be automatically downgraded to the Free tier on ${gracePeriodEnd.toLocaleDateString()}.</p>
                  <p><a href="https://edgepilot.com/billing">Update Payment Method</a></p>
                `
              })
            });
          }
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const planId = subscription.items.data[0].price.lookup_key;

        // Update user profile
        await supabase
          .from('profiles')
          .update({
            plan: planId,
            stripe_customer_id: customerId
          })
          .eq('stripe_customer_id', customerId);

        break;
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});