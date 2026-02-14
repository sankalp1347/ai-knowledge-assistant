import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { login } from '../../services/authService';
interface LoginPageProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login({ username, password });  // ✅ real backend call
      onLogin();                           // navigate to dashboard
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full gradient-bg relative flex items-center justify-center p-4">
      {/* Gradient overlay */}
      <div className="gradient-overlay" />

      {/* Login card */}
      <Card variant="glass-strong" className="w-full max-w-md z-10 fade-in">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg">
              <Sparkles className="size-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-foreground">AI Document Assistant</h1>
              <p className="text-sm text-muted-foreground mt-2">Welcome back! Please sign in to continue.</p>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          {/* Register link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-primary hover:underline font-medium"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}