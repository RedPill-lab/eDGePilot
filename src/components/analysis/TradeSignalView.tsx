import React from 'react';

interface TradeSignalViewProps {
  data: {
    technicalAnalysis: {
      confluence: {
        overallSignal: string;
        confluencePercentage: number;
        alignedSignals: number;
        totalSignals: number;
      };
    };
  };
}

const TradeSignalView = ({ data }: TradeSignalViewProps) => {
  const renderConfluenceIndicators = () => {
    const { confluence } = data.technicalAnalysis;
    
    return (
      <div className="mt-4 p-4 bg-card-foreground/5 rounded-md">
        <h3 className="text-sm font-medium mb-2">Technical Confluence</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              confluence.overallSignal === 'bullish' ? 'bg-success/20 text-success' :
              confluence.overallSignal === 'bearish' ? 'bg-error/20 text-error' :
              'bg-secondary/20'
            }`}>
              {confluence.confluencePercentage}% Aligned
            </span>
            <span className="text-xs ml-2">
              ({confluence.alignedSignals}/{confluence.totalSignals} indicators)
            </span>
          </div>
          <span className={`text-sm font-medium ${
            confluence.overallSignal === 'bullish' ? 'text-success' :
            confluence.overallSignal === 'bearish' ? 'text-error' :
            'text-foreground/70'
          }`}>
            {confluence.overallSignal.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-4">
      {renderConfluenceIndicators()}
    </div>
  );
};

export default TradeSignalView;