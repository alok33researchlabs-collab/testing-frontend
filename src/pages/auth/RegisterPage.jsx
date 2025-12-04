import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import { Mail, Lock, User, AlertCircle, Loader2, Zap } from 'lucide-react'; // Added Zap icon
import { useAuth } from '../../hooks/useAuth';
// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'


const RegisterPage = () => {
  const navigate = useNavigate();
  // Assuming useAuth is implemented correctly
  const { register, isAuthenticated } = useAuth(); 
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call and successful registration
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      // await register(name, email, password);
      
      // Successful registration -> Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Main container: full screen, grid layout for desktop
    <div className="grid min-h-screen lg:grid-cols-2">
      
      {/* 2. Left Pane (Image/Marketing Content) - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8 relative">
        <div className="space-y-6 max-w-lg text-center">
         
          <h1 className="text-4xl font-bold tracking-tight">
            Start your productivity journey today.
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign up now to access your personalized project management dashboard.
          </p>
          
        </div>
        
       
      </div>

      {/* 3. Right Pane (Registration Form) - Always visible, centered on mobile */}
      <div className="flex items-center justify-center p-4 lg:p-8">
        {/* Use shadow/border styles consistent with the Login page */}
        <Card className="w-full max-w-sm sm:max-w-md border-none shadow-none lg:shadow-lg lg:border">
          <CardHeader className="text-center">
            {/* Use bg-primary for consistent color */}
            
            <CardTitle className="text-3xl font-semibold">Create Account</CardTitle>
            <CardDescription>Enter your details below to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-10"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-10"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full h-10 font-semibold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              {/* Use Link component and text-primary */}
              <Link to="/login" className="text-primary hover:underline font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;