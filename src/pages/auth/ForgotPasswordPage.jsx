import React, { useState } from 'react';
// Assuming Link is available or using standard anchor for simplicity if it's not imported.
// import { Link } from 'react-router-dom'; 

import { Mail, Lock, AlertCircle, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
// Assuming AuthService is imported correctly from its path
// import AuthService from '../../services/authService'; 
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Note: Ensure your shadcn/ui setup includes a definition for 'variant="success"' on Alert,
// otherwise, you should style the success alert manually.

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // NOTE: For demonstration, I'm defining a mock service here.
  const mockAuthService = {
    forgotPassword: async (email) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`[MOCK API] Password reset request sent for: ${email}`);
        // Simulate success regardless of email existence for security best practices
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      // Use the actual AuthService or the mock one
      await mockAuthService.forgotPassword(email);
      setMessage(
        "If an account with that email exists, a password reset link has been sent to your inbox. Please check your spam folder as well."
      );
      setEmail('');
    } catch (err) {
      // Still show the generic success message even on error (security best practice)
      setMessage(
        "If an account with that email exists, a password reset link has been sent to your inbox. Please check your spam folder as well."
      );
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Clean background, centered
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm sm:max-w-md shadow-2xl">
        <CardHeader className="text-center">
          {/* Use bg-primary for consistent color */}
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address to receive a secure password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Error Alert (Destructive variant is standard) */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Message (Using a green/success style, often primary in Alert) */}
          {message && (
            // NOTE: Replace 'variant="success"' with actual success styling if not provided by shadcn/ui theme
            <Alert className="mb-4 bg-green-50 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                {/* Use text-muted-foreground for icon color */}
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10"
                  disabled={loading || !!message} // Disable after successful submit too
                  required
                />
              </div>
            </div>

            {/* Use w-full h-10 bg-primary hover:bg-primary/90 for consistent color */}
            <Button 
              type="submit" 
              className="w-full h-10 font-semibold" 
              disabled={loading || !!message} // Cannot click if successful message is shown
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          {/* Back to Sign In Link */}
          <div className="mt-6 text-center text-sm">
            {/* Use text-primary for consistent link color */}
            <a 
              href="/login" 
              className="text-primary hover:underline font-medium flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sign In
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;