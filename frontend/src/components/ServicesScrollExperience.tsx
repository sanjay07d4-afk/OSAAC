'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Palette, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface ServiceData {
  id: string;
  num: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  visual: React.ReactNode;
}

const servicesData: ServiceData[] = [
  {
    id: 'web-development',
    num: '01',
    title: 'Web Development',
    category: 'Core Engineering',
    tagline: 'High-performance web applications with modular architecture',
    description: 'We architect and build modern, responsive web systems designed around your business needs. Every platform is engineered with clean code, robust performance, and search-engine-ready technical standards.',
    features: [
      'Custom website development',
      'Responsive & mobile-first implementation',
      'High-performance frontend development',
      'Modern UI/UX implementation',
      'SEO-friendly technical foundation',
      'API & CMS integrations where required'
    ],
    icon: Code,
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-2xl border border-white/[0.08]">
        <Image
          src="/images/services/web-development.jpg"
          alt="Web Development — modern website interfaces and code engineering"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority
        />
      </div>
    )
  },
  {
    id: 'ai-automation',
    num: '02',
    title: 'AI Automation',
    category: 'Workflow Intelligence',
    tagline: 'Intelligent process workflows & automated business triggers',
    description: 'We construct intelligent automation pipelines that handle customer inquiries, process business data, and connect your everyday tools to eliminate manual repetitive overhead.',
    features: [
      'AI workflow automation',
      'Business process automation',
      'AI-powered assistants',
      'Intelligent data processing',
      'API & third-party integrations',
      'Automated repetitive workflows'
    ],
    icon: Cpu,
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-2xl border border-white/[0.08]">
        <Image
          src="/images/services/ai-automation.jpg"
          alt="AI Automation — intelligent workflows and connected systems"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      </div>
    )
  },
  {
    id: 'logo-brand-identity',
    num: '03',
    title: 'Logo & Brand Identity',
    category: 'Brand Architecture',
    tagline: 'Visual identity systems, logo geometry & typography tokens',
    description: 'We develop cohesive brand systems tailored for modern companies. From structured geometric logos to typographic kits and comprehensive brand tokens that establish your visual authority.',
    features: [
      'Logo design',
      'Visual identity systems',
      'Typography selection',
      'Color systems',
      'Brand guidelines',
      'Consistent digital brand language'
    ],
    icon: Palette,
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-2xl border border-white/[0.08]">
        <Image
          src="/images/services/brand-identity.jpg"
          alt="Logo & Brand Identity — visual identity and creative design"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      </div>
    )
  },
  {
    id: 'mobile-app-development',
    num: '04',
    title: 'Mobile App Development',
    category: 'Mobile Systems',
    tagline: 'Intuitive, scalable applications across iOS & Android ecosystems',
    description: 'We engineer modern mobile applications that deliver consistent, responsive user experiences across smartphones and tablets. Built with solid architecture, robust backend APIs, and touch-optimized interfaces.',
    features: [
      'Mobile application development',
      'Responsive app experiences',
      'Cross-platform development where appropriate',
      'API/backend integration',
      'Performance-focused implementation',
      'Production-ready app experiences'
    ],
    icon: Smartphone,
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-2xl border border-white/[0.08]">
        <Image
          src="/images/services/mobile-development.jpg"
          alt="Mobile App Development — iOS and Android application design"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      </div>
    )
  }
];

export default function ServicesScrollExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress Tracking across the tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Calculate active index from scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Divide scroll progress into 4 discrete buckets
      // 0.00 - 0.25 -> 0
      // 0.25 - 0.50 -> 1
      // 0.50 - 0.75 -> 2
      // 0.75 - 1.00 -> 3
      const numServices = servicesData.length;
      const index = Math.min(
        Math.floor(latest * numServices),
        numServices - 1
      );
      setActiveIndex((prev) => (prev !== index ? index : prev));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Click-to-scroll handler
  const handleTabClick = useCallback((index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;
    
    // Position within the scrollable track for the target index
    const targetScrollY = containerTop + (index / servicesData.length) * scrollableDistance + 10;
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }, []);

  const activeService = servicesData[activeIndex];

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[280vh] sm:min-h-[320vh] lg:min-h-[360vh]"
      aria-label="Interactive Services Showcase"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-20 sm:top-24 h-[calc(100vh-5.5rem)] sm:h-[calc(100vh-6.5rem)] flex flex-col justify-between py-4 sm:py-6 overflow-hidden">
        
        {/* Step Indicator / Sticky Navigation Header */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 shrink-0">
          <div 
            ref={tabsRef}
            className="flex items-center justify-between border-b border-white/[0.08] overflow-x-auto no-scrollbar scroll-smooth gap-3 sm:gap-6 pb-2"
            role="tablist"
            aria-label="Services Navigation"
          >
            {servicesData.map((svc, idx) => {
              const isActive = activeIndex === idx;
              const Icon = svc.icon;

              return (
                <button
                  key={svc.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${svc.id}`}
                  onClick={() => handleTabClick(idx)}
                  className={`relative flex items-center space-x-2 py-2 px-1 text-left transition-all duration-300 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded ${
                    isActive ? 'text-[#f1f5f9]' : 'text-[#64748b] hover:text-[#94a3b8]'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold transition-colors ${
                    isActive ? 'text-[#3b82f6]' : 'text-[#64748b] group-hover:text-[#94a3b8]'
                  }`}>
                    {svc.num}
                  </span>
                  <span className="text-xs sm:text-sm font-display font-semibold tracking-tight whitespace-nowrap">
                    {svc.title}
                  </span>

                  {/* Active Sliding Glowing Blue Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTabIndicator"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                      className="absolute bottom-[-9px] left-0 right-0 h-[2.5px] bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.8)] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content & Visual Panel Grid */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-h-0">
          
          {/* Left Column: Service Details */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id + '-content'}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#60a5fa] rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  <span>{activeService.num} / {activeService.category}</span>
                </div>

                {/* Service Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-[#f1f5f9] leading-tight">
                  {activeService.title}
                </h2>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-[#3b82f6] font-medium font-mono">
                  {activeService.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {activeService.description}
                </p>

                {/* Features Checklist */}
                <div className="pt-2 border-t border-white/[0.08]">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cbd5e1]">
                    {activeService.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3b82f6] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Panel */}
          <div className="lg:col-span-7 h-[280px] sm:h-[360px] lg:h-[420px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id + '-visual'}
                id={`service-panel-${activeService.id}`}
                role="tabpanel"
                aria-label={activeService.title}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                {activeService.visual}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Progress Bar Track */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 shrink-0">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b] mb-1.5">
            <span>Scroll Progression</span>
            <span>0{activeIndex + 1} / 04</span>
          </div>
          <div className="w-full h-1 bg-[#111827] border border-white/[0.04] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]"
              initial={false}
              animate={{ width: `${((activeIndex + 1) / 4) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
