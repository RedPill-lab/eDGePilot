import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart2, 
  Brain, 
  ChevronLeft,
  ChevronRight, 
  Globe2, 
  LineChart,
  MessageSquare, 
  PlayCircle,
  Shield, 
  Target, 
  TrendingUp 
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Floating Demo Button */}
      <button 
        className="fixed bottom-8 right-8 bg-accent text-white px-6 py-3 rounded-full shadow-lg hover:bg-accent/90 transition-colors z-50 flex items-center font-medium"
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
                <span className="text-primary">Your Edge, Automated.</span>
              </h2>
              
              <p className="text-xl text-foreground/80 mb-8">
                Macro research, signal generation, and risk control — done for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Start Free — No Card Required
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                
                <a 
                  href="#how-it-works"
                  className="btn btn-outline text-lg px-8 py-3"
                >
                  See How It Works
                </a>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-card border border-border rounded-xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Trade Signal</h3>
                    <p className="text-sm text-foreground/70">EUR/USD • Swing Trade</p>
                  </div>
                  <div className="bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
                    Buy Signal
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-foreground/70">Entry</p>
                    <p className="text-lg font-semibold">1.0850</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Stop Loss</p>
                    <p className="text-lg font-semibold text-error">1.0800</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Take Profit</p>
                    <p className="text-lg font-semibold text-success">1.0950</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Win Rate</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk:Reward</span>
                    <span className="text-sm font-medium">1:2.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confidence</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Who It's Built For */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Who It's Built For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card-foreground/5 rounded-xl p-6 border border-border">
              <Shield size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Funded Traders</h3>
              <p className="text-foreground/70">
                Hit 8-10% targets while staying within strict risk rules. Let EdgePilot handle max drawdown filters, SL sizing, and R:R compliance.
              </p>
            </div>
            
            <div className="bg-card-foreground/5 rounded-xl p-6 border border-border">
              <Target size={32} className="text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3">Precision Traders</h3>
              <p className="text-foreground/70">
                Ditch the guesswork. Skip charting and get actionable, pre-qualified trades powered by real-time macro, sentiment, and backtesting.
              </p>
            </div>
            
            <div className="bg-card-foreground/5 rounded-xl p-6 border border-border">
              <Brain size={32} className="text-success mb-4" />
              <h3 className="text-xl font-semibold mb-3">Strategy Builders</h3>
              <p className="text-foreground/70">
                Validate your ideas with 1-5 year backtests. Deploy signals with built-in risk parameters and performance audits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How EdgePilot Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How EdgePilot Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <Globe2 size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Macro Analysis</h3>
                <p className="text-sm text-foreground/70">
                  Scans economic news and events that impact your selected market pair.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
            </div>
            
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <BarChart2 size={32} className="text-accent mb-4" />
                <h3 className="text-lg font-semibold mb-2">Technical Analysis</h3>
                <p className="text-sm text-foreground/70">
                  Identifies market conditions using EMA, RSI, Bollinger Bands, S/R, and supply-demand zones.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
            </div>
            
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <LineChart size={32} className="text-success mb-4" />
                <h3 className="text-lg font-semibold mb-2">Backtest Analysis</h3>
                <p className="text-sm text-foreground/70">
                  Simulates past trades using historical data — duration depends on your plan tier.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
            </div>
            
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <MessageSquare size={32} className="text-warning mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sentiment Pulse</h3>
                <p className="text-sm text-foreground/70">
                  Analyzes trader mood across Reddit, Twitter, and news sources.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 h-full">
              <Target size={32} className="text-error mb-4" />
              <h3 className="text-lg font-semibold mb-2">Signal Generator</h3>
              <p className="text-sm text-foreground/70">
                Combines all analysis to deliver a signal with entry, stop loss, target, confidence, and rationale.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* What Sets EdgePilot Apart */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">What Sets EdgePilot Apart</h2>
          <p className="text-center text-lg text-foreground/70 mb-12">
            EdgePilot is the co-pilot you wish signal groups had. Built with traders, for traders.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground/70">Most Tools Stop Here...</h3>
              <div className="space-y-4">
                <p>• Offer chatbots or basic pattern matchers</p>
                <p>• Focus on crypto or stock retail dashboards</p>
                <p>• Ignore broker realities</p>
                <p>• Generic signals with unknown logic</p>
                <p>• Can't help with challenge rules</p>
                <p>• Copy-paste signals only</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">EdgePilot Goes Further</h3>
              <div className="space-y-4">
                <p>• Multi-agent AI system with explainable trade decisions</p>
                <p>• Purpose-built for Forex, Indices, and Metals</p>
                <p>• SL/TP adjusted to your broker's spread and execution style</p>
                <p>• Trade rationale, macro context, and backtested probabilities included</p>
                <p>• Prop Mode built-in: max daily loss, profit target & R:R filters</p>
                <p>• Designed for smart execution — copytrading deployment coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-lg text-foreground/70 mb-12">
            Choose the plan that fits your trading style
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="pricing-tier">
              <h3>Starter <span className="price">$0/month</span></h3>
              <div className="space-y-3 mb-8">
                <p>✅ 3 signals/day (EUR/USD only)</p>
                <p>✅ Preview AI Pipeline: Macro, Technical, Backtest, Sentiment Pulse</p>
                <p>✅ Basic indicators: EMA, RSI only</p>
                <p>✅ Dashboard preview only</p>
                <p>✅ BackTester: 30-day data, 100 simulations</p>
                <p>❌ No Telegram alerts</p>
                <p>❌ No strategy selection or custom indicators</p>
                <p>✅ Data refresh: 1-hour delay</p>
              </div>
              <Link to="/register" className="btn w-full">
                Start Free — No Card
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="pricing-tier popular">
              <div className="popular-badge">✨ Most Popular</div>
              <h3>Pro <span className="price">$97/month</span></h3>
              <p className="text-sm font-medium mb-4">
                🔥 For serious traders: Everything in Starter, plus:
              </p>
              <div className="space-y-3 mb-8">
                <p>✅ All assets (Forex, Indices, Metals)</p>
                <p>✅ Unlimited signals</p>
                <p>✅ Prop Mode with broker spread support</p>
                <p>✅ Strategy selection unlocked (Trend, Reversal, Ranging)</p>
                <p>✅ Full indicator suite: EMA, RSI, Bollinger Bands, S/R, Supply & Demand</p>
                <p>✅ Backtest access: 1-year data, 1,000 simulations</p>
                <p>✅ Data refresh: 15-minute delay</p>
                <p>❌ No Telegram alerts</p>
              </div>
              <button className="btn btn-primary w-full mb-2">
                Try 7 Days for $5 →
              </button>
              <p className="text-center text-sm text-foreground/70">
                or save 15% yearly ($970/year)
              </p>
            </div>
            
            {/* Edge+ Plan */}
            <div className="pricing-tier">
              <h3>Edge+ <span className="price">$179/month</span></h3>
              <p className="text-sm font-medium mb-4">
                ⚡ Advanced trading intelligence: Everything in Pro, plus:
              </p>
              <div className="space-y-3 mb-8">
                <p>✅ Real-time data and signal refresh</p>
                <p>✅ 5-year multi-timeframe Backtest access</p>
                <p>✅ Live strategy audits (1:1 performance reviews)</p>
                <p>✅ Broker spread arbitrage alerts</p>
                <p>✅ Telegram signal alerts</p>
                <p>✅ Priority support access</p>
              </div>
              <button className="btn btn-accent w-full">
                Upgrade to Edge+
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-foreground/70 mb-4">
              No card required for free plan. 7-day money-back guarantee on all paid plans.
            </p>
            <div className="inline-block bg-success/10 text-success px-4 py-2 rounded-full text-sm">
              🎉 Limited time: Try Pro for $5 (7-day trial)
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/logo.png" alt="EdgePilot" className="h-6 w-auto mr-2" />
              <span className="font-semibold">EdgePilot</span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-foreground/70 hover:text-foreground">
                Terms
              </Link>
              <Link to="/contact" className="text-sm text-foreground/70 hover:text-foreground">
                Contact
              </Link>
              <a 
                href="https://t.me/edgepilot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground"
              >
                Telegram
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-foreground/50 text-center max-w-3xl mx-auto">
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