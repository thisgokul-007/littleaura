import React from 'react';

export function Badge({
  children,
  variant = 'blue',
  size = 'md',
  dot = false,
  className = ''
}) {
  const variantStyles = {
    // LittleAura Brand Palette Badges
    aqua: 'bg-[#a7ebf2]/70 text-[#011c40] border-[#a7ebf2] font-semibold',
    teal: 'bg-[#54acbf]/15 text-[#023859] border-[#54acbf]/40 font-semibold',
    ocean: 'bg-[#26658c]/15 text-[#023859] border-[#26658c]/40 font-semibold',
    navy: 'bg-[#023859] text-white border-[#023859] font-medium',
    
    // Status Badges
    blue: 'bg-sky-50 text-[#023859] border-sky-200 font-semibold',
    mint: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    lavender: 'bg-[#a7ebf2]/60 text-[#011c40] border-[#a7ebf2] font-semibold',
    yellow: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
    gray: 'bg-slate-100 text-slate-700 border-slate-200 font-medium'
  };

  const dotColors = {
    aqua: 'bg-[#54acbf]',
    teal: 'bg-[#54acbf]',
    ocean: 'bg-[#26658c]',
    navy: 'bg-[#a7ebf2]',
    blue: 'bg-[#26658c]',
    mint: 'bg-emerald-500',
    lavender: 'bg-[#54acbf]',
    yellow: 'bg-amber-500',
    danger: 'bg-rose-500',
    gray: 'bg-slate-400'
  };

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 rounded-lg',
    sm: 'text-[11px] px-2.5 py-0.5 rounded-lg',
    md: 'text-xs px-3 py-1 rounded-xl'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.blue} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant] || 'bg-current'} shrink-0`}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
