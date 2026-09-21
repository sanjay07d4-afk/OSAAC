'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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
  const [isShining, setIsShining] = useState(false);

  useEffect(() => {
    // Initial entrance subtle shine adapted from reference script
    const timerOn = setTimeout(() => {
      setIsShining(true);
    }, 600);

    const timerOff = setTimeout(() => {
      setIsShining(false);
    }, 2800);

    return () => {
      clearTimeout(timerOn);
      clearTimeout(timerOff);
    };
  }, []);

  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-1.5">
        {children || 'Start Project'}
        {showIcon && (icon || <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />)}
      </span>
      <span className="drop-shadow" aria-hidden="true" />
    </>
  );

  const baseClasses = `group osaac-start-project-btn ${isShining ? 'shine' : ''} ${
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
