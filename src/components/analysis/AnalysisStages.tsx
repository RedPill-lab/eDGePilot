import { useAnalysis } from '../../context/AnalysisContext';
import { Check, Clock, TrendingUp, BarChart2, MessageSquare, ArrowRight } from 'lucide-react';

const AnalysisStages = () => {
  const { analysisState, goToStage } = useAnalysis();
  const { stages, currentStage, isLoading } = analysisState;
  
  const stagesList = [
    { 
      id: 'macro', 
      name: 'Macro Analysis', 
      description: 'Economic factors and news', 
      icon: <Clock size={20} /> 
    },
    { 
      id: 'technical', 
      name: 'Technical Analysis', 
      description: 'Price patterns and indicators', 
      icon: <TrendingUp size={20} /> 
    },
    { 
      id: 'quant', 
      name: 'Quantitative Analysis', 
      description: 'Backtesting and probabilities', 
      icon: <BarChart2 size={20} /> 
    },
    { 
      id: 'sentiment', 
      name: 'Sentiment Analysis', 
      description: 'Market mood and positioning', 
      icon: <MessageSquare size={20} /> 
    },
    { 
      id: 'signal', 
      name: 'Trade Signal', 
      description: 'Final recommendation', 
      icon: <ArrowRight size={20} /> 
    },
  ];
  
  const getStageStatus = (index: number) => {
    if (stages.length === 0) return 'pending';
    
    if (index < currentStage) return 'completed';
    if (index === currentStage) return 'current';
    if (index < stages.length) return 'upcoming';
    return 'pending';
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-6">Analysis Pipeline</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        {stagesList.map((stage, index) => {
          const status = getStageStatus(index);
          
          return (
            <button
              key={stage.id}
              onClick={() => {
                if (status !== 'pending' && !isLoading) {
                  goToStage(index);
                }
              }}
              disabled={status === 'pending' || isLoading}
              className={`relative flex-1 rounded-lg p-4 mb-2 lg:mb-0 transition-all ${
                status === 'current'
                  ? 'bg-primary text-white shadow-lg scale-105 z-10'
                  : status === 'completed'
                  ? 'bg-success/20 text-success border border-success/30 hover:bg-success/30'
                  : status === 'upcoming'
                  ? 'bg-card hover:bg-secondary/10 cursor-pointer border border-border'
                  : 'bg-card opacity-50 cursor-not-allowed border border-border'
              }`}
            >
              <div className="flex items-center mb-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    status === 'completed'
                      ? 'bg-success text-white'
                      : status === 'current'
                      ? 'bg-white text-primary'
                      : 'bg-secondary/20'
                  }`}
                >
                  {status === 'completed' ? (
                    <Check size={14} />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <span className="font-medium">{stage.name}</span>
              </div>
              <p className="text-xs opacity-80">{stage.description}</p>
              
              {/* Stage connection line */}
              {index < stagesList.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-border z-0"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisStages;