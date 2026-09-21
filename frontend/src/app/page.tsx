'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Code, Cpu, Palette, Smartphone, Terminal, CheckCircle2, Sparkles } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import InteractiveNeuralNetwork from '@/components/InteractiveNeuralNetwork';
import StartProjectButton from '@/components/StartProjectButton';

export default function Home() {
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

  const services = [
    {
      num: '01',
      title: 'Web Development',
      desc: 'Custom websites and digital platforms engineered for performance, security, responsiveness, and scalability.',
      tag: 'Core Engineering',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-[#111827] to-[#0a0f1a] border border-white/[0.08] rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-[#3b82f6]/50 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/30" />
            </div>
            <span className="text-[10px] font-mono text-[#60a5fa]/70 tracking-wider">osaac.tech/app.tsx</span>
          </div>
          <div className="font-mono text-[11px] text-[#94a3b8] space-y-1 py-1">
            <p className="text-[#60a5fa]"><span className="text-[#64748b]">const</span> system = <span className="text-[#3b82f6]">createPlatform</span>({'{'}</p>
            <p className="pl-3 text-[#94a3b8]">performance: <span className="text-[#60a5fa]">'100/100'</span>,</p>
            <p className="pl-3 text-[#94a3b8]">responsive: <span className="text-[#60a5fa]">true</span></p>
            <p className="text-[#60a5fa]">{'}'});</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] text-[#60a5fa]/80 font-mono">
            <span className="flex items-center gap-1"><Code className="w-3 h-3 text-[#3b82f6]" /> Next.js / TypeScript</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Production Ready</span>
          </div>
        </div>
      )
    },
    {
      num: '02',
      title: 'AI Automation',
      desc: 'Intelligent workflow automation, lead processing, and business system integrations tailored to your operations.',
      tag: 'Workflow Intelligence',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-[#111827] to-[#0a0f1a] border border-white/[0.08] rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-[#3b82f6]/50 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span className="text-[10px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider">AI Pipeline</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#3b82f6]/10 text-[#60a5fa] border border-[#3b82f6]/20">Automated</span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-2 text-center">
            <div className="bg-[#0a0f1a]/90 p-2 rounded border border-white/[0.06] text-[10px]">
              <span className="text-[#64748b] block text-[8px] uppercase">Input</span>
              <span className="text-[#60a5fa] font-mono font-bold">New Lead</span>
            </div>
            <div className="bg-[#0a0f1a]/90 p-2 rounded border border-[#3b82f6]/30 text-[10px] relative">
              <span className="text-[#3b82f6] block text-[8px] uppercase font-bold">Process</span>
              <span className="text-[#f1f5f9] font-mono font-bold">AI Filter</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#3b82f6] rounded-full animate-ping" />
            </div>
            <div className="bg-[#0a0f1a]/90 p-2 rounded border border-white/[0.06] text-[10px]">
              <span className="text-[#64748b] block text-[8px] uppercase">Output</span>
              <span className="text-[#60a5fa] font-mono font-bold">WhatsApp</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] text-[#94a3b8] font-mono">
            <span>Latency: &lt;150ms</span>
            <span className="text-[#3b82f6] flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#3b82f6]" /> 24/7 Active</span>
          </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'Logo & Brand Identity',
      desc: 'Memorable brand visuals, logo systems, typography kits, and complete identity packages that set you apart.',
      tag: 'Brand Architecture',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-[#111827] to-[#0a0f1a] border border-white/[0.08] rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-[#3b82f6]/50 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span className="text-[10px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider">Identity Kit</span>
            </div>
            <span className="text-[9px] text-[#64748b] font-mono">Vector / Tokens</span>
          </div>
          <div className="flex items-center justify-around py-2">
            <div className="space-y-1 text-center">
              <div className="w-12 h-10 border border-[#3b82f6]/40 rounded flex items-center justify-center bg-[#0a0f1a] text-[#3b82f6] font-display font-bold text-lg">
                O
              </div>
              <span className="text-[8px] text-[#94a3b8] font-mono uppercase">Monogram</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-[#0a0f1a] border border-white/10" title="OSAAC Base" />
                <div className="w-4 h-4 rounded bg-[#3b82f6]" title="Primary Blue" />
                <div className="w-4 h-4 rounded bg-[#60a5fa]" title="Light Blue" />
                <div className="w-4 h-4 rounded bg-[#111827]" title="Secondary BG" />
              </div>
              <span className="text-[8px] text-[#94a3b8] font-mono block text-center">Color Palette</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] text-[#60a5fa]/80 font-mono">
            <span>Outfit / Inter System</span>
            <span>Scalable SVGs</span>
          </div>
        </div>
      )
    },
    {
      num: '04',
      title: 'Mobile App Development',
      desc: 'We build modern, scalable mobile applications that deliver seamless experiences across iOS and Android.',
      tag: 'iOS & Android',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-[#111827] to-[#0a0f1a] border border-white/[0.08] rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-[#3b82f6]/50 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center space-x-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span className="text-[10px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider">Mobile App OS</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">● Cross-Platform</span>
          </div>
          <div className="grid grid-cols-2 gap-2 py-1">
            <div className="bg-[#0a0f1a]/90 p-2 rounded border border-white/[0.06] space-y-0.5">
              <span className="text-[8px] text-[#64748b] block uppercase">Platform Target</span>
              <span className="text-sm font-bold font-mono text-[#3b82f6]">iOS &amp; Android</span>
            </div>
            <div className="bg-[#0a0f1a]/90 p-2 rounded border border-white/[0.06] space-y-0.5">
              <span className="text-[8px] text-[#64748b] block uppercase">Performance</span>
              <span className="text-sm font-bold font-mono text-[#3b82f6]">60 FPS Fluid</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] text-[#94a3b8] font-mono">
            <span>React Native / Flutter</span>
            <span className="text-[#3b82f6]">App Store Ready</span>
          </div>
        </div>
      )
    }
  ];

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
        <InteractiveNeuralNetwork />
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
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-display leading-[1.1] tracking-tight text-[#f1f5f9]"
          >
            OSAAC
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-lg sm:text-xl font-light text-[#60a5fa] tracking-wide max-w-3xl mx-auto"
          >
            Modern Websites. Intelligent Automation. Distinct Brand Identities.
          </motion.p>

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
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#f1f5f9] bg-[#111827] border border-white/10 rounded-sm transition-all duration-300 hover:bg-slate-800 hover:border-white/20"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section — Visual-First Editorial Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.num}
              href="/services"
              className="group relative overflow-hidden p-6 sm:p-8 bg-[#111827] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-xl transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between space-y-6"
            >
              {/* Visual Presentation Element */}
              <div className="w-full">
                {service.visual}
              </div>

              {/* Text & Content Block */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] bg-[#0a0f1a] px-2.5 py-1 rounded border border-white/[0.08]">
                    {service.tag}
                  </span>
                  <span className="text-2xl font-bold font-display text-[#64748b] group-hover:text-[#3b82f6] transition-colors duration-300">
                    {service.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3b82f6] group-hover:text-[#60a5fa] transition-colors duration-300">
                  Explore Service
                </span>
                <ArrowRight className="h-4 w-4 text-[#3b82f6] transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>
          ))}
        </div>
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
              { numericValue: 10, suffix: '+', label: 'Projects Delivered' },
              { numericValue: 5, suffix: '+', label: 'Business Solutions' },
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
