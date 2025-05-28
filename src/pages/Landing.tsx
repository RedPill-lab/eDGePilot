import { Link } from 'react-router-dom';
import { Shield, Target, Brain, Globe2, BarChart2, LineChart, MessageSquare, Clock } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Previous sections unchanged... */}

      {/* How EdgePilot Works */}
      <section className="py-20 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">How EdgePilot Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Macro Analysis */}
            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <Globe2 className="text-[#0EA5E9] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Macro Analysis</h3>
              <p className="text-sm text-gray-300">
                Scans economic news and events that impact your selected market pair.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            {/* Technical Analysis */}
            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <BarChart2 className="text-[#F59E0B] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Technical Analysis</h3>
              <p className="text-sm text-gray-300">
                Identifies market conditions using EMA, RSI, Bollinger Bands, S/R, and 
                supply-demand zones.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            {/* Backtest Analysis */}
            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <LineChart className="text-[#10B981] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Backtest Analysis</h3>
              <p className="text-sm text-gray-300">
                Simulates past trades using historical data — duration depends on your plan tier.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            {/* Sentiment Pulse */}
            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <MessageSquare className="text-[#F97316] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Sentiment Pulse</h3>
              <p className="text-sm text-gray-300">
                Analyzes trader mood across Reddit, Twitter, and news sources.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            {/* Signal Generator */}
            <div className="bg-[#1E293B] rounded-xl p-6">
              <Clock className="text-[#EF4444] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Signal Generator</h3>
              <p className="text-sm text-gray-300">
                Combines all analysis to deliver a signal with entry, stop loss, target, 
                confidence, and rationale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets EdgePilot Apart */}
      <section className="py-20 bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">What Sets EdgePilot Apart</h2>
          <p className="text-center text-xl text-gray-300 mb-12">
            EdgePilot is the co-pilot you wish signal groups had. Built with traders, for traders.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Tools Stop Here */}
            <div className="bg-[#0B1120] rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold text-gray-400 mb-6">Most Tools Stop Here...</h3>
              <ul className="space-y-4 text-gray-300">
                <li>• Offer chatbots or basic pattern matchers</li>
                <li>• Focus on crypto or stock retail dashboards</li>
                <li>• Ignore broker realities</li>
                <li>• Generic signals with unknown logic</li>
                <li>• Can't help with challenge rules</li>
                <li>• Copy-paste signals only</li>
              </ul>
            </div>
            
            {/* EdgePilot Goes Further */}
            <div className="bg-[#0B1120] rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold text-[#0EA5E9] mb-6">EdgePilot Goes Further</h3>
              <ul className="space-y-4 text-gray-300">
                <li>• Multi-agent AI system with explainable trade decisions</li>
                <li>• Purpose-built for Forex, Indices, and Metals</li>
                <li>• SL/TP adjusted to your broker's spread and execution style</li>
                <li>• Trade rationale, macro context, and backtested probabilities included</li>
                <li>• Prop Mode built-in: max daily loss, profit target & R:R filters</li>
                <li>• Designed for smart execution — copytrading deployment coming soon</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-xl text-gray-300 mb-12">
            Choose the plan that fits your trading style
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-gray-600/10 rounded-xl p-8 border border-gray-800">
              {/* Starter plan content unchanged */}
            </div>

            {/* Pro Plan */}
            <div className="bg-[#0EA5E9]/10 rounded-xl p-8 border-2 border-[#0EA5E9] relative">
              {/* Pro plan content unchanged */}
            </div>

            {/* Edge+ Plan */}
            <div className="bg-[#F59E0B]/10 rounded-xl p-8 border-2 border-[#F59E0B]">
              {/* Edge+ plan content unchanged */}
            </div>
          </div>
          
          {/* Rest of the pricing section unchanged */}
        </div>
      </section>

      {/* Footer unchanged */}
    </div>
  );
};

export default Landing;