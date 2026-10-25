import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('parent@littleaura.app');
  const [password, setPassword] = useState('Password123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect straight to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin, { replace: true });
    } catch (err) {
      setError('Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin, { replace: true });
    } catch (err) {
      setError('Google sign-in was interrupted. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-[#011c40]">
      {/* Left side: Premium SaaS branding & subtle abstract child-development visualization */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#a7ebf2]/25 via-white to-[#54acbf]/15 p-12 flex-col justify-between border-r border-slate-200 overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#a7ebf2]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#54acbf]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#26658c] via-[#54acbf] to-[#a7ebf2] p-0.5 shadow-sm">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#26658c]" />
            </div>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-[#023859]">
              LittleAura
            </span>
            <p className="text-[10px] text-slate-400 font-medium -mt-1">
              Growing Together, Every Day.
            </p>
          </div>
        </Link>

        {/* Abstract Child Development Visualization */}
        <div className="relative z-10 my-auto py-8">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#a7ebf2] text-xs font-semibold text-[#023859] mb-6 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#54acbf]" />
              <span>Evidence-Informed Early Childhood Ecosystem</span>
            </div>

            <h2 className="text-3xl font-extrabold text-[#023859] leading-tight">
              Calm reassurance for every leap, milestone, and quiet moment.
            </h2>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Connect your child’s health documents, routine cycles, and growth tracking in a single trustworthy home designed by healthcare UI principles.
            </p>

            {/* Abstract visual cards */}
            <div className="mt-8 space-y-3">
              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#a7ebf2]/40 text-[#26658c] flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#023859]">WHO Growth Velocity Tracking</h4>
                  <p className="text-[11px] text-slate-500">Continuous height and weight trajectory monitoring</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/95 border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#54acbf]/20 text-[#26658c] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#023859]">LittleAura AI Companion</h4>
                  <p className="text-[11px] text-slate-500">Empathetic developmental suggestions with pediatric safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-400 relative z-10">
          © {new Date().getFullYear()} LittleAura. Designed for parents of children aged 0–3 years.
        </div>
      </div>

      {/* Right side: SaaS-style Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#023859] tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign in to manage your child’s daily growth and records.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@littleaura.app"
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#26658c] focus:ring-[#26658c]"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="font-semibold text-[#26658c] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-[#f8fafc] px-3 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Or
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full py-2.5"
            onClick={handleGoogleSignIn}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-bold text-[#26658c] hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
