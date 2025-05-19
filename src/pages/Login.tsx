import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="text-center mb-8">
        <img 
          src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/edgepilot-logo.png" 
          alt="EdgePilot" 
          className="h-16 w-auto mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold">EdgePilot</h1>
        <p className="text-foreground/70 mt-2">
          Advanced AI analysis for forex, indices, and metals traders
        </p>
      </div>
      
      <LoginForm />
      
      <div className="mt-6 text-center">
        <p className="text-foreground/70">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;