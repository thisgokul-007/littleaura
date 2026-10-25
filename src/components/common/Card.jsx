import React from 'react';

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  glow = false,
  highlight = false,
  padding = 'p-6'
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border transition-all duration-200 ${
        highlight 
          ? 'bg-gradient-to-br from-[#a7ebf2]/15 via-white to-white border-[#a7ebf2]/80' 
          : 'bg-white border-slate-200/90'
      } shadow-card ${
        hoverable ? 'hover:shadow-elevated hover:border-[#54acbf]/40 cursor-pointer' : ''
      } ${glow ? 'ai-glow-border shadow-ai-glow' : ''} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  icon: Icon,
  className = ''
}) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-2xl bg-[#a7ebf2]/30 text-[#26658c]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-[#023859]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export default Card;
