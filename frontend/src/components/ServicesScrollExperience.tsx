'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Palette, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Sparkles,
  Workflow,
  Zap,
  ShieldCheck,
  Layout,
  Terminal,
  Type,
  Maximize2
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
      <div className="w-full h-full bg-[#0a0f1a] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        {/* Subtle background ambient radial */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* IDE Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/20" />
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#111827] border border-white/[0.06] text-[11px] font-mono text-[#60a5fa]">
            <Terminal className="w-3 h-3 text-[#3b82f6]" />
            <span>osaac.tech / web / App.tsx</span>
          </div>
          <div className="text-[10px] font-mono text-[#64748b] hidden sm:block">TypeScript</div>
        </div>

        {/* Code Visual Workspace */}
        <div className="my-4 font-mono text-[11px] sm:text-xs leading-relaxed text-[#94a3b8] bg-[#111827]/70 p-4 rounded-xl border border-white/[0.06] space-y-1.5 overflow-x-auto">
          <div className="text-[#64748b] flex items-center gap-1.5 pb-1 border-b border-white/[0.04]">
            <span className="text-[#3b82f6]">1</span>
            <span>// Production-ready web engineering</span>
          </div>
          <div><span className="text-[#3b82f6]">2</span>  <span className="text-[#60a5fa]">import</span> {'{'} WebSystem, UI, API {'}'} <span className="text-[#60a5fa]">from</span> <span className="text-[#93c5fd]">&apos;@osaac/core&apos;</span>;</div>
          <div><span className="text-[#3b82f6]">3</span></div>
          <div><span className="text-[#3b82f6]">4</span>  <span className="text-[#60a5fa]">export default function</span> <span className="text-[#f1f5f9] font-semibold">ProductionApp</span>() {'{'}</div>
          <div className="pl-4"><span className="text-[#3b82f6]">5</span>    <span className="text-[#60a5fa]">return</span> (</div>
          <div className="pl-8 text-[#93c5fd]"><span className="text-[#3b82f6]">6</span>      &lt;<span className="text-[#60a5fa]">WebSystem</span> <span className="text-[#cbd5e1]">architecture</span>=<span className="text-[#93c5fd]">&quot;modular&quot;</span> <span className="text-[#cbd5e1]">responsive</span>=<span className="text-[#60a5fa]">&#123;true&#125;</span>&gt;</div>
          <div className="pl-12 text-[#93c5fd]"><span className="text-[#3b82f6]">7</span>        &lt;<span className="text-[#60a5fa]">UI.ResponsiveLayout</span> /&gt;</div>
          <div className="pl-12 text-[#93c5fd]"><span className="text-[#3b82f6]">8</span>        &lt;<span className="text-[#60a5fa]">API.SecureEndpoints</span> /&gt;</div>
          <div className="pl-8 text-[#93c5fd]"><span className="text-[#3b82f6]">9</span>      &lt;/<span className="text-[#60a5fa]">WebSystem</span>&gt;</div>
          <div className="pl-4"><span className="text-[#3b82f6]">10</span>   );</div>
          <div><span className="text-[#3b82f6]">11</span> {'}'}</div>
        </div>

        {/* Footer Meta Chips */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08] text-[10px] sm:text-[11px] font-mono shrink-0">
          <div className="flex items-center space-x-2 text-[#94a3b8]">
            <Layers className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Next.js / React / TypeScript</span>
          </div>
          <div className="flex items-center justify-end space-x-1.5 text-[#60a5fa]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Modular Component Tree</span>
          </div>
        </div>
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
      <div className="w-full h-full bg-[#0a0f1a] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
            <span className="text-xs font-mono font-bold text-[#f1f5f9] uppercase tracking-wider">AI Workflow Pipeline</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#3b82f6]/10 text-[#60a5fa] border border-[#3b82f6]/30 text-[10px] font-mono">
            Active Engine
          </span>
        </div>

        {/* Multi-Node Visual Pipeline */}
        <div className="my-4 space-y-3.5">
          {/* Node 1 */}
          <div className="p-3.5 bg-[#111827] border border-white/[0.08] rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-[#0a0f1a] border border-white/[0.1] flex items-center justify-center text-[#60a5fa]">
                <Zap className="w-3.5 h-3.5 text-[#3b82f6]" />
              </div>
              <div>
                <div className="text-xs font-bold font-display text-[#f1f5f9]">Input Trigger</div>
                <div className="text-[10px] text-[#94a3b8] font-mono">Inbound Lead &bull; Webhook &bull; Form Event</div>
              </div>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Received</span>
          </div>

          {/* Connector 1 */}
          <div className="flex items-center justify-center -my-1">
            <div className="w-[1.5px] h-3 bg-gradient-to-b from-[#3b82f6] to-[#60a5fa]" />
          </div>

          {/* Node 2 - AI Processing */}
          <div className="p-3.5 bg-[#111827] border border-[#3b82f6]/40 rounded-xl flex items-center justify-between relative shadow-lg shadow-blue-500/5">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-[#3b82f6]/20 border border-[#3b82f6]/50 flex items-center justify-center text-[#60a5fa]">
                <Cpu className="w-3.5 h-3.5 text-[#60a5fa] animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold font-display text-[#f1f5f9] flex items-center gap-1.5">
                  <span>AI Logic &amp; Routing Engine</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-ping" />
                </div>
                <div className="text-[10px] text-[#60a5fa] font-mono">Classification &bull; Data Extraction &bull; Intent</div>
              </div>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#3b82f6]/20 text-[#93c5fd] border border-[#3b82f6]/30">Processing</span>
          </div>

          {/* Connector 2 */}
          <div className="flex items-center justify-center -my-1">
            <div className="w-[1.5px] h-3 bg-gradient-to-b from-[#60a5fa] to-[#3b82f6]" />
          </div>

          {/* Node 3 */}
          <div className="p-3.5 bg-[#111827] border border-white/[0.08] rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-[#0a0f1a] border border-white/[0.1] flex items-center justify-center text-[#60a5fa]">
                <Workflow className="w-3.5 h-3.5 text-[#3b82f6]" />
              </div>
              <div>
                <div className="text-xs font-bold font-display text-[#f1f5f9]">Action Dispatch</div>
                <div className="text-[10px] text-[#94a3b8] font-mono">WhatsApp API &bull; CRM Sync &bull; Notification</div>
              </div>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Executed</span>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-[#94a3b8] shrink-0">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>End-to-End Encrypted Webhooks</span>
          </span>
          <span className="text-[#60a5fa]">Autonomous 24/7</span>
        </div>
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
      <div className="w-full h-full bg-[#0a0f1a] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 shrink-0">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-xs font-mono font-bold text-[#f1f5f9] uppercase tracking-wider">Brand Design Studio</span>
          </div>
          <span className="text-[10px] font-mono text-[#64748b]">Vector / Tokens</span>
        </div>

        {/* Interactive Identity Specimen Grid */}
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Geometric Monogram Construction Grid */}
          <div className="p-4 bg-[#111827] border border-white/[0.08] rounded-xl flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />
            <div className="w-16 h-16 rounded-xl border border-[#3b82f6]/60 flex items-center justify-center bg-[#0a0f1a] relative shadow-inner shadow-blue-500/10">
              <div className="absolute inset-1.5 border border-dashed border-[#60a5fa]/30 rounded-lg" />
              <div className="text-3xl font-display font-bold text-[#3b82f6] tracking-tighter">O</div>
            </div>
            <div className="text-[10px] font-mono text-[#60a5fa] font-semibold tracking-wider uppercase">
              Geometric Grid Matrix
            </div>
          </div>

          {/* Typography Tokens Specimen */}
          <div className="p-4 bg-[#111827] border border-white/[0.08] rounded-xl flex flex-col justify-between space-y-2">
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider flex items-center gap-1">
              <Type className="w-3 h-3 text-[#3b82f6]" />
              <span>Typography Hierarchy</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold font-display text-[#f1f5f9]">Monic Display</div>
              <div className="text-xs font-medium text-[#94a3b8]">Outfit SemiBold</div>
              <div className="text-[11px] font-mono text-[#60a5fa]">Inter Regular 400</div>
            </div>
            <div className="text-[9px] font-mono text-[#64748b] border-t border-white/[0.04] pt-1">
              Proportion Tokens: 1.25 Modular
            </div>
          </div>
        </div>

        {/* Color Palette Tokens Strip */}
        <div className="pt-2 border-t border-white/[0.08] shrink-0">
          <div className="text-[10px] font-mono text-[#64748b] mb-1.5 uppercase tracking-wider">Brand Palette Tokens</div>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex items-center space-x-1.5 p-1.5 bg-[#111827] rounded-lg border border-white/[0.06]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#3b82f6] shrink-0 shadow-sm shadow-blue-500/30" />
              <span className="text-[9px] font-mono text-[#cbd5e1] truncate">#3B82F6</span>
            </div>
            <div className="flex items-center space-x-1.5 p-1.5 bg-[#111827] rounded-lg border border-white/[0.06]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#60a5fa] shrink-0" />
              <span className="text-[9px] font-mono text-[#cbd5e1] truncate">#60A5FA</span>
            </div>
            <div className="flex items-center space-x-1.5 p-1.5 bg-[#111827] rounded-lg border border-white/[0.06]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#111827] border border-white/20 shrink-0" />
              <span className="text-[9px] font-mono text-[#cbd5e1] truncate">#111827</span>
            </div>
            <div className="flex items-center space-x-1.5 p-1.5 bg-[#111827] rounded-lg border border-white/[0.06]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#0a0f1a] border border-white/20 shrink-0" />
              <span className="text-[9px] font-mono text-[#cbd5e1] truncate">#0A0F1A</span>
            </div>
          </div>
        </div>
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
      <div className="w-full h-full bg-[#0a0f1a] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 shrink-0">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-xs font-mono font-bold text-[#f1f5f9] uppercase tracking-wider">Mobile App Preview</span>
          </div>
          <span className="text-[10px] font-mono text-[#60a5fa] bg-[#3b82f6]/10 px-2 py-0.5 rounded border border-[#3b82f6]/30">
            iOS &amp; Android
          </span>
        </div>

        {/* Smartphone UI Mockup */}
        <div className="my-3 flex items-center justify-center">
          <div className="w-64 max-w-full bg-[#111827] border-2 border-white/[0.12] rounded-3xl p-3 shadow-2xl space-y-2.5 relative">
            {/* Notch / Dynamic Island */}
            <div className="w-16 h-3.5 bg-[#0a0f1a] rounded-full mx-auto border border-white/[0.06] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#3b82f6]/60" />
            </div>

            {/* App Header Inside Phone */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold font-display text-[#f1f5f9]">OSAAC Mobile</span>
              <span className="text-[8px] font-mono text-[#3b82f6] px-1.5 py-0.5 rounded bg-[#3b82f6]/10">v2.4</span>
            </div>

            {/* App Body Cards */}
            <div className="space-y-1.5">
              <div className="p-2.5 bg-[#0a0f1a] border border-[#3b82f6]/30 rounded-xl space-y-1 relative">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-[#f1f5f9]">Active Workflow</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[9px] text-[#94a3b8]">Live system sync active</div>
              </div>
              <div className="p-2 bg-[#0a0f1a] border border-white/[0.06] rounded-xl flex items-center justify-between text-[10px] text-[#94a3b8]">
                <span>Cloud API Sync</span>
                <span className="text-[#60a5fa] font-mono text-[9px]">Connected</span>
              </div>
            </div>

            {/* Touch Point Ripple Indicator */}
            <div className="h-6 flex items-center justify-center pt-1">
              <div className="w-20 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Footer Meta Chips */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-[#94a3b8] shrink-0">
          <span className="flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Fluid Touch UI / UX</span>
          </span>
          <span className="text-[#60a5fa]">Cross-Platform Native</span>
        </div>
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
