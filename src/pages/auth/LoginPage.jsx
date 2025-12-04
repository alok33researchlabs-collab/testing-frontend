import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert' 
// Icons
import { Lock, Mail, Eye, EyeOff, AlertCircle, Loader2, Zap } from 'lucide-react'

// --- Component Definition ---
const LoginPage = () => {
  // --- Hooks and State ---
  const navigate = useNavigate()
  // Assuming useAuth is implemented correctly
  const { login } = useAuth() 
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // --- Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic client-side validation
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      // Call the login function from the auth context
      await login(email, password)
      
      // Redirect on success
      navigate('/dashboard')
    } catch (err) {
      // Display error message from the login function/API
      setError(err.message || 'An unexpected error occurred during sign-in.')
    } finally {
      setLoading(false)
    }
  }

  // --- Render ---
  return (
    // 1. Main container: full screen, grid layout for desktop
    <div className="grid min-h-screen lg:grid-cols-2">
      
      {/* 2. Left Pane (Image/Marketing Content) - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8 relative">
        <div className="space-y-6 max-w-lg text-center">
         
          <h1 className="text-4xl font-bold tracking-tight">
            The simplest way to manage your work.
          </h1>
          <p className="text-lg text-muted-foreground">
            Join the thousands of users who are boosting their productivity with our platform.
          </p>
          <div className="mt-8">
            <Link to="/" className="text-sm font-medium text-primary hover:text-primary/80">
              Learn More about our features
            </Link>
          </div>
        </div>
        
        {/* Decorative footer text */}
        <div className="absolute bottom-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
        {/* Placeholder for a relevant diagram/graphic */}
        



      </div>

      {/* 3. Right Pane (Login Form) - Always visible, centered on mobile */}
      <div className="flex items-center justify-center p-4 lg:p-8  border-amber-200 rounded-lg m-4 lg:m-0">
        <Card className="w-full max-w-sm sm:max-w-md border-none shadow-none lg:shadow-lg lg:border">
          <CardHeader className="text-center">
            {/* Decorative Icon */}
           
            <CardTitle className="text-3xl font-semibold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground p-1 rounded"
                    disabled={loading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  {/* Note: In a real app, this should control a state variable for persistence */}
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" disabled={loading} />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full h-10 font-semibold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage