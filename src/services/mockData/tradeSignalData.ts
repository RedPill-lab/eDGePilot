import { 
  Instrument, 
  StrategyType, 
  MacroAnalysis, 
  TechnicalAnalysis, 
  QuantAnalysis, 
  SentimentAnalysis, 
  TradeSignal 
} from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const generateTradeSignal = (
  instrument: Instrument,
  strategy: StrategyType,
  macroAnalysis: MacroAnalysis,
  technicalAnalysis: TechnicalAnalysis,
  quantAnalysis: QuantAnalysis,
  sentimentAnalysis: SentimentAnalysis
): TradeSignal => {
  // Calculate overall action based on all analyses
  const action = determineAction(
    macroAnalysis.overallSentiment,
    technicalAnalysis.trend,
    sentimentAnalysis.overallSentiment
  );
  
  // For simplicity, use the middle price of the first support/resistance
  const currentPrice = action === 'buy' 
    ? (technicalAnalysis.supportLevels[0] + (technicalAnalysis.resistanceLevels[0] - technicalAnalysis.supportLevels[0]) * 0.3)
    : (technicalAnalysis.resistanceLevels[0] - (technicalAnalysis.resistanceLevels[0] - technicalAnalysis.supportLevels[0]) * 0.3);
  
  // Calculate entry, stop loss, and take profit based on action and levels
  let entryPrice, stopLoss, takeProfit;
  
  if (action === 'buy') {
    // Entry just above current price
    entryPrice = currentPrice * 1.0005;
    // Stop loss below nearest support
    stopLoss = technicalAnalysis.supportLevels[0] * 0.997;
    // Take profit at nearest resistance or beyond based on strategy
    if (strategy === 'intraday') {
      takeProfit = technicalAnalysis.resistanceLevels[0] * 1.001;
    } else if (strategy === 'swing') {
      takeProfit = technicalAnalysis.resistanceLevels[1] * 1.001;
    } else { // position
      takeProfit = technicalAnalysis.resistanceLevels[2] * 1.001;
    }
  } else { // sell
    // Entry just below current price
    entryPrice = currentPrice * 0.9995;
    // Stop loss above nearest resistance
    stopLoss = technicalAnalysis.resistanceLevels[0] * 1.003;
    // Take profit at nearest support or beyond based on strategy
    if (strategy === 'intraday') {
      takeProfit = technicalAnalysis.supportLevels[0] * 0.999;
    } else if (strategy === 'swing') {
      takeProfit = technicalAnalysis.supportLevels[1] * 0.999;
    } else { // position
      takeProfit = technicalAnalysis.supportLevels[2] * 0.999;
    }
  }
  
  // Calculate pips risk and reward (adjusted for instrument type)
  const pipMultiplier = instrument.type === 'forex' ? 10000 : 100;
  const pipsRisk = Math.abs(entryPrice - stopLoss) * pipMultiplier;
  const pipsReward = Math.abs(entryPrice - takeProfit) * pipMultiplier;
  const riskRewardRatio = pipsReward / pipsRisk;
  
  // Calculate confidence level
  const confidenceLevel = calculateConfidenceLevel(
    action,
    macroAnalysis,
    technicalAnalysis,
    quantAnalysis,
    sentimentAnalysis
  );
  
  // Generate rationale
  const rationale = generateRationale(
    action,
    instrument,
    strategy,
    macroAnalysis,
    technicalAnalysis,
    quantAnalysis,
    sentimentAnalysis
  );
  
  // Format to appropriate decimal places based on instrument type
  const formatPrice = (price: number) => {
    return instrument.type === 'forex' 
      ? price.toFixed(5) 
      : instrument.type === 'indices' 
        ? price.toFixed(0)
        : price.toFixed(2);
  };
  
  return {
    id: uuidv4(),
    instrument,
    strategy,
    action,
    entryPrice: +formatPrice(entryPrice),
    stopLoss: +formatPrice(stopLoss),
    takeProfit: +formatPrice(takeProfit),
    confidenceLevel,
    rationale,
    timestamp: new Date().toISOString(),
    pipsRisk: +pipsRisk.toFixed(1),
    pipsReward: +pipsReward.toFixed(1),
    riskRewardRatio: +riskRewardRatio.toFixed(2)
  };
};

// Determine the trade action based on different analysis components
const determineAction = (
  macroSentiment: 'bullish' | 'bearish' | 'neutral',
  technicalTrend: 'uptrend' | 'downtrend' | 'sideways',
  sentimentSentiment: 'bullish' | 'bearish' | 'neutral'
): 'buy' | 'sell' => {
  // Count factors suggesting buy or sell
  let buyCount = 0;
  let sellCount = 0;
  
  // Macro sentiment
  if (macroSentiment === 'bullish') buyCount += 1;
  else if (macroSentiment === 'bearish') sellCount += 1;
  
  // Technical trend (highest weight)
  if (technicalTrend === 'uptrend') buyCount += 2;
  else if (technicalTrend === 'downtrend') sellCount += 2;
  
  // Sentiment analysis
  if (sentimentSentiment === 'bullish') buyCount += 1;
  else if (sentimentSentiment === 'bearish') sellCount += 1;
  
  // Determine action based on counts
  return buyCount > sellCount ? 'buy' : 'sell';
};

// Calculate confidence level based on alignment of signals
const calculateConfidenceLevel = (
  action: 'buy' | 'sell',
  macroAnalysis: MacroAnalysis,
  technicalAnalysis: TechnicalAnalysis,
  quantAnalysis: QuantAnalysis,
  sentimentAnalysis: SentimentAnalysis
): number => {
  let confidence = 50; // Base confidence
  
  // Add confidence based on alignment of analyses
  // Macro alignment (+/- 10%)
  if ((action === 'buy' && macroAnalysis.overallSentiment === 'bullish') ||
      (action === 'sell' && macroAnalysis.overallSentiment === 'bearish')) {
    confidence += 10;
  } else if ((action === 'buy' && macroAnalysis.overallSentiment === 'bearish') ||
             (action === 'sell' && macroAnalysis.overallSentiment === 'bullish')) {
    confidence -= 10;
  }
  
  // Technical alignment (+/- 15%)
  if ((action === 'buy' && technicalAnalysis.trend === 'uptrend') ||
      (action === 'sell' && technicalAnalysis.trend === 'downtrend')) {
    confidence += 15;
  } else if ((action === 'buy' && technicalAnalysis.trend === 'downtrend') ||
             (action === 'sell' && technicalAnalysis.trend === 'uptrend')) {
    confidence -= 15;
  }
  
  // RSI conditions (+/- 5%)
  if (action === 'buy' && technicalAnalysis.rsi < 70 && technicalAnalysis.rsi > 30) {
    confidence += 5;
  } else if (action === 'sell' && technicalAnalysis.rsi > 30 && technicalAnalysis.rsi < 70) {
    confidence += 5;
  } else {
    confidence -= 5;
  }
  
  // Quant analysis - win rate (+/- 10%)
  if (quantAnalysis.winRate > 0.6) {
    confidence += 10;
  } else if (quantAnalysis.winRate < 0.4) {
    confidence -= 10;
  }
  
  // Sentiment alignment (+/- 10%)
  if ((action === 'buy' && sentimentAnalysis.overallSentiment === 'bullish') ||
      (action === 'sell' && sentimentAnalysis.overallSentiment === 'bearish')) {
    confidence += 10;
  } else if ((action === 'buy' && sentimentAnalysis.overallSentiment === 'bearish') ||
             (action === 'sell' && sentimentAnalysis.overallSentiment === 'bullish')) {
    confidence -= 10;
  }
  
  // Ensure confidence is between 0-100
  return Math.min(Math.max(confidence, 0), 100);
};

// Generate rationale for the trade signal
const generateRationale = (
  action: 'buy' | 'sell',
  instrument: Instrument,
  strategy: StrategyType,
  macroAnalysis: MacroAnalysis,
  technicalAnalysis: TechnicalAnalysis,
  quantAnalysis: QuantAnalysis,
  sentimentAnalysis: SentimentAnalysis
): string => {
  const actionWord = action === 'buy' ? 'LONG' : 'SHORT';
  const timeframe = strategy === 'intraday' ? 'short-term' : 
                   strategy === 'swing' ? 'medium-term' : 'long-term';
  
  // Technical factors
  const technicalFactor = action === 'buy' 
    ? (technicalAnalysis.trend === 'uptrend' 
       ? `strong uptrend with price above EMA50 (${technicalAnalysis.ema50})` 
       : `potential reversal with RSI at ${technicalAnalysis.rsi}`)
    : (technicalAnalysis.trend === 'downtrend' 
       ? `strong downtrend with price below EMA50 (${technicalAnalysis.ema50})` 
       : `potential reversal with RSI at ${technicalAnalysis.rsi}`);
  
  // Key support/resistance levels
  const keyLevels = action === 'buy'
    ? `Support at ${technicalAnalysis.supportLevels[0]} with resistance targets at ${technicalAnalysis.resistanceLevels[0]} and ${technicalAnalysis.resistanceLevels[1]}`
    : `Resistance at ${technicalAnalysis.resistanceLevels[0]} with support targets at ${technicalAnalysis.supportLevels[0]} and ${technicalAnalysis.supportLevels[1]}`;
  
  // Macro factors
  const macroFactor = macroAnalysis.overallSentiment === 'bullish'
    ? `bullish macroeconomic environment: ${macroAnalysis.keyFactors[0]}`
    : macroAnalysis.overallSentiment === 'bearish'
    ? `bearish macroeconomic environment: ${macroAnalysis.keyFactors[0]}`
    : `neutral macroeconomic environment with mixed signals`;
  
  // Sentiment factor
  const sentimentFactor = sentimentAnalysis.overallSentiment === 'bullish'
    ? `bullish market sentiment with ${sentimentAnalysis.sentimentScore > 0 ? 'positive' : 'negative'} sentiment score of ${sentimentAnalysis.sentimentScore}`
    : sentimentAnalysis.overallSentiment === 'bearish'
    ? `bearish market sentiment with ${sentimentAnalysis.sentimentScore > 0 ? 'positive' : 'negative'} sentiment score of ${sentimentAnalysis.sentimentScore}`
    : `neutral market sentiment with sentiment score of ${sentimentAnalysis.sentimentScore}`;
  
  // Quantitative expectation
  const quantFactor = `historical backtest shows ${quantAnalysis.winRate * 100}% win rate with expected return of ${quantAnalysis.expectedReturn}% and reward:risk ratio of ${quantAnalysis.riskRewardRatio}`;
  
  return `${actionWord} ${instrument.symbol} (${timeframe}): ${technicalFactor}. ${keyLevels}. This aligns with ${macroFactor} and ${sentimentFactor}. Quantitative analysis: ${quantFactor}.`;
};