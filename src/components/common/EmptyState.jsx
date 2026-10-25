import React from 'react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 ${className}`}>
      {Icon && (
        <div className="p-4 rounded-2xl bg-[#a7ebf2]/40 text-[#26658c] mb-4 shadow-xs">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-base font-bold text-[#023859] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
