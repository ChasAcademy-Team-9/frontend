import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  label: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  color?: string;
  onClick?: () => void;
}

const Dashboard = ({
  label,
  value,
  unit,
  min = 0,
  max = 100,
  color = '#f6edd9',
  onClick,
}: DashboardProps) => {
  const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const data = [{ name: label, value: percent, fill: color }];

  return (
    <div
      className={`bg-secondary rounded-lg p-5 shadow flex flex-col items-center justify-center ${onClick ? 'cursor-pointer hover:bg-opacity-80 transition' : ''}`}
      onClick={onClick}
    >
      <div className="relative w-24 h-24 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="80%"
            outerRadius="100%"
            barSize={12}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background
              dataKey="value"
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute w-24 h-24 flex flex-col items-center justify-center top-0 left-0 pointer-events-none">
          <span className="text-2xl font-bold text-dark">{value}</span>
          <span className="text-base text-dark">{unit}</span>
        </div>
      </div>
      <span className="text-dark font-medium">{label}</span>
    </div>
  );
};

export default Dashboard;