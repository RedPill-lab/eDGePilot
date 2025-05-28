import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RegisterFormProps {
  selectedPlan?: string | null;
}

const RegisterForm = ({ selectedPlan }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, {
        full_name: name,
        plan: selectedPlan === 'pro' ? 'pro' : selectedPlan === 'edge' ? 'edge+' : 'starter'
      });

      // Navigate to dashboard after successful registration
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-[#1E293B] p-8 rounded-lg shadow-lg w-full max-w-md">
      {error && (
        <div className="mb-4 p-3 bg-[#EF4444]/20 text-[#EF4444] rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-[#0B1120] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
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
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-white">
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
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-white">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;