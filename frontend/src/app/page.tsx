'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import KineticGrid from '@/components/KineticGrid';
import StartProjectButton from '@/components/StartProjectButton';
import ViewOurWorkButton from '@/components/ViewOurWorkButton';
import ServiceCarousel from '@/components/ServiceCarousel';

const rotatingWords = [
  'Modern Websites, Intelligent Automation, & Distinct Brand Identities.'
];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'We understand your business goals, requirements, and project vision in-depth to align on the perfect solution.'
    },
    {
      num: '02',
      title: 'Plan & Design',
      desc: 'Creating target project strategy, architectural structure, and clean, customized UI/UX design directions.'
    },
    {
      num: '03',
      title: 'Develop & Test',
      desc: 'Building with premium tech stack, integrating required features, and performing responsive testing and speed optimization.'
    },
    {
      num: '04',
      title: 'Launch & Support',
      desc: 'Deploying the project live, offering one included free minor update, and continuing paid maintenance as requested.'
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0f1a] text-[#f1f5f9]">
      
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] overflow-hidden">
        {/* Neural Network Canvas Background */}
        <KineticGrid />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(59,130,246,0.08),_rgba(37,99,235,0.04),_transparent_80%)] pointer-events-none z-[1]" />
        
        <motion.div
          className="max-w-5xl mx-auto text-center z-10 space-y-7"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#111827]/80 border border-[#3b82f6]/30 text-[#60a5fa] rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm shadow-blue-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-ping mr-1" />
            <span>Digital Solutions. Real Transformation.</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight sm:tracking-[-0.03em] leading-[1.05] text-[#f1f5f9]"
          >
            OSAAC
          </motion.h1>

          <motion.div 
            variants={itemVariants} 
            className="min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={shouldReduceMotion ? { opacity: 0 } : { y: 16, opacity: 0, filter: 'blur(4px)' }}
                animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: -16, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-xl md:text-2xl font-light font-[300] text-[#60a5fa] tracking-wide inline-block text-center leading-relaxed"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p 
            variants={itemVariants} 
            className="text-sm sm:text-base text-[#94a3b8] max-w-2xl mx-auto leading-relaxed"
          >
            We engineer high-performance web systems, custom automation workflows, and tailored digital solutions 
            built specifically around real business requirements.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <StartProjectButton
              href="/start-project"
              className="w-full sm:w-auto px-8 py-3.5 text-xs"
            >
              Start Project
            </StartProjectButton>
            <ViewOurWorkButton
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-3.5 text-xs"
            >
              View Our Work
            </ViewOurWorkButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section — Interactive 3D Service Cards Carousel */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3b82f6]">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#f1f5f9]">
            Our Services
          </h2>
          <p className="text-sm text-[#94a3b8] leading-relaxed">
            From custom web systems to intelligent process automation — engineered for impact.
          </p>
        </div>

        {/* Carousel Component */}
        <ServiceCarousel />
      </section>

      {/* Company Stats / Trust Metrics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]" aria-label="Company Trust Metrics">
        <motion.div 
          className="bg-[#111827] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { numericValue: 4, suffix: '+', label: 'Core Services' },
              { numericValue: 360, suffix: '°', label: 'Digital Solutions' },
              { numericValue: 100, suffix: '%', label: 'Client Focused' },
              { numericValue: 24, suffix: '/7', label: 'Communication Support' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 md:p-10 text-center flex flex-col justify-center items-center border-white/[0.08] ${
                  idx % 2 === 0 ? 'border-r lg:border-r-0' : ''
                } ${idx < 2 ? 'border-b lg:border-b-0' : ''} ${
                  idx > 0 ? 'lg:border-l' : ''
                }`}
              >
                <AnimatedCounter
                  numericValue={stat.numericValue}
                  suffix={stat.suffix}
                  duration={1800}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#f1f5f9] tracking-tight"
                />
                <span className="text-xs sm:text-sm font-mono font-medium text-[#94a3b8] uppercase tracking-wider mt-2.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3b82f6]">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#f1f5f9]">
            Our Process
          </h2>
          <p className="text-sm text-[#94a3b8] leading-relaxed">
            A continuous, transparent progression from concept discovery to live deployment.
          </p>
        </div>

        {/* Desktop Process */}
        <div className="hidden lg:block relative pb-4">
          <svg
            className="absolute top-[88px] left-0 w-full h-32 pointer-events-none z-0"
            viewBox="0 0 1200 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 150 60 C 275 60, 325 15, 450 15 C 575 15, 625 105, 750 105 C 875 105, 925 60, 1050 60"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeOpacity="0.25"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 150 60 C 275 60, 325 15, 450 15 C 575 15, 625 105, 750 105 C 875 105, 925 60, 1050 60"
              stroke="url(#processGradientFlow)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              className="animate-flow-dash"
              fill="none"
            />
            <defs>
              <linearGradient id="processGradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="33%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* 4 Connected Process Cards */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="relative p-6 sm:p-7 bg-[#111827] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-xl space-y-4 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Node Top Indicator */}
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-[#3b82f6] ring-4 ring-blue-500/20 flex items-center justify-center text-[8px] font-bold text-white" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
                      Stage {step.num}
                    </span>
                  </div>
                  <span className="text-2xl font-bold font-display text-[#64748b]">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-[#f1f5f9]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono text-[#3b82f6] uppercase">
                  {idx < steps.length - 1 ? `Proceeds to 0${idx + 2} →` : 'Production Ready ✔'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Process — Continuous Vertical Flowing Path */}
        <div className="lg:hidden relative">
          {/* Vertical Flowing Track */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500/60 via-blue-500/30 to-blue-500/60 z-0" />
          
          <div className="space-y-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.num} className="flex gap-5">
                {/* Step Connector Node */}
                <div className="flex flex-col items-center shrink-0 pt-5">
                  <div className="w-4 h-4 rounded-full bg-[#3b82f6] border-2 border-[#0a0f1a] ring-4 ring-blue-500/20 shadow-md shadow-blue-500/30 flex items-center justify-center text-[7px] font-bold text-white">
                    {idx + 1}
                  </div>
                </div>
                {/* Card */}
                <div className="flex-1 p-5 bg-[#111827] border border-white/[0.08] rounded-xl space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#60a5fa] block">
                    Stage {step.num}
                  </span>
                  <h3 className="text-lg font-bold font-display text-[#f1f5f9]">{step.title}</h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 bg-[#111827] border-t border-white/[0.08] text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#f1f5f9]">
            Ready to Build Your Project?
          </h2>
          <p className="text-sm text-[#94a3b8] max-w-xl mx-auto leading-relaxed">
            Partner with us to build elegant, high-performing websites and custom automation.
            Get a tailored quotation based on your specific requirements.
          </p>
          <div className="pt-4">
            <StartProjectButton
              href="/start-project"
              className="px-8 py-3.5 text-xs"
            >
              Start Project
            </StartProjectButton>
          </div>
        </div>
      </section>
    </div>
  );
}
