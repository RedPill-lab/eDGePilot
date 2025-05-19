import { QuantAnalysis } from '../../types';
import { TrendingUp, BarChart2, Activity, AlertTriangle, Scale } from 'lucide-react';

type QuantAnalysisViewProps = {
  data: QuantAnalysis;
};

const QuantAnalysisView = ({ data }: QuantAnalysisViewProps) => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Win Rate Card */}
          <div className="bg-card-foreground/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground/70">Win Rate</h3>
              <TrendingUp size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-bold">
              {(data.winRate * 100).toFixed(1)}%
            </p>
            <div className="mt-2 w-full bg-secondary/20 h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${data.winRate * 100}%` }}
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
              1:{data.riskRewardRatio.toFixed(2)}
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
              -{data.maxDrawdown.toFixed(2)}%
            </p>
            <div className="mt-2 w-full bg-secondary/20 h-2 rounded-full">
              <div 
                className="bg-error h-2 rounded-full" 
                style={{ width: `${data.maxDrawdown}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Performance Metrics */}
          <div className="border border-border rounded-lg p-5">
            <h3 className="text-md font-medium mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Win Rate</span>
                <span className="font-medium">{(data.winRate * 100).toFixed(1)}%</span>
                <div className="w-1/3 bg-secondary/20 h-2 rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${data.winRate * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Expected Return</span>
                <span className={`font-medium ${getColorClass(data.expectedReturn)}`}>
                  {formatPercent(data.expectedReturn)}
                </span>
                <div className="w-1/3 bg-secondary/20 h-2 rounded-full">
                  <div
                    className={`h-2 rounded-full ${data.expectedReturn > 0 ? 'bg-success' : 'bg-error'}`}
                    style={{ width: `${Math.min(Math.abs(data.expectedReturn), 30)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk-Reward Ratio</span>
                <span className="font-medium">1:{data.riskRewardRatio.toFixed(2)}</span>
                <div className="w-1/3 bg-secondary/20 h-2 rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${Math.min(data.riskRewardRatio * 30, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Sharpe Ratio</span>
                <span className={`font-medium ${data.sharpeRatio > 1 ? 'text-success' : 'text-foreground'}`}>
                  {data.sharpeRatio.toFixed(2)}
                </span>
                <div className="w-1/3 bg-secondary/20 h-2 rounded-full">
                  <div
                    className={`h-2 rounded-full ${data.sharpeRatio > 1 ? 'bg-success' : 'bg-warning'}`}
                    style={{ width: `${Math.min(data.sharpeRatio * 30, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Max Drawdown</span>
                <span className="font-medium text-error">
                  -{data.maxDrawdown.toFixed(2)}%
                </span>
                <div className="w-1/3 bg-secondary/20 h-2 rounded-full">
                  <div
                    className="bg-error h-2 rounded-full"
                    style={{ width: `${Math.min(data.maxDrawdown, 50)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Monte Carlo Simulation */}
          {data.monteCarlo && (
            <div className="border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium">Monte Carlo Simulation</h3>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {data.monteCarlo.simulations.toLocaleString()} Simulations
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm text-foreground/70 mb-2">Profitability Rate</h4>
                <div className="flex items-end space-x-2">
                  <span className="text-2xl font-bold">
                    {(data.monteCarlo.profitabilityRate * 100).toFixed(1)}%
                  </span>
                  <span className="text-xs text-foreground/70 mb-1">
                    of simulations were profitable
                  </span>
                </div>
                <div className="mt-2 w-full bg-secondary/20 h-3 rounded-full">
                  <div 
                    className="bg-success h-3 rounded-full" 
                    style={{ width: `${data.monteCarlo.profitabilityRate * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-foreground/70 mb-2">Average Return</h4>
                <p className={`text-2xl font-bold ${getColorClass(data.monteCarlo.averageReturn)}`}>
                  {formatPercent(data.monteCarlo.averageReturn)}
                </p>
                <p className="text-xs mt-1 text-foreground/70">
                  Average return across all simulations
                </p>
              </div>
              
              <div className="mt-4 p-3 bg-card-foreground/5 rounded-md">
                <div className="flex items-center">
                  <Activity size={18} className="text-primary mr-2" />
                  <p className="text-sm">
                    {data.confidenceInterval.lower < 0 && data.confidenceInterval.upper > 0 
                      ? `This strategy shows mixed results with a wide confidence interval from ${formatPercent(data.confidenceInterval.lower)} to ${formatPercent(data.confidenceInterval.upper)}.`
                      : data.confidenceInterval.lower > 0 
                        ? `This strategy shows positive expected returns with 95% confidence interval between ${formatPercent(data.confidenceInterval.lower)} and ${formatPercent(data.confidenceInterval.upper)}.`
                        : `This strategy shows negative expected returns with 95% confidence interval between ${formatPercent(data.confidenceInterval.lower)} and ${formatPercent(data.confidenceInterval.upper)}.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border border-border rounded-lg p-5">
          <h3 className="text-md font-medium mb-3">Performance Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Win Rate Assessment */}
            <div className="p-3 bg-card-foreground/5 rounded-md">
              <h4 className="text-sm font-medium mb-2">Win Rate</h4>
              <div className={`text-sm ${
                data.winRate > 0.6 
                  ? 'text-success' 
                  : data.winRate > 0.45 
                  ? 'text-foreground' 
                  : 'text-error'
              }`}>
                {data.winRate > 0.6 
                  ? 'Strong win rate above industry average' 
                  : data.winRate > 0.45 
                  ? 'Average win rate, typical for this strategy' 
                  : 'Below average win rate, consider adjustments'
                }
              </div>
            </div>
            
            {/* Risk-Reward Assessment */}
            <div className="p-3 bg-card-foreground/5 rounded-md">
              <h4 className="text-sm font-medium mb-2">Risk-Reward Profile</h4>
              <div className={`text-sm ${
                data.riskRewardRatio > 2 
                  ? 'text-success' 
                  : data.riskRewardRatio > 1 
                  ? 'text-foreground' 
                  : 'text-error'
              }`}>
                {data.riskRewardRatio > 2 
                  ? 'Excellent risk-reward ratio' 
                  : data.riskRewardRatio > 1 
                  ? 'Acceptable risk-reward balance' 
                  : 'Poor risk-reward, higher risk than potential reward'
                }
              </div>
            </div>
            
            {/* Overall Assessment */}
            <div className="p-3 bg-card-foreground/5 rounded-md">
              <h4 className="text-sm font-medium mb-2">Overall Assessment</h4>
              <div className={`text-sm ${
                data.expectedReturn > 10 
                  ? 'text-success' 
                  : data.expectedReturn > 0 
                  ? 'text-foreground' 
                  : 'text-error'
              }`}>
                {data.expectedReturn > 10 
                  ? 'Strong strategy with high positive expected return' 
                  : data.expectedReturn > 0 
                  ? 'Viable strategy with positive expected return' 
                  : 'Strategy needs revision, negative expected return'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantAnalysisView;