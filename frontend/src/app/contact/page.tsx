'use client';

import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
    <div className="bg-obsidian text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#005BFF]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#0B0F19]">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            Connect with OSAAC directly through our active channels or initiate a project enquiry.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
          {/* Left Column — Reach Us Directly */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#005BFF]">
              Reach Us Directly
            </h2>
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-5 sm:p-6 bg-[#F1F5F9] border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.04)] rounded-xl hover:border-slate-300 transition-all duration-300 group"
                >
                  <div className="p-3 bg-white rounded-lg text-[#005BFF] border border-slate-200 group-hover:scale-105 transition-all shrink-0">
                    {contact.icon}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      {contact.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-display text-[#0B0F19] block group-hover:text-[#005BFF] transition-colors break-all">
                      {contact.value}
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {contact.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Start Project Card */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="p-7 sm:p-9 bg-[#F1F5F9] border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.04)] rounded-xl space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005BFF] block">
                  Project Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B0F19]">
                  Have a Project in Mind?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Submit details about your website development, AI automation, or brand identity requirements through our dedicated form for a tailored quotation.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/start-project"
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 border border-[#00E5FF] text-xs font-bold uppercase tracking-widest text-slate-950 bg-[#00E5FF] rounded-sm hover:bg-[#005BFF] hover:text-white transition-all duration-300 shadow-sm"
                >
                  START YOUR PROJECT
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
