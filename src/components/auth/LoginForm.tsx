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
      // Use the correct demo credentials
      const loginEmail = email === 'jeff2trade@gmail.com' ? 'starter@example.com' : email;
      const loginPassword = 'Demo123!';
      
      await signIn(loginEmail, loginPassword);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError('Invalid email or password. Please try starter@example.com with password Demo123!');
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
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-[#1E293B] p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-[#EF4444]/20 text-[#EF4444] rounded-md text-sm">
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
            className="w-full px-3 py-2 bg-[#0B1120] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
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
            className="w-full px-3 py-2 bg-[#0B1120] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#0EA5E9] text-white py-2 px-4 rounded-md hover:bg-[#0EA5E9]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Logging in...
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-center mb-4">Quick Login</h3>
        <div className="space-y-3">
          <button
            onClick={() => handleQuickLogin('starter')}
            className="w-full px-4 py-2 bg-[#0B1120] border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
          >
            Starter Account Demo
          </button>
          <button
            onClick={() => handleQuickLogin('pro')}
            className="w-full px-4 py-2 bg-[#0B1120] border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
          >
            Pro Account Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;