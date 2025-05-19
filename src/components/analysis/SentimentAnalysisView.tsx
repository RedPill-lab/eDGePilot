import { SentimentAnalysis } from '../../types';
import { Smile, Frown, Meh, TrendingUp, TrendingDown } from 'lucide-react';

type SentimentAnalysisViewProps = {
  data: SentimentAnalysis;
};

const SentimentAnalysisView = ({ data }: SentimentAnalysisViewProps) => {
  // Helper to get sentiment icon
  const getSentimentIcon = (sentiment: 'bullish' | 'bearish' | 'neutral') => {
    if (sentiment === 'bullish') return <Smile className="text-success" size={24} />;
    if (sentiment === 'bearish') return <Frown className="text-error" size={24} />;
    return <Meh className="text-foreground/70" size={24} />;
  };
  
  // Helper to get sentiment color class
  const getSentimentClass = (sentiment: 'bullish' | 'bearish' | 'neutral') => {
    if (sentiment === 'bullish') return 'text-success';
    if (sentiment === 'bearish') return 'text-error';
    return 'text-foreground/70';
  };
  
  // Helper to get sentiment background class
  const getSentimentBgClass = (sentiment: 'bullish' | 'bearish' | 'neutral') => {
    if (sentiment === 'bullish') return 'bg-success/10';
    if (sentiment === 'bearish') return 'bg-error/10';
    return 'bg-secondary/10';
  };
  
  // Format sentiment score for gauge
  const formatSentimentScore = (score: number) => {
    // Convert -100 to 100 scale to 0 to 100 for gauge
    return ((score + 100) / 2).toFixed(0);
  };
  
  // Get color for sentiment score
  const getSentimentScoreColor = (score: number) => {
    if (score > 30) return 'text-success';
    if (score < -30) return 'text-error';
    return 'text-warning';
  };
  
  return (
    <div className="flex flex-col space-y-6 fade-in">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Sentiment Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Overall Sentiment Card */}
          <div className={`rounded-lg p-4 ${getSentimentBgClass(data.overallSentiment)}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground/70">Overall Sentiment</h3>
              {getSentimentIcon(data.overallSentiment)}
            </div>
            <p className={`text-xl font-bold capitalize ${getSentimentClass(data.overallSentiment)}`}>
              {data.overallSentiment}
            </p>
            <div className="mt-2 flex items-center">
              {data.recentShift && data.shiftMagnitude && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  Recent shift ({data.shiftMagnitude}% change)
                </span>
              )}
            </div>
          </div>
          
          {/* Sentiment Score Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4 col-span-2">
            <h3 className="text-sm font-medium text-foreground/70 mb-2">
              Sentiment Score (-100 to +100)
            </h3>
            <div className="flex items-center mb-2">
              <span className={`text-2xl font-bold ${getSentimentScoreColor(data.sentimentScore)}`}>
                {data.sentimentScore > 0 ? '+' : ''}{data.sentimentScore}
              </span>
              <div className="ml-4 flex items-center">
                <Frown className="text-error mr-2" size={18} />
                <div className="w-48 h-3 bg-gradient-to-r from-error via-warning to-success rounded-full">
                  <div 
                    className="h-5 w-2 bg-foreground rounded-full absolute transform -translate-y-1"
                    style={{ marginLeft: `${formatSentimentScore(data.sentimentScore)}%` }} 
                  ></div>
                </div>
                <Smile className="text-success ml-2" size={18} />
              </div>
            </div>
            <p className="text-xs text-foreground/70">
              {data.sentimentScore > 50 
                ? 'Extremely bullish sentiment indicates strong positive bias in the market'
                : data.sentimentScore > 20
                ? 'Positive sentiment suggests an optimistic market outlook'
                : data.sentimentScore > -20
                ? 'Neutral sentiment indicates mixed or balanced market views'
                : data.sentimentScore > -50
                ? 'Negative sentiment suggests a pessimistic market outlook'
                : 'Extremely bearish sentiment indicates strong negative bias in the market'
              }
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sentiment Sources */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-md font-medium mb-3">Sentiment Sources</h3>
            <div className="space-y-4">
              {data.sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getSentimentIcon(source.sentiment)}
                    <span className="ml-2 text-sm">{source.source}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm mr-3 ${getSentimentClass(source.sentiment)}`}>
                      {source.sentiment}
                    </span>
                    <div className="text-xs bg-secondary/20 px-2 py-0.5 rounded-full">
                      Weight: {(source.weight * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Key Phrases */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-md font-medium mb-3">Key Phrases</h3>
            <div className="space-y-2">
              {data.keyPhrases.map((phrase, index) => (
                <div key={index} className="bg-card-foreground/5 p-3 rounded-md">
                  <div className="flex items-start">
                    {phrase.toLowerCase().includes('bullish') || 
                     phrase.toLowerCase().includes('positive') || 
                     phrase.toLowerCase().includes('support') ? (
                      <TrendingUp className="text-success mr-2 mt-0.5" size={16} />
                    ) : phrase.toLowerCase().includes('bearish') || 
                        phrase.toLowerCase().includes('negative') || 
                        phrase.toLowerCase().includes('resistance') ? (
                      <TrendingDown className="text-error mr-2 mt-0.5" size={16} />
                    ) : (
                      <span className="w-4"></span>
                    )}
                    <span className="text-sm">{phrase}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-md font-medium mb-3">Sentiment Analysis Summary</h3>
          <div className="p-4 bg-card-foreground/5 rounded-md">
            <p className="text-sm">
              The overall market sentiment for this instrument is currently 
              <span className={`font-medium ${getSentimentClass(data.overallSentiment)}`}>
                {' '}{data.overallSentiment}
              </span> 
              with a sentiment score of 
              <span className={`font-medium ${getSentimentScoreColor(data.sentimentScore)}`}>
                {' '}{data.sentimentScore > 0 ? '+' : ''}{data.sentimentScore}
              </span>.
              
              {data.recentShift && data.shiftMagnitude && (
                ` There has been a significant sentiment shift recently (${data.shiftMagnitude}% change), which may indicate changing market dynamics.`
              )}
              
              {!data.recentShift && (
                ` The sentiment has been relatively stable with no significant recent shifts detected.`
              )}
              
              {data.sources.some(s => s.sentiment !== data.overallSentiment) && (
                ` There is some disagreement among different sentiment sources, which could indicate uncertainty in the market.`
              )}
              
              {' '}Key phrases from sentiment analysis highlight themes around
              {data.keyPhrases.map((phrase, i) => 
                i === data.keyPhrases.length - 1 
                  ? ` and "${phrase}"`
                  : ` "${phrase}",`
              )}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisView;