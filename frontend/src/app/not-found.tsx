import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#0a0f1a] min-h-[75vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <h1 className="text-7xl sm:text-9xl font-bold font-display text-[#3b82f6] tracking-widest animate-pulse">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold font-display text-[#f1f5f9] tracking-wide">
        Page Not Found
      </h2>
      <p className="text-sm text-[#94a3b8] max-w-sm leading-relaxed">
        The page you are looking for does not exist or has been moved. Use the button below to return home safely.
      </p>
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-[#3b82f6] text-xs font-semibold uppercase tracking-wider text-white bg-[#3b82f6] rounded-sm hover:bg-[#2563eb] hover:border-[#2563eb] transition-colors duration-300 shadow-lg shadow-blue-500/20"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
