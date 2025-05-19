import { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

// Mock recent signal data
const mockSignals = [
  {
    id: '1',
    date: '2023-04-15T10:30:00Z',
    pair: 'EUR/USD',
    action: 'buy',
    entryPrice: 1.0763,
    takeProfit: 1.0815,
    stopLoss: 1.0735,
    confidence: 78,
    status: 'active',
  },
  {
    id: '2',
    date: '2023-04-14T14:45:00Z',
    pair: 'XAU/USD',
    action: 'buy',
    entryPrice: 2347.50,
    takeProfit: 2380.00,
    stopLoss: 2332.00,
    confidence: 85,
    status: 'win',
  },
  {
    id: '3',
    date: '2023-04-12T09:15:00Z',
    pair: 'US30',
    action: 'sell',
    entryPrice: 38962,
    takeProfit: 38750,
    stopLoss: 39050,
    confidence: 64,
    status: 'loss',
  },
  {
    id: '4',
    date: '2023-04-10T16:20:00Z',
    pair: 'GBP/USD',
    action: 'sell',
    entryPrice: 1.2518,
    takeProfit: 1.2470,
    stopLoss: 1.2545,
    confidence: 72,
    status: 'win',
  },
  {
    id: '5',
    date: '2023-04-07T11:00:00Z',
    pair: 'US100',
    action: 'buy',
    entryPrice: 17925,
    takeProfit: 18050,
    stopLoss: 17850,
    confidence: 68,
    status: 'win',
  },
];

const RecentSignals = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter signals based on active tab
  const filteredSignals = mockSignals.filter((signal) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return signal.status === 'active';
    if (activeTab === 'completed') return signal.status !== 'active';
    return true;
  });
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="card overflow-hidden">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <h2 className="text-xl font-semibold">Recent Trade Signals</h2>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'all'
                ? 'bg-primary text-white'
                : 'bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'active'
                ? 'bg-primary text-white'
                : 'bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'completed'
                ? 'bg-primary text-white'
                : 'bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-card border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                Instrument
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                Entry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                TP/SL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSignals.map((signal) => (
              <tr key={signal.id} className="hover:bg-secondary/5">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatDate(signal.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {signal.pair}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {signal.action === 'buy' ? (
                      <span className="flex items-center text-success">
                        <ArrowUpCircle size={16} className="mr-1" />
                        Buy
                      </span>
                    ) : (
                      <span className="flex items-center text-error">
                        <ArrowDownCircle size={16} className="mr-1" />
                        Sell
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {signal.entryPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="text-success">{signal.takeProfit}</span>
                  <span className="mx-1">/</span>
                  <span className="text-error">{signal.stopLoss}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 bg-secondary/20 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${signal.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-1 block">
                    {signal.confidence}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {signal.status === 'active' && (
                    <span className="badge bg-primary/20 text-primary">
                      Active
                    </span>
                  )}
                  {signal.status === 'win' && (
                    <span className="badge badge-success">
                      Win
                    </span>
                  )}
                  {signal.status === 'loss' && (
                    <span className="badge badge-error">
                      Loss
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSignals;