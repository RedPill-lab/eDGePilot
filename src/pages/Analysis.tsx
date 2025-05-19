import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';
import InstrumentSelector from '../components/analysis/InstrumentSelector';
import StrategySelector from '../components/analysis/StrategySelector';
import PropFirmSettings from '../components/analysis/PropFirmSettings';
import AnalysisStages from '../components/analysis/AnalysisStages';
import AnalysisContent from '../components/analysis/AnalysisContent';
import { PlayCircle, AlertTriangle } from 'lucide-react';

const Analysis = () => {
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const { user } = useAuth();
  const { analysisState, startAnalysis, resetAnalysis } = useAnalysis();
  
  const handleStartAnalysis = async () => {
    // Check if free user has signals remaining
    if (user?.plan === 'free' && user.signalsRemaining <= 0) {
      setShowLimitWarning(true);
      return;
    }
    
    setShowLimitWarning(false);
    await startAnalysis();
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold">Market Analysis</h1>
        {user?.plan === 'free' && (
          <div className="mt-2 md:mt-0 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
            {user.signalsRemaining} signals remaining
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InstrumentSelector />
        <StrategySelector />
      </div>

      <PropFirmSettings />
      
      {showLimitWarning && (
        <div className="bg-warning/20 border border-warning/30 text-warning p-4 rounded-lg flex items-start">
          <AlertTriangle className="mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium">Signal Limit Reached</h3>
            <p className="text-sm mt-1">
              You've used all your free signals. Upgrade to premium for unlimited signals.
            </p>
            <button className="btn btn-warning btn-sm mt-2">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          onClick={handleStartAnalysis}
          disabled={!analysisState.instrument || !analysisState.strategy || analysisState.isLoading}
          className={`btn btn-primary ${
            (!analysisState.instrument || !analysisState.strategy || analysisState.isLoading)
              ? 'opacity-70 cursor-not-allowed'
              : ''
          }`}
        >
          <PlayCircle size={18} className="mr-2" />
          {analysisState.stages.length === 0 ? 'Run Analysis' : 'Run New Analysis'}
        </button>
        
        {analysisState.stages.length > 0 && (
          <button
            onClick={resetAnalysis}
            className="btn btn-outline"
            disabled={analysisState.isLoading}
          >
            Reset
          </button>
        )}
      </div>
      
      {(analysisState.stages.length > 0 || analysisState.isLoading) && (
        <AnalysisStages />
      )}
      
      <AnalysisContent />
    </div>
  );
};

export default Analysis;