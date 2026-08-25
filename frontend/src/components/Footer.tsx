import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-700 pt-16 pb-10">
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
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Digital solutions, modern websites, automation, and custom technology built around real business requirements.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div className="space-y-4">
            <h4 className="text-[#0099DD] font-display text-xs font-bold uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  AI Automation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  Logo &amp; Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  Digital Products
                </Link>
              </li>
              <li>
                <span className="text-slate-400 text-xs inline-block">
                  Mobile App Development — Coming Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="space-y-4">
            <h4 className="text-[#0099DD] font-display text-xs font-bold uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/start-project" className="text-[#0099DD] font-semibold hover:text-[#0080FF] transition-colors duration-200">
                  Start Your Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-[#0099DD] font-display text-xs font-bold uppercase tracking-widest">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-slate-100 rounded text-[#0099DD] border border-slate-200 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+917603881020" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  +91 7603881020
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-slate-100 rounded text-[#0099DD] border border-slate-200 shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <a href="https://wa.me/917603881020" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-slate-100 rounded text-[#0099DD] border border-slate-200 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:OSAAC@gmail.com" className="text-slate-600 hover:text-[#0099DD] transition-colors duration-200 break-all">
                  OSAAC@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-500">
          <p>&copy; {currentYear} OSAAC. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#0099DD] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#0099DD] transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-[#0099DD] transition-colors duration-200">
              Refund &amp; Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
