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

  // ... (rest of the code remains exactly the same as in the original file)

  return (
    // ... (rest of the JSX remains exactly the same as in the original file)
  );
};

export default Landing;