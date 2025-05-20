import { useState } from 'react';
import { X, ArrowLeft, Plus } from 'lucide-react';
import { FollowerAccount } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface AddFollowerModalProps {
  onClose: () => void;
  onAdd: (follower: FollowerAccount) => void;
}

const brokers = [
  { id: 'ftmo', name: 'FTMO', type: 'Prop Firm' },
  { id: 'icmarkets', name: 'IC Markets', type: 'Broker' },
  { id: 'pepperstone', name: 'Pepperstone', type: 'Broker' },
  { id: 'e8funding', name: 'E8 Funding', type: 'Prop Firm' },
  { id: 'truefx', name: 'True Forex Funds', type: 'Prop Firm' },
  { id: 'fidelcrest', name: 'Fidelcrest', type: 'Prop Firm' }
];

const AddFollowerModal = ({ onClose, onAdd }: AddFollowerModalProps) => {
  const [name, setName] = useState('');
  const [selectedBroker, setSelectedBroker] = useState('');
  const [accountType, setAccountType] = useState<'demo' | 'live'>('demo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !selectedBroker) return;

    const broker = brokers.find(b => b.id === selectedBroker);
    if (!broker) return;

    const newFollower: FollowerAccount = {
      id: uuidv4(),
      name,
      broker: broker.name,
      spreadBuffer: 1,
      active: true,
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
    };

    onAdd(newFollower);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <button onClick={onClose} className="mr-4 hover:text-primary">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold">Add Follower Account</h2>
          </div>
          <button onClick={onClose} className="hover:text-primary">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Account Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="My FTMO Challenge"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Broker / Prop Firm</label>
              <select
                value={selectedBroker}
                onChange={(e) => setSelectedBroker(e.target.value)}
                className="input"
                required
              >
                <option value="">Select a broker...</option>
                <optgroup label="Prop Firms">
                  {brokers.filter(b => b.type === 'Prop Firm').map(broker => (
                    <option key={broker.id} value={broker.id}>
                      {broker.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Brokers">
                  {brokers.filter(b => b.type === 'Broker').map(broker => (
                    <option key={broker.id} value={broker.id}>
                      {broker.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Account Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={accountType === 'demo'}
                    onChange={() => setAccountType('demo')}
                    className="mr-2"
                  />
                  Demo Account
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={accountType === 'live'}
                    onChange={() => setAccountType('live')}
                    className="mr-2"
                  />
                  Live Account
                </label>
              </div>
            </div>

            <div className="bg-warning/10 text-warning p-4 rounded-md mt-6">
              <p className="text-sm">
                After adding the account, you'll be able to configure detailed settings including:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Risk management parameters</li>
                <li>• Execution buffers and delays</li>
                <li>• Auto-disable rules</li>
                <li>• Symbol mapping</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-border">
            <button type="button" onClick={onClose} className="btn btn-outline mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={18} className="mr-2" />
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFollowerModal;