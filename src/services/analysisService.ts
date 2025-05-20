import { 
  Instrument, 
  StrategyType, 
  AnalysisStage, 
  PropFirmSettings,
  BrokerSettings,
  BrokerProfile,
  IndicatorStrategy 
} from '../types';
import { mockMacroAnalysis } from './mockData/macroAnalysisData';
import { mockTechnicalAnalysis } from './mockData/technicalAnalysisData';
import { mockQuantAnalysis } from './mockData/quantAnalysisData';
import { mockSentimentAnalysis } from './mockData/sentimentAnalysisData';
import { generateTradeSignal } from './mockData/tradeSignalData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated step-by-step analysis pipeline
export const runAnalysisPipeline = async (
  instrument: Instrument,
  strategy: StrategyType,
  propFirmSettings: PropFirmSettings | null,
  brokerSettings: BrokerSettings | null,
  brokerProfile: BrokerProfile | null,
  indicatorStrategy: IndicatorStrategy | null
): Promise<AnalysisStage[]> => {
  const stages: AnalysisStage[] = [];
  
  try {
    // Step 1: Macro Analysis
    await delay(2000);
    const macroAnalysis = mockMacroAnalysis(instrument);
    stages.push({ type: 'macro', data: macroAnalysis });
    
    // Step 2: Technical Analysis
    await delay(2500);
    const technicalAnalysis = mockTechnicalAnalysis(instrument, strategy, indicatorStrategy);
    stages.push({ type: 'technical', data: technicalAnalysis });
    
    // Step 3: Quant Analysis
    await delay(3000);
    const quantAnalysis = mockQuantAnalysis(instrument, strategy, technicalAnalysis);
    stages.push({ type: 'quant', data: quantAnalysis });
    
    // Step 4: Sentiment Analysis
    await delay(2000);
    const sentimentAnalysis = mockSentimentAnalysis(instrument);
    stages.push({ type: 'sentiment', data: sentimentAnalysis });
    
    // Step 5: Final Trade Signal
    await delay(1500);
    const tradeSignal = generateTradeSignal(
      instrument,
      strategy,
      macroAnalysis,
      technicalAnalysis,
      quantAnalysis,
      sentimentAnalysis,
      propFirmSettings
    );
    
    if (tradeSignal) {
      stages.push({ type: 'signal', data: tradeSignal });
    } else {
      stages.push({ type: 'signal', data: null });
    }
    
    return stages;
  } catch (error) {
    console.error('Analysis pipeline error:', error);
    throw error;
  }
};