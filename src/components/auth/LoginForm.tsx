import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn, devLogin } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } catch (err) {
      setError(
        'Unable to sign in. Please verify your email and password are correct. ' +
        'If you continue to have trouble, try using one of the demo accounts below.'
      );
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
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full mb-4"
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

        {/* Development Quick Login Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            onClick={() => devLogin('free')}
            className="btn btn-outline flex-1"
          >
            Login as Free
          </button>
          <button
            type="button"
            onClick={() => devLogin('premium')}
            className="btn btn-outline flex-1"
          >
            Login as Premium
          </button>
        </div>
      </form>
      
      <div className="mt-6 space-y-4">
        <div className="text-center text-sm">
          <p className="font-medium mb-2">Demo Accounts</p>
          <div className="space-y-2">
            <div className="bg-secondary/10 p-3 rounded-md">
              <p className="font-medium text-xs text-secondary mb-1">Free Account</p>
              <code>starter@example.com / Demo123!</code>
            </div>
            <div className="bg-secondary/10 p-3 rounded-md">
              <p className="font-medium text-xs text-secondary mb-1">Premium Account</p>
              <code>pro@example.com / Demo123!</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;