'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, ClipboardCheck } from 'lucide-react';

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
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#f1f5f9] bg-[#111827] rounded-sm hover:border-white/20 transition-all duration-300"
          >
            Back to Home
          </Link>
          <a
            href="https://wa.me/917603881020"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-[#3b82f6] text-xs font-semibold uppercase tracking-wider text-white bg-[#3b82f6] rounded-sm hover:bg-[#2563eb] hover:border-[#2563eb] transition-all duration-300 shadow-md shadow-blue-500/25"
          >
            Discuss on WhatsApp
            <MessageSquare className="ml-2 h-4 w-4" />
          </a>
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
