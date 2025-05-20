import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart2, 
  Brain, 
  ChevronRight, 
  Globe2, 
  LineChart,
  MessageSquare, 
  PlayCircle,
  Shield, 
  Target, 
  TrendingUp, 
  Users 
} from 'lucide-react';

const Landing = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const testimonials = [
    {
      quote: "Passed my FTMO 100K challenge using EdgePilot's risk filters.",
      author: "K. Smith",
      role: "Prop Trader",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "I just load my broker's spread and go — haven't missed a day since.",
      author: "D. Lopes",
      role: "Forex Trader",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "EdgePilot replaced 3 tools for me. It's my pre-market go-to.",
      author: "M. Patel",
      role: "System Trader",
      image: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];
  
  const faqs = [
    {
      question: "How accurate are EdgePilot's signals?",
      answer: "Our signals have been backtested extensively, showing a 68% win rate with 5:1 R:R filtering since 2023. Each signal is generated through a multi-agent AI system that analyzes macro factors, technical patterns, and market sentiment."
    },
    {
      question: "Can I use this with my broker?",
      answer: "Yes! EdgePilot works with over 90% of MT4/MT5 brokers. You can customize spread settings and execution parameters to match your broker's conditions exactly."
    },
    {
      question: "Do I need to be a prop trader?",
      answer: "No - while EdgePilot has special features for prop traders (like drawdown controls and risk filters), it's designed for all self-directed retail traders looking for institutional-grade analysis."
    },
    {
      question: "How does the AI analysis work?",
      answer: "EdgePilot uses a 5-agent AI system: Macro Analysis (news/events), Technical Analysis (patterns/indicators), Quant Analysis (backtesting), Sentiment Analysis (market mood), and Signal Generation. Each agent specializes in its domain and contributes to the final trade decision."
    }
  ];
  
  const features = [
    {
      icon: <Shield className="text-primary" size={32} />,
      title: "Prop Firm Traders",
      description: "Hit 8-10% targets while avoiding daily drawdown violations with smart risk filters"
    },
    {
      icon: <Target className="text-accent" size={32} />,
      title: "Manual Traders",
      description: "Skip hours of charting and get institutional-grade logic for your decisions"
    },
    {
      icon: <Brain className="text-success" size={32} />,
      title: "Quant/System Traders",
      description: "Deploy Monte Carlo-tested signals with real risk-reward control"
    }
  ];
  
  const pipeline = [
    {
      icon: <Globe2 size={32} className="text-primary" />,
      title: "Macro Analyst",
      description: "Searches real macro news via AI"
    },
    {
      icon: <BarChart2 size={32} className="text-accent" />,
      title: "Technical Analyst",
      description: "Auto-detects RSI, EMA, S/R, ROC"
    },
    {
      icon: <LineChart size={32} className="text-success" />,
      title: "Quant Analyst",
      description: "Runs backtest & Monte Carlo simulation"
    },
    {
      icon: <MessageSquare size={32} className="text-warning" />,
      title: "Sentiment Analyst",
      description: "Pulls from Reddit, Twitter, news"
    },
    {
      icon: <Target size={32} className="text-error" />,
      title: "Signal Generator",
      description: "Final signal with confidence & rationale"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Floating Demo Button */}
      <a 
        href="#"
        className="fixed bottom-8 right-8 bg-accent text-white px-6 py-3 rounded-full shadow-lg hover:bg-accent/90 transition-colors z-50 flex items-center font-medium"
      >
        <PlayCircle size={20} className="mr-2" />
        Try Demo
      </a>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="flex items-center mb-8">
                <TrendingUp size={40} className="text-primary mr-3" />
                <h1 className="text-3xl font-semibold font-poppins">EdgePilot</h1>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                AI-Powered Trading Signals for Forex, Indices & Metals — 
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
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card-foreground/5 rounded-xl p-6 border border-border"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How EdgePilot Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How EdgePilot Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipeline.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-xl p-6 h-full">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
                
                {index < pipeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                )}
              </div>
            ))}
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
                <p>Offer chatbots or basic pattern matchers</p>
                <p>Focus on crypto or stock retail dashboards</p>
                <p>Ignore broker realities</p>
                <p>Generic signals with unknown logic</p>
                <p>Can't help with challenge rules</p>
                <p>Copy-paste signals only</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">EdgePilot Goes Further</h3>
              <div className="space-y-4">
                <p>Multi-agent AI system with explainable trade decisions</p>
                <p>Purpose-built for Forex, Indices, and Metals</p>
                <p>SL/TP adjusted to your broker's spread and execution style</p>
                <p>Trade rationale, macro context, and backtested probabilities included</p>
                <p>Prop Mode built-in: max daily loss, profit target & R:R filters</p>
                <p>Designed for smart execution — copytrading deployment coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="pricing-tier">
              <h3>Free Plan <span className="price">$0/month</span></h3>
              <ul>
                <li>✅ Full AI Pipeline (Macro + Technical + Quant + Sentiment)</li>
                <li>✅ 3 signals/day (EURUSD only)</li>
                <li>✅ Dashboard preview</li>
                <li>🚫 No Telegram alerts</li>
                <li>🚫 No Prop Mode</li>
              </ul>
              <Link to="/register" className="cta-button">
                Start Free — No Card
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="pricing-tier popular">
              <div className="popular-badge">✨ Most Popular</div>
              <h3>Pro Plan <span className="price">$49/month</span></h3>
              <p className="text-sm font-medium mb-4">🔥 Everything in Free, plus:</p>
              <ul>
                <li>✅ All assets (Forex, Indices, Metals)</li>
                <li>✅ Prop Mode (auto-drawdown enforcement)</li>
                <li>✅ Advanced Quant Filters (backtest, R:R tuning)</li>
                <li>✅ Telegram alerts</li>
                <li>✅ Full historical analytics</li>
              </ul>
              <Link to="/register" className="cta-button">
                Get Started →
              </Link>
            </div>
            
            {/* Edge+ Plan */}
            <div className="pricing-tier early-access">
              <div className="early-badge">🚀 Early Access</div>
              <h3>Edge+ Plan <span className="price">$89/month</span></h3>
              <p className="text-sm font-medium mb-4">⚡ Everything in Pro, plus:</p>
              <ul>
                <li>✅ Multi-account sync</li>
                <li>✅ Copytrading (beta access)</li>
                <li>✅ Priority feature requests</li>
                <li>✅ Dedicated support</li>
              </ul>
              <button className="cta-button btn-outline" disabled>
                Join Waitlist
              </button>
            </div>
          </div>
          
          <p className="disclaimer">
            No card required. 7-day refund guarantee for Pro/Edge+.
          </p>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Traders Say</h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-background border border-border rounded-xl p-8 text-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                      />
                      <p className="text-xl mb-6">"{testimonial.quote}"</p>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-foreground/70">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronRight 
                    size={20}
                    className={`transition-transform ${
                      activeFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                {activeFaq === index && (
                  <div className="p-4 pt-0 text-foreground/70">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Footer */}
      <section className="py-20 bg-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Join 1,200+ traders using EdgePilot to trade smarter.
          </h2>
          
          <Link 
            to="/register" 
            className="btn btn-primary text-lg px-8 py-3 mb-8"
          >
            Start Free — No Commitment
            <ArrowRight size={20} className="ml-2" />
          </Link>
          
          <div className="flex justify-center items-center gap-8">
            <img src="/mt4-logo.png" alt="MT4" className="h-8 opacity-50" />
            <img src="/mt5-logo.png" alt="MT5" className="h-8 opacity-50" />
            <img src="/ctrader-logo.png" alt="cTrader" className="h-8 opacity-50" />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <TrendingUp size={24} className="text-primary mr-2" />
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
        </div>
      </footer>
    </div>
  );
};

export default Landing;