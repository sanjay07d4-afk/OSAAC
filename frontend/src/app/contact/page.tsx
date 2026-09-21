'use client';

import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import StartProjectButton from '@/components/StartProjectButton';

export default function Contact() {
  const contacts = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'PHONE',
      value: '+91 7603881020',
      href: 'tel:+917603881020',
      description: 'Direct line for project discussions and inquiries.'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'WHATSAPP',
      value: '+91 7603881020',
      href: 'https://wa.me/917603881020',
      external: true,
      description: 'Quick messaging and real-time requirement sharing.'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'EMAIL',
      value: 'OSAAC@gmail.com',
      href: 'mailto:OSAAC@gmail.com',
      description: 'Send complete project specs and documentation.'
    }
  ];

  return (
    <div className="bg-[#0a0f1a] text-[#f1f5f9] py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3b82f6]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#f1f5f9]">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-lg mx-auto">
            Connect with OSAAC directly through our active channels or initiate a project enquiry.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
          {/* Left Column — Reach Us Directly */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
              Reach Us Directly
            </h2>
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-5 sm:p-6 bg-[#111827] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-xl hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="p-3 bg-[#0a0f1a] rounded-lg text-[#3b82f6] border border-white/[0.08] group-hover:scale-105 transition-all shrink-0">
                    {contact.icon}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider block">
                      {contact.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-display text-[#f1f5f9] block group-hover:text-[#60a5fa] transition-colors break-all">
                      {contact.value}
                    </span>
                    <span className="text-xs text-[#94a3b8] block">
                      {contact.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Start Project Card */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="p-7 sm:p-9 bg-[#111827] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-xl space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] block">
                  Project Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
                  Have a Project in Mind?
                </h2>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  Submit details about your website development, AI automation, or brand identity requirements through our dedicated form for a tailored quotation.
                </p>
              </div>

              <div className="pt-6">
                <StartProjectButton
                  href="/start-project"
                  fullWidth
                  className="py-3.5 text-xs"
                >
                  Start Project
                </StartProjectButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
