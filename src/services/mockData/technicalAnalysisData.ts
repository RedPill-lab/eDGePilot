import { Instrument, StrategyType, TechnicalAnalysis } from '../../types';

// Dynamic indicator configurations based on strategy type
const indicatorDefaults = {
  intraday: {
    ema: [20, 50],
    rsi: 7,
    roc: 5,
    bb: { period: 20, dev: 1.5 },
  },
  swing: {
    ema: [50, 100],
    rsi: 14,
    roc: 10,
    bb: { period: 30, dev: 2.0 },
  },
  position: {
    ema: [100, 200],
    rsi: 21,
    roc: 21,
    bb: { period: 50, dev: 2.5 },
  },
};

export const mockTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType
): TechnicalAnalysis => {
  // Get indicator settings based on strategy
  const settings = indicatorDefaults[strategy];
  
  // Different technical setups based on instrument type and trading strategy
  switch (instrument.type) {
    case 'forex':
      return generateForexTechnicalAnalysis(instrument, strategy, settings);
    case 'indices':
      return generateIndicesTechnicalAnalysis(instrument, strategy, settings);
    case 'metals':
      return generateMetalsTechnicalAnalysis(instrument, strategy, settings);
    default:
      return generateDefaultTechnicalAnalysis(strategy, settings);
  }
};

const generateForexTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  settings: typeof indicatorDefaults.intraday
): TechnicalAnalysis => {
  // EUR/USD example with different analyses based on strategy timeframe
  if (instrument.symbol === 'EUR/USD') {
    const basePrice = 1.0800;
    const [emaFast, emaSlow] = settings.ema;
    
    return {
      rsi: calculateRSI(basePrice, settings.rsi),
      ema50: basePrice + (Math.random() * 0.0050),
      ema200: basePrice - (Math.random() * 0.0050),
      supportLevels: [
        basePrice - 0.0020,
        basePrice - 0.0040,
        basePrice - 0.0060
      ],
      resistanceLevels: [
        basePrice + 0.0020,
        basePrice + 0.0040,
        basePrice + 0.0060
      ],
      supplyZones: [
        { min: basePrice + 0.0015, max: basePrice + 0.0025 },
        { min: basePrice + 0.0035, max: basePrice + 0.0045 }
      ],
      demandZones: [
        { min: basePrice - 0.0025, max: basePrice - 0.0015 },
        { min: basePrice - 0.0045, max: basePrice - 0.0035 }
      ],
      rateOfChange: calculateROC(basePrice, settings.roc),
      trend: determineTrend(basePrice, settings.roc),
      keyLevels: [
        { price: basePrice + 0.0020, type: 'resistance', strength: 8 },
        { price: basePrice - 0.0020, type: 'support', strength: 7 },
        { price: basePrice - 0.0040, type: 'support', strength: 9 }
      ]
    };
  }
  
  return generateDefaultTechnicalAnalysis(strategy, settings);
};

const generateIndicesTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  settings: typeof indicatorDefaults.intraday
): TechnicalAnalysis => {
  // US30 (Dow Jones) example
  if (instrument.symbol === 'US30') {
    const basePrice = 39000;
    const [emaFast, emaSlow] = settings.ema;
    
    return {
      rsi: calculateRSI(basePrice, settings.rsi),
      ema50: basePrice + (Math.random() * 200),
      ema200: basePrice - (Math.random() * 200),
      supportLevels: [
        basePrice - 100,
        basePrice - 200,
        basePrice - 300
      ],
      resistanceLevels: [
        basePrice + 100,
        basePrice + 200,
        basePrice + 300
      ],
      supplyZones: [
        { min: basePrice + 80, max: basePrice + 120 },
        { min: basePrice + 180, max: basePrice + 220 }
      ],
      demandZones: [
        { min: basePrice - 120, max: basePrice - 80 },
        { min: basePrice - 220, max: basePrice - 180 }
      ],
      rateOfChange: calculateROC(basePrice, settings.roc),
      trend: determineTrend(basePrice, settings.roc),
      keyLevels: [
        { price: basePrice + 100, type: 'resistance', strength: 7 },
        { price: basePrice - 100, type: 'support', strength: 8 },
        { price: basePrice - 200, type: 'support', strength: 6 }
      ]
    };
  }
  
  return generateDefaultTechnicalAnalysis(strategy, settings);
};

const generateMetalsTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  settings: typeof indicatorDefaults.intraday
): TechnicalAnalysis => {
  // Gold (XAU/USD) example
  if (instrument.symbol === 'XAU/USD') {
    const basePrice = 2000;
    const [emaFast, emaSlow] = settings.ema;
    
    return {
      rsi: calculateRSI(basePrice, settings.rsi),
      ema50: basePrice + (Math.random() * 20),
      ema200: basePrice - (Math.random() * 20),
      supportLevels: [
        basePrice - 10,
        basePrice - 20,
        basePrice - 30
      ],
      resistanceLevels: [
        basePrice + 10,
        basePrice + 20,
        basePrice + 30
      ],
      supplyZones: [
        { min: basePrice + 8, max: basePrice + 12 },
        { min: basePrice + 18, max: basePrice + 22 }
      ],
      demandZones: [
        { min: basePrice - 12, max: basePrice - 8 },
        { min: basePrice - 22, max: basePrice - 18 }
      ],
      rateOfChange: calculateROC(basePrice, settings.roc),
      trend: determineTrend(basePrice, settings.roc),
      keyLevels: [
        { price: basePrice + 10, type: 'resistance', strength: 6 },
        { price: basePrice - 10, type: 'support', strength: 8 },
        { price: basePrice - 20, type: 'support', strength: 7 }
      ]
    };
  }
  
  return generateDefaultTechnicalAnalysis(strategy, settings);
};

const generateDefaultTechnicalAnalysis = (
  strategy: StrategyType,
  settings: typeof indicatorDefaults.intraday
): TechnicalAnalysis => {
  const basePrice = 100 + Math.random() * 900;
  const priceVariation = basePrice * 0.05; // 5% variation
  const [emaFast, emaSlow] = settings.ema;
  
  // Calculate RSI based on strategy settings
  const rsi = calculateRSI(basePrice, settings.rsi);
  
  // Calculate ROC based on strategy settings
  const roc = calculateROC(basePrice, settings.roc);
  
  // Determine trend based on ROC
  const trend = determineTrend(basePrice, settings.roc);
  
  // EMAs - adjusted based on trend
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
  
  return {
    rsi: +rsi.toFixed(1),
    ema50: +ema50.toFixed(strategy === 'intraday' ? 2 : 0),
    ema200: +ema200.toFixed(strategy === 'intraday' ? 2 : 0),
    supportLevels: [
      basePrice - (priceVariation * 0.3),
      basePrice - (priceVariation * 0.6),
      basePrice - (priceVariation * 0.9)
    ].map(price => +price.toFixed(strategy === 'intraday' ? 2 : 0)),
    resistanceLevels: [
      basePrice + (priceVariation * 0.3),
      basePrice + (priceVariation * 0.6),
      basePrice + (priceVariation * 0.9)
    ].map(price => +price.toFixed(strategy === 'intraday' ? 2 : 0)),
    supplyZones: [
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
    })),
    demandZones: [
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
    })),
    rateOfChange: +roc.toFixed(2),
    trend,
    keyLevels: [
      { 
        price: basePrice + (priceVariation * 0.3), 
        type: 'resistance', 
        strength: 5 + Math.floor(Math.random() * 5) 
      },
      { 
        price: basePrice - (priceVariation * 0.3), 
        type: 'support', 
        strength: 5 + Math.floor(Math.random() * 5) 
      },
      { 
        price: basePrice - (priceVariation * 0.6), 
        type: 'support', 
        strength: 5 + Math.floor(Math.random() * 5) 
      }
    ]
  };
};

// Helper functions for technical calculations
const calculateRSI = (price: number, period: number): number => {
  // Simulate RSI calculation based on period
  const baseRSI = 30 + Math.random() * 40;
  const adjustment = (period - 14) / 14; // Adjust based on difference from standard 14 period
  return Math.max(0, Math.min(100, baseRSI + (adjustment * 10)));
};

const calculateROC = (price: number, period: number): number => {
  // Simulate ROC calculation based on period
  const baseROC = -2 + Math.random() * 4;
  const adjustment = (period - 10) / 10; // Adjust based on difference from standard 10 period
  return baseROC * (1 + adjustment);
};

const determineTrend = (price: number, rocPeriod: number): 'uptrend' | 'downtrend' | 'sideways' => {
  const roc = calculateROC(price, rocPeriod);
  if (roc > 0.5) return 'uptrend';
  if (roc < -0.5) return 'downtrend';
  return 'sideways';
};