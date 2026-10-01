'use client';

import { Mail, Phone, MessageSquare } from 'lucide-react';
import ContactBox from '@/components/ContactBox';

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
      value: 'osaactech@gmail.com',
      href: 'mailto:osaactech@gmail.com',
      description: 'Send complete project specs and documentation.'
    }
  ];

  return (
    <div className="bg-[#0a0f1a] text-[#f1f5f9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3b82f6]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#f1f5f9]">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-lg mx-auto">
            Connect with OSAAC directly through our active channels or send a direct message below.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Left Column — Reach Us Directly (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
              Direct Channels
            </h2>
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-5 bg-[#111827] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-xl hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="p-3 bg-[#0a0f1a] rounded-lg text-[#3b82f6] border border-white/[0.08] group-hover:scale-105 transition-all shrink-0">
                    {contact.icon}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider block">
                      {contact.label}
                    </span>
                    <span className="text-base font-bold font-display text-[#f1f5f9] block group-hover:text-[#60a5fa] transition-colors break-all">
                      {contact.value}
                    </span>
                    <span className="text-xs text-[#94a3b8] block leading-relaxed">
                      {contact.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Animated Contact Box (3 cols) */}
          <div className="lg:col-span-3 w-full">
            <ContactBox />
          </div>
        </div>
      </div>
    </div>
  );
}
