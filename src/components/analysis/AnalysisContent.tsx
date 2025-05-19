import { useAnalysis } from '../../context/AnalysisContext';
import MacroAnalysisView from './MacroAnalysisView';
import TechnicalAnalysisView from './TechnicalAnalysisView';
import QuantAnalysisView from './QuantAnalysisView';
import SentimentAnalysisView from './SentimentAnalysisView';
import TradeSignalView from './TradeSignalView';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const AnalysisContent = () => {
  const { analysisState, goToNextStage, goToPreviousStage } = useAnalysis();
  const { stages, currentStage, isLoading } = analysisState;
  
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
  
  // Render the current stage of analysis
  const currentAnalysis = stages[currentStage];
  
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
        return <TradeSignalView data={currentAnalysis.data} />;
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