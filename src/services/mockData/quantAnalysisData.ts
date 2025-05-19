import { Instrument, StrategyType, TechnicalAnalysis, QuantAnalysis } from '../../types';

export const mockQuantAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  technicalAnalysis: TechnicalAnalysis
): QuantAnalysis => {
  // Generate quant analysis based on instrument, strategy, and technical analysis
  switch(instrument.type) {
    case 'forex':
      return generateForexQuantAnalysis(instrument, strategy, technicalAnalysis);
    case 'indices':
      return generateIndicesQuantAnalysis(instrument, strategy, technicalAnalysis);
    case 'metals':
      return generateMetalsQuantAnalysis(instrument, strategy, technicalAnalysis);
    default:
      return generateDefaultQuantAnalysis(strategy, technicalAnalysis);
  }
};

const generateForexQuantAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  technicalAnalysis: TechnicalAnalysis
): QuantAnalysis => {
  // EUR/USD example
  if (instrument.symbol === 'EUR/USD') {
    // Adjust analysis based on trend and indicators
    const { trend, rsi } = technicalAnalysis;
    
    // Base win rate on trend direction and RSI
    let baseWinRate = 0.5; // Neutral starting point
    
    if (trend === 'uptrend') {
      baseWinRate += 0.15;
      if (rsi < 70) baseWinRate += 0.05; // Not overbought
      else baseWinRate -= 0.1; // Overbought
    } else if (trend === 'downtrend') {
      baseWinRate += 0.15;
      if (rsi > 30) baseWinRate += 0.05; // Not oversold
      else baseWinRate -= 0.1; // Oversold
    }
    
    // Adjust for strategy - lower win rates for longer timeframes but higher R:R
    let winRate, riskRewardRatio;
    if (strategy === 'intraday') {
      winRate = baseWinRate + 0.05;
      riskRewardRatio = 1.2 + (Math.random() * 0.5);
    } else if (strategy === 'swing') {
      winRate = baseWinRate;
      riskRewardRatio = 1.5 + (Math.random() * 0.8);
    } else { // position
      winRate = baseWinRate - 0.05;
      riskRewardRatio = 2.0 + (Math.random() * 1.0);
    }
    
    // Calculate expected return based on win rate and risk:reward
    const expectedReturn = (winRate * riskRewardRatio) - ((1 - winRate) * 1);
    
    return {
      winRate: +winRate.toFixed(2),
      expectedReturn: +(expectedReturn * 100).toFixed(2), // as percentage
      maxDrawdown: +(10 + Math.random() * 15).toFixed(2),
      riskRewardRatio: +riskRewardRatio.toFixed(2),
      sharpeRatio: +((expectedReturn * 100) / (5 + Math.random() * 10)).toFixed(2),
      confidenceInterval: {
        lower: +((expectedReturn * 100) - (Math.random() * 8)).toFixed(2),
        upper: +((expectedReturn * 100) + (Math.random() * 8)).toFixed(2)
      },
      monteCarlo: {
        simulations: 10000,
        profitabilityRate: +(winRate * 0.98).toFixed(2),
        averageReturn: +((expectedReturn * 100) * 0.95).toFixed(2)
      }
    };
  } else {
    return generateDefaultQuantAnalysis(strategy, technicalAnalysis);
  }
};

const generateIndicesQuantAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  technicalAnalysis: TechnicalAnalysis
): QuantAnalysis => {
  // US30 (Dow Jones) example
  if (instrument.symbol === 'US30') {
    const { trend, rsi } = technicalAnalysis;
    
    // Base win rate on trend and RSI
    let baseWinRate = 0.52; // Slightly better than neutral
    
    if (trend === 'uptrend') {
      baseWinRate += 0.18;
      if (rsi < 70) baseWinRate += 0.05; // Not overbought
      else baseWinRate -= 0.12; // Overbought
    } else if (trend === 'downtrend') {
      baseWinRate += 0.12; // Downtrends are harder in indices
      if (rsi > 30) baseWinRate += 0.03; // Not oversold
      else baseWinRate -= 0.08; // Oversold
    }
    
    // Adjust for strategy
    let winRate, riskRewardRatio;
    if (strategy === 'intraday') {
      winRate = baseWinRate + 0.03;
      riskRewardRatio = 1.3 + (Math.random() * 0.4);
    } else if (strategy === 'swing') {
      winRate = baseWinRate;
      riskRewardRatio = 1.7 + (Math.random() * 0.6);
    } else { // position
      winRate = baseWinRate - 0.03;
      riskRewardRatio = 2.2 + (Math.random() * 0.8);
    }
    
    // Calculate expected return
    const expectedReturn = (winRate * riskRewardRatio) - ((1 - winRate) * 1);
    
    return {
      winRate: +winRate.toFixed(2),
      expectedReturn: +(expectedReturn * 100).toFixed(2),
      maxDrawdown: +(12 + Math.random() * 18).toFixed(2),
      riskRewardRatio: +riskRewardRatio.toFixed(2),
      sharpeRatio: +((expectedReturn * 100) / (6 + Math.random() * 9)).toFixed(2),
      confidenceInterval: {
        lower: +((expectedReturn * 100) - (Math.random() * 10)).toFixed(2),
        upper: +((expectedReturn * 100) + (Math.random() * 10)).toFixed(2)
      },
      monteCarlo: {
        simulations: 10000,
        profitabilityRate: +(winRate * 0.97).toFixed(2),
        averageReturn: +((expectedReturn * 100) * 0.94).toFixed(2)
      }
    };
  } else {
    return generateDefaultQuantAnalysis(strategy, technicalAnalysis);
  }
};

const generateMetalsQuantAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  technicalAnalysis: TechnicalAnalysis
): QuantAnalysis => {
  // Gold (XAU/USD) example
  if (instrument.symbol === 'XAU/USD') {
    const { trend, rsi } = technicalAnalysis;
    
    // Base win rate on trend and RSI
    let baseWinRate = 0.53; // Slightly better than neutral
    
    if (trend === 'uptrend') {
      baseWinRate += 0.17;
      if (rsi < 75) baseWinRate += 0.05; // Gold can run higher before being overbought
      else baseWinRate -= 0.15; // Overbought
    } else if (trend === 'downtrend') {
      baseWinRate += 0.13; 
      if (rsi > 25) baseWinRate += 0.04; // Not oversold
      else baseWinRate -= 0.1; // Oversold
    }
    
    // Adjust for strategy
    let winRate, riskRewardRatio;
    if (strategy === 'intraday') {
      winRate = baseWinRate + 0.02;
      riskRewardRatio = 1.4 + (Math.random() * 0.5);
    } else if (strategy === 'swing') {
      winRate = baseWinRate;
      riskRewardRatio = 1.8 + (Math.random() * 0.7);
    } else { // position
      winRate = baseWinRate - 0.02;
      riskRewardRatio = 2.3 + (Math.random() * 0.9);
    }
    
    // Calculate expected return
    const expectedReturn = (winRate * riskRewardRatio) - ((1 - winRate) * 1);
    
    return {
      winRate: +winRate.toFixed(2),
      expectedReturn: +(expectedReturn * 100).toFixed(2),
      maxDrawdown: +(14 + Math.random() * 16).toFixed(2),
      riskRewardRatio: +riskRewardRatio.toFixed(2),
      sharpeRatio: +((expectedReturn * 100) / (7 + Math.random() * 8)).toFixed(2),
      confidenceInterval: {
        lower: +((expectedReturn * 100) - (Math.random() * 9)).toFixed(2),
        upper: +((expectedReturn * 100) + (Math.random() * 9)).toFixed(2)
      },
      monteCarlo: {
        simulations: 10000,
        profitabilityRate: +(winRate * 0.96).toFixed(2),
        averageReturn: +((expectedReturn * 100) * 0.93).toFixed(2)
      }
    };
  } else {
    return generateDefaultQuantAnalysis(strategy, technicalAnalysis);
  }
};

const generateDefaultQuantAnalysis = (
  strategy: StrategyType, 
  technicalAnalysis: TechnicalAnalysis
): QuantAnalysis => {
  const { trend, rsi } = technicalAnalysis;
  
  // Base win rate on trend direction and RSI
  let baseWinRate = 0.5; // Neutral starting point
  
  if (trend === 'uptrend') {
    baseWinRate += 0.15;
    if (rsi < 70) baseWinRate += 0.05; // Not overbought
    else baseWinRate -= 0.1; // Overbought
  } else if (trend === 'downtrend') {
    baseWinRate += 0.15;
    if (rsi > 30) baseWinRate += 0.05; // Not oversold
    else baseWinRate -= 0.1; // Oversold
  }
  
  // Adjust for strategy
  let winRate, riskRewardRatio;
  if (strategy === 'intraday') {
    winRate = baseWinRate + 0.04;
    riskRewardRatio = 1.2 + (Math.random() * 0.5);
  } else if (strategy === 'swing') {
    winRate = baseWinRate;
    riskRewardRatio = 1.5 + (Math.random() * 0.7);
  } else { // position
    winRate = baseWinRate - 0.04;
    riskRewardRatio = 2.0 + (Math.random() * 0.9);
  }
  
  // Calculate expected return
  const expectedReturn = (winRate * riskRewardRatio) - ((1 - winRate) * 1);
  
  return {
    winRate: +winRate.toFixed(2),
    expectedReturn: +(expectedReturn * 100).toFixed(2),
    maxDrawdown: +(15 + Math.random() * 15).toFixed(2),
    riskRewardRatio: +riskRewardRatio.toFixed(2),
    sharpeRatio: +((expectedReturn * 100) / (8 + Math.random() * 7)).toFixed(2),
    confidenceInterval: {
      lower: +((expectedReturn * 100) - (Math.random() * 8)).toFixed(2),
      upper: +((expectedReturn * 100) + (Math.random() * 8)).toFixed(2)
    },
    monteCarlo: {
      simulations: 10000,
      profitabilityRate: +(winRate * 0.95).toFixed(2),
      averageReturn: +((expectedReturn * 100) * 0.92).toFixed(2)
    }
  };
};