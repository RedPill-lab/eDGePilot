import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface EquityCurveChartProps {
  curves: number[][];
  medianCurveIndex: number;
}

const EquityCurveChart = ({ curves, medianCurveIndex }: EquityCurveChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="day"
          tickFormatter={(value) => `Day ${value}`}
          type="number"
          domain={[1, curves[0]?.length || 30]}
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
        />
        <YAxis 
          domain={[-10, 15]} 
          tickFormatter={(v) => `${v}%`}
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value: any) => `${value.toFixed(2)}%`} 
          labelFormatter={(l) => `Day ${l}`}
          contentStyle={{ 
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Legend 
          verticalAlign="top" 
          height={36}
          wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }}
        />
        {curves.map((curve, idx) => (
          <Line
            key={`run-${idx}`}
            data={curve.map((value, i) => ({ day: i + 1, value }))}
            dataKey="value"
            stroke={idx === medianCurveIndex ? '#10B981' : '#3B82F6'}
            strokeWidth={idx === medianCurveIndex ? 2.5 : 1}
            dot={false}
            opacity={idx === medianCurveIndex ? 1 : 0.3}
            isAnimationActive={false}
            name={idx === medianCurveIndex ? 'Median Path' : `Run ${idx + 1}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EquityCurveChart;