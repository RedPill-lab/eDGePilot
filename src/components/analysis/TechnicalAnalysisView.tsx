import { TechnicalAnalysis } from '../../types';
import { Gauge, TrendingUp, TrendingDown, Pause, BarChart2, CheckCircle, XCircle, Minus } from 'lucide-react';

type TechnicalAnalysisViewProps = {
  data: TechnicalAnalysis;
};

const TechnicalAnalysisView = ({ data }: TechnicalAnalysisViewProps) => {
  // Define RSI status and classes
  const getRsiStatus = (rsi: number) => {
    if (rsi > 70) return { text: 'Overbought', class: 'text-error' };
    if (rsi < 30) return { text: 'Oversold', class: 'text-success' };
    return { text: 'Neutral', class: 'text-foreground' };
  };
  
  const rsiStatus = getRsiStatus(data.rsi);
  
  // Format trend
  const trendFormat = {
    icon: data.trend === 'uptrend' 
      ? <TrendingUp size={20} className="text-success" />
      : data.trend === 'downtrend'
      ? <TrendingDown size={20} className="text-error" />
      : <Pause size={20} className="text-foreground/70" />,
    class: data.trend === 'uptrend'
      ? 'text-success'
      : data.trend === 'downtrend'
      ? 'text-error'
      : 'text-foreground/70'
  };

  const renderConfluenceScore = () => {
    const { confluence } = data;
    const { signals, confluencePercentage, overallSignal } = confluence;

    return (
      <div className="border border-border rounded-lg p-4 mt-6">
        <h3 className="text-md font-medium mb-3">Indicator Confluence</h3>
        
        <div className="space-y-3">
          {signals.map((signal, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {signal.signal === 'bullish' ? (
                  <CheckCircle size={16} className="text-success mr-2" />
                ) : signal.signal === 'bearish' ? (
                  <XCircle size={16} className="text-error mr-2" />
                ) : (
                  <Minus size={16} className="text-foreground/70 mr-2" />
                )}
                <span className="text-sm">{signal.name}</span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm ${
                  signal.signal === 'bullish' ? 'text-success' :
                  signal.signal === 'bearish' ? 'text-error' :
                  'text-foreground/70'
                }`}>
                  {signal.signal.toUpperCase()}
                </span>
                <div className="ml-3 w-16 bg-secondary/20 h-1.5 rounded-full">
                  <div 
                    className={`h-1.5 rounded-full ${
                      signal.signal === 'bullish' ? 'bg-success' :
                      signal.signal === 'bearish' ? 'bg-error' :
                      'bg-foreground/30'
                    }`}
                    style={{ width: `${signal.strength}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Confluence</span>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${
                overallSignal === 'bullish' ? 'text-success' :
                overallSignal === 'bearish' ? 'text-error' :
                'text-foreground/70'
              }`}>
                {confluencePercentage}% Aligned
              </span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                overallSignal === 'bullish' ? 'bg-success/20 text-success' :
                overallSignal === 'bearish' ? 'bg-error/20 text-error' :
                'bg-secondary/20'
              }`}>
                {overallSignal.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col space-y-6 fade-in">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Technical Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Trend Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground/70">Current Trend</h3>
              {trendFormat.icon}
            </div>
            <p className={`text-xl font-bold capitalize ${trendFormat.class}`}>
              {data.trend}
            </p>
          </div>
          
          {/* RSI Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground/70">RSI (14)</h3>
              <Gauge size={20} className="text-primary" />
            </div>
            <p className="text-xl font-bold">{data.rsi.toFixed(1)}</p>
            <span className={`text-xs ${rsiStatus.class}`}>
              {rsiStatus.text}
            </span>
          </div>
          
          {/* EMA Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground/70">EMAs</h3>
              <BarChart2 size={20} className="text-primary" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-foreground/70">EMA 50</p>
                <p className="text-md font-bold">{data.ema50}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/70">EMA 200</p>
                <p className="text-md font-bold">{data.ema200}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Support Levels */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-md font-medium mb-3">Support Levels</h3>
            <div className="space-y-3">
              {data.supportLevels.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">S{index + 1}</span>
                  <span className="text-md font-semibold">{level}</span>
                  <div className="w-1/2 bg-success/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{ width: `${100 - (index * 20)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Resistance Levels */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-md font-medium mb-3">Resistance Levels</h3>
            <div className="space-y-3">
              {data.resistanceLevels.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">R{index + 1}</span>
                  <span className="text-md font-semibold">{level}</span>
                  <div className="w-1/2 bg-error/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-error h-2 rounded-full" 
                      style={{ width: `${100 - (index * 20)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium mb-3">Supply & Demand Zones</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h4 className="text-sm text-foreground/70 mb-2">Supply Zones</h4>
              {data.supplyZones.map((zone, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-error mr-2"></div>
                  <span>{zone.min} - {zone.max}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm text-foreground/70 mb-2">Demand Zones</h4>
              {data.demandZones.map((zone, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                  <span>{zone.min} - {zone.max}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rate of Change */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-md font-medium mb-2">Rate of Change</h3>
            <div className="flex items-center">
              <span className={`text-xl font-bold ${
                data.rateOfChange > 0 
                  ? 'text-success' 
                  : data.rateOfChange < 0 
                  ? 'text-error' 
                  : 'text-foreground'
              }`}>
                {data.rateOfChange > 0 ? '+' : ''}{data.rateOfChange}
              </span>
              <span className="text-sm text-foreground/70 ml-2">
                {data.rateOfChange > 0 ? 'Upward momentum' : 'Downward pressure'}
              </span>
            </div>
          </div>
          
          {/* Key Levels */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-md font-medium mb-2">Key Levels Strength</h3>
            <div className="space-y-2">
              {data.keyLevels.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm capitalize">
                    {level.type} {index + 1}
                  </span>
                  <span className="text-sm font-semibold">{level.price}</span>
                  <div className="w-24 bg-secondary/20 h-2 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        level.type === 'support' ? 'bg-success' : 'bg-error'
                      }`}
                      style={{ width: `${(level.strength / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{level.strength}/10</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {renderConfluenceScore()}
    </div>
  );
};

export default TechnicalAnalysisView;