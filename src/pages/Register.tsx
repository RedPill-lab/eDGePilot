import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-2">
          <svg
            viewBox="0 0 24 24"
            width="40"
            height="40"
            className="text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 6h-5l2 5-2 5h5" />
            <path d="M10 6H5l2 5-2 5h5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">TradeSmart</h1>
        <p className="text-foreground/70 mt-2">
          Create your account to access AI-powered trading signals
        </p>
      </div>
      
      <RegisterForm />
      
      <div className="mt-6 text-center">
        <p className="text-foreground/70">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;