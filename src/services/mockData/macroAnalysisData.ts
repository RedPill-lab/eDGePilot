import { Instrument, MacroAnalysis } from '../../types';

export const mockMacroAnalysis = (instrument: Instrument): MacroAnalysis => {
  // Generate analysis based on instrument type
  switch (instrument.type) {
    case 'forex':
      return generateForexMacroAnalysis(instrument);
    case 'indices':
      return generateIndicesMacroAnalysis(instrument);
    case 'metals':
      return generateMetalsMacroAnalysis(instrument);
    default:
      return generateDefaultMacroAnalysis();
  }
};

const generateForexMacroAnalysis = (instrument: Instrument): MacroAnalysis => {
  // Generate forex-specific analysis (EUR/USD, GBP/USD, etc.)
  if (instrument.symbol === 'EUR/USD') {
    return {
      summary: "The Euro is under pressure against the US Dollar due to divergent monetary policies. The ECB's cautious stance contrasts with the Fed's more hawkish outlook.",
      keyFactors: [
        "ECB maintaining accommodative policy",
        "Federal Reserve signaling rate stability",
        "Eurozone inflation below target",
        "Strong US employment data",
        "European geopolitical tensions"
      ],
      economicOutlook: "The Eurozone economy is showing signs of slow recovery, while the US economy continues to demonstrate resilience despite inflation concerns.",
      marketImpact: "The divergence in monetary policy is likely to keep pressure on EUR/USD, with potential for further downside if upcoming US economic data remains strong.",
      bullishFactors: [
        "Potential ECB shift toward tighter policy",
        "Signs of improving Eurozone economic data",
        "US inflation cooling faster than expected"
      ],
      bearishFactors: [
        "Stronger than expected US employment data",
        "Widening interest rate differentials",
        "Eurozone geopolitical risks",
        "Potential energy crisis in Europe"
      ],
      overallSentiment: "bearish"
    };
  } else {
    // Default forex analysis
    const sentiment = Math.random() > 0.5 ? "bullish" : "bearish";
    return {
      summary: `Current macroeconomic factors suggest a ${sentiment} outlook for ${instrument.symbol} based on central bank policies and economic indicators.`,
      keyFactors: [
        "Central bank policy divergence",
        "Inflation trends in major economies",
        "Recent economic data releases",
        "Geopolitical developments"
      ],
      economicOutlook: `The economic outlook shows ${sentiment === 'bullish' ? 'strengthening' : 'weakening'} fundamentals for the base currency relative to the quote currency.`,
      marketImpact: `Current macroeconomic conditions suggest ${sentiment === 'bullish' ? 'upward' : 'downward'} pressure on ${instrument.symbol} in the near term.`,
      bullishFactors: [
        "Potential interest rate increases",
        "Strong economic growth indicators",
        "Positive trade balance figures"
      ],
      bearishFactors: [
        "Inflation concerns",
        "Political uncertainty",
        "Weakening employment data"
      ],
      overallSentiment: sentiment as 'bullish' | 'bearish'
    };
  }
};

const generateIndicesMacroAnalysis = (instrument: Instrument): MacroAnalysis => {
  // For indices like S&P 500, NASDAQ, etc.
  if (instrument.symbol === 'US30') {
    return {
      summary: "The Dow Jones Industrial Average (US30) is facing mixed signals as strong corporate earnings contrast with concerns about inflation and interest rates.",
      keyFactors: [
        "Federal Reserve monetary policy outlook",
        "Q2 corporate earnings results",
        "Inflation data trending above target",
        "Strong consumer spending",
        "Manufacturing sector slowdown"
      ],
      economicOutlook: "The US economy continues to show resilience, though there are increasing signs of a slowdown in certain sectors. Consumer spending remains strong, but manufacturing data indicates potential weakness.",
      marketImpact: "The Dow Jones (US30) may experience short-term volatility but is supported by solid fundamentals and corporate profitability.",
      bullishFactors: [
        "Strong corporate earnings reports",
        "Resilient consumer spending",
        "Potential peaking of inflation",
        "Healthy labor market"
      ],
      bearishFactors: [
        "Elevated interest rates",
        "Manufacturing sector weakness",
        "Persistent inflation pressures",
        "Signs of consumer credit stress"
      ],
      overallSentiment: "neutral"
    };
  } else {
    // Default indices analysis
    const sentiment = Math.random() > 0.6 ? "bullish" : Math.random() > 0.5 ? "bearish" : "neutral";
    return {
      summary: `${instrument.name} is currently influenced by broader market trends including monetary policy, economic indicators, and sector-specific developments.`,
      keyFactors: [
        "Central bank policy outlook",
        "Corporate earnings trends",
        "Sector rotation patterns",
        "Economic growth forecasts",
        "Market liquidity conditions"
      ],
      economicOutlook: `The economic indicators suggest a ${sentiment === 'bullish' ? 'positive' : sentiment === 'bearish' ? 'challenging' : 'mixed'} environment for market growth.`,
      marketImpact: `${instrument.name} is likely to ${sentiment === 'bullish' ? 'benefit from' : sentiment === 'bearish' ? 'face headwinds due to' : 'show mixed reactions to'} current economic conditions.`,
      bullishFactors: [
        "Strong earnings growth",
        "Supportive monetary policy",
        "Sector-specific positive developments"
      ],
      bearishFactors: [
        "Valuation concerns",
        "Potential monetary tightening",
        "Economic growth slowdown signals"
      ],
      overallSentiment: sentiment as 'bullish' | 'bearish' | 'neutral'
    };
  }
};

const generateMetalsMacroAnalysis = (instrument: Instrument): MacroAnalysis => {
  // For metals like gold (XAU/USD), silver, etc.
  if (instrument.symbol === 'XAU/USD') {
    return {
      summary: "Gold (XAU/USD) is showing strength amid geopolitical tensions and inflation concerns, despite the headwind of higher interest rates.",
      keyFactors: [
        "Federal Reserve monetary policy",
        "Global inflation trends",
        "Geopolitical tensions in multiple regions",
        "US dollar strength",
        "Central bank gold purchases"
      ],
      economicOutlook: "The global economic outlook remains uncertain with inflation concerns and varying economic growth rates across regions. This uncertainty typically supports gold as a safe haven asset.",
      marketImpact: "Gold is likely to maintain its appeal as a safe haven and inflation hedge, potentially offsetting the negative impact of higher interest rates.",
      bullishFactors: [
        "Persistent inflation concerns",
        "Geopolitical tensions",
        "Central bank buying",
        "Economic uncertainty"
      ],
      bearishFactors: [
        "Higher interest rates environment",
        "US dollar strength",
        "Potential for real yields to rise",
        "Reduced pandemic-related uncertainty"
      ],
      overallSentiment: "bullish"
    };
  } else {
    // Default metals analysis
    const sentiment = Math.random() > 0.6 ? "bullish" : "neutral";
    return {
      summary: `${instrument.name} is currently influenced by inflation expectations, interest rate outlook, industrial demand, and safe-haven flows.`,
      keyFactors: [
        "Interest rate environment",
        "Inflation expectations",
        "USD strength/weakness",
        "Safe-haven demand",
        "Industrial usage trends"
      ],
      economicOutlook: `The economic climate suggests ${sentiment === 'bullish' ? 'favorable' : 'mixed'} conditions for precious metals with inflation concerns and economic uncertainties providing support.`,
      marketImpact: `${instrument.symbol} is expected to ${sentiment === 'bullish' ? 'benefit from current macroeconomic conditions' : 'show mixed performance based on competing economic factors'}.`,
      bullishFactors: [
        "Inflation concerns",
        "Geopolitical risks",
        "Central bank purchases",
        "Currency debasement fears"
      ],
      bearishFactors: [
        "Rising real interest rates",
        "US dollar strength",
        "Reduced risk aversion",
        "Decreased industrial demand"
      ],
      overallSentiment: sentiment as 'bullish' | 'neutral'
    };
  }
};

const generateDefaultMacroAnalysis = (): MacroAnalysis => {
  // Generic analysis for any instrument type
  return {
    summary: "Global economic conditions show mixed signals with inflation concerns partially offset by central bank policies and varied economic growth rates across regions.",
    keyFactors: [
      "Central bank monetary policies",
      "Inflation trends globally",
      "Economic growth forecasts",
      "Geopolitical developments",
      "Market sentiment indicators"
    ],
    economicOutlook: "The global economy continues to face challenges with inflation pressures, though growth remains resilient in many regions. Central banks are navigating a delicate balance between controlling inflation and supporting growth.",
    marketImpact: "Markets are likely to remain sensitive to economic data releases and central bank communications, with potential for increased volatility during key announcements.",
    bullishFactors: [
      "Signs of moderating inflation",
      "Resilient economic growth",
      "Supportive fiscal policies",
      "Strong corporate earnings"
    ],
    bearishFactors: [
      "Persistent inflation pressures",
      "Monetary tightening",
      "Geopolitical risks",
      "Valuation concerns"
    ],
    overallSentiment: "neutral"
  };
};