import { useState } from 'react';
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
  TrendingUp, 
  Users 
} from 'lucide-react';

const Landing = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const testimonials = [
    {
      quote: "EdgePilot's Edge Validator changed how I approach prop challenges. The Market Phase Scan caught a regime shift I would've missed.",
      author: "Sarah Chen",
      role: "FTMO Funded Trader",
      location: "Singapore",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
    },
    {
      quote: "The Technical Analysis with Bollinger Bands and squeeze detection is spot on. Saved me countless hours of chart analysis.",
      author: "Marcus Rodriguez",
      role: "Day Trader",
      location: "Miami, USA",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      quote: "I trade NY session after work. I used to scan charts for hours — now I open EdgePilot, check the Macro + Technical combo, and I'm done in 10 minutes.",
      author: "K. Smith",
      role: "Retail Trader",
      location: "New Jersey, USA",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "The signals are backed by logic. I can literally see the rationale, backtest stats, and sentiment before I enter. No more 'hope and pray'.",
      author: "D. Lopes",
      role: "Discretionary Swing Trader",
      location: "São Paulo, Brazil",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "I run a Monte Carlo simulation for my own models. EdgePilot builds that into the workflow. The Quant Agent changed how I validate trades.",
      author: "T. Wang",
      role: "Quant Trader",
      location: "Singapore",
      image: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "I've used over 10 signal groups. Most of them copy each other. EdgePilot filters out low-probability setups — and the spread adjustment is clutch.",
      author: "E. Anderson",
      role: "Copytrading Group Leader",
      location: "Berlin, Germany",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "I failed twice before. Once I saw how EdgePilot tailors each trade to your prop limits — it clicked. I hit 8% with room to spare.",
      author: "J. Romero",
      role: "FTMO Trader",
      location: "Mexico City",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "The macro and sentiment agents give me a bias. I still scalp manually, but now I start the day knowing which pairs are worth touching.",
      author: "L. Banks",
      role: "Scalper",
      location: "Johannesburg, South Africa",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "It's like having an analyst, quant, and trade manager bundled into one clean UI. And no upsell every 5 seconds like other 'AI' tools.",
      author: "A. Novak",
      role: "Longtime Retail Trader",
      location: "Warsaw, Poland",
      image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];
  
  const faqs = [
    {
      question: "How does Prop Mode work?",
      answer: "Prop Mode automatically adjusts risk parameters and trade filters to match your prop firm's rules. It tracks daily/overall drawdown, enforces position sizing, and ensures R:R meets minimum requirements. Available on Pro and Edge+ plans."
    },
    {
      question: "Which brokers are supported?",
      answer: "EdgePilot works with all major MT4/MT5 brokers including FTMO, MyFXBook, IC Markets, and more. Our spread-adjusted entries and automated broker mapping ensure precise execution."
    },
    {
      question: "What's your signal accuracy?",
      answer: "Our Edge Validator shows a 68% win rate across all instruments since 2023, with a minimum R:R of 1:1.5. Pro users get access to the Market Phase Scan for deeper regime-based analysis."
    },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="px-6 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Trade with AI-Powered Edge Detection
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">
              Multi-agent AI system for prop traders. Validate your edge, scan market phases, and get institutional-grade analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 bg-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                Watch Demo <PlayCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur">
              <Brain className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-Agent AI System</h3>
              <p className="text-gray-400">5 specialized AI agents working together for comprehensive market analysis and trade validation.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur">
              <Target className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Edge Validator</h3>
              <p className="text-gray-400">Validate your trading edge with Monte Carlo simulation and walk-forward analysis.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur">
              <LineChart className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Phase Scanner</h3>
              <p className="text-gray-400">Detect market regimes and adapt your strategy to current conditions.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur">
              <Shield className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prop Mode</h3>
              <p className="text-gray-400">Automatic risk management tailored to your prop firm's rules and requirements.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur">
              <Globe2 className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Macro Analysis</h3>
              <p className="text-gray-400">Real-time news impact scoring and correlation analysis across markets.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur">
              <BarChart2 className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-gray-400">Deep insights into your trading performance with advanced metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Trusted by Prop Traders Worldwide
          </h2>
          <div className="relative">
            <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors -translate-x-4"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors translate-x-4"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                      />
                      <p className="text-xl sm:text-2xl text-gray-300 mb-6">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-gray-400">{testimonial.role}</p>
                        <p className="text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      activeFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    activeFaq === index ? 'py-4' : 'py-0 h-0'
                  }`}
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Trade with an Edge?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Join thousands of prop traders using EdgePilot to validate their edge and improve their results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              Contact Sales <MessageSquare className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;