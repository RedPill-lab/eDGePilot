-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create demo users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'starter@example.com', crypt('Demo123!', gen_salt('bf')), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'pro@example.com', crypt('Demo123!', gen_salt('bf')), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create profiles for demo users
INSERT INTO public.profiles (id, plan)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'starter'),
  ('00000000-0000-0000-0000-000000000002', 'pro')
ON CONFLICT (id) DO NOTHING;

-- Create stripe customer records for demo users
INSERT INTO public.stripe_customers (user_id, customer_id)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'cus_demo1'),
  ('00000000-0000-0000-0000-000000000002', 'cus_demo2')
ON CONFLICT (user_id) DO NOTHING;

-- Create subscription for pro user
INSERT INTO public.stripe_subscriptions (
  customer_id,
  subscription_id,
  price_id,
  status,
  current_period_start,
  current_period_end
)
VALUES (
  'cus_demo2',
  'sub_demo2',
  'price_demo2',
  'active',
  extract(epoch from now())::bigint,
  extract(epoch from (now() + interval '1 month'))::bigint
)
ON CONFLICT (customer_id) DO NOTHING;