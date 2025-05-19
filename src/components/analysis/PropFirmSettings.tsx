import { useState } from 'react';
import { useAnalysis } from '../../context/AnalysisContext';
import { Settings, AlertTriangle, Info } from 'lucide-react';
import PropChallengeSimulator from './PropChallengeSimulator';

const PropFirmSettings = () => {
  const { analysisState, setPropFirmSettings, setBrokerSettings } = useAnalysis();
  const [isEnabled, setIsEnabled] = useState(false);
  const [maxDailyDrawdown, setMaxDailyDrawdown] = useState(2);
  const [overallDrawdown, setOverallDrawdown] = useState(5);
  const [profitTarget, setProfitTarget] = useState(8);
  const [broker, setBroker] = useState('Custom');
  const [customSpread, setCustomSpread] = useState(1);
  const [activeTab, setActiveTab] = useState<'settings' | 'simulator'>('settings');

  const brokers = [
    { name: 'Custom', defaultSpread: 1, maxDailyDD: 2, overallDD: 5, target: 8 },
    { name: 'FTMO', defaultSpread: 1.2, maxDailyDD: 2, overallDD: 5, target: 10 },
    { name: 'The5ers', defaultSpread: 1.0, maxDailyDD: 2, overallDD: 4, target: 6 },
    { name: 'E8 Funding', defaultSpread: 1.3, maxDailyDD: 2, overallDD: 5, target: 8 },
    { name: 'True Forex Funds', defaultSpread: 1.4, maxDailyDD: 2, overallDD: 5, target: 10 },
    { name: 'Fidelcrest', defaultSpread: 1.5, maxDailyDD: 2, overallDD: 5, target: 10 },
  ];

  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    if (enabled) {
      setPropFirmSettings({
        enabled: true,
        maxDailyDrawdown,
        overallDrawdown,
        profitTarget,
      });
    } else {
      setPropFirmSettings(null);
    }
  };

  const handleBrokerChange = (selectedBroker: string) => {
    setBroker(selectedBroker);
    const brokerInfo = brokers.find(b => b.name === selectedBroker);
    if (brokerInfo) {
      setMaxDailyDrawdown(brokerInfo.maxDailyDD);
      setOverallDrawdown(brokerInfo.overallDD);
      setProfitTarget(brokerInfo.target);
      setBrokerSettings({
        broker: selectedBroker,
        spread: brokerInfo.defaultSpread,
      });
      setCustomSpread(brokerInfo.defaultSpread);
    }
  };

  const handleSpreadChange = (spread: number) => {
    setCustomSpread(spread);
    setBrokerSettings({
      broker,
      spread,
    });
  };

  const handleSettingsChange = () => {
    setPropFirmSettings({
      enabled: true,
      maxDailyDrawdown,
      overallDrawdown,
      profitTarget,
    });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Settings size={20} className="text-primary mr-2" />
          <h3 className="text-md font-medium">Prop Firm Mode</h3>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isEnabled}
            onChange={(e) => handleToggle(e.target.checked)}
          />
          <div className="w-11 h-6 bg-secondary/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      {isEnabled && (
        <div className="space-y-4 bg-card-foreground/5 p-4 rounded-lg">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === 'settings'
                  ? 'bg-primary text-white'
                  : 'bg-secondary/10 hover:bg-secondary/20'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === 'simulator'
                  ? 'bg-primary text-white'
                  : 'bg-secondary/10 hover:bg-secondary/20'
              }`}
            >
              Challenge Simulator
            </button>
          </div>

          {activeTab === 'settings' ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Prop Firm
                </label>
                <select
                  value={broker}
                  onChange={(e) => handleBrokerChange(e.target.value)}
                  className="input"
                >
                  {brokers.map((b) => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-foreground/70 flex items-center">
                  <Info size={12} className="mr-1" />
                  Only trusted prop firms with verified payout history are listed
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Daily Drawdown (%)
                  </label>
                  <input
                    type="number"
                    value={maxDailyDrawdown}
                    onChange={(e) => setMaxDailyDrawdown(Number(e.target.value))}
                    onBlur={handleSettingsChange}
                    className="input"
                    min="0"
                    max="100"
                    step="0.1"
                    disabled={broker !== 'Custom'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Overall Drawdown (%)
                  </label>
                  <input
                    type="number"
                    value={overallDrawdown}
                    onChange={(e) => setOverallDrawdown(Number(e.target.value))}
                    onBlur={handleSettingsChange}
                    className="input"
                    min="0"
                    max="100"
                    step="0.1"
                    disabled={broker !== 'Custom'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Profit Target (%)
                  </label>
                  <input
                    type="number"
                    value={profitTarget}
                    onChange={(e) => setProfitTarget(Number(e.target.value))}
                    onBlur={handleSettingsChange}
                    className="input"
                    min="0"
                    max="100"
                    step="0.1"
                    disabled={broker !== 'Custom'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Average Spread (pips)
                  </label>
                  <input
                    type="number"
                    value={customSpread}
                    onChange={(e) => handleSpreadChange(Number(e.target.value))}
                    className="input"
                    min="0"
                    step="0.1"
                    disabled={broker !== 'Custom'}
                  />
                </div>
              </div>

              <div className="flex items-start p-3 bg-warning/10 text-warning rounded-md">
                <AlertTriangle size={18} className="mr-2 mt-0.5" />
                <p className="text-sm">
                  Signals will be filtered based on prop firm rules. Only trades with R:R {'>'} 1.5 
                  and risk per trade ≤ 1% will be shown.
                </p>
              </div>
            </>
          ) : (
            <PropChallengeSimulator />
          )}
        </div>
      )}
    </div>
  );
};

export default PropFirmSettings;