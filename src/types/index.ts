import { ReactNode } from 'react';

export type User = {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium' | 'enterprise';
  signalsRemaining: number;
  settings?: {
    broker?: string;
    customSpread?: number;
    propFirmMode?: {
      enabled: boolean;
      maxDailyDrawdown: number;
      overallDrawdown: number;
      profitTarget: number;
    };
  };
};

export type BrokerProfile = {
  id: string;
  name: string;
  spreads: {
    [key: string]: number; // instrument symbol -> typical spread
  };
  executionModel: 'ECN' | 'MM';
  description?: string;
  isDefault?: boolean;
};

export type Instrument = {
  symbol: string;
  name: string;
  type: 'forex' | 'indices' | 'metals';
};

export type StrategyType = 'intraday' | 'swing' | 'position';

export type PropFirmSettings = {
  enabled: boolean;
  maxDailyDrawdown: number;
  overallDrawdown: number;
  profitTarget: number;
};

export type BrokerSettings = {
  broker: string;
  spread: number;
};

export type MacroAnalysis = {
  summary: string;
  keyFactors: string[];
  economicOutlook: string;
  marketImpact: string;
  bullishFactors: string[];
  bearishFactors: string[];
  overallSentiment: 'bullish' | 'bearish' | 'neutral';
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
};

export type WalkForwardResult = {
  windowStart: string;
  windowEnd: string;
  returnPct: number;
  drawdownPct: number;
  winRate: number;
  trades: number;
  passed: boolean;
};

export type QuantAnalysis = {
  winRate: number;
  expectedReturn: number;
  maxDrawdown: number;
  riskRewardRatio: number;
  sharpeRatio: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  monteCarlo?: {
    simulations: number;
    profitabilityRate: number;
    averageReturn: number;
  };
  propFirmCompliant?: {
    dailyDrawdownCompliant: boolean;
    overallDrawdownCompliant: boolean;
    profitTargetAchievable: boolean;
    riskPerTradeCompliant: boolean;
  };
  walkForward?: {
    enabled: boolean;
    results: WalkForwardResult[];
    summary: {
      avgReturn: number;
      maxDrawdown: number;
      consistencyScore: number;
      bestWindow: {
        start: string;
        end: string;
        return: number;
      };
      worstWindow: {
        start: string;
        end: string;
        return: number;
      };
      passRate: number;
    };
  };
};

export type SentimentAnalysis = {
  overallSentiment: 'bullish' | 'bearish' | 'neutral';
  sentimentScore: number;  // -100 to 100
  sources: {
    source: string;
    sentiment: 'bullish' | 'bearish' | 'neutral';
    weight: number;
  }[];
  keyPhrases: string[];
  recentShift: boolean;
  shiftMagnitude?: number;  // 0 to 100
};

export type TradeSignal = {
  id: string;
  instrument: Instrument;
  strategy: StrategyType;
  action: 'buy' | 'sell';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  adjustedLevels?: {
    entry: number;
    stopLoss: number;
    takeProfit: number;
    spreadBuffer: number;
  };
  confidenceLevel: number;
  rationale: string;
  timestamp: string;
  pipsRisk: number;
  pipsReward: number;
  riskRewardRatio: number;
  propFirmCompliant?: boolean;
};

export type AnalysisStage = 
  | { type: 'macro'; data: MacroAnalysis }
  | { type: 'technical'; data: TechnicalAnalysis }
  | { type: 'quant'; data: QuantAnalysis }
  | { type: 'sentiment'; data: SentimentAnalysis }
  | { type: 'signal'; data: TradeSignal };

export type AnalysisState = {
  instrument: Instrument | null;
  strategy: StrategyType | null;
  propFirmSettings: PropFirmSettings | null;
  brokerSettings: BrokerSettings | null;
  selectedBrokerProfile: BrokerProfile | null;
  stages: AnalysisStage[];
  currentStage: number;
  isLoading: boolean;
  error: string | null;
};

export type FollowerAccount = {
  id: string;
  name: string;
  broker: string;
  spreadBuffer: number;
  active: boolean;
  lastSync?: string;
  trades?: number;
  winRate?: number;
  symbolSuffix?: string;
  executionModel?: 'ECN' | 'MM';
  riskMode?: 'fixed' | 'percentage' | 'match';
  maxRiskPerTrade?: number;
  maxDailyDrawdown?: number;
  slBuffer?: number;
  tpBuffer?: number;
  entryBuffer?: number;
  delayOffset?: number;
  autoDisableRules?: {
    propRulesViolated: boolean;
    masterDrawdownBreached: boolean;
    excludedInstruments: string[];
  };
};

export type AdjustedSignal = {
  originalSignal: TradeSignal;
  adjustedLevels: {
    entry: number;
    stopLoss: number;
    takeProfit: number;
    spreadBuffer: number;
  };
  follower: FollowerAccount;
};