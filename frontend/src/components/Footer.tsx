import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f1a] border-t border-white/[0.08] text-[#f1f5f9] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Column 1 — Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group py-1">
              <Image
                src="/logo.png"
                alt="OSAAC"
                width={160}
                height={48}
                className="h-[42px] w-auto max-h-[48px] object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xs font-normal">
              Digital solutions, modern websites, automation, and custom technology built around real business requirements.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div className="space-y-4">
            <h4 className="text-[#f1f5f9] font-display text-xs font-bold uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  AI Automation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  Logo &amp; Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services#mobile-app-development" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  Mobile App Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="space-y-4">
            <h4 className="text-[#f1f5f9] font-display text-xs font-bold uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/start-project" className="text-[#3b82f6] font-semibold hover:text-[#60a5fa] transition-colors duration-200">
                  Start Your Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-[#f1f5f9] font-display text-xs font-bold uppercase tracking-widest">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-[#111827] rounded text-[#3b82f6] border border-white/[0.08] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+917603881020" className="text-[#f1f5f9] hover:text-[#3b82f6] font-medium transition-colors duration-200">
                  +91 7603881020
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-[#111827] rounded text-[#25D366] border border-white/[0.08] shrink-0">
                  <WhatsAppIcon className="h-4 w-4" />
                </div>
                <a href="https://wa.me/917603881020?text=Hi%20OSAAC%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20your%20team." target="_blank" rel="noopener noreferrer" className="text-[#f1f5f9] hover:text-[#25D366] font-medium transition-colors duration-200">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-[#111827] rounded text-[#3b82f6] border border-white/[0.08] shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:osaactech@gmail.com" className="text-[#f1f5f9] hover:text-[#3b82f6] font-medium transition-colors duration-200 break-all">
                  osaactech@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-[#64748b]">
          <p>&copy; {currentYear} OSAAC. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#94a3b8] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#94a3b8] transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-[#94a3b8] transition-colors duration-200">
              Refund &amp; Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
