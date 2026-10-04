import Link from 'next/link';
import { RetroTvError } from '@/components/ui/404-error-page';

export default function NotFound() {
  return (
    <div className="bg-[#0a0f1a] min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-8">
      {/* Retro TV 404 Component */}
      <div className="scale-90 sm:scale-100 transition-transform">
        <RetroTvError errorCode="404" errorMessage="NOT FOUND" />
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold font-display text-[#f1f5f9] tracking-wide">
          Page Not Found
        </h1>
        <p className="text-sm text-[#94a3b8] leading-relaxed">
          The transmission you are looking for does not exist or has been moved. Use the button below to return home safely.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-[#3b82f6] text-xs font-semibold uppercase tracking-wider text-white bg-[#3b82f6] rounded-sm hover:bg-[#2563eb] hover:border-[#2563eb] transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
