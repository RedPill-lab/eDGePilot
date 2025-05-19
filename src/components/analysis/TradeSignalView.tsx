import { TradeSignal } from '../../types';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown, AlertTriangle, BarChart2, DollarSign } from 'lucide-react';

type TradeSignalViewProps = {
  data: TradeSignal;
};

const TradeSignalView = ({ data }: TradeSignalViewProps) => {
  // Calculate percentage gains/losses
  const calculatePercentage = () => {
    if (data.action === 'buy') {
      const gain = ((data.takeProfit - data.entryPrice) / data.entryPrice) * 100;
      const loss = ((data.entryPrice - data.stopLoss) / data.entryPrice) * 100;
      return { gain, loss };
    } else {
      const gain = ((data.entryPrice - data.takeProfit) / data.entryPrice) * 100;
      const loss = ((data.stopLoss - data.entryPrice) / data.entryPrice) * 100;
      return { gain, loss };
    }
  };
  
  const percentages = calculatePercentage();
  
  return (
    <div className="flex flex-col space-y-6 fade-in">
      <div className="card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
          <div>
            <h2 className="text-xl font-semibold">Trade Signal</h2>
            <p className="text-foreground/70 text-sm mt-1">
              Generated on {new Date(data.timestamp).toLocaleDateString()} at {new Date(data.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center">
            <div className={`flex items-center px-3 py-1.5 rounded-md ${
              data.action === 'buy' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
            }`}>
              {data.action === 'buy' ? (
                <ArrowUpCircle size={20} className="mr-2" />
              ) : (
                <ArrowDownCircle size={20} className="mr-2" />
              )}
              <span className="font-bold uppercase">{data.action}</span>
            </div>
            <div className="ml-3 px-3 py-1.5 bg-primary/20 text-primary rounded-md">
              <span className="font-medium">{data.instrument.symbol}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="bg-card-foreground/5 rounded-lg p-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm text-foreground/70 mb-1">Entry Price</h3>
                  <p className="text-xl font-bold">{data.entryPrice}</p>
                </div>
                <div>
                  <h3 className="text-sm text-foreground/70 mb-1">Stop Loss</h3>
                  <p className="text-xl font-bold text-error">{data.stopLoss}</p>
                  <p className="text-xs text-error">-{percentages.loss.toFixed(2)}%</p>
                </div>
                <div>
                  <h3 className="text-sm text-foreground/70 mb-1">Take Profit</h3>
                  <p className="text-xl font-bold text-success">{data.takeProfit}</p>
                  <p className="text-xs text-success">+{percentages.gain.toFixed(2)}%</p>
                </div>
              </div>
              
              <div className="mt-5 relative pt-4">
                <div className="w-full h-1 bg-secondary/20 rounded-full absolute top-0"></div>
                
                {/* Stop Loss Marker */}
                <div 
                  className="absolute top-0 h-4 w-1 bg-error transform -translate-x-1/2"
                  style={{ 
                    left: data.action === 'buy' 
                      ? `${((data.stopLoss - Math.min(data.stopLoss, data.takeProfit)) / 
                          (Math.max(data.entryPrice, data.stopLoss, data.takeProfit) - 
                           Math.min(data.stopLoss, data.takeProfit))) * 100}%` 
                      : `${((data.stopLoss - Math.min(data.entryPrice, data.takeProfit)) / 
                          (Math.max(data.stopLoss, data.entryPrice, data.takeProfit) - 
                           Math.min(data.entryPrice, data.takeProfit))) * 100}%`
                  }}
                >
                  <div className="text-xs whitespace-nowrap text-error mt-2 transform -translate-x-1/2">SL</div>
                </div>
                
                {/* Entry Price Marker */}
                <div 
                  className="absolute top-0 h-4 w-1 bg-primary transform -translate-x-1/2"
                  style={{ 
                    left: data.action === 'buy' 
                      ? `${((data.entryPrice - Math.min(data.stopLoss, data.takeProfit)) / 
                          (Math.max(data.entryPrice, data.stopLoss, data.takeProfit) - 
                           Math.min(data.stopLoss, data.takeProfit))) * 100}%` 
                      : `${((data.entryPrice - Math.min(data.entryPrice, data.takeProfit)) / 
                          (Math.max(data.stopLoss, data.entryPrice, data.takeProfit) - 
                           Math.min(data.entryPrice, data.takeProfit))) * 100}%`
                  }}
                >
                  <div className="text-xs whitespace-nowrap text-primary mt-2 transform -translate-x-1/2">Entry</div>
                </div>
                
                {/* Take Profit Marker */}
                <div 
                  className="absolute top-0 h-4 w-1 bg-success transform -translate-x-1/2"
                  style={{ 
                    left: data.action === 'buy' 
                      ? `${((data.takeProfit - Math.min(data.stopLoss, data.takeProfit)) / 
                          (Math.max(data.entryPrice, data.stopLoss, data.takeProfit) - 
                           Math.min(data.stopLoss, data.takeProfit))) * 100}%` 
                      : `${((data.takeProfit - Math.min(data.entryPrice, data.takeProfit)) / 
                          (Math.max(data.stopLoss, data.entryPrice, data.takeProfit) - 
                           Math.min(data.entryPrice, data.takeProfit))) * 100}%`
                  }}
                >
                  <div className="text-xs whitespace-nowrap text-success mt-2 transform -translate-x-1/2">TP</div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm text-foreground/70 mb-1">Risk (Pips)</h3>
                  <p className="text-md font-medium">{data.pipsRisk.toFixed(1)}</p>
                </div>
                <div>
                  <h3 className="text-sm text-foreground/70 mb-1">Reward (Pips)</h3>
                  <p className="text-md font-medium">{data.pipsReward.toFixed(1)}</p>
                </div>
                <div>
                  <h3 className="text-sm text-foreground/70 mb-1">Risk:Reward</h3>
                  <p className="text-md font-medium">1:{data.riskRewardRatio.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Confidence Level Gauge */}
          <div className="bg-card-foreground/5 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-md font-medium mb-3">Signal Confidence</h3>
              <div className="relative pt-2 pb-4">
                <div className="w-full h-56 rounded-full bg-gradient-to-b from-error via-warning to-success relative overflow-hidden">
                  <div 
                    className="absolute bottom-0 w-full bg-card rounded-t-full"
                    style={{ height: `${100 - data.confidenceLevel}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white drop-shadow-md">
                      {data.confidenceLevel}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className={`p-3 rounded-md ${
                data.confidenceLevel > 70 
                  ? 'bg-success/20 text-success'
                  : data.confidenceLevel > 50
                  ? 'bg-primary/20 text-primary'
                  : data.confidenceLevel > 30
                  ? 'bg-warning/20 text-warning'
                  : 'bg-error/20 text-error'
              }`}>
                <p className="text-sm">
                  {data.confidenceLevel > 70 
                    ? 'High confidence signal based on strong alignment of multiple analysis factors'
                    : data.confidenceLevel > 50
                    ? 'Moderate confidence signal with good alignment of key factors'
                    : data.confidenceLevel > 30
                    ? 'Speculative signal with some conflicting indicators'
                    : 'Low confidence signal with significant disagreement between factors'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-5 mb-6">
          <h3 className="text-md font-medium mb-3">Trade Rationale</h3>
          <p className="text-sm leading-relaxed">{data.rationale}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card-foreground/5 rounded-lg flex items-start">
            <BarChart2 size={20} className="text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium mb-1">Market Structure</h3>
              <p className="text-xs text-foreground/90">
                {data.action === 'buy'
                  ? 'Price approaching support with potential for reversal'
                  : 'Price near resistance with potential for rejection'}
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-card-foreground/5 rounded-lg flex items-start">
            <AlertTriangle size={20} className="text-warning mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium mb-1">Risk Management</h3>
              <p className="text-xs text-foreground/90">
                {`Stop loss placed ${data.action === 'buy' ? 'below' : 'above'} key ${
                  data.action === 'buy' ? 'support' : 'resistance'
                } level for protection`}
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-card-foreground/5 rounded-lg flex items-start">
            <DollarSign size={20} className="text-success mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium mb-1">Profit Potential</h3>
              <p className="text-xs text-foreground/90">
                {`Target set at ${percentages.gain.toFixed(2)}% with ${
                  data.riskRewardRatio > 2 
                    ? 'excellent' 
                    : data.riskRewardRatio > 1 
                    ? 'good' 
                    : 'acceptable'
                } risk:reward ratio of 1:${data.riskRewardRatio.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeSignalView;