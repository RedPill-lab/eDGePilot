import { useState } from 'react';
import { X, ArrowLeft, Save } from 'lucide-react';
import { FollowerAccount } from '../../types';

interface FollowerSettingsModalProps {
  follower: FollowerAccount;
  onClose: () => void;
  onSave: (updatedFollower: FollowerAccount) => void;
}

type RiskMode = 'fixed' | 'percentage' | 'match';

const FollowerSettingsModal = ({ follower, onClose, onSave }: FollowerSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<'general' | 'risk' | 'buffers' | 'rules'>('general');
  const [settings, setSettings] = useState({
    ...follower,
    symbolSuffix: '',
    executionModel: 'ECN',
    riskMode: 'percentage' as RiskMode,
    maxRiskPerTrade: 1,
    maxDailyDrawdown: 5,
    slBuffer: 1,
    tpBuffer: 1,
    entryBuffer: 0.5,
    delayOffset: 0,
    autoDisableRules: {
      propRulesViolated: true,
      masterDrawdownBreached: true,
      excludedInstruments: [] as string[]
    }
  });

  const handleSave = () => {
    onSave({
      ...follower,
      ...settings
    });
    onClose();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Broker Name</label>
              <input
                type="text"
                value={settings.broker}
                className="input bg-secondary/10"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Symbol Suffix</label>
              <input
                type="text"
                value={settings.symbolSuffix}
                onChange={(e) => setSettings({ ...settings, symbolSuffix: e.target.value })}
                className="input"
                placeholder=".r, .i"
              />
              <p className="text-xs text-foreground/70 mt-1">Optional suffix for broker-specific symbols</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Execution Model</label>
              <select
                value={settings.executionModel}
                onChange={(e) => setSettings({ ...settings, executionModel: e.target.value })}
                className="input"
              >
                <option value="ECN">ECN</option>
                <option value="MM">Market Maker</option>
              </select>
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Risk Mode</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={settings.riskMode === 'fixed'}
                    onChange={() => setSettings({ ...settings, riskMode: 'fixed' })}
                    className="mr-2"
                  />
                  Fixed lot size
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={settings.riskMode === 'percentage'}
                    onChange={() => setSettings({ ...settings, riskMode: 'percentage' })}
                    className="mr-2"
                  />
                  % of account balance
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={settings.riskMode === 'match'}
                    onChange={() => setSettings({ ...settings, riskMode: 'match' })}
                    className="mr-2"
                  />
                  Match master risk (1:1)
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Max Risk per Trade (%)</label>
              <input
                type="number"
                value={settings.maxRiskPerTrade}
                onChange={(e) => setSettings({ ...settings, maxRiskPerTrade: parseFloat(e.target.value) })}
                className="input"
                min="0.1"
                max="5"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Max Daily Drawdown (%)</label>
              <input
                type="number"
                value={settings.maxDailyDrawdown}
                onChange={(e) => setSettings({ ...settings, maxDailyDrawdown: parseFloat(e.target.value) })}
                className="input"
                min="1"
                max="10"
                step="0.5"
              />
            </div>
          </div>
        );

      case 'buffers':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stop Loss Buffer (pips)</label>
              <input
                type="number"
                value={settings.slBuffer}
                onChange={(e) => setSettings({ ...settings, slBuffer: parseFloat(e.target.value) })}
                className="input"
                min="0"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Take Profit Buffer (pips)</label>
              <input
                type="number"
                value={settings.tpBuffer}
                onChange={(e) => setSettings({ ...settings, tpBuffer: parseFloat(e.target.value) })}
                className="input"
                min="0"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Entry Price Buffer (pips)</label>
              <input
                type="number"
                value={settings.entryBuffer}
                onChange={(e) => setSettings({ ...settings, entryBuffer: parseFloat(e.target.value) })}
                className="input"
                min="0"
                step="0.1"
              />
              <p className="text-xs text-foreground/70 mt-1">Slippage tolerance</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Delay Offset (ms)</label>
              <input
                type="number"
                value={settings.delayOffset}
                onChange={(e) => setSettings({ ...settings, delayOffset: parseInt(e.target.value) })}
                className="input"
                min="0"
                step="50"
              />
              <p className="text-xs text-foreground/70 mt-1">Optional execution delay</p>
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-4">
            <h3 className="font-medium mb-2">Auto-Disable Rules</h3>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoDisableRules.propRulesViolated}
                  onChange={(e) => setSettings({
                    ...settings,
                    autoDisableRules: {
                      ...settings.autoDisableRules,
                      propRulesViolated: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Stop copy when prop rules violated
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoDisableRules.masterDrawdownBreached}
                  onChange={(e) => setSettings({
                    ...settings,
                    autoDisableRules: {
                      ...settings.autoDisableRules,
                      masterDrawdownBreached: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Stop copy when master drawdown breached
              </label>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">Excluded Instruments</label>
              <select
                multiple
                value={settings.autoDisableRules.excludedInstruments}
                onChange={(e) => setSettings({
                  ...settings,
                  autoDisableRules: {
                    ...settings.autoDisableRules,
                    excludedInstruments: Array.from(e.target.selectedOptions, option => option.value)
                  }
                })}
                className="input h-32"
              >
                <option value="EURUSD">EUR/USD</option>
                <option value="GBPUSD">GBP/USD</option>
                <option value="USDJPY">USD/JPY</option>
                <option value="XAUUSD">XAU/USD</option>
              </select>
              <p className="text-xs text-foreground/70 mt-1">Select instruments to exclude from copying</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <button onClick={onClose} className="mr-4 hover:text-primary">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold">Follower Settings</h2>
          </div>
          <button onClick={onClose} className="hover:text-primary">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-md text-sm ${
                activeTab === 'general'
                  ? 'bg-primary text-white'
                  : 'bg-secondary/10 hover:bg-secondary/20'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`px-4 py-2 rounded-md text-sm ${
                activeTab === 'risk'
                  ? 'bg-primary text-white'
                  : 'bg-secondary/10 hover:bg-secondary/20'
              }`}
            >
              Risk
            </button>
            <button
              onClick={() => setActiveTab('buffers')}
              className={`px-4 py-2 rounded-md text-sm ${
                activeTab === 'buffers'
                  ? 'bg-primary text-white'
                  : 'bg-secondary/10 hover:bg-secondary/20'
              }`}
            >
              Buffers
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 rounded-md text-sm ${
                activeTab === 'rules'
                  ? 'bg-primary text-white'
                  : 'bg-secondary/10 hover:bg-secondary/20'
              }`}
            >
              Auto-Rules
            </button>
          </div>

          {renderTabContent()}
        </div>

        <div className="flex justify-between items-center p-6 border-t border-border bg-card-foreground/5">
          <button
            onClick={() => setSettings({
              ...follower,
              symbolSuffix: '',
              executionModel: 'ECN',
              riskMode: 'percentage',
              maxRiskPerTrade: 1,
              maxDailyDrawdown: 5,
              slBuffer: 1,
              tpBuffer: 1,
              entryBuffer: 0.5,
              delayOffset: 0,
              autoDisableRules: {
                propRulesViolated: true,
                masterDrawdownBreached: true,
                excludedInstruments: []
              }
            })}
            className="btn btn-outline"
          >
            Reset to Defaults
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            <Save size={18} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowerSettingsModal;