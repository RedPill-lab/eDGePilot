import { useState } from 'react';
import { ChevronDown, Clock, Calendar, TrendingUp } from 'lucide-react';
import { StrategyType } from '../../types';
import { useAnalysis } from '../../context/AnalysisContext';

const strategies = [
  {
    type: 'intraday',
    name: 'Intraday',
    description: 'Short-term trades that are closed within the same trading day.',
    icon: <Clock size={20} className="text-primary" />,
    timeframe: 'Minutes to hours',
  },
  {
    type: 'swing',
    name: 'Swing',
    description: 'Medium-term trades that typically last from a few days to a few weeks.',
    icon: <Calendar size={20} className="text-accent" />,
    timeframe: 'Days to weeks',
  },
  {
    type: 'position',
    name: 'Position',
    description: 'Long-term trades based on fundamental factors and major trends.',
    icon: <TrendingUp size={20} className="text-success" />,
    timeframe: 'Weeks to months',
  },
];

const StrategySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { analysisState, setStrategy } = useAnalysis();
  
  const handleSelectStrategy = (strategy: StrategyType) => {
    setStrategy(strategy);
    setIsOpen(false);
  };
  
  const selectedStrategy = strategies.find(
    (s) => s.type === analysisState.strategy
  );
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Select Strategy
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-card border border-border rounded-md px-4 py-2 text-left focus:outline-none"
        >
          {selectedStrategy ? (
            <div className="flex items-center">
              <span className="mr-2">{selectedStrategy.icon}</span>
              <div>
                <div className="font-medium">{selectedStrategy.name}</div>
                <div className="text-xs text-foreground/70">
                  {selectedStrategy.timeframe}
                </div>
              </div>
            </div>
          ) : (
            <span className="text-foreground/70">Select a strategy...</span>
          )}
          <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-lg">
            {strategies.map((strategy) => (
              <button
                key={strategy.type}
                className="w-full text-left px-4 py-3 hover:bg-secondary/10 border-b border-border last:border-0"
                onClick={() => handleSelectStrategy(strategy.type as StrategyType)}
              >
                <div className="flex items-center">
                  <span className="mr-3">{strategy.icon}</span>
                  <div>
                    <div className="font-medium">{strategy.name}</div>
                    <div className="text-xs text-foreground/70 mt-1">
                      {strategy.description}
                    </div>
                    <div className="text-xs mt-1">
                      <span className="bg-secondary/20 px-2 py-0.5 rounded-full">
                        {strategy.timeframe}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategySelector;