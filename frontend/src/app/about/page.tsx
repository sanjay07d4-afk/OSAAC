'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Palette,
  Smartphone,
  Layers,
  Network,
  Workflow,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Target,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Terminal,
  Server,
  UserCheck,
  TrendingUp,
  Boxes,
  Users
} from 'lucide-react';
import StartProjectButton from '@/components/StartProjectButton';

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'client'>('all');

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // Team Data
  const teamMembers = [
    {
      id: 'sanjay',
      num: '01',
      name: 'Sanjay',
      role: 'Technical Team',
      group: 'technical',
      groupLabel: 'Technical & Delivery',
      initials: 'SJ',
      bio: 'Focuses on the technical development and engineering side of OSAAC.',
      accent: 'from-blue-500/20 via-sky-500/10 to-transparent',
      borderAccent: 'group-hover:border-sky-500/40'
    },
    {
      id: 'hems',
      num: '02',
      name: 'Hems',
      role: 'Technical Team',
      group: 'technical',
      groupLabel: 'Technical & Delivery',
      initials: 'HM',
      bio: 'Works alongside Sanjay on the technical and development side, helping turn ideas and requirements into digital solutions.',
      accent: 'from-blue-500/20 via-sky-500/10 to-transparent',
      borderAccent: 'group-hover:border-sky-500/40'
    },
    {
      id: 'simon',
      num: '03',
      name: 'Simon',
      role: 'Client Development',
      group: 'client',
      groupLabel: 'Client Development & Outreach',
      initials: 'SM',
      bio: 'Focuses on identifying potential clients, approaching businesses, and developing client relationships.',
      accent: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderAccent: 'group-hover:border-cyan-500/40'
    },
    {
      id: 'rafeeq',
      num: '04',
      name: 'Rafeeq',
      role: 'Client Development',
      group: 'client',
      groupLabel: 'Client Development & Outreach',
      initials: 'RF',
      bio: 'Focuses on finding potential opportunities, approaching prospective clients, and building business relationships.',
      accent: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderAccent: 'group-hover:border-cyan-500/40'
    },
    {
      id: 'peri',
      num: '05',
      name: 'Peri',
      role: 'Client Development',
      group: 'client',
      groupLabel: 'Client Development & Outreach',
      initials: 'PR',
      bio: 'Focuses on identifying prospective clients, outreach, and developing new business opportunities.',
      accent: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderAccent: 'group-hover:border-cyan-500/40'
    }
  ];

  // Core Strengths
  const coreStrengths = [
    {
      num: '01',
      title: 'Modern Web Experiences',
      description: 'High-quality websites designed for performance, usability, and impact.',
      icon: Code2,
      accent: 'text-sky-400'
    },
    {
      num: '02',
      title: 'Intelligent Automation',
      description: 'AI-powered workflows that reduce repetitive work and improve efficiency.',
      icon: Cpu,
      accent: 'text-cyan-400'
    },
    {
      num: '03',
      title: 'Brand Identity',
      description: 'Distinctive visual systems that create a recognizable and consistent brand.',
      icon: Palette,
      accent: 'text-blue-400'
    },
    {
      num: '04',
      title: 'Digital Product Development',
      description: 'Mobile and web applications designed around real user needs.',
      icon: Smartphone,
      accent: 'text-indigo-400'
    }
  ];

  // Capabilities
  const capabilities = [
    {
      num: '01',
      name: 'Web Development',
      description: 'High-performance web applications, portals, and corporate digital platforms.',
      tag: 'Frontend & Full-Stack'
    },
    {
      num: '02',
      name: 'AI Automation',
      description: 'Custom intelligent workflows, auto-responders, and autonomous pipeline tasks.',
      tag: 'Machine Intelligence'
    },
    {
      num: '03',
      name: 'Logo & Brand Identity',
      description: 'Cohesive visual identity systems, typography guidelines, and brand language.',
      tag: 'Visual Strategy'
    },
    {
      num: '04',
      name: 'Mobile App Development',
      description: 'Responsive cross-platform mobile experiences engineered for performance.',
      tag: 'iOS & Android'
    },
    {
      num: '05',
      name: 'UI/UX Design',
      description: 'Conversion-focused interface design backed by intuitive user journey mapping.',
      tag: 'Product Architecture'
    },
    {
      num: '06',
      name: 'API & System Integration',
      description: 'Secure data pipelines, third-party software connections, and cloud integrations.',
      tag: 'Backend Infrastructure'
    }
  ];

  // Technologies
  const techStack = [
    { name: 'Next.js', category: 'Framework', icon: Globe },
    { name: 'React', category: 'UI Architecture', icon: Layers },
    { name: 'TypeScript', category: 'Type Safety', icon: Terminal },
    { name: 'Tailwind CSS', category: 'Styling System', icon: Sparkles },
    { name: 'Node.js', category: 'Backend Engine', icon: Server },
    { name: 'APIs', category: 'Integration Layer', icon: Network },
    { name: 'Databases', category: 'Data Architecture', icon: Database },
    { name: 'AI Technologies', category: 'Intelligence', icon: Cpu },
    { name: 'Automation Platforms', category: 'Workflow Automation', icon: Workflow },
    { name: 'Modern Cloud Infrastructure', category: 'Deployment', icon: Boxes }
  ];

  // Journey Milestones
  const journeyMilestones = [
    {
      num: '01',
      title: 'The Idea',
      description: 'OSAAC began with a vision to create digital experiences that combine creativity with technology.'
    },
    {
      num: '02',
      title: 'Building the Foundation',
      description: 'The team focused on modern web development, design systems, and digital experiences.'
    },
    {
      num: '03',
      title: 'Growing the Team',
      description: 'OSAAC developed into a five-member team combining technical development with client outreach and business development.'
    },
    {
      num: '04',
      title: 'Expanding Into Intelligence',
      description: 'AI and automation became an important part of how OSAAC helps businesses work smarter.'
    },
    {
      num: '05',
      title: 'Building Complete Experiences',
      description: 'Today, OSAAC brings websites, automation, branding, and applications together under one digital vision.'
    },
    {
      num: '06',
      title: "What's Next",
      description: 'Continue building smarter, more scalable digital systems for businesses ready to evolve.'
    }
  ];

  const filteredTeam =
    activeTab === 'all'
      ? teamMembers
      : teamMembers.filter((m) => m.group === activeTab);

  return (
    <div className="relative min-h-screen bg-[#0a0f1a] text-[#f1f5f9] overflow-hidden selection:bg-sky-500/20 selection:text-sky-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-[35%] right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute top-[65%] left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />

      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Narrative */}
          <motion.div
            className="lg:col-span-7 space-y-6 sm:space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold tracking-widest text-sky-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              ABOUT OSAAC
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
            >
              <span className="text-[#94a3b8] font-light block mb-1">Beyond Digital.</span>
              We Build What Moves Business Forward.
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={fadeIn}
              className="text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-2xl font-light"
            >
              OSAAC is a digital solutions company focused on building modern websites, intelligent automation systems, mobile experiences, and distinctive brand identities. We combine design, technology, and AI to create digital solutions that are practical, scalable, and built for real-world growth.
            </motion.p>

            {/* Quick Actions */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-2">
              <StartProjectButton href="/start-project">
                Start a Project
              </StartProjectButton>
              <Link
                href="#team"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#94a3b8] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-300"
              >
                Meet the Team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Abstract OSAAC Digital Ecosystem Visual */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-[#0f172a]/70 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Soft radial glow inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Ecosystem Header */}
              <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">OSAAC Engine</div>
                    <div className="text-xs text-[#94a3b8]">Connected Digital Ecosystem</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Operational</span>
                </div>
              </div>

              {/* Visual System Nodes */}
              <div className="relative z-10 py-6 space-y-4">
                {/* Node 1: Design & Brand */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-sky-500/40 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Brand & Visual Architecture</div>
                      <div className="text-[11px] text-[#94a3b8]">Identity systems & modern UX</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">Core</span>
                </div>

                {/* Connecting trace */}
                <div className="flex justify-center py-0.5">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-sky-500/40 to-cyan-500/40" />
                </div>

                {/* Node 2: Technology & Web */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-sky-500/40 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Engineered Web & Mobile</div>
                      <div className="text-[11px] text-[#94a3b8]">Next.js, TypeScript & scalable APIs</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">Active</span>
                </div>

                {/* Connecting trace */}
                <div className="flex justify-center py-0.5">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-sky-500/40 to-cyan-500/40" />
                </div>

                {/* Node 3: AI & Automation */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-sky-500/40 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Intelligent AI Automation</div>
                      <div className="text-[11px] text-[#94a3b8]">Autonomous flows & real-time sync</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Smart</span>
                </div>
              </div>

              {/* Abstract Telemetry Footer */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-[#94a3b8]">
                <span>5-Member Team Synergy</span>
                <span className="font-mono text-sky-400">v2.4 Production</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2. INTRODUCTION / OSAAC STORY (WHY OSAAC)
          ===================================================================== */}
      <section className="relative py-20 sm:py-28 border-t border-white/[0.08] bg-[#0c1220]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="max-w-3xl mb-14 sm:mb-20 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Our Philosophy
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Why OSAAC
            </motion.h2>
            <motion.p variants={fadeIn} className="text-base sm:text-lg text-[#94a3b8] leading-relaxed font-light">
              OSAAC was created around a simple idea: businesses should not have to choose between beautiful design and powerful technology. We bring strategy, design, development, automation, and digital identity together to create experiences that feel modern while solving genuine business problems.
            </motion.p>
          </motion.div>

          {/* 3 Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <motion.div
              className="p-8 rounded-2xl bg-[#0f172a] border border-white/[0.08] hover:border-sky-500/30 transition-all duration-300 relative flex flex-col justify-between group shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  Why OSAAC Was Created
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  To bridge the gap between creative design and meaningful technology — helping businesses move from simply having a digital presence to having digital systems that actually work for them.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-sky-400/80">
                01 / The Purpose
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="p-8 rounded-2xl bg-[#0f172a] border border-white/[0.08] hover:border-sky-500/30 transition-all duration-300 relative flex flex-col justify-between group shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  The Problem We Solve
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  We help businesses overcome outdated websites, disconnected digital tools, repetitive manual processes, inconsistent branding, and digital experiences that fail to convert attention into meaningful results.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-cyan-400/80">
                02 / Practical Impact
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="p-8 rounded-2xl bg-[#0f172a] border border-white/[0.08] hover:border-sky-500/30 transition-all duration-300 relative flex flex-col justify-between group shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  What Makes OSAAC Different
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  OSAAC approaches every project as a complete digital experience rather than a collection of separate deliverables. Our team combines technical development with client relationships, business understanding, design, automation, and AI to create solutions around the actual needs of each client.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-blue-400/80">
                03 / Unified Approach
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FOUR CORE STRENGTHS (WHAT WE BUILD)
          ===================================================================== */}
      <section className="relative py-20 sm:py-28 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Core Disciplines</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              What We Build
            </h2>
          </div>
          <p className="text-sm text-[#94a3b8] max-w-md font-light">
            Engineered systems designed to provide enduring business value, high conversion performance, and operational clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreStrengths.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                className="p-7 rounded-2xl bg-[#0f172a]/80 border border-white/[0.08] hover:border-sky-500/40 hover:bg-[#111c33] transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#64748b] group-hover:text-sky-400 transition-colors">
                      {item.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-colors">
                      <Icon className={`w-5 h-5 ${item.accent}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. SERVICES / CAPABILITIES OVERVIEW (WHAT WE DO)
          ===================================================================== */}
      <section className="relative py-20 sm:py-28 border-t border-white/[0.08] bg-[#0c1220]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Capabilities</span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                What We Do
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              Explore Detailed Services
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((srv, idx) => (
              <motion.div
                key={srv.num}
                className="p-6 sm:p-7 rounded-2xl bg-[#0f172a] border border-white/[0.08] hover:border-sky-500/40 transition-all duration-300 group flex flex-col justify-between"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#64748b] group-hover:text-sky-400 transition-colors">
                      {srv.num}
                    </span>
                    <span className="text-[11px] font-mono text-sky-400/80 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                      {srv.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-[#64748b] group-hover:text-sky-400 transition-colors">
                  <span>Inquire Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. TECHNOLOGY STACK
          ===================================================================== */}
      <section className="relative py-20 sm:py-28 border-t border-white/[0.08] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Infrastructure</span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Built With Modern Technology
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] font-light">
            We engineer platforms using trusted, scalable, and modern technologies configured for security, maintainability, and peak real-world performance.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                className="p-5 rounded-xl bg-[#0f172a] border border-white/[0.08] hover:border-sky-500/40 hover:bg-[#111c33] transition-all duration-300 text-center flex flex-col items-center justify-center space-y-2 group shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#94a3b8] group-hover:text-sky-400 group-hover:bg-sky-500/10 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {tech.name}
                </div>
                <div className="text-[11px] font-mono text-[#64748b]">
                  {tech.category}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          6. TEAM SECTION (05 PEOPLE. ONE VISION.)
          ===================================================================== */}
      <section id="team" className="relative py-20 sm:py-28 border-t border-white/[0.08] bg-[#0c1220]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold tracking-widest text-sky-400 uppercase">
              <Users className="w-3.5 h-3.5" />
              THE PEOPLE BEHIND OSAAC
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              05 People. One Vision.
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] font-light leading-relaxed">
              OSAAC is built by a five-member team with complementary responsibilities across technology and client development.
            </p>
          </div>

          {/* Team Synergy Architecture Banner */}
          <div className="mb-12 p-6 rounded-2xl bg-[#0f172a] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-2xl font-bold text-sky-400 font-mono">02</div>
                <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">Technical & Delivery</div>
                <div className="text-[11px] text-[#94a3b8] mt-0.5">Sanjay + Hems</div>
              </div>
              <div className="hidden md:flex items-center justify-center text-sky-400">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono">
                  <span>Seamless Collaboration</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-2xl font-bold text-cyan-400 font-mono">03</div>
                <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">Client Development & Outreach</div>
                <div className="text-[11px] text-[#94a3b8] mt-0.5">Simon + Rafeeq + Peri</div>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-sky-500 text-white shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                All Members (5)
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'technical'
                    ? 'bg-sky-500 text-white shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Technical Team (2)
              </button>
              <button
                onClick={() => setActiveTab('client')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'client'
                    ? 'bg-sky-500 text-white shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Client Development (3)
              </button>
            </div>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
            {filteredTeam.map((member, idx) => (
              <motion.div
                key={member.id}
                className={`p-7 rounded-2xl bg-[#0f172a] border border-white/[0.08] ${member.borderAccent} transition-all duration-300 group flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                {/* Ambient Top Glow */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.accent}`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Abstract Initial Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent border border-white/[0.12] flex items-center justify-center text-lg font-bold font-mono text-white group-hover:scale-105 group-hover:border-sky-400/50 transition-all shadow-inner">
                      {member.initials}
                    </div>
                    <span className="text-xs font-mono text-[#64748b] group-hover:text-sky-400 transition-colors">
                      {member.num}
                    </span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {member.name}
                    </h3>
                    <div className="inline-block text-xs font-mono font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                      {member.role}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>{member.groupLabel}</span>
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. OSAAC JOURNEY (CINEMATIC TIMELINE)
          ===================================================================== */}
      <section className="relative py-20 sm:py-28 border-t border-white/[0.08] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Evolution</span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Our Journey
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] font-light">
            From an ambitious vision to an agile 5-member digital powerhouse delivering complete modern solutions.
          </p>
        </div>

        <div className="relative border-l border-white/[0.12] ml-4 sm:ml-32 md:ml-40 space-y-12">
          {journeyMilestones.map((milestone, idx) => (
            <motion.div
              key={milestone.num}
              className="relative pl-8 sm:pl-10 group"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0a0f1a] border-2 border-sky-500 group-hover:border-sky-300 group-hover:scale-125 transition-all flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              </div>

              {/* Timestamp label on wide screens */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-24 text-xs font-mono font-bold text-sky-400">
                Phase {milestone.num}
              </div>

              <div className="p-6 rounded-xl bg-[#0f172a] border border-white/[0.08] group-hover:border-sky-500/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 mb-2 sm:hidden">
                  <span className="text-xs font-mono font-bold text-sky-400">Phase {milestone.num} —</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          8. MISSION & VISION DUAL PANELS
          ===================================================================== */}
      <section className="relative py-20 sm:py-28 border-t border-white/[0.08] bg-[#0c1220]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Panel */}
            <motion.div
              className="p-8 sm:p-10 rounded-2xl bg-[#0f172a] border border-white/[0.08] hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                  Our Purpose
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Mission
                </h3>
                <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed font-light">
                  &ldquo;To create meaningful digital solutions that combine exceptional design, modern technology, and intelligent automation to help businesses grow.&rdquo;
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-white/[0.06] text-xs font-mono text-[#64748b]">
                Execution / Excellence / Real-World Value
              </div>
            </motion.div>

            {/* Vision Panel */}
            <motion.div
              className="p-8 sm:p-10 rounded-2xl bg-[#0f172a] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  Our Outlook
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Vision
                </h3>
                <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed font-light">
                  &ldquo;To build a future where every business can use technology not just to exist online, but to operate smarter, communicate better, and grow with confidence.&rdquo;
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-white/[0.06] text-xs font-mono text-[#64748b]">
                Intelligence / Scalability / Sustainable Growth
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. FUTURE DIRECTION (WHAT'S NEXT)
          ===================================================================== */}
      <section className="relative py-20 sm:py-24 border-t border-white/[0.08] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#0d1527] border border-white/[0.1] text-center space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold tracking-widest text-sky-400 uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            LOOKING FORWARD
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            What&apos;s Next
          </h2>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed font-light">
            &ldquo;To grow OSAAC into a technology-driven digital company known for exceptional websites, intelligent automation, powerful digital products, and distinctive brand experiences.&rdquo;
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#64748b]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> Continuous Innovation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> High-Impact Systems
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> Direct Client Partnership
            </span>
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          10. FINAL CTA SECTION
          ===================================================================== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#0c1220]/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Start The Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Ready to Build What&apos;s Next?
            </h2>
            <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl mx-auto font-light leading-relaxed">
              Partner with OSAAC to engineer high-impact web platforms, automated workflows, and distinctive digital brand experiences.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StartProjectButton href="/start-project">
              Start a Project
            </StartProjectButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] transition-all duration-300 shadow-sm"
            >
              Let&apos;s Talk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
