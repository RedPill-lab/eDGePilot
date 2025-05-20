import { ReactNode } from 'react';

// ... (previous type definitions)

export type IndicatorStrategy = {
  preset: 'balanced' | 'trend' | 'reversal' | 'support' | 'custom';
  indicators: string[];
};

export type AnalysisState = {
  instrument: Instrument | null;
  strategy: StrategyType | null;
  propFirmSettings: PropFirmSettings | null;
  brokerSettings: BrokerSettings | null;
  selectedBrokerProfile: BrokerProfile | null;
  indicatorStrategy: IndicatorStrategy | null;
  stages: AnalysisStage[];
  currentStage: number;
  isLoading: boolean;
  error: string | null;
};

// ... (remaining type definitions)