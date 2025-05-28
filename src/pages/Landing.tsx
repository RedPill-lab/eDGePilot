import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Navigation */}
      <nav className="py-6 px-8">
        <div className="flex items-center">
          <img src="/logo.png" alt="EdgePilot" className="h-8 w-auto mr-3" />
          <span className="text-xl font-semibold font-poppins">EdgePilot</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left Column - Hero Text */}
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                AI-Powered Trading<br />
                Signals for Forex,<br />
                Indices & Metals —{' '}
                <span className="text-[#0EA5E9]">Your<br />
                Edge, Automated.</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Macro research, signal generation, and risk control —<br />
                done for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="bg-[#0EA5E9] text-white px-8 py-4 rounded-lg text-center hover:bg-[#0EA5E9]/90 transition-colors flex items-center justify-center"
                >
                  Start Free — No Card Required
                  <span className="ml-2">→</span>
                </Link>
                
                <button 
                  className="px-8 py-4 rounded-lg text-white border border-gray-700 hover:bg-white/5 transition-colors"
                >
                  See How It Works
                </button>
              </div>
            </div>
            
            {/* Right Column - Trade Signal Card */}
            <div className="flex-1">
              <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Trade Signal</h2>
                    <p className="text-gray-400">EUR/USD • Swing Trade</p>
                  </div>
                  <button className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm">
                    Buy Signal
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-8 mb-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Entry</p>
                    <p className="text-xl font-semibold">1.0850</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Stop Loss</p>
                    <p className="text-xl font-semibold text-red-500">1.0800</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Take Profit</p>
                    <p className="text-xl font-semibold text-green-500">1.0950</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate</span>
                    <span>68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk:Reward</span>
                    <span>1:2.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence</span>
                    <span>85%</span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Rationale:</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Bullish momentum confirmed by RSI divergence and EMA crossover. ECB 
                    policy shift likely to strengthen EUR vs USD in coming sessions. 
                    <span className="text-orange-400"> Sentiment Pulse: Moderately Bullish</span> across trader forums. 
                    Key resistance at 1.0950 with strong historical support at 1.0800.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;