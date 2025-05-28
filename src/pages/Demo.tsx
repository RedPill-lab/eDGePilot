import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Demo = () => {
  const { devLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const startDemo = async () => {
      await devLogin('free');
      navigate('/dashboard');
    };

    startDemo();
  }, [devLogin, navigate]);

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0EA5E9] mb-4"></div>
        <p className="text-white text-lg">Starting demo...</p>
      </div>
    </div>
  );
};

export default Demo;