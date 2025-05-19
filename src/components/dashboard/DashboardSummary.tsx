import { useAuth } from '../../context/AuthContext';
import { ArrowUpRight, ArrowDownRight, DollarSign, Timer } from 'lucide-react';

const DashboardSummary = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard summary
  const stats = [
    {
      title: 'Win Rate',
      value: '68%',
      change: '+5.2%',
      isPositive: true,
      icon: <ArrowUpRight className="text-success" size={18} />,
    },
    {
      title: 'Avg. Return',
      value: '2.3%',
      change: '+0.8%',
      isPositive: true,
      icon: <DollarSign className="text-primary" size={18} />,
    },
    {
      title: 'Drawdown',
      value: '4.1%',
      change: '-1.2%',
      isPositive: true,
      icon: <ArrowDownRight className="text-success" size={18} />,
    },
    {
      title: 'Holding Time',
      value: '3.2 days',
      change: '-0.5 days',
      isPositive: true,
      icon: <Timer className="text-primary" size={18} />,
    },
  ];
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-foreground/70">
            Welcome back, {user?.name}!
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <span className="text-sm font-medium bg-primary/20 text-primary px-3 py-1 rounded-full">
            {user?.plan.toUpperCase()} PLAN
          </span>
          {user?.plan === 'free' && (
            <span className="ml-3 text-sm">
              {user.signalsRemaining} signals remaining
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-foreground/70">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-card-foreground/5 rounded-full">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span
                className={`text-xs font-medium ${
                  stat.isPositive ? 'text-success' : 'text-error'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-foreground/60 ml-1">
                vs. last month
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;