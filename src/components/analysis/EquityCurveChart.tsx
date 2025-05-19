import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface EquityCurveChartProps {
  curves: number[][];
  medianCurveIndex: number;
}

const EquityCurveChart = ({ curves, medianCurveIndex }: EquityCurveChartProps) => {
  const dataLength = curves[0]?.length || 0;
  const chartData = Array.from({ length: dataLength }, (_, i) => {
    const point: any = { day: `Day ${i + 1}` };
    curves.forEach((curve, idx) => {
      point[`Run ${idx}`] = curve[i];
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="day" 
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
        {curves.map((_, idx) => (
          <Line
            key={idx}
            type="monotone"
            dataKey={`Run ${idx}`}
            stroke={idx === medianCurveIndex ? '#10B981' : '#3B82F6'}
            strokeWidth={idx === medianCurveIndex ? 2.5 : 1}
            dot={false}
            opacity={idx === medianCurveIndex ? 1 : 0.3}
            name={idx === medianCurveIndex ? 'Median Path' : `Run ${idx + 1}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EquityCurveChart;