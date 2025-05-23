/*
  # Add Market Phase Analysis Support
  
  1. New Tables
    - edge_validations
      - id (uuid, primary key)
      - user_id (uuid, references profiles)
      - instrument (text)
      - market_phase (text)
      - trending_win_rate (numeric)
      - trending_drawdown (numeric)
      - trending_rr (numeric)
      - ranging_win_rate (numeric)
      - ranging_drawdown (numeric)
      - ranging_rr (numeric)
      - volatile_win_rate (numeric)
      - volatile_drawdown (numeric)
      - volatile_rr (numeric)
      - created_at (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for user data access
*/

-- Create edge_validations table
CREATE TABLE IF NOT EXISTS edge_validations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  instrument text NOT NULL,
  market_phase text NOT NULL,
  trending_win_rate numeric NOT NULL,
  trending_drawdown numeric NOT NULL,
  trending_rr numeric NOT NULL,
  ranging_win_rate numeric NOT NULL,
  ranging_drawdown numeric NOT NULL,
  ranging_rr numeric NOT NULL,
  volatile_win_rate numeric NOT NULL,
  volatile_drawdown numeric NOT NULL,
  volatile_rr numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  -- Add constraint for market phase values
  CONSTRAINT valid_market_phase CHECK (market_phase IN ('trending', 'ranging', 'volatile'))
);

-- Enable RLS
ALTER TABLE edge_validations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own validations"
  ON edge_validations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own validations"
  ON edge_validations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());