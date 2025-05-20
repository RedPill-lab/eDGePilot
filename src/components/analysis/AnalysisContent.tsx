import { useAnalysis } from '../../context/AnalysisContext';
import MacroAnalysisView from './MacroAnalysisView';
import TechnicalAnalysisView from './TechnicalAnalysisView';
import QuantAnalysisView from './QuantAnalysisView';
import SentimentAnalysisView from './SentimentAnalysisView';
import TradeSignalView from './TradeSignalView';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';

const AnalysisContent = () => {
  const { analysisState, goToNextStage, goToPreviousStage } = useAnalysis();
  const { stages, currentStage, isLoading, propFirmSettings } = analysisState;
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-lg font-medium">Analyzing market data...</p>
        <p className="text-sm text-foreground/70 mt-2">This may take a few moments</p>
      </div>
    );
  }
  
  // Render empty state when no analysis has been run
  if (stages.length === 0) {
    return (
      <div className="card p-8 flex flex-col items-center justify-center min-h-[30vh]">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <ArrowRight size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Start Your Analysis</h3>
        <p className="text-center text-foreground/70 mb-6 max-w-md">
          Select an instrument and strategy, then click "Run Analysis" 
          to generate a comprehensive trading signal.
        </p>
      </div>
    );
  }
  
  // Check if signal was filtered out due to R:R
  const currentAnalysis = stages[currentStage];
  if (currentAnalysis.type === 'signal' && !currentAnalysis.data && propFirmSettings?.enabled) {
    return (
      <div className="card p-8">
        <div className="flex items-start text-warning">
          <AlertTriangle size={24} className="mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Trade Signal Filtered</h3>
            <p className="text-foreground/90">
              This trade was filtered out because the Risk-to-Reward ratio is below the minimum threshold of 1.5 
              required for prop firm safety.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Render the appropriate view based on the current stage
  const renderStageContent = () => {
    switch (currentAnalysis.type) {
      case 'macro':
        return <MacroAnalysisView data={currentAnalysis.data} />;
      case 'technical':
        return <TechnicalAnalysisView data={currentAnalysis.data} />;
      case 'quant':
        return <QuantAnalysisView data={currentAnalysis.data} />;
      case 'sentiment':
        return <SentimentAnalysisView data={currentAnalysis.data} />;
      case 'signal':
        return currentAnalysis.data ? <TradeSignalView data={currentAnalysis.data} /> : null;
      default:
        return <div>Unknown analysis type</div>;
    }
  };
  
  return (
    <div>
      {renderStageContent()}
      
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousStage}
          disabled={currentStage === 0}
          className={`btn ${
            currentStage === 0
              ? 'btn-outline opacity-50 cursor-not-allowed'
              : 'btn-outline'
          }`}
        >
          <ArrowLeft size={18} className="mr-2" />
          Previous Stage
        </button>
        
        <button
          onClick={goToNextStage}
          disabled={currentStage === stages.length - 1}
          className={`btn ${
            currentStage === stages.length - 1
              ? 'btn-outline opacity-50 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          Next Stage
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AnalysisContent;