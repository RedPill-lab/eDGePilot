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
      setError('Invalid email or password. Please check your credentials and try again.');
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
    </div>
  );
};

export default LoginForm;