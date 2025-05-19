import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Mail, CreditCard, Shield, User } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  
  // Mock settings data
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [autoGenerateSignals, setAutoGenerateSignals] = useState(false);
  
  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="input"
                  value={user?.name || ''}
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="input"
                  value={user?.email || ''}
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subscription Plan</label>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user?.plan === 'premium' 
                      ? 'bg-accent/20 text-accent' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {user?.plan.toUpperCase()}
                  </div>
                  {user?.plan === 'free' && (
                    <button className="btn btn-sm btn-primary">
                      Upgrade Now
                    </button>
                  )}
                </div>
              </div>
              
              {user?.plan === 'free' && (
                <div className="bg-card-foreground/5 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Usage Limits</h3>
                  <p className="text-sm">
                    You have {user.signalsRemaining} signal generations remaining for this month.
                  </p>
                  <div className="mt-3 w-full bg-secondary/20 h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(user.signalsRemaining / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-border">
              <button className="btn btn-error">
                Delete Account
              </button>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-foreground/70">
                    Receive notifications for new trade signals
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                  <div className="w-11 h-6 bg-secondary/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-foreground/70">
                    Receive trade signals and updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={emailEnabled}
                    onChange={() => setEmailEnabled(!emailEnabled)}
                  />
                  <div className="w-11 h-6 bg-secondary/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Automatic Signal Generation</h3>
                  <p className="text-sm text-foreground/70">
                    Automatically generate signals for your watched instruments
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoGenerateSignals}
                    onChange={() => setAutoGenerateSignals(!autoGenerateSignals)}
                  />
                  <div className="w-11 h-6 bg-secondary/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        );
      
      case 'billing':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Billing & Subscription</h2>
            
            <div className="card p-5 mb-6">
              <h3 className="text-md font-medium mb-3">Current Plan</h3>
              <div className="flex items-center">
                <div className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                  user?.plan === 'premium' 
                    ? 'bg-accent/20 text-accent' 
                    : 'bg-primary/20 text-primary'
                }`}>
                  {user?.plan.toUpperCase()}
                </div>
                <span className="text-sm">
                  {user?.plan === 'premium' 
                    ? '$29.99/month' 
                    : 'Free'}
                </span>
              </div>
              
              {user?.plan === 'free' ? (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Upgrade to Premium</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span className="text-sm">Unlimited signal generations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span className="text-sm">Advanced technical indicators</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span className="text-sm">Email and Telegram signal delivery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span className="text-sm">Higher priority analysis</span>
                    </li>
                  </ul>
                  <button className="btn btn-primary">
                    Upgrade Now - $29.99/month
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-sm mb-2">
                    Your subscription renews on June 15, 2025
                  </p>
                  <div className="flex space-x-3">
                    <button className="btn btn-outline btn-sm">
                      Update Payment Method
                    </button>
                    <button className="btn btn-outline btn-error btn-sm">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">Payment History</h3>
              {user?.plan === 'premium' ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 text-left text-sm font-medium">Date</th>
                      <th className="py-2 text-left text-sm font-medium">Amount</th>
                      <th className="py-2 text-left text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 text-sm">May 15, 2025</td>
                      <td className="py-2 text-sm">$29.99</td>
                      <td className="py-2">
                        <span className="badge badge-success">Paid</span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-sm">April 15, 2025</td>
                      <td className="py-2 text-sm">$29.99</td>
                      <td className="py-2">
                        <span className="badge badge-success">Paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-foreground/70">
                  No payment history available for free plan.
                </p>
              )}
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <button className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-md font-medium mb-3">Two-Factor Authentication</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Add an extra layer of security to your account
                </p>
                <button className="btn btn-outline">
                  Enable 2FA
                </button>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-md font-medium mb-3">Session Management</h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Manage your active sessions
                </p>
                <div className="bg-card-foreground/5 p-4 rounded-lg mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-foreground/70">
                        Chrome on Windows • IP: 192.168.1.1
                      </p>
                    </div>
                    <span className="badge badge-success">Active</span>
                  </div>
                </div>
                <button className="btn btn-outline btn-error">
                  Sign Out All Devices
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <h1 className="text-2xl font-bold mb-6 lg:hidden">Settings</h1>
        
        <div className="card overflow-hidden">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'account'
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary/10'
              }`}
            >
              <User size={18} className="mr-3" />
              Account
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary/10'
              }`}
            >
              <Bell size={18} className="mr-3" />
              Notifications
            </button>
            
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'billing'
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary/10'
              }`}
            >
              <CreditCard size={18} className="mr-3" />
              Billing & Subscription
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'security'
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary/10'
              }`}
            >
              <Shield size={18} className="mr-3" />
              Security
            </button>
          </nav>
        </div>
        
        {user?.plan === 'free' && (
          <div className="mt-6 bg-accent/10 rounded-lg p-4 hidden lg:block">
            <h3 className="font-medium text-accent mb-2">Upgrade to Premium</h3>
            <p className="text-sm mb-3">
              Get unlimited signals and advanced features.
            </p>
            <button className="btn btn-accent btn-sm w-full">
              Upgrade Now
            </button>
          </div>
        )}
      </div>
      
      <div className="lg:col-span-3">
        <h1 className="text-2xl font-bold mb-6 hidden lg:block">Settings</h1>
        
        <div className="card p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;