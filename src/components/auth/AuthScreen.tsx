
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onAuth: () => void;
}

const AuthScreen = ({ onAuth }: AuthScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { toast } = useToast();

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    // Simulate biometric authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Biometric Authentication",
      description: "Fingerprint verified successfully",
    });
    
    setTimeout(() => {
      onAuth();
    }, 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.username && credentials.password) {
      toast({
        title: "Login Successful",
        description: "Welcome back to SecureBank",
      });
      onAuth();
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your username and password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-slide-up">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 glass">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SecureBank</h1>
          <p className="text-white/80">Your trusted banking partner</p>
        </div>

        {/* Biometric Authentication */}
        <Card className="glass border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Quick Access</CardTitle>
            <CardDescription className="text-white/70">
              Use biometric authentication for instant access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleBiometricAuth}
              disabled={isLoading}
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 h-14"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Fingerprint className="w-6 h-6 mr-2" />
                  Touch ID / Face ID
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Traditional Login */}
        <Card className="glass border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-white/70">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  placeholder="Username or Email"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-primary hover:bg-white/90 h-12"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-white/60 text-sm">
          <p>Protected by bank-level security</p>
          <p>256-bit SSL encryption</p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
