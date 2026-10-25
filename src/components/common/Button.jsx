import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    xs: "px-2.5 py-1 text-xs rounded-xl gap-1.5",
    sm: "px-3 py-1.5 text-xs rounded-xl gap-1.5",
    md: "px-4 py-2 text-sm rounded-xl gap-2",
    lg: "px-6 py-3 text-base rounded-2xl gap-2.5",
    icon: "p-2 rounded-xl"
  };

  const variantStyles = {
    // Primary Action (#26658c)
    primary: "bg-[#26658c] text-white hover:bg-[#1f5475] active:bg-[#194561] font-semibold shadow-sm focus:ring-[#26658c]/40",
    // Interactive Accent (#54acbf)
    secondary: "bg-[#54acbf] text-white hover:bg-[#4695a6] active:bg-[#3b808e] font-semibold shadow-sm focus:ring-[#54acbf]/40",
    // Soft Highlight (#a7ebf2 with Navy contrast text)
    accent: "bg-[#a7ebf2] text-[#011c40] hover:bg-[#8fe2eb] active:bg-[#78d6e0] font-bold focus:ring-[#a7ebf2]/50",
    mint: "bg-[#54acbf] text-white hover:bg-[#4695a6] font-semibold focus:ring-[#54acbf]/40",
    outline: "border border-slate-300 bg-white hover:bg-slate-50 text-[#023859] font-semibold shadow-sm focus:ring-[#26658c]/20",
    ghost: "bg-transparent hover:bg-slate-100 text-[#023859] font-medium focus:ring-slate-300",
    danger: "bg-rose-600 text-white hover:bg-rose-700 font-semibold focus:ring-rose-400",
    ai: "bg-gradient-to-r from-[#26658c] to-[#54acbf] text-white font-semibold shadow-ai-glow hover:opacity-95 active:scale-[0.99] transition-transform focus:ring-[#54acbf]/40"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}

export default Button;
