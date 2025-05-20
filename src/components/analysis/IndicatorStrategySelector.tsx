import { useState, useEffect } from 'react';
import { useAnalysis } from '../../context/AnalysisContext';
import { ChevronDown, Settings, LineChart, TrendingUp, Repeat, Target } from 'lucide-react';

type IndicatorPreset = 'balanced' | 'trend' | 'reversal' | 'support' | 'custom';
type Indicator = 'ema' | 'rsi' | 'roc' | 'sr' | 'sd' | 'bb';

interface IndicatorConfig {
  name: string;
  description: string;
  indicators: Indicator[];
}

const presets: Record<IndicatorPreset, IndicatorConfig> = {
  balanced: {
    name: 'Balanced',
    description: 'Uses a mix of trend and momentum indicators',
    indicators: ['ema', 'rsi', 'sr']
  },
  trend: {
    name: 'Trend-Following',
    description: 'Focuses on trend identification and continuation',
    indicators: ['ema', 'roc', 'bb']
  },
  reversal: {
    name: 'Mean Reversion',
    description: 'Identifies potential reversal points',
    indicators: ['rsi', 'bb', 'sr']
  },
  support: {
    name: 'Support-Focused',
    description: 'Emphasizes key price levels and zones',
    indicators: ['sr', 'sd', 'ema']
  },
  custom: {
    name: 'Custom',
    description: 'Select your own combination of indicators',
    indicators: []
  }
};

const getIndicatorDescription = (indicator: Indicator, strategy: 'intraday' | 'swing' | 'position') => {
  switch (indicator) {
    case 'ema':
      return strategy === 'intraday' ? 'EMA (20, 50)' :
             strategy === 'swing' ? 'EMA (50, 100)' :
             'EMA (100, 200)';
    case 'rsi':
      return `RSI (${strategy === 'intraday' ? '7' : 
                     strategy === 'swing' ? '14' : '21'})`;
    case 'roc':
      return `Rate of Change (${strategy === 'intraday' ? '5' : 
                               strategy === 'swing' ? '10' : '21'})`;
    case 'bb':
      return `Bollinger Bands (${strategy === 'intraday' ? '20-period, 1.5σ' : 
                                strategy === 'swing' ? '30-period, 2.0σ' : '50-period, 2.5σ'})`;
    case 'sr':
      return 'Support & Resistance levels';
    case 'sd':
      return 'Supply & Demand zones';
  }
};

const IndicatorStrategySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<IndicatorPreset>('balanced');
  const [customIndicators, setCustomIndicators] = useState<Indicator[]>([]);
  
  const { analysisState, setIndicatorStrategy } = useAnalysis();
  const strategy = analysisState.strategy || 'swing';
  
  const indicators: Record<Indicator, { name: string; description: string }> = {
    ema: {
      name: 'EMA',
      description: getIndicatorDescription('ema', strategy)
    },
    rsi: {
      name: 'RSI',
      description: getIndicatorDescription('rsi', strategy)
    },
    roc: {
      name: 'ROC',
      description: getIndicatorDescription('roc', strategy)
    },
    sr: {
      name: 'Support & Resistance',
      description: getIndicatorDescription('sr', strategy)
    },
    sd: {
      name: 'Supply & Demand',
      description: getIndicatorDescription('sd', strategy)
    },
    bb: {
      name: 'Bollinger Bands',
      description: getIndicatorDescription('bb', strategy)
    }
  };
  
  useEffect(() => {
    // Update indicator descriptions when strategy changes
    Object.keys(indicators).forEach(key => {
      indicators[key as Indicator].description = 
        getIndicatorDescription(key as Indicator, strategy);
    });
  }, [strategy]);
  
  const handlePresetChange = (preset: IndicatorPreset) => {
    setSelectedPreset(preset);
    if (preset !== 'custom') {
      setCustomIndicators(presets[preset].indicators);
      setIndicatorStrategy({
        preset,
        indicators: presets[preset].indicators
      });
    }
    setIsOpen(false);
  };
  
  const handleCustomIndicatorToggle = (indicator: Indicator) => {
    const newIndicators = customIndicators.includes(indicator)
      ? customIndicators.filter(i => i !== indicator)
      : [...customIndicators, indicator];
    
    setCustomIndicators(newIndicators);
    setIndicatorStrategy({
      preset: 'custom',
      indicators: newIndicators
    });
  };
  
  const getPresetIcon = (preset: IndicatorPreset) => {
    switch (preset) {
      case 'balanced':
        return <Settings size={20} className="text-primary" />;
      case 'trend':
        return <TrendingUp size={20} className="text-accent" />;
      case 'reversal':
        return <Repeat size={20} className="text-success" />;
      case 'support':
        return <Target size={20} className="text-warning" />;
      case 'custom':
        return <LineChart size={20} className="text-primary" />;
    }
  };
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Indicator Strategy
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-card border border-border rounded-md px-4 py-2 text-left focus:outline-none"
        >
          <div className="flex items-center">
            <span className="mr-2">{getPresetIcon(selectedPreset)}</span>
            <div>
              <div className="font-medium">{presets[selectedPreset].name}</div>
              <div className="text-xs text-foreground/70">
                {presets[selectedPreset].description}
              </div>
            </div>
          </div>
          <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-lg">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                className="w-full text-left px-4 py-3 hover:bg-secondary/10 border-b border-border last:border-0"
                onClick={() => handlePresetChange(key as IndicatorPreset)}
              >
                <div className="flex items-center">
                  <span className="mr-3">{getPresetIcon(key as IndicatorPreset)}</span>
                  <div>
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-xs text-foreground/70 mt-1">
                      {preset.description}
                    </div>
                    {key !== 'custom' && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {preset.indicators.map((indicator) => (
                          <span
                            key={indicator}
                            className="text-xs bg-secondary/20 px-2 py-0.5 rounded-full"
                          >
                            {indicators[indicator].name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {selectedPreset === 'custom' && (
        <div className="mt-4 space-y-2">
          {Object.entries(indicators).map(([key, indicator]) => (
            <label key={key} className="flex items-start">
              <input
                type="checkbox"
                checked={customIndicators.includes(key as Indicator)}
                onChange={() => handleCustomIndicatorToggle(key as Indicator)}
                className="mt-1 mr-2"
              />
              <div>
                <div className="font-medium">{indicator.name}</div>
                <div className="text-xs text-foreground/70">
                  {indicator.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndicatorStrategySelector;