import DashboardSummary from '../components/dashboard/DashboardSummary';
import RecentSignals from '../components/dashboard/RecentSignals';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardSummary />
      <RecentSignals />
    </div>
  );
};

export default Dashboard;