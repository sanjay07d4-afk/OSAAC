'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Sparkles,
  X,
  Hotel,
  ShieldCheck,
  Stethoscope,
  Building,
  ArrowRight
} from 'lucide-react';

interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  demoUrl: string;
  image: string;
  technologies: string[];
  keyFeatures: string[];
  architectureOverview: string;
  accentColor: string;
  gradientBorder: string;
  icon: React.ComponentType<{ className?: string }>;
}

const portfolioProjects: Project[] = [
  {
    id: 'hotel-booking',
    num: '01',
    title: 'Hotel Booking Website',
    subtitle: 'The Aurelia Grand — Luxury Beachfront Resort',
    category: 'Web Development',
    tagline: 'Cinematic hospitality platform with real-time suite availability',
    description:
      'A modern hotel booking platform with real-time availability, secure payments and an easy booking experience.',
    demoUrl: 'https://hotel-room-booking-indol-ten.vercel.app/',
    image: '/portfolio/hotel_booking.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Next.js', 'Tailwind'],
    keyFeatures: [
      'Cinematic intro with Ken Burns photo transitions',
      'Interactive room suites & beachfront villas catalog',
      'Real-time booking availability check widget',
      'Experiential dining, spa ritual, and amenities showcase',
      'Fast, mobile-first responsive reservation user experience'
    ],
    architectureOverview:
      'Structured with modern frontend rendering, optimized high-resolution media loading, modular room category filtering, and direct reservation routing.',
    accentColor: '#3b82f6',
    gradientBorder: 'hover:border-[#3b82f6]/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]',
    icon: Hotel
  },
  {
    id: 'clinic',
    num: '02',
    title: 'Clinic Website',
    subtitle: 'AuraCare Specialists & Medical Center',
    category: 'Web Development',
    tagline: 'Modern healthcare portal with appointment booking & doctor management',
    description:
      'A clean and responsive healthcare website with appointment booking and doctor management.',
    demoUrl: 'https://clinic-demo-rust.vercel.app/',
    image: '/portfolio/clinic_website.jpg',
    technologies: ['Next.js', 'Tailwind', 'Firebase', 'Leaflet Maps'],
    keyFeatures: [
      'Online appointment scheduling & telehealth video booking',
      'Multi-specialty medical departments & doctor directory',
      'Interactive Leaflet clinical campus location map',
      'Integrated pharmacy, diagnostic services, & emergency info',
      'Accessible, high-contrast healthcare design system'
    ],
    architectureOverview:
      'Engineered with modular React components, client-side state handling for scheduling workflows, responsive leaflet integration, and fast client-side routing.',
    accentColor: '#0284c7',
    gradientBorder: 'hover:border-[#0284c7]/60 hover:shadow-[0_0_30px_rgba(2,132,199,0.18)]',
    icon: Stethoscope
  },
  {
    id: 'real-estate',
    num: '03',
    title: 'Real Estate Website',
    subtitle: 'Elysian Estates — Quiet Luxury Sanctuaries',
    category: 'Web Development',
    tagline: 'Architectural property platform with advanced search, filters and virtual tours',
    description:
      'A property listing platform with advanced search, filters and virtual tours.',
    demoUrl: 'https://realestate-eta-azure-23.vercel.app/',
    image: '/portfolio/real_estate.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Next.js', 'Tailwind'],
    keyFeatures: [
      'Editorial quiet-luxury architectural design & typography',
      'Room-by-room interior walkthroughs with material specs',
      'Dynamic estate collections, residence filters, & floorplans',
      'Private client dossier request & tour booking flow',
      'Smart home automation & net-zero energy specifications'
    ],
    architectureOverview:
      'Built using Next.js App Router with server-rendered metadata, client-side fluid scroll transitions, custom modal inquiries, and optimized editorial imagery.',
    accentColor: '#b8935f',
    gradientBorder: 'hover:border-[#00b4d8]/60 hover:shadow-[0_0_30px_rgba(0,180,216,0.18)]',
    icon: Building
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Web Development', 'UI/UX Design'] as const;

  const filteredProjects = portfolioProjects.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'UI/UX Design') return p.category === 'Web Development';
    return p.category === activeCategory;
  });

  // Escape key listener for details modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    },
    [selectedProject]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div className="bg-[#060a12] text-[#f1f5f9] min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      
      {/* 1. HERO SECTION WITH 3D CUBE VISUAL */}
      <section className="relative pt-4 sm:pt-8" aria-label="Portfolio Hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Intro */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Section Tag */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono font-bold tracking-[0.25em] text-[#38bdf8] uppercase"
            >
              MY PORTFOLIO
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.12]"
            >
              Projects That <br />
              Show What{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#c084fc] bg-clip-text text-transparent">
                I Do Best
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-xl"
            >
              A collection of real-world projects where I transformed ideas into modern, functional and user-friendly web solutions.
            </motion.p>
          </div>

          {/* Right Column: 3D Isometric Crystal Cube Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Radial ambient background glow */}
              <div className="absolute inset-0 bg-[#00d2ff]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-48 h-48 bg-[#a855f7]/20 rounded-full blur-2xl pointer-events-none" />

              <Image
                src="/portfolio/hero_3d_cube.jpg"
                alt="OSAAC 3D Code Cube"
                width={500}
                height={500}
                priority
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_35px_rgba(0,210,255,0.35)] rounded-2xl"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="pt-2">
        <div
          className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2"
          role="tablist"
          aria-label="Filter portfolio projects by category"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] ${
                  isActive
                    ? 'text-white shadow-[0_0_20px_rgba(0,180,216,0.5)]'
                    : 'text-[#94a3b8] hover:text-white bg-[#0f172a]/60 hover:bg-[#1e293b]/60 border border-white/[0.08]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="portfolioFilterPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] rounded-full"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. 2-COLUMN PROJECT GRID */}
      <section aria-label="Portfolio Projects Grid">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`bg-[#0b1222] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all duration-500 hover:-translate-y-1.5 ${project.gradientBorder} group relative overflow-hidden shadow-xl`}
                >
                  {/* Visual Project Screenshot Preview */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-[#060a12] border border-white/[0.06]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1222]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* Project Metadata */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight group-hover:text-[#38bdf8] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mt-2 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#060c18] border border-white/[0.08] text-[11px] font-medium text-[#cbd5e1]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Strip */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    {/* Live Demo Primary Button with Gradient */}
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 py-2.5 px-4 sm:px-5 bg-gradient-to-r from-[#00b4d8] via-[#3b82f6] to-[#a855f7] hover:opacity-95 text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(0,180,216,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4d8]"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    {/* View Details Secondary Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center space-x-1.5 py-2.5 px-4 bg-[#060c18] hover:bg-white/[0.06] text-[#cbd5e1] hover:text-white border border-white/[0.1] text-xs font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. BOTTOM CTA SECTION */}
      <section className="pt-6 sm:pt-10" aria-label="Work Together CTA">
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#0b1324] via-[#0e172e] to-[#12132e] border border-white/[0.1] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Interested in Working{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#c084fc] bg-clip-text text-transparent">
                Together?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8]">
              Let&apos;s create something amazing. Feel free to reach out!
            </p>
          </div>

          {/* Right Action Button */}
          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 py-3 px-6 bg-gradient-to-r from-[#00b4d8] via-[#3b82f6] to-[#a855f7] hover:opacity-95 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,180,216,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4d8]"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#0b1222] border border-white/[0.12] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details modal"
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#060c18] border border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-10">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#060c18] border border-white/[0.08] text-[#38bdf8] rounded text-xs font-mono font-bold uppercase tracking-wider">
                  <span>{selectedProject.num}</span>
                  <span>&bull;</span>
                  <span>{selectedProject.category}</span>
                </div>
                <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
                  {selectedProject.title}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#94a3b8]">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Visual Preview */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.08] bg-[#060a12]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Overview & Architecture */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-1.5">
                    Project Overview
                  </h3>
                  <p className="text-[#cbd5e1] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-1.5">
                    System Architecture
                  </h3>
                  <p className="text-[#94a3b8] leading-relaxed">
                    {selectedProject.architectureOverview}
                  </p>
                </div>

                {/* Key Features Checklist */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-2">
                    Key Deliverables &amp; Functionality
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cbd5e1]">
                    {selectedProject.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full Stack Technology Chips */}
                <div className="pt-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] mb-2">
                    Verified Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#060c18] border border-white/[0.08] text-xs font-mono text-[#cbd5e1]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 py-2.5 px-5 bg-gradient-to-r from-[#00b4d8] via-[#3b82f6] to-[#a855f7] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Launch Live Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="py-2.5 px-4 text-xs font-mono font-semibold text-[#94a3b8] hover:text-white transition-colors"
                >
                  Back to Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
