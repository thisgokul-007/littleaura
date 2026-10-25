import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Mail, User, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';

export function SignupPage() {
  const [name, setName] = useState('Priya');
  const [email, setEmail] = useState('priya@littleaura.app');
  const [password, setPassword] = useState('Password123!');
  const [confirmPassword, setConfirmPassword] = useState('Password123!');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your parent name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the privacy policy and terms of service.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signup({ name, email, password });
      navigate('/onboarding');
    } catch (err) {
      setError('Unable to register at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/onboarding');
    } catch (err) {
      setError('Google sign-up was interrupted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-[#011c40]">
      {/* Left side: SaaS branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#a7ebf2]/30 via-white to-[#54acbf]/15 p-12 flex-col justify-between border-r border-slate-200 overflow-hidden">
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

        <div className="relative z-10 my-auto py-8 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#a7ebf2] text-xs font-semibold text-[#023859] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#54acbf]" />
            <span>Join thousands of thoughtful parents</span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#023859] leading-tight">
            Begin your calm, connected parenting journey today.
          </h2>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Create an account in 30 seconds and configure your child’s customized growth charts, immunization roadmap, and intelligent developmental companion.
          </p>

          <div className="mt-8 flex items-center gap-3 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#54acbf] shrink-0" />
            <span>Strict privacy guarantees: No commercial data reselling.</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 relative z-10">
          © {new Date().getFullYear()} LittleAura. Protected under health privacy standards.
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#023859] tracking-tight">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Start supporting your child's 0–3 journey with LittleAura.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Parent / Caregiver Name"
              type="text"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              required
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              required
            />

            <Input
              label="Password (min 8 characters)"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />

            <div className="flex items-start gap-2 text-xs pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#26658c] focus:ring-[#26658c]"
              />
              <label htmlFor="terms" className="text-slate-600 leading-tight cursor-pointer">
                I acknowledge the <span className="font-semibold text-[#26658c]">Terms of Service</span> and consent to data processing under the <span className="font-semibold text-[#26658c]">Privacy Policy</span>.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue to Child Setup
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
            onClick={handleGoogleSignup}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Sign up with Google
          </Button>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#26658c] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
