import { useState } from 'react';
import { WalkForwardSplitRatio } from '../../types';
import { Info } from 'lucide-react';

interface WalkForwardControlsProps {
  enabled: boolean;
  splitRatio: WalkForwardSplitRatio;
  customSplit?: {
    trainDays: number;
    testDays: number;
  };
  totalDays: number;
  onSplitChange: (ratio: WalkForwardSplitRatio, custom?: { trainDays: number; testDays: number }) => void;
}

const WalkForwardControls = ({
  enabled,
  splitRatio,
  customSplit,
  totalDays,
  onSplitChange
}: WalkForwardControlsProps) => {
  const [customTrainDays, setCustomTrainDays] = useState(customSplit?.trainDays || Math.floor(totalDays * 0.7));
  const [customTestDays, setCustomTestDays] = useState(customSplit?.testDays || Math.floor(totalDays * 0.3));

  const getWindowSizes = (ratio: WalkForwardSplitRatio) => {
    switch (ratio) {
      case '1/1':
        return {
          train: Math.floor(totalDays / 2),
          test: Math.floor(totalDays / 2)
        };
      case '2/1':
        return {
          train: Math.floor(totalDays * 0.67),
          test: Math.floor(totalDays * 0.33)
        };
      case '3/1':
        return {
          train: Math.floor(totalDays * 0.75),
          test: Math.floor(totalDays * 0.25)
        };
      case 'custom':
        return {
          train: customTrainDays,
          test: customTestDays
        };
      default:
        return {
          train: Math.floor(totalDays * 0.67),
          test: Math.floor(totalDays * 0.33)
        };
    }
  };

  const handleSplitChange = (newRatio: WalkForwardSplitRatio) => {
    if (newRatio === 'custom') {
      onSplitChange(newRatio, { trainDays: customTrainDays, testDays: customTestDays });
    } else {
      onSplitChange(newRatio);
    }
  };

  const handleCustomDaysChange = (trainDays: number, testDays: number) => {
    setCustomTrainDays(trainDays);
    setCustomTestDays(testDays);
    onSplitChange('custom', { trainDays, testDays });
  };

  const { train, test } = getWindowSizes(splitRatio);

  return (
    <div className={`space-y-4 ${!enabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div>
        <label className="block text-sm font-medium mb-2">Train/Test Split Ratio</label>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSplitChange('1/1')}
            className={`px-3 py-1 text-sm rounded-md ${
              splitRatio === '1/1'
                ? 'bg-primary text-white'
                : 'bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            1:1 (50/50)
          </button>
          <button
            onClick={() => handleSplitChange('2/1')}
            className={`px-3 py-1 text-sm rounded-md ${
              splitRatio === '2/1'
                ? 'bg-primary text-white'
                : 'bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            2:1 (67/33)
          </button>
          <button
            onClick={() => handleSplitChange('3/1')}
            className={`px-3 py-1 text-sm rounded-md ${
              splitRatio === '3/1'
                ? 'bg-primary text-white'
                : 'bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            3:1 (75/25)
          </button>
          <button
            onClick={() => handleSplitChange('custom')}
            className={`px-3 py-1 text-sm rounded-md ${
              splitRatio === 'custom'
                ? 'bg-primary text-white'
                : 'bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {splitRatio === 'custom' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Training Days</label>
            <input
              type="number"
              value={customTrainDays}
              onChange={(e) => handleCustomDaysChange(parseInt(e.target.value), customTestDays)}
              min={1}
              max={totalDays - 1}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Testing Days</label>
            <input
              type="number"
              value={customTestDays}
              onChange={(e) => handleCustomDaysChange(customTrainDays, parseInt(e.target.value))}
              min={1}
              max={totalDays - 1}
              className="input"
            />
          </div>
        </div>
      )}

      <div className="bg-card-foreground/5 p-4 rounded-lg flex items-start">
        <Info size={16} className="text-primary mt-1 mr-3" />
        <div>
          <p className="text-sm">
            Your selected range is {totalDays} days. Using a {splitRatio} split ratio:
          </p>
          <ul className="text-sm mt-2 space-y-1 text-foreground/70">
            <li>• Training window: {train} days</li>
            <li>• Testing window: {test} days</li>
            <li>• Number of windows: {Math.floor(totalDays / test)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalkForwardControls;