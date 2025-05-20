import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Instrument, 
  StrategyType, 
  AnalysisStage, 
  AnalysisState,
  PropFirmSettings,
  BrokerSettings,
  BrokerProfile,
  IndicatorStrategy
} from '../types';
import { runAnalysisPipeline } from '../services/analysisService';

type AnalysisContextType = {
  analysisState: AnalysisState;
  setInstrument: (instrument: Instrument) => void;
  setStrategy: (strategy: StrategyType) => void;
  setPropFirmSettings: (settings: PropFirmSettings | null) => void;
  setBrokerSettings: (settings: BrokerSettings | null) => void;
  setSelectedBrokerProfile: (profile: BrokerProfile | null) => void;
  setIndicatorStrategy: (strategy: IndicatorStrategy | null) => void;
  startAnalysis: () => Promise<void>;
  resetAnalysis: () => void;
  goToNextStage: () => void;
  goToPreviousStage: () => void;
  goToStage: (index: number) => void;
};

const initialState: AnalysisState = {
  instrument: null,
  strategy: null,
  propFirmSettings: null,
  brokerSettings: null,
  selectedBrokerProfile: null,
  indicatorStrategy: {
    preset: 'balanced',
    indicators: ['ema', 'rsi', 'sr']
  },
  stages: [],
  currentStage: 0,
  isLoading: false,
  error: null,
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>(initialState);

  const setInstrument = (instrument: Instrument) => {
    setAnalysisState((prev) => ({ ...prev, instrument }));
  };

  const setStrategy = (strategy: StrategyType) => {
    setAnalysisState((prev) => ({ ...prev, strategy }));
  };

  const setPropFirmSettings = (settings: PropFirmSettings | null) => {
    setAnalysisState((prev) => ({ ...prev, propFirmSettings: settings }));
  };

  const setBrokerSettings = (settings: BrokerSettings | null) => {
    setAnalysisState((prev) => ({ ...prev, brokerSettings: settings }));
  };

  const setSelectedBrokerProfile = (profile: BrokerProfile | null) => {
    setAnalysisState((prev) => ({ ...prev, selectedBrokerProfile: profile }));
  };

  const setIndicatorStrategy = (strategy: IndicatorStrategy | null) => {
    setAnalysisState((prev) => ({ ...prev, indicatorStrategy: strategy }));
  };

  const startAnalysis = async () => {
    if (!analysisState.instrument || !analysisState.strategy) {
      setAnalysisState((prev) => ({
        ...prev,
        error: 'Please select an instrument and strategy',
      }));
      return;
    }

    setAnalysisState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      stages: [],
      currentStage: 0,
    }));

    try {
      const result = await runAnalysisPipeline(
        analysisState.instrument,
        analysisState.strategy,
        analysisState.propFirmSettings,
        analysisState.brokerSettings,
        analysisState.selectedBrokerProfile,
        analysisState.indicatorStrategy
      );
      
      setAnalysisState((prev) => ({
        ...prev,
        stages: result,
        isLoading: false,
      }));
    } catch (error) {
      setAnalysisState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Analysis failed. Please try again.',
      }));
    }
  };

  const resetAnalysis = () => {
    setAnalysisState(initialState);
  };

  const goToNextStage = () => {
    if (analysisState.currentStage < analysisState.stages.length - 1) {
      setAnalysisState((prev) => ({
        ...prev,
        currentStage: prev.currentStage + 1,
      }));
    }
  };

  const goToPreviousStage = () => {
    if (analysisState.currentStage > 0) {
      setAnalysisState((prev) => ({
        ...prev,
        currentStage: prev.currentStage - 1,
      }));
    }
  };

  const goToStage = (index: number) => {
    if (index >= 0 && index < analysisState.stages.length) {
      setAnalysisState((prev) => ({
        ...prev,
        currentStage: index,
      }));
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisState,
        setInstrument,
        setStrategy,
        setPropFirmSettings,
        setBrokerSettings,
        setSelectedBrokerProfile,
        setIndicatorStrategy,
        startAnalysis,
        resetAnalysis,
        goToNextStage,
        goToPreviousStage,
        goToStage,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};