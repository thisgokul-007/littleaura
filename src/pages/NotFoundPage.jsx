import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#011c40] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-[#a7ebf2]/40 text-[#26658c] flex items-center justify-center mb-6 shadow-sm">
        <Sparkles className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#54acbf] mb-2">
        404 Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#023859] tracking-tight max-w-md">
        This quiet corner doesn't seem to exist
      </h1>

      <p className="mt-3 text-sm text-slate-500 max-w-md leading-relaxed">
        The page you are looking for may have moved or doesn't exist. Let's guide you back to your child's daily overview.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/dashboard">
          <Button variant="primary" size="md" icon={Home}>
            Go to Dashboard
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" size="md" icon={ArrowLeft}>
            Landing Page
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
