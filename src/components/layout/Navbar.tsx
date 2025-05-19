import { Link } from 'react-router-dom';
import { LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <nav className="bg-card border-b border-border py-3 px-4 lg:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="EdgePilot" 
              className="h-8 w-auto mr-2"
            />
            <span className="text-xl font-semibold font-poppins">EdgePilot</span>
          </Link>
        </div>
        
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-foreground focus:outline-none"
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
        
        <div className="hidden lg:flex items-center space-x-4">
          {user && (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 text-sm focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {user.name.charAt(0)}
                </div>
                <span>{user.name}</span>
                <ChevronDown size={16} />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm">{user.email}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        {user.plan.toUpperCase()}
                      </span>
                      {user.plan === 'free' && (
                        <span className="text-xs ml-2">
                          {user.signalsRemaining} signals left
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-secondary/10"
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-secondary/10 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-border">
          {user && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 px-1 py-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-foreground/70">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center px-1 pb-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {user.plan.toUpperCase()}
                </span>
                {user.plan === 'free' && (
                  <span className="text-xs ml-2">
                    {user.signalsRemaining} signals left
                  </span>
                )}
              </div>
              <Link
                to="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="px-1 py-2 hover:bg-secondary/10 rounded"
              >
                Account Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-1 py-2 text-error hover:bg-secondary/10 rounded flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;