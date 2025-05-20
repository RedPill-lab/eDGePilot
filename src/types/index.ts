import { ReactNode } from 'react';

// ... (previous type definitions)

export type IndicatorSignal = {
  name: string;
  signal: 'bullish' | 'bearish' | 'neutral';
  strength: number; // 0-100
  description: string;
};

export type ConfluenceScore = {
  signals: IndicatorSignal[];
  totalSignals: number;
  alignedSignals: number;
  confluencePercentage: number;
  overallSignal: 'bullish' | 'bearish' | 'neutral';
};

export type TechnicalAnalysis = {
  rsi: number;
  ema50: number;
  ema200: number;
  supportLevels: number[];
  resistanceLevels: number[];
  supplyZones: {min: number, max: number}[];
  demandZones: {min: number, max: number}[];
  rateOfChange: number;
  trend: 'uptrend' | 'downtrend' | 'sideways';
  keyLevels: {price: number, type: 'support' | 'resistance', strength: number}[];
  confluence: ConfluenceScore;
};

// ... (remaining type definitions)