import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  label: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'warning';
}

const generateData = (trend: 'up' | 'down' | 'warning' = 'up') => {
  if (trend === 'up') {
    return [
      { value: 18 },
      { value: 19 },
      { value: 20 },
      { value: 21 },
      { value: 22 },
      { value: 23 },
      { value: 24 },
    ];
  } else if (trend === 'down') {
    return [
      { value: 70 },
      { value: 68 },
      { value: 66 },
      { value: 64 },
      { value: 63 },
      { value: 62 },
      { value: 61 },
    ];
  } else {
    return [
      { value: 45 },
      { value: 48 },
      { value: 44 },
      { value: 50 },
      { value: 47 },
      { value: 52 },
      { value: 49 },
    ];
  }
};

const Dashboard = ({ label, value, unit, trend = 'up' }: DashboardProps) => {
  const data = generateData(trend);
  
  const getStrokeColor = () => {
    if (trend === 'warning') {
      return 'url(#warningGradient)';
    }
    return trend === 'up' ? 'var(--color-success)' : 'var(--color-error)';
  };

  return (
    <div className="bg-secondary/80 rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-text-dark/80 mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-text-dark">{value}</p>
          <span className="text-lg text-text-dark/60">{unit}</span>
        </div>
      </div>

      <div className="w-32 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-error)" />
                <stop offset="50%" stopColor="var(--color-warning)" />
                <stop offset="100%" stopColor="var(--color-success)" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke={getStrokeColor()}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;