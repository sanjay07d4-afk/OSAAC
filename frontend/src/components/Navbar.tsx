'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import StartProjectButton from '@/components/StartProjectButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0f1a]/85 backdrop-blur-md border-b border-white/[0.08] shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] sm:h-[76px]">
          {/* Official OSAAC Logo — Constrained Container & Proportions */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center group py-2">
              <Image
                src="/logo.png"
                alt="OSAAC"
                width={170}
                height={52}
                priority
                className="h-[38px] sm:h-[46px] md:h-[50px] w-auto max-h-[52px] object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-semibold uppercase tracking-widest transition-colors duration-200 py-2 ${
                    active ? 'text-[#3b82f6] font-bold' : 'text-[#94a3b8] hover:text-[#60a5fa]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3b82f6] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <StartProjectButton
              href="/start-project"
              className="px-5 py-2 text-xs"
            >
              Start Project
            </StartProjectButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-[#3b82f6] hover:text-[#f1f5f9] focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0f1a] border-b border-white/[0.08] animate-fade-in shadow-xl" id="mobile-menu">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 ${
                    active ? 'text-[#3b82f6] bg-[#111827] font-bold border-l-2 border-[#3b82f6]' : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#111827]/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4">
              <StartProjectButton
                href="/start-project"
                onClick={() => setIsOpen(false)}
                fullWidth
                className="py-3 text-xs"
              >
                Start Project
              </StartProjectButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
