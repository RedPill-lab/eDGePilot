import { useState } from 'react';
import { Plus, Pencil, Trash2, CheckCircle } from 'lucide-react';
import { FollowerAccount } from '../types';
import FollowerSettingsModal from '../components/copytrading/FollowerSettingsModal';
import AddFollowerModal from '../components/copytrading/AddFollowerModal';

// Mock data for initial development
const mockFollowers: FollowerAccount[] = [
  {
    id: '1',
    name: 'FTMO Challenge',
    broker: 'FTMO',
    spreadBuffer: 1,
    active: true,
    lastSync: '2024-03-15T10:30:00Z',
    trades: 156,
    winRate: 68.5
  },
  {
    id: '2',
    name: 'MyFXBook Demo',
    broker: 'IC Markets',
    spreadBuffer: 0.5,
    active: true,
    lastSync: '2024-03-15T10:25:00Z',
    trades: 89,
    winRate: 72.1
  }
];

const Copytrading = () => {
  const [followers, setFollowers] = useState<FollowerAccount[]>(mockFollowers);
  const [editingFollower, setEditingFollower] = useState<FollowerAccount | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEditFollower = (follower: FollowerAccount) => {
    setEditingFollower(follower);
  };

  const handleSaveFollowerSettings = (updatedFollower: FollowerAccount) => {
    setFollowers(followers.map(f => 
      f.id === updatedFollower.id ? updatedFollower : f
    ));
    setEditingFollower(null);
  };

  const handleDeleteFollower = (id: string) => {
    setFollowers(followers.filter(f => f.id !== id));
  };

  const handleAddFollower = (newFollower: FollowerAccount) => {
    setFollowers([...followers, newFollower]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Copytrading</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Follower
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connected Accounts */}
        <div className="card">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Connected Accounts</h2>
          </div>
          
          <div className="divide-y divide-border">
            {followers.map(follower => (
              <div key={follower.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      {follower.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{follower.name}</h3>
                      <p className="text-sm text-foreground/70">{follower.broker}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full flex items-center">
                          <CheckCircle size={12} className="mr-1" />
                          Active
                        </span>
                        {follower.lastSync && (
                          <span className="text-xs text-foreground/70 ml-2">
                            Last sync: {new Date(follower.lastSync).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditFollower(follower)}
                      className="p-2 hover:bg-secondary/10 rounded-md"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteFollower(follower.id)}
                      className="p-2 hover:bg-secondary/10 rounded-md text-error"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                {(follower.trades !== undefined && follower.winRate !== undefined) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-card-foreground/5 p-3 rounded-md">
                      <p className="text-sm text-foreground/70">Total Trades</p>
                      <p className="text-xl font-semibold">{follower.trades}</p>
                    </div>
                    <div className="bg-card-foreground/5 p-3 rounded-md">
                      <p className="text-sm text-foreground/70">Win Rate</p>
                      <p className="text-xl font-semibold">{follower.winRate}%</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Latest Signal Preview */}
        <div className="card">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Latest Signal Preview</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-success/10 text-success px-4 py-3 rounded-md flex items-center mb-6">
              <span className="font-medium">BUY Signal</span>
              <span className="mx-2">•</span>
              <span>EUR/USD</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Master Account</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-foreground/70">Entry</p>
                    <p className="font-medium">1.085</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Stop Loss</p>
                    <p className="font-medium text-error">1.08</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Take Profit</p>
                    <p className="font-medium text-success">1.095</p>
                  </div>
                </div>
              </div>
              
              {followers.map(follower => (
                <div key={follower.id}>
                  <h3 className="text-sm font-medium mb-2 flex items-center justify-between">
                    {follower.name}
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      +{follower.spreadBuffer} pip buffer
                    </span>
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-foreground/70">Entry</p>
                      <p className="font-medium">1.0851</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Stop Loss</p>
                      <p className="font-medium text-error">1.0799</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Take Profit</p>
                      <p className="font-medium text-success">1.0951</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {editingFollower && (
        <FollowerSettingsModal
          follower={editingFollower}
          onClose={() => setEditingFollower(null)}
          onSave={handleSaveFollowerSettings}
        />
      )}

      {isAddModalOpen && (
        <AddFollowerModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddFollower}
        />
      )}
    </div>
  );
};

export default Copytrading;