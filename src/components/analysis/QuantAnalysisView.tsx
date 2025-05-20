import { useState } from 'react';
import { QuantAnalysis } from '../../types';
import { TrendingUp, BarChart2, Activity, AlertTriangle, Scale, ToggleLeft, ToggleRight } from 'lucide-react';
import BacktestDateRangeSelector from './BacktestDateRangeSelector';
import WalkForwardControls from './WalkForwardControls';
import WalkForwardChart from './WalkForwardChart';
import EquityCurveChart from './EquityCurveChart';

type QuantAnalysisViewProps = {
  data: QuantAnalysis;
};

const QuantAnalysisView = ({ data }: QuantAnalysisViewProps) => {
  const [walkForwardEnabled, setWalkForwardEnabled] = useState(false);
  const [splitRatio, setSplitRatio] = useState('2/1');
  const [selectedRange, setSelectedRange] = useState({ start: new Date(), end: new Date() });
  const [backtestResults, setBacktestResults] = useState({
    winRate: data.winRate,
    maxDrawdown: data.maxDrawdown,
    riskRewardRatio: data.riskRewardRatio,
    equityCurves: Array.from({ length: 10 }, () => 
      Array.from({ length: 30 }, (_, i) => {
        const base = (Math.random() * 4) - 2;
        return base + (i * 0.2);
      })
    ),
    medianCurveIndex: 4
  });

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setSelectedRange(range);
    const days = Math.floor((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24));
    
    setBacktestResults({
      winRate: 0.5 + (Math.random() * 0.3),
      maxDrawdown: 5 + (Math.random() * 10),
      riskRewardRatio: 1.5 + (Math.random() * 1),
      equityCurves: Array.from({ length: 10 }, () => 
        Array.from({ length: days }, (_, i) => {
          const base = (Math.random() * 4) - 2;
          return base + (i * 0.2);
        })
      ),
      medianCurveIndex: 4
    });
  };

  const handleSplitRatioChange = (ratio: string, custom?: { trainDays: number; testDays: number }) => {
    setSplitRatio(ratio);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  // Get color class based on value
  const getColorClass = (value: number, inverse = false) => {
    return !inverse 
      ? value > 0 ? 'text-success' : value < 0 ? 'text-error' : 'text-foreground'
      : value < 0 ? 'text-success' : value > 0 ? 'text-error' : 'text-foreground';
  };

  return (
    <div className="flex flex-col space-y-6 fade-in">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quantitative Analysis</h2>
          <button
            onClick={() => setWalkForwardEnabled(!walkForwardEnabled)}
            className="flex items-center text-sm hover:text-primary"
          >
            {walkForwardEnabled ? (
              <>
                <ToggleRight size={20} className="mr-2" />
                Walk-Forward Analysis Enabled
              </>
            ) : (
              <>
                <ToggleLeft size={20} className="mr-2" />
                Enable Walk-Forward Analysis
              </>
            )}
          </button>
        </div>
        
        <BacktestDateRangeSelector onRangeChange={handleDateRangeChange} />
        
        {walkForwardEnabled && (
          <div className="mb-6">
            <WalkForwardControls
              enabled={walkForwardEnabled}
              splitRatio={splitRatio as any}
              totalDays={Math.floor((selectedRange.end.getTime() - selectedRange.start.getTime()) / (1000 * 60 * 60 * 24))}
              onSplitChange={handleSplitRatioChange}
            />
          </div>
        )}
        
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

        {walkForwardEnabled && data.walkForward && (
          <div className="border border-border rounded-lg p-5 mb-6">
            <h3 className="text-md font-medium mb-4">Walk-Forward Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-card-foreground/5 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Strategy Consistency</h4>
                <p className="text-2xl font-bold">
                  {data.walkForward.summary.consistencyScore.toFixed(1)}/10
                </p>
                <p className="text-xs text-foreground/70 mt-1">
                  Based on performance across all windows
                </p>
              </div>
              
              <div className="bg-card-foreground/5 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Best Window Return</h4>
                <p className="text-2xl font-bold text-success">
                  {formatPercent(data.walkForward.summary.bestWindow.testReturn)}
                </p>
                <p className="text-xs text-foreground/70 mt-1">
                  {new Date(data.walkForward.summary.bestWindow.testStart).toLocaleDateString()} - {new Date(data.walkForward.summary.bestWindow.testEnd).toLocaleDateString()}
                </p>
              </div>
              
              <div className="bg-card-foreground/5 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Window Pass Rate</h4>
                <p className="text-2xl font-bold">
                  {(data.walkForward.summary.passRate * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-foreground/70 mt-1">
                  Strategy held up in {Math.round(data.walkForward.windows.length * data.walkForward.summary.passRate)}/{data.walkForward.windows.length} windows
                </p>
              </div>
            </div>
            
            <WalkForwardChart windows={data.walkForward.windows} />
          </div>
        )}

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
                {walkForwardEnabled && data.walkForward && (
                  data.walkForward.summary.passRate < 0.7
                    ? " ❌ Avoid this strategy — Walk-Forward Analysis shows inconsistent performance across test windows."
                    : " ✅ Strategy shows robust performance across different market conditions."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantAnalysisView;