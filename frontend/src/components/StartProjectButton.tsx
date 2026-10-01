'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface StartProjectButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
  fullWidth?: boolean;
  id?: string;
}

export default function StartProjectButton({
  href = '/start-project',
  onClick,
  type,
  disabled,
  className = '',
  children,
  icon,
  showIcon = true,
  fullWidth = false,
  id,
}: StartProjectButtonProps) {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2.5">
      {/* Left Dot with Expanding Sky-Blue Origin */}
      <span className="relative flex items-center justify-center shrink-0">
        <span className="osaac-sky-dot-origin" aria-hidden="true" />
        <span className="osaac-sky-dot-indicator" aria-hidden="true" />
      </span>

      {/* Button Label Text */}
      <span className="osaac-sky-btn-text font-bold">
        {children || 'Start Project'}
      </span>

      {/* Sliding Arrow revealed on hover */}
      {showIcon && (
        <span className="osaac-sky-btn-arrow inline-flex items-center shrink-0">
          {icon || <ArrowRight className="h-3.5 w-3.5" />}
        </span>
      )}
    </span>
  );

  const baseClasses = `group osaac-sky-pill-btn ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  if (type || onClick || disabled) {
    return (
      <button
        id={id}
        type={type || 'button'}
        onClick={onClick}
        disabled={disabled}
        className={baseClasses}
      >
        {content}
      </button>
    );
  }

  return (
    <Link id={id} href={href} className={baseClasses}>
      {content}
    </Link>
  );
}
