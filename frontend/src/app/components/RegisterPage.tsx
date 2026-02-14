import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { register } from '../../services/authService';

interface RegisterPageProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register({ username, password }); // ✅ real API call
      onRegister(); // navigate to dashboard
    } catch (err: any) {
      setError('Username already exists or invalid data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full gradient-bg relative flex items-center justify-center p-4">
      <div className="gradient-overlay" />

      <Card variant="glass-strong" className="w-full max-w-md z-10 fade-in">
        <div className="flex flex-col items-center gap-6">

          <div className="flex flex-col items-center gap-3">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg">
              <Sparkles className="size-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-foreground">Create Account</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Join AI Document Assistant today.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              label="Username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
