'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Code, 
  Cpu, 
  Palette, 
  Smartphone 
} from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  tag: string;
  href: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    id: 'web-development',
    num: '01',
    title: 'Web Development',
    desc: 'Custom websites and digital platforms engineered for performance, security, responsiveness, and scalability.',
    tag: 'Core Engineering',
    href: '/services',
    icon: <Code className="w-4 h-4 text-[#3b82f6]" />,
    visual: (
      <div className="w-full h-36 sm:h-40 relative overflow-hidden rounded-lg border border-white/[0.08]">
        <Image
          src="/images/services/web-development.jpg"
          alt="Web Development — modern website interfaces and code engineering"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 88vw, 440px"
        />
      </div>
    )
  },
  {
    id: 'ai-automation',
    num: '02',
    title: 'AI Automation',
    desc: 'Intelligent workflow automation, lead processing, and business system integrations tailored to your operations.',
    tag: 'Workflow Intelligence',
    href: '/services',
    icon: <Cpu className="w-4 h-4 text-[#3b82f6]" />,
    visual: (
      <div className="w-full h-36 sm:h-40 relative overflow-hidden rounded-lg border border-white/[0.08]">
        <Image
          src="/images/services/ai-automation.jpg"
          alt="AI Automation — intelligent workflows and connected systems"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 88vw, 440px"
        />
      </div>
    )
  },
  {
    id: 'logo-brand-identity',
    num: '03',
    title: 'Logo & Brand Identity',
    desc: 'Memorable brand visuals, logo systems, typography kits, and complete identity packages that set you apart.',
    tag: 'Brand Architecture',
    href: '/services',
    icon: <Palette className="w-4 h-4 text-[#3b82f6]" />,
    visual: (
      <div className="w-full h-36 sm:h-40 relative overflow-hidden rounded-lg border border-white/[0.08]">
        <Image
          src="/images/services/brand-identity.jpg"
          alt="Logo & Brand Identity — visual identity and creative design"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 88vw, 440px"
        />
      </div>
    )
  },
  {
    id: 'mobile-app-development',
    num: '04',
    title: 'Mobile App Development',
    desc: 'We build modern, scalable mobile applications that deliver seamless experiences across iOS and Android.',
    tag: 'iOS & Android',
    href: '/services',
    icon: <Smartphone className="w-4 h-4 text-[#3b82f6]" />,
    visual: (
      <div className="w-full h-36 sm:h-40 relative overflow-hidden rounded-lg border border-white/[0.08]">
        <Image
          src="/images/services/mobile-development.jpg"
          alt="Mobile App Development — iOS and Android application design"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 88vw, 440px"
        />
      </div>
    )
  }
];

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = services.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  /**
   * Determine circular position offset relative to activeIndex (0 = active center, 1 = right, -1 = left, 2 = hidden)
   */
  const getCardOffset = (index: number) => {
    let diff = (index - activeIndex) % totalCards;
    if (diff < 0) diff += totalCards;
    if (diff === 3) diff = -1;
    return diff;
  };

  return (
    <div className="relative w-full select-none">
      {/* Carousel Viewport Container */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6">
        <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[490px] md:min-h-[510px]">
          
          {/* Left Arrow Button (Previous Service — Vertically Centered Beside Carousel) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Service"
            className="absolute left-1 sm:left-3 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#111827]/90 border border-white/[0.15] flex items-center justify-center text-[#94a3b8] hover:text-[#f1f5f9] hover:border-[#3b82f6]/70 hover:bg-[#1e293b] active:scale-90 transition-all duration-200 shadow-xl backdrop-blur-md cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
          </button>

          {/* Right Arrow Button (Next Service — Vertically Centered Beside Carousel) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Service"
            className="absolute right-1 sm:right-3 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#111827]/90 border border-white/[0.15] flex items-center justify-center text-[#94a3b8] hover:text-[#f1f5f9] hover:border-[#3b82f6]/70 hover:bg-[#1e293b] active:scale-90 transition-all duration-200 shadow-xl backdrop-blur-md cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
          </button>

          {services.map((service, index) => {
            const offset = getCardOffset(index);
            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = offset === 2;

            return (
              <motion.div
                key={service.id}
                className={`absolute top-0 w-[88%] max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[460px] ${
                  isActive ? 'pointer-events-auto cursor-default' : isHidden ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
                }`}
                animate={{
                  x: isActive 
                    ? '0%' 
                    : isLeft 
                    ? '-68%' 
                    : isRight 
                    ? '68%' 
                    : '0%',
                  scale: isActive 
                    ? 1 
                    : isLeft || isRight 
                    ? 0.88 
                    : 0.72,
                  opacity: isActive 
                    ? 1 
                    : isLeft || isRight 
                    ? 0.55 
                    : 0,
                  filter: isActive 
                    ? 'blur(0px)' 
                    : isLeft || isRight 
                    ? 'blur(1.5px)' 
                    : 'blur(6px)',
                  zIndex: isActive 
                    ? 30 
                    : isLeft || isRight 
                    ? 15 
                    : 5
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
              >
                <div
                  className={`group relative overflow-hidden rounded-2xl bg-[#111827] p-5 sm:p-7 flex flex-col justify-between space-y-4 sm:space-y-5 transition-colors duration-300 ${
                    isActive
                      ? 'border border-[#3b82f6]/50 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(59,130,246,0.18)]'
                      : 'border border-white/[0.08] shadow-[0_6px_25px_rgba(0,0,0,0.4)] hover:border-white/20'
                  }`}
                >
                  {/* Top Subtle Accent Line on Active Card */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent" />
                  )}

                  {/* Visual Presentation Element */}
                  <div className="w-full">
                    {service.visual}
                  </div>

                  {/* Text & Content Block */}
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-[#0a0f1a] rounded border border-white/[0.08]">
                          {service.icon}
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] bg-[#0a0f1a] px-2 py-0.5 rounded border border-white/[0.08]">
                          {service.tag}
                        </span>
                      </div>
                      <span className="text-xl sm:text-2xl font-bold font-display text-[#64748b] group-hover:text-[#3b82f6] transition-colors duration-300">
                        {service.num}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                    <Link
                      href={service.href}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#3b82f6] hover:text-[#60a5fa] transition-colors duration-300"
                      onClick={(e) => {
                        // Prevent link trigger if clicking a side card to focus it
                        if (!isActive) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#3b82f6] transition-transform group-hover:translate-x-1" />
                    </Link>

                    <span className="text-[10px] font-mono text-[#64748b]">
                      0{index + 1} / 0{totalCards}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
