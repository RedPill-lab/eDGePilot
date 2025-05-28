import { Link } from 'react-router-dom';
import { 
  Shield, Target, Brain, Globe2, BarChart2, LineChart, 
  MessageSquare, Clock, ArrowRight, PlayCircle 
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Floating Demo Button */}
      <button 
        className="fixed bottom-8 right-8 bg-[#F59E0B] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#F59E0B]/90 transition-colors z-50 flex items-center font-medium"
      >
        <PlayCircle size={20} className="mr-2" />
        Try Demo
      </button>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="flex items-center mb-8">
                <img src="/logo.png" alt="EdgePilot" className="h-10 w-auto mr-3" />
                <h1 className="text-3xl font-semibold font-poppins">EdgePilot</h1>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                AI-Powered Trading Signals for Forex, Indices & Metals —{' '}
                <span className="text-[#0EA5E9]">Your Edge, Automated.</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                Macro research, signal generation, and risk control — done for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white px-8 py-3 rounded-lg flex items-center justify-center text-lg font-medium transition-colors"
                >
                  Start Free — No Card Required
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                
                <a 
                  href="#how-it-works"
                  className="border border-gray-700 hover:bg-white/5 text-white px-8 py-3 rounded-lg flex items-center justify-center text-lg font-medium transition-colors"
                >
                  See How It Works
                </a>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-[#1E293B] border border-gray-800 rounded-xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Trade Signal</h3>
                    <p className="text-sm text-gray-400">EUR/USD • Swing Trade</p>
                  </div>
                  <button className="bg-[#10B981]/20 text-[#10B981] px-3 py-1 rounded-full text-sm font-medium">
                    Buy Signal
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Entry</p>
                    <p className="text-lg font-semibold">1.0850</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Stop Loss</p>
                    <p className="text-lg font-semibold text-[#EF4444]">1.0800</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Take Profit</p>
                    <p className="text-lg font-semibold text-[#10B981]">1.0950</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Win Rate</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Risk:Reward</span>
                    <span className="text-sm font-medium">1:2.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Confidence</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-medium mb-2">Rationale:</h4>
                  <p className="text-sm text-gray-300">
                    Bullish momentum confirmed by RSI divergence and EMA crossover. ECB policy shift likely to strengthen EUR vs USD in coming sessions. 
                    <span className="text-[#F97316]">Sentiment Pulse: Moderately Bullish</span> across trader forums. Key resistance at 1.0950 with strong historical support at 1.0800.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who It's Built For */}
      <section className="py-20 bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Who It's Built For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0B1120] rounded-xl p-6 border border-gray-800">
              <Shield size={32} className="text-[#0EA5E9] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Funded Traders</h3>
              <p className="text-gray-300">
                Hit 8-10% targets while staying within strict risk rules. Let EdgePilot handle max drawdown filters, SL sizing, and R:R compliance.
              </p>
            </div>
            
            <div className="bg-[#0B1120] rounded-xl p-6 border border-gray-800">
              <Target size={32} className="text-[#F59E0B] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Precision Traders</h3>
              <p className="text-gray-300">
                Ditch the guesswork. Skip charting and get actionable, pre-qualified trades powered by real-time macro, sentiment, and backtesting.
              </p>
            </div>
            
            <div className="bg-[#0B1120] rounded-xl p-6 border border-gray-800">
              <Brain size={32} className="text-[#10B981] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Strategy Builders</h3>
              <p className="text-gray-300">
                Validate your ideas with 1-5 year backtests. Deploy signals with built-in risk parameters and performance audits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How EdgePilot Works */}
      <section id="how-it-works" className="py-20 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">How EdgePilot Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <Globe2 className="text-[#0EA5E9] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Macro Analysis</h3>
              <p className="text-sm text-gray-300">
                Scans economic news and events that impact your selected market pair.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <BarChart2 className="text-[#F59E0B] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Technical Analysis</h3>
              <p className="text-sm text-gray-300">
                Identifies market conditions using EMA, RSI, Bollinger Bands, S/R, and supply-demand zones.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <LineChart className="text-[#10B981] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Backtest Analysis</h3>
              <p className="text-sm text-gray-300">
                Simulates past trades using historical data — duration depends on your plan tier.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            <div className="bg-[#1E293B] rounded-xl p-6 relative">
              <MessageSquare className="text-[#F97316] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Sentiment Pulse</h3>
              <p className="text-sm text-gray-300">
                Analyzes trader mood across Reddit, Twitter, and news sources.
              </p>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#0EA5E9]"></div>
            </div>

            <div className="bg-[#1E293B] rounded-xl p-6">
              <Clock className="text-[#EF4444] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Signal Generator</h3>
              <p className="text-sm text-gray-300">
                Combines all analysis to deliver a signal with entry, stop loss, target, confidence, and rationale.
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
            <div className="bg-[#0B1120] rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold text-gray-400 mb-6">Most Tools Stop Here...</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-600 mr-3"></span>
                  Offer chatbots or basic pattern matchers
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-600 mr-3"></span>
                  Focus on crypto or stock retail dashboards
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-600 mr-3"></span>
                  Ignore broker realities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-600 mr-3"></span>
                  Generic signals with unknown logic
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-600 mr-3"></span>
                  Can't help with challenge rules
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-600 mr-3"></span>
                  Copy-paste signals only
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0B1120] rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold text-[#0EA5E9] mb-6">EdgePilot Goes Further</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></span>
                  Multi-agent AI system with explainable trade decisions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></span>
                  Purpose-built for Forex, Indices, and Metals
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></span>
                  SL/TP adjusted to your broker's spread and execution style
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></span>
                  Trade rationale, macro context, and backtested probabilities included
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></span>
                  Prop Mode built-in: max daily loss, profit target & R:R filters
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></span>
                  Designed for smart execution — copytrading deployment coming soon
                </li>
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
            <div className="bg-gray-600/10 rounded-xl p-8 border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Starter</h3>
                <div className="text-right">
                  <span className="text-2xl font-bold">$0</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  3 signals/day (EUR/USD only)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Preview AI Pipeline: Macro, Technical, Backtest, Sentiment Pulse
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Basic indicators: EMA, RSI only
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Dashboard preview only
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  BackTester: 30-day data, 100 simulations
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#EF4444] mr-2">✕</span>
                  No Telegram alerts
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#EF4444] mr-2">✕</span>
                  No strategy selection or custom indicators
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Data refresh: 1-hour delay
                </li>
              </ul>

              <button className="w-full py-3 px-4 border border-gray-700 rounded-lg text-white font-medium hover:bg-white/5 transition-colors">
                Start Free — No Card
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#0EA5E9]/10 rounded-xl p-8 border-2 border-[#0EA5E9] shadow-xl hover:shadow-2xl transition-shadow relative transform hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0EA5E9] text-white px-3 py-1 rounded-full text-sm">
                ✨ Most Popular
              </div>

              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="text-right">
                  <span className="text-2xl font-bold">$97</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <p className="text-sm font-medium mb-4">
                🔥 For serious traders: Everything in Starter, plus:
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  All assets (Forex, Indices, Metals)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Unlimited signals
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Prop Mode with broker spread support
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Strategy selection unlocked (Trend, Reversal, Ranging)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Full indicator suite: EMA, RSI, Bollinger Bands, S/R, Supply & Demand
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Backtest access: 1-year data, 1,000 simulations
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Data refresh: 15-minute delay
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#EF4444] mr-2">✕</span>
                  No Telegram alerts
                </li>
              </ul>

              <div className="space-y-2">
                <button className="w-full py-3 px-4 border border-[#0EA5E9] rounded-lg text-white font-medium hover:bg-[#0EA5E9]/10 transition-colors">
                  Try 7 Days for $5 →
                </button>
                <button className="w-full py-3 px-4 bg-[#0EA5E9] rounded-lg text-white font-medium hover:bg-[#0EA5E9]/90 transition-colors">
                  Upgrade to Pro+
                </button>
                <p className="text-center text-sm text-gray-400">
                  or save 15% yearly ($970/year)
                </p>
              </div>
            </div>

            {/* Edge+ Plan */}
            <div className="bg-[#F59E0B]/10 rounded-xl p-8 border-2 border-[#F59E0B] shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Edge+</h3>
                <div className="text-right">
                  <span className="text-2xl font-bold">$179</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <p className="text-sm font-medium mb-4">
                ⚡ Advanced trading intelligence: Everything in Pro, plus:
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Real-time data and signal refresh
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  5-year multi-timeframe Backtest access
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Live strategy audits (1:1 performance reviews)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Broker spread arbitrage alerts
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Telegram signal alerts
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-[#10B981] mr-2">✓</span>
                  Priority support access
                </li>
              </ul>

              <button className="w-full py-3 px-4 bg-[#F59E0B] rounded-lg text-white font-medium hover:bg-[#F59E0B]/90 transition-colors">
                Upgrade to Edge+
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 mb-4">
              No card required for free plan. 7-day money-back guarantee on all paid plans.
            </p>
            <div className="inline-block bg-[#10B981]/20 text-[#10B981] px-4 py-2 rounded-full text-sm">
              🎉 Limited time: Try Pro for $5 (7-day trial)
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/logo.png" alt="EdgePilot" className="h-6 w-auto mr-2" />
              <span className="font-semibold">EdgePilot</span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link to="/contact" className="text-sm text-gray-400 hover:text-white">
                Contact
              </Link>
              <a 
                href="https://t.me/edgepilot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white"
              >
                Telegram
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-gray-500 text-center max-w-3xl mx-auto">
            <p>
              Disclaimer: The information provided by EdgePilot is for educational and informational purposes only and does not constitute financial or investment advice. Trading involves substantial risk and may not be suitable for all investors. Always consult with a qualified financial advisor before making any trading decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;