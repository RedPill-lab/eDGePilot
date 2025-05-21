/*
  # Create Demo Accounts

  1. Changes
    - Create demo users with confirmed emails
    - Set up profiles with appropriate plans
    - Add mock Stripe customer and subscription records
    
  2. Security
    - Uses secure password hashing
    - Sets up proper foreign key relationships
    
  3. Notes
    - Checks for existing records before inserting
    - Uses DO blocks for conditional inserts
*/

-- Create demo users in auth.users if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001') THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES
      ('00000000-0000-0000-0000-000000000001', 'demo@example.com', 
       crypt('password123', gen_salt('bf')),
       now(), now(), now());
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000002') THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES
      ('00000000-0000-0000-0000-000000000002', 'premium@example.com',
       crypt('password123', gen_salt('bf')),
       now(), now(), now());
  END IF;
END $$;

-- Create profiles for demo users if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000001') THEN
    INSERT INTO public.profiles (id, plan, created_at, updated_at)
    VALUES ('00000000-0000-0000-0000-000000000001', 'starter', now(), now());
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000002') THEN
    INSERT INTO public.profiles (id, plan, created_at, updated_at)
    VALUES ('00000000-0000-0000-0000-000000000002', 'pro', now(), now());
  END IF;
END $$;

-- Create mock Stripe customers if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.stripe_customers WHERE user_id = '00000000-0000-0000-0000-000000000001') THEN
    INSERT INTO public.stripe_customers (id, user_id, customer_id, created_at, updated_at)
    VALUES (1, '00000000-0000-0000-0000-000000000001', 'cus_demo1', now(), now());
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM public.stripe_customers WHERE user_id = '00000000-0000-0000-0000-000000000002') THEN
    INSERT INTO public.stripe_customers (id, user_id, customer_id, created_at, updated_at)
    VALUES (2, '00000000-0000-0000-0000-000000000002', 'cus_demo2', now(), now());
  END IF;
END $$;

-- Create mock subscription for premium user if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.stripe_subscriptions WHERE customer_id = 'cus_demo2') THEN
    INSERT INTO public.stripe_subscriptions (
      id,
      customer_id,
      subscription_id,
      price_id,
      status,
      current_period_start,
      current_period_end,
      created_at,
      updated_at
    )
    VALUES (
      1,
      'cus_demo2',
      'sub_demo2',
      'price_demo2',
      'active',
      extract(epoch from now())::bigint,
      extract(epoch from (now() + interval '1 month'))::bigint,
      now(),
      now()
    );
  END IF;
END $$;