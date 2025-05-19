import { Instrument, SentimentAnalysis } from '../../types';

export const mockSentimentAnalysis = (
  instrument: Instrument
): SentimentAnalysis => {
  // Generate sentiment analysis based on instrument type
  switch(instrument.type) {
    case 'forex':
      return generateForexSentimentAnalysis(instrument);
    case 'indices':
      return generateIndicesSentimentAnalysis(instrument);
    case 'metals':
      return generateMetalsSentimentAnalysis(instrument);
    default:
      return generateDefaultSentimentAnalysis();
  }
};

const generateForexSentimentAnalysis = (
  instrument: Instrument
): SentimentAnalysis => {
  // EUR/USD example
  if (instrument.symbol === 'EUR/USD') {
    return {
      overallSentiment: 'bearish',
      sentimentScore: -35, // -100 to 100
      sources: [
        {
          source: 'Social Media',
          sentiment: 'bearish',
          weight: 0.25
        },
        {
          source: 'Financial News',
          sentiment: 'bearish',
          weight: 0.35
        },
        {
          source: 'Analyst Reports',
          sentiment: 'neutral',
          weight: 0.3
        },
        {
          source: 'Retail Positioning',
          sentiment: 'bullish',
          weight: 0.1
        }
      ],
      keyPhrases: [
        "USD strength likely to continue",
        "ECB dovish stance",
        "Rate differential favors USD",
        "European economic concerns"
      ],
      recentShift: true,
      shiftMagnitude: 25
    };
  } else {
    // Default forex sentiment
    return generateRandomSentimentAnalysis('forex');
  }
};

const generateIndicesSentimentAnalysis = (
  instrument: Instrument
): SentimentAnalysis => {
  // US30 (Dow Jones) example
  if (instrument.symbol === 'US30') {
    return {
      overallSentiment: 'bullish',
      sentimentScore: 42, // -100 to 100
      sources: [
        {
          source: 'Social Media',
          sentiment: 'bullish',
          weight: 0.2
        },
        {
          source: 'Financial News',
          sentiment: 'bullish',
          weight: 0.3
        },
        {
          source: 'Analyst Reports',
          sentiment: 'bullish',
          weight: 0.35
        },
        {
          source: 'Retail Positioning',
          sentiment: 'neutral',
          weight: 0.15
        }
      ],
      keyPhrases: [
        "Strong earnings reports",
        "Economic resilience despite inflation",
        "Technical breakout expected",
        "Institutional buying observed"
      ],
      recentShift: false
    };
  } else {
    // Default indices sentiment
    return generateRandomSentimentAnalysis('indices');
  }
};

const generateMetalsSentimentAnalysis = (
  instrument: Instrument
): SentimentAnalysis => {
  // Gold (XAU/USD) example
  if (instrument.symbol === 'XAU/USD') {
    return {
      overallSentiment: 'bullish',
      sentimentScore: 68, // -100 to 100
      sources: [
        {
          source: 'Social Media',
          sentiment: 'bullish',
          weight: 0.15
        },
        {
          source: 'Financial News',
          sentiment: 'bullish',
          weight: 0.25
        },
        {
          source: 'Analyst Reports',
          sentiment: 'bullish',
          weight: 0.4
        },
        {
          source: 'Retail Positioning',
          sentiment: 'bullish',
          weight: 0.2
        }
      ],
      keyPhrases: [
        "Safe haven demand increasing",
        "Inflation hedge attractiveness",
        "Geopolitical tensions supporting prices",
        "Central bank buying continues"
      ],
      recentShift: true,
      shiftMagnitude: 15
    };
  } else {
    // Default metals sentiment
    return generateRandomSentimentAnalysis('metals');
  }
};

const generateDefaultSentimentAnalysis = (): SentimentAnalysis => {
  // Generic sentiment analysis
  const sentimentOptions = ['bullish', 'bearish', 'neutral'];
  const overallSentiment = sentimentOptions[Math.floor(Math.random() * sentimentOptions.length)] as 'bullish' | 'bearish' | 'neutral';
  
  // Generate sentiment score based on overall sentiment
  let sentimentScore;
  if (overallSentiment === 'bullish') {
    sentimentScore = 20 + Math.floor(Math.random() * 80);
  } else if (overallSentiment === 'bearish') {
    sentimentScore = -20 - Math.floor(Math.random() * 80);
  } else {
    sentimentScore = -20 + Math.floor(Math.random() * 40);
  }
  
  // Generate random sources with weighted sentiments
  const sources = [
    {
      source: 'Social Media',
      sentiment: sentimentOptions[Math.floor(Math.random() * sentimentOptions.length)] as 'bullish' | 'bearish' | 'neutral',
      weight: 0.2 + (Math.random() * 0.1)
    },
    {
      source: 'Financial News',
      sentiment: sentimentOptions[Math.floor(Math.random() * sentimentOptions.length)] as 'bullish' | 'bearish' | 'neutral',
      weight: 0.25 + (Math.random() * 0.1)
    },
    {
      source: 'Analyst Reports',
      sentiment: sentimentOptions[Math.floor(Math.random() * sentimentOptions.length)] as 'bullish' | 'bearish' | 'neutral',
      weight: 0.3 + (Math.random() * 0.1)
    },
    {
      source: 'Retail Positioning',
      sentiment: sentimentOptions[Math.floor(Math.random() * sentimentOptions.length)] as 'bullish' | 'bearish' | 'neutral',
      weight: 0.1 + (Math.random() * 0.1)
    }
  ];
  
  // Normalize weights
  const totalWeight = sources.reduce((sum, source) => sum + source.weight, 0);
  sources.forEach(source => {
    source.weight = +(source.weight / totalWeight).toFixed(2);
  });
  
  // Random key phrases
  const keyPhrases = [
    "Market sentiment shifting",
    "Technical setup improving",
    "Fundamentals remain strong",
    "Retail positioning extreme"
  ];
  
  // Random recent shift
  const recentShift = Math.random() > 0.5;
  
  return {
    overallSentiment,
    sentimentScore,
    sources,
    keyPhrases,
    recentShift,
    shiftMagnitude: recentShift ? Math.floor(Math.random() * 40) : undefined
  };
};

const generateRandomSentimentAnalysis = (
  instrumentType: 'forex' | 'indices' | 'metals'
): SentimentAnalysis => {
  // Different sentiment generators based on instrument type
  // More bullish bias for indices and metals, more neutral for forex
  let sentimentBias: 'bullish' | 'bearish' | 'neutral';
  
  if (instrumentType === 'forex') {
    const randomVal = Math.random();
    if (randomVal < 0.33) sentimentBias = 'bullish';
    else if (randomVal < 0.67) sentimentBias = 'bearish';
    else sentimentBias = 'neutral';
  } else if (instrumentType === 'indices') {
    const randomVal = Math.random();
    if (randomVal < 0.55) sentimentBias = 'bullish';
    else if (randomVal < 0.8) sentimentBias = 'bearish';
    else sentimentBias = 'neutral';
  } else { // metals
    const randomVal = Math.random();
    if (randomVal < 0.6) sentimentBias = 'bullish';
    else if (randomVal < 0.85) sentimentBias = 'bearish';
    else sentimentBias = 'neutral';
  }
  
  // Generate sentiment score based on bias
  let sentimentScore;
  if (sentimentBias === 'bullish') {
    sentimentScore = 20 + Math.floor(Math.random() * 80);
  } else if (sentimentBias === 'bearish') {
    sentimentScore = -20 - Math.floor(Math.random() * 80);
  } else {
    sentimentScore = -20 + Math.floor(Math.random() * 40);
  }
  
  // Generate sources with sentiment bias
  const allSentiments = ['bullish', 'bearish', 'neutral'];
  const sources = [
    {
      source: 'Social Media',
      sentiment: getRandom(allSentiments, sentimentBias) as 'bullish' | 'bearish' | 'neutral',
      weight: 0.2 + (Math.random() * 0.1)
    },
    {
      source: 'Financial News',
      sentiment: getRandom(allSentiments, sentimentBias) as 'bullish' | 'bearish' | 'neutral',
      weight: 0.25 + (Math.random() * 0.1)
    },
    {
      source: 'Analyst Reports',
      sentiment: getRandom(allSentiments, sentimentBias) as 'bullish' | 'bearish' | 'neutral',
      weight: 0.3 + (Math.random() * 0.1)
    },
    {
      source: 'Retail Positioning',
      sentiment: getRandom(allSentiments, sentimentBias) as 'bullish' | 'bearish' | 'neutral',
      weight: 0.1 + (Math.random() * 0.1)
    }
  ];
  
  // Normalize weights
  const totalWeight = sources.reduce((sum, source) => sum + source.weight, 0);
  sources.forEach(source => {
    source.weight = +(source.weight / totalWeight).toFixed(2);
  });
  
  // Generate key phrases based on instrument type and sentiment
  let keyPhrases: string[] = [];
  
  if (instrumentType === 'forex') {
    if (sentimentBias === 'bullish') {
      keyPhrases = [
        "Currency strength likely to continue",
        "Central bank hawkish outlook",
        "Positive economic indicators",
        "Favorable rate differentials"
      ];
    } else if (sentimentBias === 'bearish') {
      keyPhrases = [
        "Currency weakness expected",
        "Dovish central bank signals",
        "Economic data disappointing",
        "Negative rate outlook"
      ];
    } else {
      keyPhrases = [
        "Mixed economic signals",
        "Ranging price action likely",
        "Neutral central bank stance",
        "Conflicting data releases"
      ];
    }
  } else if (instrumentType === 'indices') {
    if (sentimentBias === 'bullish') {
      keyPhrases = [
        "Strong earnings outlook",
        "Economic growth resilient",
        "Technical breakout expected",
        "Institutional buying observed"
      ];
    } else if (sentimentBias === 'bearish') {
      keyPhrases = [
        "Earnings concerns mounting",
        "Economic slowdown fears",
        "Technical breakdown possible",
        "Institutional selling pressure"
      ];
    } else {
      keyPhrases = [
        "Mixed earnings results",
        "Economic data inconsistent",
        "Consolidation pattern forming",
        "Wait-and-see approach advised"
      ];
    }
  } else { // metals
    if (sentimentBias === 'bullish') {
      keyPhrases = [
        "Safe haven demand increasing",
        "Inflation hedge attractiveness",
        "Physical demand remains strong",
        "ETF inflows accelerating"
      ];
    } else if (sentimentBias === 'bearish') {
      keyPhrases = [
        "Risk-on sentiment reducing demand",
        "Dollar strength pressuring prices",
        "Physical demand weakening",
        "ETF outflows increasing"
      ];
    } else {
      keyPhrases = [
        "Mixed safe-haven demand",
        "Balanced physical market",
        "ETF flows stabilizing",
        "Waiting for clearer direction"
      ];
    }
  }
  
  // Random recent shift
  const recentShift = Math.random() > 0.6;
  
  return {
    overallSentiment: sentimentBias,
    sentimentScore,
    sources,
    keyPhrases,
    recentShift,
    shiftMagnitude: recentShift ? Math.floor(Math.random() * 40) : undefined
  };
};

// Helper function to get random with bias towards a specific value
function getRandom<T>(array: T[], bias: T): T {
  // 60% chance to return the bias value, 40% chance for any random value
  if (Math.random() < 0.6) {
    return bias;
  } else {
    return array[Math.floor(Math.random() * array.length)];
  }
}