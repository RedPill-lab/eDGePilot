import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Instrument } from '../../types';
import { useAnalysis } from '../../context/AnalysisContext';

// Mock instruments data
const mockInstruments: Instrument[] = [
  // Forex
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'forex' },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', type: 'forex' },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', type: 'forex' },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', type: 'forex' },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', type: 'forex' },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', type: 'forex' },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', type: 'forex' },
  
  // Indices
  { symbol: 'US30', name: 'Dow Jones Industrial Average', type: 'indices' },
  { symbol: 'US500', name: 'S&P 500', type: 'indices' },
  { symbol: 'US100', name: 'Nasdaq 100', type: 'indices' },
  { symbol: 'GER40', name: 'DAX 40', type: 'indices' },
  { symbol: 'UK100', name: 'FTSE 100', type: 'indices' },
  
  // Metals
  { symbol: 'XAU/USD', name: 'Gold / US Dollar', type: 'metals' },
  { symbol: 'XAG/USD', name: 'Silver / US Dollar', type: 'metals' },
  { symbol: 'XPT/USD', name: 'Platinum / US Dollar', type: 'metals' },
];

const InstrumentSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'forex' | 'indices' | 'metals'>('all');
  
  const { analysisState, setInstrument } = useAnalysis();
  
  // Filter instruments based on search query and selected type
  const filteredInstruments = useMemo(() => {
    return mockInstruments.filter((instrument) => {
      const matchesSearch = 
        instrument.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instrument.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = 
        selectedType === 'all' || instrument.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);
  
  const handleSelectInstrument = (instrument: Instrument) => {
    setInstrument(instrument);
    setIsOpen(false);
  };
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Select Instrument
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-card border border-border rounded-md px-4 py-2 text-left focus:outline-none"
        >
          {analysisState.instrument ? (
            <div>
              <div className="font-medium">{analysisState.instrument.symbol}</div>
              <div className="text-xs text-foreground/70">
                {analysisState.instrument.name}
              </div>
            </div>
          ) : (
            <span className="text-foreground/70">Select an instrument...</span>
          )}
          <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-lg">
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-foreground/70" />
                <input
                  type="text"
                  placeholder="Search instruments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-9"
                />
              </div>
              
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedType === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 hover:bg-secondary/20'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedType('forex')}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedType === 'forex'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 hover:bg-secondary/20'
                  }`}
                >
                  Forex
                </button>
                <button
                  onClick={() => setSelectedType('indices')}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedType === 'indices'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 hover:bg-secondary/20'
                  }`}
                >
                  Indices
                </button>
                <button
                  onClick={() => setSelectedType('metals')}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedType === 'metals'
                      ? 'bg-primary text-white'
                      : 'bg-secondary/10 hover:bg-secondary/20'
                  }`}
                >
                  Metals
                </button>
              </div>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {filteredInstruments.length === 0 ? (
                <div className="p-4 text-center text-foreground/70">
                  No instruments found
                </div>
              ) : (
                filteredInstruments.map((instrument) => (
                  <button
                    key={instrument.symbol}
                    className="w-full text-left px-4 py-2 hover:bg-secondary/10 flex justify-between items-center"
                    onClick={() => handleSelectInstrument(instrument)}
                  >
                    <div>
                      <div className="font-medium">{instrument.symbol}</div>
                      <div className="text-xs text-foreground/70">
                        {instrument.name}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      instrument.type === 'forex' ? 'bg-primary/20 text-primary' :
                      instrument.type === 'indices' ? 'bg-accent/20 text-accent' :
                      'bg-success/20 text-success'
                    }`}>
                      {instrument.type}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentSelector;