```typescript
import { useState } from 'react';
import { QuantAnalysis } from '../../types';
import { TrendingUp, BarChart2, Activity, AlertTriangle, Scale } from 'lucide-react';
import BacktestDateRangeSelector from './BacktestDateRangeSelector';
import EquityCurveChart from './EquityCurveChart';

type QuantAnalysisViewProps = {
  data: QuantAnalysis;
};

const QuantAnalysisView = ({ data }: QuantAnalysisViewProps) => {
  const [backtestResults, setBacktestResults] = useState({
    winRate: data.winRate,
    maxDrawdown: data.maxDrawdown,
    riskRewardRatio: data.riskRewardRatio,
    equityCurves: Array.from({ length: 10 }, () => 
      Array.from({ length: 30 }, (_, i) => {
        const base = (Math.random() * 4) - 2; // Random base between -2 and 2
        return base + (i * 0.2); // Slight upward trend
      })
    ),
    medianCurveIndex: 4
  });

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    // In a real app, this would trigger a new backtest calculation
    // For now, we'll just simulate new results
    const days = Math.floor((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24));
    
    setBacktestResults({
      winRate: 0.5 + (Math.random() * 0.3), // 50-80%
      maxDrawdown: 5 + (Math.random() * 10), // 5-15%
      riskRewardRatio: 1.5 + (Math.random() * 1), // 1.5-2.5
      equityCurves: Array.from({ length: 10 }, () => 
        Array.from({ length: days }, (_, i) => {
          const base = (Math.random() * 4) - 2;
          return base + (i * 0.2);
        })
      ),
      medianCurveIndex: 4
    });
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  // Get color class based on value
  const getColorClass = (value: number, inverse = false) => {
    if (!inverse) {
      return value > 0 ? 'text-success' : value < 0 ? 'text-error' : 'text-foreground';
    } else {
      return value < 0 ? 'text-success' : value > 0 ? 'text-error' : 'text-foreground';
    }
  };

  return (
    <div className="flex flex-col space-y-6 fade-in">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Quantitative Analysis</h2>
        
        <BacktestDateRangeSelector onRangeChange={handleDateRangeChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Win Rate Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground/70">Win Rate</h3>
              <TrendingUp size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-bold">
              {(backtestResults.winRate * 100).toFixed(1)}%
            </p>
            <div className="mt-2 w-full bg-secondary/20 h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${backtestResults.winRate * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Expected Return Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground/70">Expected Return</h3>
              <BarChart2 size={20} className="text-primary" />
            </div>
            <p className={`text-2xl font-bold ${getColorClass(data.expectedReturn)}`}>
              {formatPercent(data.expectedReturn)}
            </p>
            <p className="text-xs mt-2 text-foreground/70">
              CI: {formatPercent(data.confidenceInterval.lower)} to {formatPercent(data.confidenceInterval.upper)}
            </p>
          </div>
          
          {/* Risk-Reward Ratio Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground/70">Risk-Reward Ratio</h3>
              <Scale size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-bold">
              1:{backtestResults.riskRewardRatio.toFixed(2)}
            </p>
            <p className="text-xs mt-2 text-foreground/70">
              Higher values indicate better reward relative to risk
            </p>
          </div>
          
          {/* Max Drawdown Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground/70">Max Drawdown</h3>
              <AlertTriangle size={20} className="text-warning" />
            </div>
            <p className="text-2xl font-bold text-error">
              -{backtestResults.maxDrawdown.toFixed(2)}%
            </p>
            <div className="mt-2 w-full bg-secondary/20 h-2 rounded-full">
              <div 
                className="bg-error h-2 rounded-full" 
                style={{ width: `${backtestResults.maxDrawdown}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-5">
          <h3 className="text-md font-medium mb-4">Monte Carlo Simulation</h3>
          <EquityCurveChart 
            curves={backtestResults.equityCurves}
            medianCurveIndex={backtestResults.medianCurveIndex}
          />
          <div className="mt-4 p-4 bg-card-foreground/5 rounded-md">
            <div className="flex items-center">
              <Activity size={18} className="text-primary mr-2" />
              <p className="text-sm">
                Monte Carlo simulation with {backtestResults.equityCurves.length} paths shows a {
                  backtestResults.winRate > 0.6 ? 'strong' : 
                  backtestResults.winRate > 0.5 ? 'moderate' : 'weak'
                } edge with {(backtestResults.winRate * 100).toFixed(1)}% win rate and {
                  backtestResults.maxDrawdown.toFixed(1)}% maximum drawdown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantAnalysisView;
```