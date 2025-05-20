import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { BrokerProfile } from '../../types';
import { useAnalysis } from '../../context/AnalysisContext';

// Mock broker profiles for development
const defaultProfiles: BrokerProfile[] = [
  {
    id: 'ftmo',
    name: 'FTMO',
    spreads: {
      'EUR/USD': 0.1,
      'GBP/USD': 0.2,
      'USD/JPY': 0.2,
      'XAU/USD': 0.4
    },
    executionModel: 'ECN',
    description: 'FTMO prop firm with raw spreads',
    isDefault: true
  },
  {
    id: 'icmarkets',
    name: 'IC Markets',
    spreads: {
      'EUR/USD': 0.1,
      'GBP/USD': 0.2,
      'USD/JPY': 0.2,
      'XAU/USD': 0.5
    },
    executionModel: 'ECN',
    description: 'IC Markets Raw Spread Account'
  }
];

const BrokerProfileSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { analysisState, setSelectedBrokerProfile } = useAnalysis();
  const [profiles] = useState<BrokerProfile[]>(defaultProfiles);
  
  const handleSelectProfile = (profile: BrokerProfile) => {
    setSelectedBrokerProfile(profile);
    setIsOpen(false);
  };
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Broker Profile
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-card border border-border rounded-md px-4 py-2 text-left focus:outline-none"
        >
          {analysisState.selectedBrokerProfile ? (
            <div>
              <div className="font-medium">{analysisState.selectedBrokerProfile.name}</div>
              <div className="text-xs text-foreground/70">
                {analysisState.selectedBrokerProfile.executionModel} Model
              </div>
            </div>
          ) : (
            <span className="text-foreground/70">Select a broker profile...</span>
          )}
          <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-lg">
            <div className="p-2 border-b border-border">
              <button
                onClick={() => {/* TODO: Implement add profile modal */}}
                className="w-full flex items-center px-3 py-2 text-sm hover:bg-secondary/10 rounded-md text-primary"
              >
                <Plus size={16} className="mr-2" />
                Add New Profile
              </button>
            </div>
            
            {profiles.map((profile) => (
              <button
                key={profile.id}
                className="w-full text-left px-4 py-3 hover:bg-secondary/10"
                onClick={() => handleSelectProfile(profile)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-xs text-foreground/70">
                      {profile.executionModel} Model
                    </div>
                  </div>
                  {profile.isDefault && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                {profile.description && (
                  <p className="text-xs text-foreground/70 mt-1">
                    {profile.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerProfileSelector;