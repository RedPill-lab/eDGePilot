import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Analysis',
      path: '/analysis',
      icon: <BarChart3 size={20} />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
    },
  ];
  
  return (
    <aside className="hidden lg:block w-56 border-r border-border bg-card">
      <div className="h-full flex flex-col py-6">
        <div className="px-4 mb-6">
          <h2 className="text-xs uppercase tracking-wider text-foreground/60">
            Main Navigation
          </h2>
        </div>
        
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-foreground hover:bg-secondary/10'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
              {isActive(item.path) && (
                <span className="ml-auto">
                  <ChevronRight size={16} />
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto px-4 py-6">
          <div className="bg-primary/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-primary mb-2">
              Upgrade to Premium
            </h3>
            <p className="text-xs text-foreground/70 mb-3">
              Get unlimited signals and advanced analytics.
            </p>
            <button className="btn btn-primary text-xs py-1 px-3 w-full">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;