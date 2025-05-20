import { Instrument, StrategyType, TechnicalAnalysis, IndicatorStrategy } from '../../types';

// Dynamic indicator configurations based on strategy type
const indicatorDefaults = {
  intraday: {
    ema: [20, 50],
    rsi: 7,
    roc: 5,
    bb: { period: 20, dev: 1.5 },
    sr: { zones: 3, strength: 7 },
    sd: { depth: 10 }
  },
  swing: {
    ema: [50, 100],
    rsi: 14,
    roc: 10,
    bb: { period: 30, dev: 2.0 },
    sr: { zones: 5, strength: 8 },
    sd: { depth: 20 }
  },
  position: {
    ema: [100, 200],
    rsi: 21,
    roc: 21,
    bb: { period: 50, dev: 2.5 },
    sr: { zones: 7, strength: 9 },
    sd: { depth: 30 }
  }
};

export const mockTechnicalAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  indicatorStrategy?: IndicatorStrategy | null
): TechnicalAnalysis => {
  // Get base settings for the strategy
  const settings = indicatorDefaults[strategy];
  
  // If using custom indicators, adjust settings based on selected indicators
  const activeIndicators = indicatorStrategy?.indicators || ['ema', 'rsi', 'sr'];
  
  // Generate analysis based on active indicators
  const analysis = generateBaseAnalysis(instrument, strategy, settings, activeIndicators);
  
  return analysis;
};

const generateBaseAnalysis = (
  instrument: Instrument,
  strategy: StrategyType,
  settings: typeof indicatorDefaults.intraday,
  activeIndicators: string[]
): TechnicalAnalysis => {
  const basePrice = getBasePrice(instrument);
  const variation = basePrice * 0.05;
  
  // Calculate indicators based on what's active
  const rsi = activeIndicators.includes('rsi') 
    ? calculateRSI(basePrice, settings.rsi)
    : 50;
    
  const roc = activeIndicators.includes('roc')
    ? calculateROC(basePrice, settings.roc)
    : 0;
    
  const trend = determineTrend(basePrice, settings.roc);
  
  // Calculate EMAs if active
  let ema50 = basePrice, ema200 = basePrice;
  if (activeIndicators.includes('ema')) {
    if (trend === 'uptrend') {
      ema200 = basePrice - (variation * 0.5);
      ema50 = basePrice + (variation * 0.2);
    } else if (trend === 'downtrend') {
      ema200 = basePrice + (variation * 0.5);
      ema50 = basePrice - (variation * 0.2);
    } else {
      ema200 = basePrice;
      ema50 = basePrice + (variation * 0.1);
    }
  }
  
  // Generate support/resistance levels if active
  const supportLevels = activeIndicators.includes('sr')
    ? generateSupportLevels(basePrice, variation, settings.sr.zones)
    : [];
    
  const resistanceLevels = activeIndicators.includes('sr')
    ? generateResistanceLevels(basePrice, variation, settings.sr.zones)
    : [];
  
  // Generate supply/demand zones if active
  const supplyZones = activeIndicators.includes('sd')
    ? generateSupplyZones(basePrice, variation, settings.sd.depth)
    : [];
    
  const demandZones = activeIndicators.includes('sd')
    ? generateDemandZones(basePrice, variation, settings.sd.depth)
    : [];
  
  // Calculate Bollinger Bands if active
  if (activeIndicators.includes('bb')) {
    // Use strategy-specific BB settings
    const { period, dev } = settings.bb;
    // BB calculations would go here in a real implementation
  }
  
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
    keyLevels: generateKeyLevels(basePrice, variation, settings.sr.strength)
  };
};

// Helper functions
const getBasePrice = (instrument: Instrument): number => {
  switch (instrument.symbol) {
    case 'EUR/USD': return 1.0800;
    case 'US30': return 39000;
    case 'XAU/USD': return 2000;
    default: return 100 + Math.random() * 900;
  }
};

const generateSupportLevels = (base: number, variation: number, zones: number): number[] => {
  return Array.from({ length: zones }, (_, i) => 
    +(base - (variation * (0.3 * (i + 1)))).toFixed(2)
  );
};

const generateResistanceLevels = (base: number, variation: number, zones: number): number[] => {
  return Array.from({ length: zones }, (_, i) => 
    +(base + (variation * (0.3 * (i + 1)))).toFixed(2)
  );
};

const generateSupplyZones = (base: number, variation: number, depth: number) => {
  return Array.from({ length: 2 }, (_, i) => ({
    min: +(base + (variation * (0.28 + (0.3 * i)))).toFixed(2),
    max: +(base + (variation * (0.32 + (0.3 * i)))).toFixed(2)
  }));
};

const generateDemandZones = (base: number, variation: number, depth: number) => {
  return Array.from({ length: 2 }, (_, i) => ({
    min: +(base - (variation * (0.32 + (0.3 * i)))).toFixed(2),
    max: +(base - (variation * (0.28 + (0.3 * i)))).toFixed(2)
  }));
};

const generateKeyLevels = (base: number, variation: number, strength: number) => {
  return [
    { 
      price: +(base + (variation * 0.3)).toFixed(2), 
      type: 'resistance' as const, 
      strength: strength - 2 + Math.floor(Math.random() * 5)
    },
    { 
      price: +(base - (variation * 0.3)).toFixed(2), 
      type: 'support' as const,
      strength: strength - 1 + Math.floor(Math.random() * 5)
    },
    { 
      price: +(base - (variation * 0.6)).toFixed(2), 
      type: 'support' as const,
      strength: strength - 2 + Math.floor(Math.random() * 5)
    }
  ];
};

const calculateRSI = (price: number, period: number): number => {
  const baseRSI = 30 + Math.random() * 40;
  const adjustment = (period - 14) / 14;
  return Math.max(0, Math.min(100, baseRSI + (adjustment * 10)));
};

const calculateROC = (price: number, period: number): number => {
  const baseROC = -2 + Math.random() * 4;
  const adjustment = (period - 10) / 10;
  return baseROC * (1 + adjustment);
};

const determineTrend = (price: number, rocPeriod: number): 'uptrend' | 'downtrend' | 'sideways' => {
  const roc = calculateROC(price, rocPeriod);
  if (roc > 0.5) return 'uptrend';
  if (roc < -0.5) return 'downtrend';
  return 'sideways';
};