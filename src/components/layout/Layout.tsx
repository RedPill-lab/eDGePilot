import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AnalysisProvider } from '../../context/AnalysisContext';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <AnalysisProvider>
            <Outlet />
          </AnalysisProvider>
        </main>
      </div>
    </div>
  );
};

export default Layout;