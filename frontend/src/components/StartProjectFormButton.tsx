'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

interface StartProjectFormButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
  fullWidth?: boolean;
}

export default function StartProjectFormButton({
  href,
  onClick,
  type = 'submit',
  disabled = false,
  loading = false,
  success = false,
  className = '',
  children,
  id,
  fullWidth = true,
}: StartProjectFormButtonProps) {
  const content = (
    <>
      {/* Expanding Right Panel (active in default state) */}
      {!loading && !success && (
        <span className="osaac-sp-gray-panel" aria-hidden="true" />
      )}

      {/* Button Text & State Layer */}
      <span className="osaac-sp-text">
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-4 w-4 shrink-0" />
            <span>Sending…</span>
          </span>
        ) : success ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Check className="h-4 w-4 shrink-0 stroke-[2.5]" />
            <span>Sent</span>
          </span>
        ) : (
          children || 'Send Message'
        )}
      </span>

      {/* Right Arrow Icon (only in default state) */}
      {!loading && !success && (
        <span className="osaac-sp-arrow-wrapper" aria-hidden="true">
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </span>
      )}
    </>
  );

  const baseClasses = `osaac-start-project-page-btn ${
    fullWidth ? 'w-full' : ''
  } ${loading ? 'is-loading' : ''} ${success ? 'is-success' : ''} ${className}`;

  if (href && !type) {
    return (
      <Link id={id} href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading || success}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
