import { useState, useEffect } from 'react';
import { BarChart2, Calendar, TrendingUp, Brain, CheckCircle, Clock, ArrowDown } from 'lucide-react';
import EquityCurveChart from './EquityCurveChart';

type SimulationResult = {
  passProbability: number;
  avgDaysToTarget: number;
  maxDrawdown: number;
  recommendedMinRR: number;
  equityCurves: number[][];
  daysToPassDistribution: number[];
  medianEquityCurveIndex: number;
};

const PropChallengeSimulator = () => {
  const [startingBalance, setStartingBalance] = useState(100000);
  const [challengeDuration, setChallengeDuration] = useState(30);
  const [remainingDays, setRemainingDays] = useState(30);
  const [tradesPerDay, setTradesPerDay] = useState(3);
  const [strategyType, setStrategyType] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    runSimulation();
  }, [startingBalance, challengeDuration, remainingDays, tradesPerDay, strategyType]);

  const runSimulation = () => {
    const winRate = strategyType === 'conservative' ? 0.65 : 
                   strategyType === 'balanced' ? 0.55 : 0.45;
    
    const riskPerTrade = strategyType === 'conservative' ? 0.5 : 
                        strategyType === 'balanced' ? 1 : 1.5;
    
    const rrRatio = strategyType === 'conservative' ? 2 : 
                    strategyType === 'balanced' ? 2.5 : 3;

    const curves: number[][] = [];
    const daysToPass: number[] = [];
    let totalPasses = 0;
    const simulations = 1000;

    for (let i = 0; i < simulations; i++) {
      let equity = startingBalance;
      const curve = [0]; // Start at 0% change
      let passed = false;
      let maxDrawdown = 0;

      for (let day = 1; day <= remainingDays; day++) {
        let dailyPnL = 0;
        for (let trade = 0; trade < tradesPerDay; trade++) {
          const win = Math.random() < winRate;
          const pnl = win ? 
            riskPerTrade * rrRatio * equity / 100 : 
            -riskPerTrade * equity / 100;
          dailyPnL += pnl;
        }
        
        equity += dailyPnL;
        curve.push(((equity - startingBalance) / startingBalance) * 100);

        const drawdown = (startingBalance - equity) / startingBalance * 100;
        maxDrawdown = Math.max(maxDrawdown, drawdown);

        if (!passed && equity >= startingBalance * 1.1) {
          passed = true;
          totalPasses++;
          daysToPass.push(day);
        }

        if (drawdown > 5) break;
      }

      if (curves.length < 15) curves.push(curve);
    }

    // Find the median curve index
    const finalReturns = curves.map(curve => curve[curve.length - 1]);
    const sortedReturns = [...finalReturns].sort((a, b) => a - b);
    const medianReturn = sortedReturns[Math.floor(finalReturns.length / 2)];
    const medianCurveIndex = finalReturns.indexOf(medianReturn);

    setSimulationResult({
      passProbability: (totalPasses / simulations) * 100,
      avgDaysToTarget: daysToPass.length ? 
        daysToPass.reduce((a, b) => a + b, 0) / daysToPass.length : 0,
      maxDrawdown: 5,
      recommendedMinRR: 1.8,
      equityCurves: curves,
      daysToPassDistribution: daysToPass,
      medianEquityCurveIndex: medianCurveIndex
    });
  };

  const getDistributionPeak = (distribution: number[]) => {
    const counts = Array(remainingDays).fill(0);
    distribution.forEach(day => counts[day - 1]++);
    const maxCount = Math.max(...counts);
    const peakDay = counts.indexOf(maxCount) + 1;
    return { peakDay, count: maxCount };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Starting Balance
          </label>
          <input
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(Number(e.target.value))}
            className="input"
            min="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Challenge Duration (Days)
          </label>
          <input
            type="number"
            value={challengeDuration}
            onChange={(e) => setChallengeDuration(Number(e.target.value))}
            className="input"
            min="1"
            max="60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Remaining Days
          </label>
          <input
            type="number"
            value={remainingDays}
            onChange={(e) => setRemainingDays(Number(e.target.value))}
            className="input"
            min="1"
            max={challengeDuration}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Trades per Day
          </label>
          <input
            type="number"
            value={tradesPerDay}
            onChange={(e) => setTradesPerDay(Number(e.target.value))}
            className="input"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Strategy Type
          </label>
          <select
            value={strategyType}
            onChange={(e) => setStrategyType(e.target.value as any)}
            className="input"
          >
            <option value="conservative">Conservative</option>
            <option value="balanced">Balanced</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>

      {simulationResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card-foreground/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground/70">Pass Probability</h3>
                <CheckCircle size={20} className="text-success" />
              </div>
              <p className="text-2xl font-bold">
                {simulationResult.passProbability.toFixed(1)}%
              </p>
            </div>

            <div className="bg-card-foreground/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground/70">Avg Days to Target</h3>
                <Clock size={20} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">
                {simulationResult.avgDaysToTarget.toFixed(1)}
              </p>
            </div>

            <div className="bg-card-foreground/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground/70">Max Drawdown</h3>
                <ArrowDown size={20} className="text-error" />
              </div>
              <p className="text-2xl font-bold">
                {simulationResult.maxDrawdown.toFixed(1)}%
              </p>
            </div>

            <div className="bg-card-foreground/5 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground/70">Min R:R Ratio</h3>
                <Brain size={20} className="text-accent" />
              </div>
              <p className="text-2xl font-bold">
                {simulationResult.recommendedMinRR.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">Sample Equity Curves</h3>
              <EquityCurveChart 
                curves={simulationResult.equityCurves}
                medianCurveIndex={simulationResult.medianEquityCurveIndex}
              />
            </div>

            <div className="border border-border rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">Days to Pass Distribution</h3>
              <div className="h-64 relative">
                {simulationResult.daysToPassDistribution.length > 0 ? (
                  <>
                    <div className="flex items-end h-full space-x-0.5">
                      {Array.from({ length: remainingDays }).map((_, day) => {
                        const count = simulationResult.daysToPassDistribution.filter(
                          d => d === day + 1
                        ).length;
                        const height = (count / simulationResult.daysToPassDistribution.length) * 100;
                        const { peakDay } = getDistributionPeak(simulationResult.daysToPassDistribution);
                        const isPeak = day + 1 === peakDay;
                        
                        return (
                          <div
                            key={day}
                            className={`flex-1 transition-all hover:opacity-80 ${
                              isPeak ? 'bg-primary' : 'bg-primary/20'
                            }`}
                            style={{ height: `${height}%` }}
                          >
                            {isPeak && (
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-primary">
                                Peak: Day {peakDay}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Mean day marker */}
                    <div 
                      className="absolute bottom-0 w-0.5 bg-success h-full"
                      style={{ 
                        left: `${(simulationResult.avgDaysToTarget / remainingDays) * 100}%`,
                        opacity: 0.5
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-success">
                        Mean: Day {simulationResult.avgDaysToTarget.toFixed(1)}
                      </div>
                    </div>

                    {/* Axes labels */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-foreground/70">
                      <span>Day 1</span>
                      <span>Day {remainingDays}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-foreground/50">
                    No successful passes recorded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropChallengeSimulator;