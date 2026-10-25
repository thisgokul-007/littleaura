import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate / execute password reset email dispatch
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    // Security best practice: Always show confirmation without exposing account existence
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-[#011c40]">
      {/* Left side: SaaS branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#a7ebf2]/30 via-white to-[#54acbf]/15 p-12 flex-col justify-between border-r border-slate-200">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#a7ebf2] text-xs font-semibold text-[#023859] mb-6 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#54acbf]" />
            <span>Secure Password Recovery</span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#023859] leading-tight">
            Protecting your child’s health records is our priority.
          </h2>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Follow the recovery instructions sent to your email to regain access to your child’s growth history, immunization cards, and daily routines.
          </p>
        </div>

        <div className="text-[11px] text-slate-400 relative z-10">
          © {new Date().getFullYear()} LittleAura. Designed for parents of children aged 0–3 years.
        </div>
      </div>

      {/* Right side: Recovery Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-left">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#26658c] hover:underline mb-4">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#023859] tracking-tight">
              Reset your password
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your registered parent email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <Card className="p-6 text-center space-y-4 border-[#a7ebf2] bg-[#a7ebf2]/10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#023859]">
                  Check your inbox
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  If an account exists for <span className="font-semibold text-[#011c40]">{email}</span>, a secure password reset link has been dispatched. Please review your email within 15 minutes.
                </p>
              </div>

              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" size="sm" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Parent Email Address"
                type="email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                error={error}
                helperText="We'll send a one-time verification link."
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3"
                loading={loading}
                icon={ArrowRight}
                iconPosition="right"
              >
                Send Password Reset Email
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              Remember your password?{' '}
              <Link to="/login" className="font-bold text-[#26658c] hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
