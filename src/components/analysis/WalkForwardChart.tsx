import { WalkForwardWindow } from '../../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface WalkForwardChartProps {
  windows: WalkForwardWindow[];
}

const WalkForwardChart = ({ windows }: WalkForwardChartProps) => {
  const data = windows.map((window, index) => ({
    window: index + 1,
    trainReturn: window.trainReturn,
    testReturn: window.testReturn,
    passed: window.passed
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="window"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}%`]}
            labelFormatter={(label) => `Window ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="trainReturn"
            name="Training"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="testReturn"
            name="Testing"
            stroke="#10B981"
            strokeWidth={2}
            dot={true}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WalkForwardChart;