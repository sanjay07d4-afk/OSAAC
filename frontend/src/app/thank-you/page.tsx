'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ClipboardCheck, ArrowLeft } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className="bg-[#0a0f1a] text-[#f1f5f9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-12">
      <div className="space-y-6">
        {/* Success Tick */}
        <div className="inline-flex p-4 bg-[#111827] rounded-full text-[#3b82f6] border border-white/[0.08]">
          <CheckCircle2 className="h-16 w-16" />
        </div>

        <h1 className="text-4xl font-bold font-display tracking-tight text-[#f1f5f9]">
          Enquiry Received
        </h1>

        <p className="text-base text-[#94a3b8] leading-relaxed max-w-lg mx-auto">
          Your project enquiry has been submitted successfully. Thank you for contacting 
          <strong className="text-[#f1f5f9]"> OSAAC</strong>. We will review your requirements and get in touch 
          with you shortly.
        </p>
      </div>

      {/* Confirmation Details Card */}
      {id && (
        <div className="p-6 bg-[#111827] border border-white/[0.08] rounded-xl space-y-3 text-left shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center space-x-2 text-[#3b82f6]">
            <ClipboardCheck className="h-5 w-5" />
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-[#f1f5f9]">
              Enquiry Tracking Details
            </h2>
          </div>
          <p className="text-xs text-[#94a3b8]">
            Keep a note of your unique submission tracking code below for reference during discussions.
          </p>
          <div className="p-3 bg-[#0a0f1a] rounded-sm border border-white/10 text-center font-mono text-xs sm:text-sm text-[#3b82f6] font-bold select-all">
            {id}
          </div>
        </div>
      )}

      {/* Follow up Action buttons */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 border border-white/10 hover:border-sky-500/50 text-xs font-semibold uppercase tracking-wider text-[#f1f5f9] bg-[#111827] hover:bg-[#162238] rounded-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 overflow-hidden"
          >
            {/* Subtle internal sweep highlight */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none motion-reduce:hidden"
              aria-hidden="true"
            />
            {/* Left-facing animated arrow */}
            <ArrowLeft className="h-3.5 w-3.5 text-sky-400 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1 motion-reduce:transform-none shrink-0" />
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transform-none">
              Back to Home
            </span>
          </Link>
          <WhatsAppButton
            variant="primary"
            className="w-full sm:w-auto"
            message={id ? `Hi OSAAC, I would like to discuss my project enquiry (${id}) with your team.` : 'Hi OSAAC, I would like to discuss a project with your team.'}
          />
        </div>
      </div>
    </div>
  );
}

export default function ThankYou() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0a0f1a] min-h-[50vh] flex items-center justify-center text-center">
          <p className="text-[#3b82f6] animate-pulse text-sm">Loading enquiry dashboard...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
