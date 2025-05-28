import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowUpCircle, Lock, AlertTriangle } from 'lucide-react';
import DashboardSummary from '../components/dashboard/DashboardSummary';

const Dashboard = () => {
  const { user } = useAuth();
  const [signalsRemaining] = useState(3);

  return (
    <div className="space-y-6">
      {/* Upgrade Banner */}
      <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-lg p-4 flex items-start">
        <AlertTriangle className="text-[#0EA5E9] mr-3 mt-1" size={20} />
        <div>
          <h3 className="font-medium text-[#0EA5E9]">Starter Plan Preview</h3>
          <p className="text-sm mt-1">
            You have {signalsRemaining} signals remaining today. Unlock more pairs, strategies, and real-time alerts with Pro or Edge+.
          </p>
          <button className="mt-2 px-4 py-1.5 bg-[#0EA5E9] text-white rounded-md text-sm hover:bg-[#0EA5E9]/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Signal */}
        <div className="lg:col-span-2 bg-[#1E293B] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Latest Signal</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">EUR/USD Only</span>
              <div className="bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-full text-sm">
                Active
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-400">Entry Price</p>
              <p className="text-2xl font-semibold">1.0850</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Stop Loss</p>
              <p className="text-2xl font-semibold text-[#EF4444]">1.0800</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Take Profit</p>
              <p className="text-2xl font-semibold text-[#10B981]">1.0950</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Signal Confidence</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-700/30 rounded-full h-2">
              <div className="bg-[#10B981] h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-sm font-medium mb-2">Analysis Summary</h3>
            <p className="text-sm text-gray-300">
              Bullish momentum confirmed by RSI divergence (65) and EMA crossover. Key support at 1.0800 with strong historical resistance at 1.0950.
            </p>
          </div>
        </div>

        {/* Indicators Preview */}
        <div className="bg-[#1E293B] rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Available Indicators</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>EMA (20, 50)</span>
              <span className="text-[#10B981]">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>RSI (14)</span>
              <span className="text-[#10B981]">✓</span>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <span>Bollinger Bands</span>
              <Lock size={16} />
            </div>
            <div className="flex items-center justify-between opacity-50">
              <span>Supply/Demand Zones</span>
              <Lock size={16} />
            </div>
            <div className="flex items-center justify-between opacity-50">
              <span>Support/Resistance</span>
              <Lock size={16} />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-sm font-medium mb-2">Current Settings</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• EUR/USD only</p>
              <p>• 1-hour data delay</p>
              <p>• 30-day backtest period</p>
              <p>• 100 simulations max</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Preview */}
      <div className="bg-[#1E293B] rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-6">AI Pipeline Preview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0B1120] rounded-lg p-4">
            <h3 className="font-medium mb-2">Macro Analysis</h3>
            <p className="text-sm text-gray-300">
              Economic calendar events and central bank policies affecting EUR/USD
            </p>
          </div>
          
          <div className="bg-[#0B1120] rounded-lg p-4">
            <h3 className="font-medium mb-2">Technical Analysis</h3>
            <p className="text-sm text-gray-300">
              EMA crossovers and RSI momentum analysis
            </p>
          </div>
          
          <div className="bg-[#0B1120] rounded-lg p-4">
            <h3 className="font-medium mb-2">Backtest Results</h3>
            <p className="text-sm text-gray-300">
              30-day historical performance with 100 simulations
            </p>
          </div>
          
          <div className="bg-[#0B1120] rounded-lg p-4">
            <h3 className="font-medium mb-2">Sentiment Pulse</h3>
            <p className="text-sm text-gray-300">
              Market sentiment analysis from news and social media
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;