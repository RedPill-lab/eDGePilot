import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [selectedPlan] = useState(searchParams.get('plan') || localStorage.getItem('selectedPlan'));
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the stored plan when component unmounts
    return () => {
      localStorage.removeItem('selectedPlan');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col justify-center items-center px-4">
      <div className="text-center mb-8">
        <img src="/logo.png" alt="EdgePilot" className="h-16 w-auto mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white">EdgePilot</h1>
        <p className="text-gray-300 mt-2">
          {selectedPlan === 'pro' 
            ? 'Create your Pro account to access unlimited signals'
            : selectedPlan === 'edge'
            ? 'Create your Edge+ account for advanced trading intelligence'
            : 'Create your account to access AI-powered trading signals'}
        </p>
      </div>
      
      <RegisterForm selectedPlan={selectedPlan} />
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#0EA5E9] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;