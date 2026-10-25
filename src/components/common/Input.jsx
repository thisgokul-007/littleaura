import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Input({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-[#023859] uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <div className="relative rounded-2xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={inputId}
          type={effectiveType}
          className={`w-full rounded-xl border ${
            error
              ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500'
              : 'border-slate-300 focus:border-[#26658c] focus:ring-[#26658c]/20'
          } bg-white px-3.5 py-2.5 text-sm text-[#011c40] placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 ${
            Icon ? 'pl-10' : ''
          } ${isPassword ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}

export function Textarea({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 3,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-[#023859] uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <textarea
        id={inputId}
        rows={rows}
        className={`w-full rounded-xl border ${
          error
            ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500'
            : 'border-slate-300 focus:border-[#26658c] focus:ring-[#26658c]/20'
        } bg-white px-3.5 py-2.5 text-sm text-[#011c40] placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 resize-none ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Input;
