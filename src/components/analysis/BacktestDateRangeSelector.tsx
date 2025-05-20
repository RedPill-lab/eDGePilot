```typescript
import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DateRange {
  start: Date;
  end: Date;
}

interface BacktestDateRangeSelectorProps {
  onRangeChange: (range: DateRange) => void;
}

const BacktestDateRangeSelector = ({ onRangeChange }: BacktestDateRangeSelectorProps) => {
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d' | 'custom'>('30d');
  const [customRange, setCustomRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  });

  const handleRangeChange = (range: '7d' | '30d' | 'custom') => {
    setSelectedRange(range);
    
    let newRange: DateRange;
    const now = new Date();
    
    switch (range) {
      case '7d':
        newRange = {
          start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          end: now
        };
        break;
      case '30d':
        newRange = {
          start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          end: now
        };
        break;
      default:
        newRange = customRange;
    }
    
    onRangeChange(newRange);
  };

  const handleCustomDateChange = (type: 'start' | 'end', date: string) => {
    const newRange = {
      ...customRange,
      [type]: new Date(date)
    };
    setCustomRange(newRange);
    if (selectedRange === 'custom') {
      onRangeChange(newRange);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => handleRangeChange('7d')}
          className={`px-3 py-1 text-sm rounded-md ${
            selectedRange === '7d'
              ? 'bg-primary text-white'
              : 'bg-secondary/10 hover:bg-secondary/20'
          }`}
        >
          7 Days
        </button>
        <button
          onClick={() => handleRangeChange('30d')}
          className={`px-3 py-1 text-sm rounded-md ${
            selectedRange === '30d'
              ? 'bg-primary text-white'
              : 'bg-secondary/10 hover:bg-secondary/20'
          }`}
        >
          30 Days
        </button>
        <button
          onClick={() => handleRangeChange('custom')}
          className={`px-3 py-1 text-sm rounded-md flex items-center ${
            selectedRange === 'custom'
              ? 'bg-primary text-white'
              : 'bg-secondary/10 hover:bg-secondary/20'
          }`}
        >
          <CalendarIcon size={14} className="mr-1" />
          Custom
        </button>
      </div>

      {selectedRange === 'custom' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={customRange.start.toISOString().split('T')[0]}
              onChange={(e) => handleCustomDateChange('start', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={customRange.end.toISOString().split('T')[0]}
              onChange={(e) => handleCustomDateChange('end', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="input"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BacktestDateRangeSelector;
```