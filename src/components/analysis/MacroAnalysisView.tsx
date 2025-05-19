import { MacroAnalysis } from '../../types';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

type MacroAnalysisViewProps = {
  data: MacroAnalysis;
};

const MacroAnalysisView = ({ data }: MacroAnalysisViewProps) => {
  return (
    <div className="flex flex-col space-y-6 fade-in">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">
          Macroeconomic Analysis
        </h2>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Summary</h3>
          <p className="text-foreground/90">{data.summary}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Key Economic Factors</h3>
            <ul className="space-y-1 text-sm">
              {data.keyFactors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <ArrowRight size={16} className="mr-2 mt-1 text-primary" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Economic Outlook</h3>
            <p className="text-sm text-foreground/90">{data.economicOutlook}</p>
            
            <h3 className="text-md font-medium mb-2 mt-4">Market Impact</h3>
            <p className="text-sm text-foreground/90">{data.marketImpact}</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-success/10 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-success mr-2" size={20} />
              <h3 className="text-md font-medium text-success">Bullish Factors</h3>
            </div>
            <ul className="space-y-1 text-sm">
              {data.bullishFactors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-error/10 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <TrendingDown className="text-error mr-2" size={20} />
              <h3 className="text-md font-medium text-error">Bearish Factors</h3>
            </div>
            <ul className="space-y-1 text-sm">
              {data.bearishFactors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 border border-border rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium">Overall Sentiment</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              data.overallSentiment === 'bullish' 
                ? 'bg-success/20 text-success' 
                : data.overallSentiment === 'bearish'
                ? 'bg-error/20 text-error'
                : 'bg-secondary/20 text-secondary'
            }`}>
              {data.overallSentiment.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroAnalysisView;