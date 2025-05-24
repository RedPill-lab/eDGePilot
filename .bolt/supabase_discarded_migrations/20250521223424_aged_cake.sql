/*
  # Create Demo Accounts

  1. New Data
    - Creates demo user accounts
    - Sets up their profiles with appropriate plans
    - Adds mock subscription data
  
  2. Security
    - Uses secure password hashing
    - Maintains RLS policies
*/

-- Create demo users in auth.users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
  -- Free demo account
  ('00000000-0000-0000-0000-000000000001', 'demo@example.com', 
   crypt('password123', gen_salt('bf')), -- Hash password
   now(), now(), now()),
  -- Premium demo account  
  ('00000000-0000-0000-0000-000000000002', 'premium@example.com',
   crypt('password123', gen_salt('bf')), -- Hash password
   now(), now(), now());

-- Create profiles for demo users
INSERT INTO public.profiles (id, plan, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'starter', now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'pro', now(), now());

-- Create mock Stripe customers
INSERT INTO public.stripe_customers (user_id, customer_id, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'cus_demo1', now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'cus_demo2', now(), now());

-- Create mock subscription for premium user
INSERT INTO public.stripe_subscriptions (
  customer_id,
  subscription_id,
  price_id,
  status,
  current_period_start,
  current_period_end,
  created_at,
  updated_at
)
VALUES
  ('cus_demo2', 'sub_demo2', 'price_demo2', 'active', 
   extract(epoch from now())::bigint,
   extract(epoch from (now() + interval '1 month'))::bigint,
   now(), now());