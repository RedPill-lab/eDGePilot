import { 
  Instrument, 
  StrategyType, 
  AnalysisStage, 
  PropFirmSettings,
  BrokerSettings,
  BrokerProfile,
  IndicatorStrategy 
} from '../types';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Flowise API endpoints
const FLOWISE_ENDPOINTS = {
  macro: `${import.meta.env.VITE_FLOWISE_API_URL}/macro-analysis`,
  technical: `${import.meta.env.VITE_FLOWISE_API_URL}/technical-analysis`,
  edgeValidator: `${import.meta.env.VITE_FLOWISE_API_URL}/edge-validation`,
  sentimentPulse: `${import.meta.env.VITE_FLOWISE_API_URL}/sentiment-analysis`,
  marketPhase: `${import.meta.env.VITE_FLOWISE_API_URL}/market-phase`,
};

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
    // Step 1: Macro Analysis via Flowise
    await delay(2000);
    const macroResponse = await fetch(FLOWISE_ENDPOINTS.macro, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instrument, strategy })
    }).catch(() => null); // Fallback to mock if API fails
    
    const macroAnalysis = macroResponse ? await macroResponse.json() : mockMacroAnalysis(instrument);
    stages.push({ type: 'macro', data: macroAnalysis });
    
    // Step 2: Technical Analysis with Bollinger Bands
    await delay(2500);
    const technicalResponse = await fetch(FLOWISE_ENDPOINTS.technical, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        instrument, 
        strategy,
        indicators: indicatorStrategy?.indicators || ['ema', 'rsi', 'bb']
      })
    }).catch(() => null);
    
    const technicalAnalysis = technicalResponse ? 
      await technicalResponse.json() : 
      mockTechnicalAnalysis(instrument, strategy, indicatorStrategy);
    stages.push({ type: 'technical', data: technicalAnalysis });
    
    // Step 3: Edge Validator (formerly Quant Analysis)
    await delay(3000);
    const edgeResponse = await fetch(FLOWISE_ENDPOINTS.edgeValidator, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        instrument,
        strategy,
        technicalAnalysis 
      })
    }).catch(() => null);
    
    const edgeValidation = edgeResponse ?
      await edgeResponse.json() :
      mockQuantAnalysis(instrument, strategy, technicalAnalysis);
    stages.push({ type: 'edge', data: edgeValidation });
    
    // Step 4: Sentiment Pulse (formerly Sentiment Analysis)
    await delay(2000);
    const sentimentResponse = await fetch(FLOWISE_ENDPOINTS.sentimentPulse, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instrument })
    }).catch(() => null);
    
    const sentimentAnalysis = sentimentResponse ?
      await sentimentResponse.json() :
      mockSentimentAnalysis(instrument);
    stages.push({ type: 'sentiment', data: sentimentAnalysis });
    
    // Step 5: Market Phase Analysis (Pro/Edge+ only)
    if (propFirmSettings?.plan === 'pro' || propFirmSettings?.plan === 'edge+') {
      await delay(2500);
      const phaseResponse = await fetch(FLOWISE_ENDPOINTS.marketPhase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instrument,
          strategy,
          technicalAnalysis,
          edgeValidation
        })
      }).catch(() => null);
      
      if (phaseResponse) {
        const phaseAnalysis = await phaseResponse.json();
        stages.push({ type: 'phase', data: phaseAnalysis });
        
        // Store results in Supabase
        await supabase.from('edge_validations').insert({
          instrument: instrument.symbol,
          market_phase: phaseAnalysis.currentPhase,
          trending_win_rate: phaseAnalysis.trending.winRate,
          trending_drawdown: phaseAnalysis.trending.maxDrawdown,
          trending_rr: phaseAnalysis.trending.riskRewardRatio,
          ranging_win_rate: phaseAnalysis.ranging.winRate,
          ranging_drawdown: phaseAnalysis.ranging.maxDrawdown,
          ranging_rr: phaseAnalysis.ranging.riskRewardRatio,
          volatile_win_rate: phaseAnalysis.volatile.winRate,
          volatile_drawdown: phaseAnalysis.volatile.maxDrawdown,
          volatile_rr: phaseAnalysis.volatile.riskRewardRatio
        });
      }
    }
    
    // Step 6: Final Trade Signal
    await delay(1500);
    const tradeSignal = generateTradeSignal(
      instrument,
      strategy,
      macroAnalysis,
      technicalAnalysis,
      edgeValidation,
      sentimentAnalysis,
      propFirmSettings
    );
    
    if (tradeSignal) {
      stages.push({ type: 'signal', data: tradeSignal });
      
      // Send Telegram alert for Pro/Edge+ users
      if (propFirmSettings?.plan === 'pro' || propFirmSettings?.plan === 'edge+') {
        await sendTelegramAlert(tradeSignal);
      }
    } else {
      stages.push({ type: 'signal', data: null });
    }
    
    return stages;
  } catch (error) {
    console.error('Analysis pipeline error:', error);
    throw error;
  }
};

// Helper function for Telegram alerts
const sendTelegramAlert = async (signal: TradeSignal) => {
  try {
    await fetch('/api/telegram-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signal)
    });
  } catch (error) {
    console.error('Failed to send Telegram alert:', error);
  }
};