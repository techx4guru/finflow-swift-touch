
import { useState, useEffect } from 'react';
import AuthScreen from '@/components/auth/AuthScreen';
import Dashboard from '@/components/dashboard/Dashboard';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const savedAuth = localStorage.getItem('banking_authenticated');
      setIsAuthenticated(savedAuth === 'true');
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuth = () => {
    setIsAuthenticated(true);
    localStorage.setItem('banking_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('banking_authenticated', 'false');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">SecureBank</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isAuthenticated ? (
        <AuthScreen onAuth={handleAuth} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
      <Toaster />
    </div>
  );
};

export default Index;
