import { useState } from 'react';
import { Plus, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';
import { FollowerAccount, AdjustedSignal, TradeSignal } from '../types';

const mockFollowers: FollowerAccount[] = [
  {
    id: '1',
    name: 'FTMO Challenge',
    broker: 'FTMO',
    spreadBuffer: 1,
    active: true,
    lastSync: '2024-03-15T10:30:00Z',
    trades: 42,
    winRate: 68.5
  },
  {
    id: '2',
    name: 'MyFXBook Demo',
    broker: 'IC Markets',
    spreadBuffer: 0.5,
    active: true,
    lastSync: '2024-03-15T10:25:00Z',
    trades: 156,
    winRate: 72.1
  }
];

const mockSignal: TradeSignal = {
  id: '1',
  instrument: { symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'forex' },
  strategy: 'swing',
  action: 'buy',
  entryPrice: 1.0850,
  stopLoss: 1.0800,
  takeProfit: 1.0950,
  confidenceLevel: 75,
  rationale: "Strong technical setup with multiple factors aligned",
  timestamp: new Date().toISOString(),
  pipsRisk: 50,
  pipsReward: 100,
  riskRewardRatio: 2
};

const Copytrading = () => {
  const [followers, setFollowers] = useState<FollowerAccount[]>(mockFollowers);
  const [isAddingFollower, setIsAddingFollower] = useState(false);
  const [newFollower, setNewFollower] = useState<Partial<FollowerAccount>>({
    name: '',
    broker: '',
    spreadBuffer: 1,
    active: true
  });
  
  const calculateAdjustedLevels = (signal: TradeSignal, spreadBuffer: number): AdjustedSignal['adjustedLevels'] => {
    const pipSize = signal.instrument.type === 'forex' ? 0.0001 : 0.01;
    const buffer = spreadBuffer * pipSize;
    
    if (signal.action === 'buy') {
      return {
        entry: signal.entryPrice + buffer,
        stopLoss: signal.stopLoss - buffer,
        takeProfit: signal.takeProfit + buffer,
        spreadBuffer
      };
    } else {
      return {
        entry: signal.entryPrice - buffer,
        stopLoss: signal.stopLoss + buffer,
        takeProfit: signal.takeProfit - buffer,
        spreadBuffer
      };
    }
  };
  
  const handleAddFollower = () => {
    if (!newFollower.name || !newFollower.broker) return;
    
    const follower: FollowerAccount = {
      id: Date.now().toString(),
      name: newFollower.name,
      broker: newFollower.broker,
      spreadBuffer: newFollower.spreadBuffer || 1,
      active: true,
      lastSync: new Date().toISOString(),
      trades: 0,
      winRate: 0
    };
    
    setFollowers([...followers, follower]);
    setIsAddingFollower(false);
    setNewFollower({ name: '', broker: '', spreadBuffer: 1, active: true });
  };
  
  const handleDeleteFollower = (id: string) => {
    setFollowers(followers.filter(f => f.id !== id));
  };
  
  const toggleFollowerStatus = (id: string) => {
    setFollowers(followers.map(f => 
      f.id === id ? { ...f, active: !f.active } : f
    ));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Copytrading</h1>
        <button
          onClick={() => setIsAddingFollower(true)}
          className="btn btn-primary"
        >
          <Plus size={18} className="mr-2" />
          Add Follower
        </button>
      </div>
      
      {isAddingFollower && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Follower</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Account Name</label>
              <input
                type="text"
                value={newFollower.name}
                onChange={(e) => setNewFollower({ ...newFollower, name: e.target.value })}
                className="input"
                placeholder="e.g., FTMO Challenge"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Broker</label>
              <input
                type="text"
                value={newFollower.broker}
                onChange={(e) => setNewFollower({ ...newFollower, broker: e.target.value })}
                className="input"
                placeholder="e.g., FTMO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Spread Buffer (pips)</label>
              <input
                type="number"
                value={newFollower.spreadBuffer}
                onChange={(e) => setNewFollower({ ...newFollower, spreadBuffer: parseFloat(e.target.value) })}
                className="input"
                min="0"
                step="0.1"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button onClick={handleAddFollower} className="btn btn-primary">
              Add Follower
            </button>
            <button 
              onClick={() => setIsAddingFollower(false)} 
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Followers List */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Connected Accounts</h2>
          </div>
          <div className="divide-y divide-border">
            {followers.map((follower) => (
              <div key={follower.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {follower.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{follower.name}</h3>
                    <p className="text-sm text-foreground/70">{follower.broker}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFollowerStatus(follower.id)}
                    className={`p-2 rounded-full ${
                      follower.active 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                    }`}
                  >
                    {follower.active ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  </button>
                  <button className="p-2 hover:bg-secondary/10 rounded-full">
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteFollower(follower.id)}
                    className="p-2 hover:bg-secondary/10 rounded-full text-error"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Signal Preview */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Latest Signal Preview</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{mockSignal.instrument.symbol}</h3>
                  <p className="text-sm text-foreground/70">
                    {mockSignal.action.toUpperCase()} Signal
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  mockSignal.action === 'buy' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-error/20 text-error'
                }`}>
                  {mockSignal.action.toUpperCase()}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-foreground/70">Entry</p>
                  <p className="font-medium">{mockSignal.entryPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Stop Loss</p>
                  <p className="font-medium text-error">{mockSignal.stopLoss}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Take Profit</p>
                  <p className="font-medium text-success">{mockSignal.takeProfit}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium mb-2">Adjusted Levels</h3>
              {followers.filter(f => f.active).map((follower) => {
                const adjustedLevels = calculateAdjustedLevels(mockSignal, follower.spreadBuffer);
                return (
                  <div key={follower.id} className="bg-card-foreground/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{follower.name}</h4>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        +{follower.spreadBuffer} pip buffer
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-foreground/70">Entry</p>
                        <p className="text-sm font-medium">{adjustedLevels.entry.toFixed(5)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/70">Stop Loss</p>
                        <p className="text-sm font-medium text-error">{adjustedLevels.stopLoss.toFixed(5)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/70">Take Profit</p>
                        <p className="text-sm font-medium text-success">{adjustedLevels.takeProfit.toFixed(5)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copytrading;