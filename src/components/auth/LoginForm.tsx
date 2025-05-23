import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      // More descriptive error message
      if (err?.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else {
        setError('An error occurred while logging in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (type: 'starter' | 'pro') => {
    setError(null);
    setIsLoading(true);
    
    const credentials = {
      starter: {
        email: 'starter@example.com',
        password: 'Demo123!'
      },
      pro: {
        email: 'pro@example.com',
        password: 'Demo123!'
      }
    };
    
    try {
      await signIn(credentials[type].email, credentials[type].password);
      navigate('/dashboard');
    } catch (err) {
      setError('Demo accounts are not available. Please register a new account or use your existing credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-error/20 text-error rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {import.meta.env.DEV && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold text-center mb-4">Demo Accounts</h3>
          <div className="bg-warning/20 text-warning p-4 rounded-lg mb-4 text-sm">
            Note: Demo accounts need to be created in Supabase Auth before they can be used.
          </div>
          
          <div className="space-y-4">
            <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary">Starter Account</span>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('starter')}
                  className="btn btn-sm btn-secondary"
                >
                  Quick Login
                </button>
              </div>
              <div className="font-mono text-sm bg-secondary/10 p-2 rounded">
                <div>Email: starter@example.com</div>
                <div>Password: Demo123!</div>
              </div>
            </div>

            <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary">Pro Account</span>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('pro')}
                  className="btn btn-sm btn-secondary"
                >
                  Quick Login
                </button>
              </div>
              <div className="font-mono text-sm bg-secondary/10 p-2 rounded">
                <div>Email: pro@example.com</div>
                <div>Password: Demo123!</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;