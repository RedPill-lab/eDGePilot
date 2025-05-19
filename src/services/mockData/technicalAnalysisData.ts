import { Instrument, StrategyType, TechnicalAnalysis } from '../../types';

export const mockTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType
): TechnicalAnalysis => {
  // Different technical setups based on instrument type and trading strategy
  switch (instrument.type) {
    case 'forex':
      return generateForexTechnicalAnalysis(instrument, strategy);
    case 'indices':
      return generateIndicesTechnicalAnalysis(instrument, strategy);
    case 'metals':
      return generateMetalsTechnicalAnalysis(instrument, strategy);
    default:
      return generateDefaultTechnicalAnalysis(strategy);
  }
};

const generateForexTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType
): TechnicalAnalysis => {
  // EUR/USD example with different analyses based on strategy timeframe
  if (instrument.symbol === 'EUR/USD') {
    switch (strategy) {
      case 'intraday':
        return {
          rsi: 42.3,
          ema50: 1.0812,
          ema200: 1.0795,
          supportLevels: [1.0780, 1.0750, 1.0720],
          resistanceLevels: [1.0830, 1.0850, 1.0875],
          supplyZones: [{ min: 1.0845, max: 1.0855 }, { min: 1.0870, max: 1.0880 }],
          demandZones: [{ min: 1.0775, max: 1.0785 }, { min: 1.0740, max: 1.0750 }],
          rateOfChange: -0.15,
          trend: 'downtrend',
          keyLevels: [
            { price: 1.0830, type: 'resistance', strength: 8 },
            { price: 1.0780, type: 'support', strength: 7 },
            { price: 1.0750, type: 'support', strength: 9 }
          ]
        };
      case 'swing':
        return {
          rsi: 45.8,
          ema50: 1.0825,
          ema200: 1.0765,
          supportLevels: [1.0750, 1.0700, 1.0650],
          resistanceLevels: [1.0850, 1.0900, 1.0950],
          supplyZones: [{ min: 1.0840, max: 1.0860 }, { min: 1.0895, max: 1.0910 }],
          demandZones: [{ min: 1.0740, max: 1.0760 }, { min: 1.0690, max: 1.0710 }],
          rateOfChange: -0.08,
          trend: 'sideways',
          keyLevels: [
            { price: 1.0850, type: 'resistance', strength: 7 },
            { price: 1.0750, type: 'support', strength: 8 },
            { price: 1.0700, type: 'support', strength: 9 }
          ]
        };
      case 'position':
        return {
          rsi: 38.2,
          ema50: 1.0830,
          ema200: 1.0720,
          supportLevels: [1.0700, 1.0600, 1.0500],
          resistanceLevels: [1.0900, 1.1000, 1.1100],
          supplyZones: [{ min: 1.0880, max: 1.0920 }, { min: 1.0980, max: 1.1020 }],
          demandZones: [{ min: 1.0680, max: 1.0720 }, { min: 1.0580, max: 1.0620 }],
          rateOfChange: -0.22,
          trend: 'downtrend',
          keyLevels: [
            { price: 1.0900, type: 'resistance', strength: 9 },
            { price: 1.0700, type: 'support', strength: 7 },
            { price: 1.0600, type: 'support', strength: 8 }
          ]
        };
      default:
        return generateDefaultTechnicalAnalysis(strategy);
    }
  } else {
    // Default forex technical analysis
    return generateDefaultTechnicalAnalysis(strategy);
  }
};

const generateIndicesTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType
): TechnicalAnalysis => {
  // US30 (Dow Jones) example
  if (instrument.symbol === 'US30') {
    switch (strategy) {
      case 'intraday':
        return {
          rsi: 58.6,
          ema50: 39275,
          ema200: 39150,
          supportLevels: [39200, 39100, 39000],
          resistanceLevels: [39350, 39450, 39550],
          supplyZones: [{ min: 39340, max: 39380 }, { min: 39440, max: 39480 }],
          demandZones: [{ min: 39180, max: 39220 }, { min: 39080, max: 39120 }],
          rateOfChange: 0.12,
          trend: 'uptrend',
          keyLevels: [
            { price: 39350, type: 'resistance', strength: 7 },
            { price: 39200, type: 'support', strength: 8 },
            { price: 39100, type: 'support', strength: 6 }
          ]
        };
      case 'swing':
        return {
          rsi: 62.4,
          ema50: 39100,
          ema200: 38700,
          supportLevels: [39000, 38800, 38600],
          resistanceLevels: [39400, 39600, 39800],
          supplyZones: [{ min: 39380, max: 39420 }, { min: 39580, max: 39620 }],
          demandZones: [{ min: 38980, max: 39020 }, { min: 38780, max: 38820 }],
          rateOfChange: 0.25,
          trend: 'uptrend',
          keyLevels: [
            { price: 39400, type: 'resistance', strength: 8 },
            { price: 39000, type: 'support', strength: 9 },
            { price: 38800, type: 'support', strength: 7 }
          ]
        };
      case 'position':
        return {
          rsi: 65.8,
          ema50: 38500,
          ema200: 37800,
          supportLevels: [38500, 38000, 37500],
          resistanceLevels: [39500, 40000, 40500],
          supplyZones: [{ min: 39450, max: 39550 }, { min: 39950, max: 40050 }],
          demandZones: [{ min: 38450, max: 38550 }, { min: 37950, max: 38050 }],
          rateOfChange: 0.42,
          trend: 'uptrend',
          keyLevels: [
            { price: 39500, type: 'resistance', strength: 7 },
            { price: 38500, type: 'support', strength: 9 },
            { price: 38000, type: 'support', strength: 8 }
          ]
        };
      default:
        return generateDefaultTechnicalAnalysis(strategy);
    }
  } else {
    // Default indices technical analysis
    return generateDefaultTechnicalAnalysis(strategy);
  }
};

const generateMetalsTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType
): TechnicalAnalysis => {
  // Gold (XAU/USD) example
  if (instrument.symbol === 'XAU/USD') {
    switch (strategy) {
      case 'intraday':
        return {
          rsi: 68.2,
          ema50: 2380,
          ema200: 2345,
          supportLevels: [2370, 2360, 2350],
          resistanceLevels: [2390, 2400, 2410],
          supplyZones: [{ min: 2388, max: 2392 }, { min: 2398, max: 2402 }],
          demandZones: [{ min: 2368, max: 2372 }, { min: 2358, max: 2362 }],
          rateOfChange: 0.18,
          trend: 'uptrend',
          keyLevels: [
            { price: 2390, type: 'resistance', strength: 6 },
            { price: 2370, type: 'support', strength: 8 },
            { price: 2360, type: 'support', strength: 7 }
          ]
        };
      case 'swing':
        return {
          rsi: 72.5,
          ema50: 2350,
          ema200: 2260,
          supportLevels: [2350, 2320, 2300],
          resistanceLevels: [2400, 2430, 2450],
          supplyZones: [{ min: 2395, max: 2405 }, { min: 2425, max: 2435 }],
          demandZones: [{ min: 2345, max: 2355 }, { min: 2315, max: 2325 }],
          rateOfChange: 0.35,
          trend: 'uptrend',
          keyLevels: [
            { price: 2400, type: 'resistance', strength: 7 },
            { price: 2350, type: 'support', strength: 9 },
            { price: 2320, type: 'support', strength: 8 }
          ]
        };
      case 'position':
        return {
          rsi: 75.3,
          ema50: 2290,
          ema200: 2150,
          supportLevels: [2300, 2250, 2200],
          resistanceLevels: [2450, 2500, 2550],
          supplyZones: [{ min: 2440, max: 2460 }, { min: 2490, max: 2510 }],
          demandZones: [{ min: 2290, max: 2310 }, { min: 2240, max: 2260 }],
          rateOfChange: 0.65,
          trend: 'uptrend',
          keyLevels: [
            { price: 2450, type: 'resistance', strength: 8 },
            { price: 2300, type: 'support', strength: 9 },
            { price: 2250, type: 'support', strength: 7 }
          ]
        };
      default:
        return generateDefaultTechnicalAnalysis(strategy);
    }
  } else {
    // Default metals technical analysis
    return generateDefaultTechnicalAnalysis(strategy);
  }
};

const generateDefaultTechnicalAnalysis = (strategy: StrategyType): TechnicalAnalysis => {
  // Generate random technical analysis based on strategy timeframe
  const trendOptions = ['uptrend', 'downtrend', 'sideways'];
  const trend = trendOptions[Math.floor(Math.random() * trendOptions.length)] as 'uptrend' | 'downtrend' | 'sideways';
  
  // Base price for calculations
  const basePrice = 100 + Math.random() * 900;
  const priceVariation = basePrice * 0.05; // 5% variation
  
  // RSI value - higher for uptrends, lower for downtrends, middle for sideways
  let rsi;
  if (trend === 'uptrend') {
    rsi = 60 + Math.random() * 20; // 60-80 for uptrends
  } else if (trend === 'downtrend') {
    rsi = 20 + Math.random() * 20; // 20-40 for downtrends
  } else {
    rsi = 40 + Math.random() * 20; // 40-60 for sideways
  }
  
  // EMAs - 50 above 200 in uptrend, below in downtrend, close in sideways
  let ema50, ema200;
  if (trend === 'uptrend') {
    ema200 = basePrice - (priceVariation * 0.5);
    ema50 = basePrice + (priceVariation * 0.2);
  } else if (trend === 'downtrend') {
    ema200 = basePrice + (priceVariation * 0.5);
    ema50 = basePrice - (priceVariation * 0.2);
  } else {
    ema200 = basePrice;
    ema50 = basePrice + (priceVariation * 0.1);
  }
  
  // Support and resistance levels
  const supportLevels = [
    basePrice - (priceVariation * 0.3),
    basePrice - (priceVariation * 0.6),
    basePrice - (priceVariation * 0.9)
  ].map(price => +price.toFixed(strategy === 'intraday' ? 2 : 0));
  
  const resistanceLevels = [
    basePrice + (priceVariation * 0.3),
    basePrice + (priceVariation * 0.6),
    basePrice + (priceVariation * 0.9)
  ].map(price => +price.toFixed(strategy === 'intraday' ? 2 : 0));
  
  // Supply and demand zones
  const supplyZones = [
    { 
      min: basePrice + (priceVariation * 0.28), 
      max: basePrice + (priceVariation * 0.32) 
    },
    { 
      min: basePrice + (priceVariation * 0.58), 
      max: basePrice + (priceVariation * 0.62) 
    }
  ].map(zone => ({
    min: +zone.min.toFixed(strategy === 'intraday' ? 2 : 0),
    max: +zone.max.toFixed(strategy === 'intraday' ? 2 : 0)
  }));
  
  const demandZones = [
    { 
      min: basePrice - (priceVariation * 0.32), 
      max: basePrice - (priceVariation * 0.28) 
    },
    { 
      min: basePrice - (priceVariation * 0.62), 
      max: basePrice - (priceVariation * 0.58) 
    }
  ].map(zone => ({
    min: +zone.min.toFixed(strategy === 'intraday' ? 2 : 0),
    max: +zone.max.toFixed(strategy === 'intraday' ? 2 : 0)
  }));
  
  // Rate of change - positive for uptrend, negative for downtrend, near zero for sideways
  let roc;
  if (trend === 'uptrend') {
    roc = 0.1 + Math.random() * 0.4;
  } else if (trend === 'downtrend') {
    roc = -0.4 - Math.random() * 0.1;
  } else {
    roc = -0.1 + Math.random() * 0.2;
  }
  
  // Key levels with strength ratings
  const keyLevels = [
    { 
      price: resistanceLevels[0], 
      type: 'resistance', 
      strength: 5 + Math.floor(Math.random() * 5) 
    },
    { 
      price: supportLevels[0], 
      type: 'support', 
      strength: 5 + Math.floor(Math.random() * 5) 
    },
    { 
      price: supportLevels[1], 
      type: 'support', 
      strength: 5 + Math.floor(Math.random() * 5) 
    }
  ];
  
  return {
    rsi: +rsi.toFixed(1),
    ema50: +ema50.toFixed(strategy === 'intraday' ? 2 : 0),
    ema200: +ema200.toFixed(strategy === 'intraday' ? 2 : 0),
    supportLevels,
    resistanceLevels,
    supplyZones,
    demandZones,
    rateOfChange: +roc.toFixed(2),
    trend,
    keyLevels
  };
};