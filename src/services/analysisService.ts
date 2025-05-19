import { Instrument, StrategyType, AnalysisStage } from '../types';
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
  strategy: StrategyType
): Promise<AnalysisStage[]> => {
  const stages: AnalysisStage[] = [];
  
  // Step 1: Macro Analysis
  await delay(2000);
  const macroAnalysis = mockMacroAnalysis(instrument);
  stages.push({ type: 'macro', data: macroAnalysis });
  
  // Step 2: Technical Analysis
  await delay(2500);
  const technicalAnalysis = mockTechnicalAnalysis(instrument, strategy);
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
    sentimentAnalysis
  );
  stages.push({ type: 'signal', data: tradeSignal });
  
  return stages;
};

// In a real application, we would make API calls to various services
// For now, we're using mock data services to simulate the behavior