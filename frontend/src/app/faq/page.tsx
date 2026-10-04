'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  X,
  Plus,
  Minus,
  HelpCircle,
  Code2,
  Cpu,
  Palette,
  Smartphone,
  CreditCard,
  Layers,
  LifeBuoy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import StartProjectButton from '@/components/StartProjectButton';

export type FAQCategory =
  | 'General'
  | 'Web Development'
  | 'AI Automation'
  | 'Branding'
  | 'Mobile Development'
  | 'Pricing'
  | 'Process'
  | 'Support';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // General
  {
    id: 'gen-1',
    category: 'General',
    question: 'What services does OSAAC provide?',
    answer:
      'We provide custom website development (basic, business, and premium sites), custom AI workflow automation scripts, digital logo and brand identity design, and mobile app development for iOS and Android.'
  },
  {
    id: 'gen-2',
    category: 'General',
    question: 'How can I submit a project enquiry?',
    answer:
      'You can navigate to the "Start Your Project" page and fill out our enquiry form (Name, Email, Phone, Company, Service, Budget, and Requirements). The system will write the lead to our database and alert our team.'
  },
  {
    id: 'gen-3',
    category: 'General',
    question: 'What makes OSAAC different from traditional digital agencies?',
    answer:
      'OSAAC combines technical engineering, client relationship management, and AI automation into a unified five-member agile team. Instead of delivering disconnected pieces, we build complete digital ecosystems tailored to real business workflows.'
  },
  {
    id: 'gen-4',
    category: 'General',
    question: 'Who works on my project?',
    answer:
      'Our core team of 5 directly handles your project—with dedicated focus divided between engineering/development (Sanjay and Hems) and client relationship/business outreach (Simon, Rafeeq, and Peri).'
  },

  // Web Development
  {
    id: 'web-1',
    category: 'Web Development',
    question: 'What technologies do you use for development?',
    answer:
      'Our frontend projects are built using Next.js, React, TypeScript, and Tailwind CSS. The backend services run on Node.js, Express, and TypeScript, communicating with a secure PostgreSQL database hosted on Supabase.'
  },
  {
    id: 'web-2',
    category: 'Web Development',
    question: 'What security measures do you implement?',
    answer:
      'We enforce security by keeping all API tokens on the backend using secure environment variables, enabling Supabase Row Level Security (RLS), validating inputs, configuring CORS, setting Helmet security headers, and routing traffic over HTTPS.'
  },
  {
    id: 'web-3',
    category: 'Web Development',
    question: 'Are your websites optimized for SEO?',
    answer:
      'Yes, we implement basic technical SEO structure, including custom page titles, meta descriptions, correct HTML header hierarchy, robots.txt, sitemaps, clean routing, and meaningful image alt text. We do not guarantee Google search rankings.'
  },
  {
    id: 'web-4',
    category: 'Web Development',
    question: 'Do you build custom web applications and business portals?',
    answer:
      'Yes, beyond standard business websites, we engineer full-stack web applications, reservation platforms, patient portals, real estate listings, and internal workflow dashboards tailored to your operational needs.'
  },

  // AI Automation
  {
    id: 'ai-1',
    category: 'AI Automation',
    question: 'What types of AI automation workflows can OSAAC build?',
    answer:
      'We design custom automations such as automated lead processing, CRM synchronization, WhatsApp and email notification triggers, intelligent document parsing, and database event automations.'
  },
  {
    id: 'ai-2',
    category: 'AI Automation',
    question: 'How do your automation solutions integrate with existing business tools?',
    answer:
      'We connect systems using secure REST APIs, webhooks, and modern integration bridges, allowing your existing databases, forms, communication apps, and spreadsheets to sync data automatically.'
  },
  {
    id: 'ai-3',
    category: 'AI Automation',
    question: 'Can AI automation work alongside our existing website?',
    answer:
      'Yes, our automation solutions can be integrated directly into your existing website or third-party web portals without requiring a complete rebuild of your current systems.'
  },

  // Branding
  {
    id: 'brand-1',
    category: 'Branding',
    question: 'What is included in your Logo & Brand Identity service?',
    answer:
      'Our brand identity service includes custom logo design, color palette definitions, typography systems, vector source files, and visual guidelines to ensure consistency across digital and print touchpoints.'
  },
  {
    id: 'brand-2',
    category: 'Branding',
    question: 'Do you offer brand redesigns or identity refreshes?',
    answer:
      'Yes, we can modernize and refine existing logos and brand assets to create a cleaner, more contemporary digital aesthetic while preserving your core brand recognition.'
  },

  // Mobile Development
  {
    id: 'mob-1',
    category: 'Mobile Development',
    question: 'Do you offer mobile app development?',
    answer:
      'Yes, we develop mobile applications for iOS, Android, and cross-platform environments. We build business apps, customer-facing applications, e-commerce apps, booking apps, and custom mobile solutions. Pricing is customized based on project scope.'
  },
  {
    id: 'mob-2',
    category: 'Mobile Development',
    question: 'Which platforms do you support for mobile apps?',
    answer:
      'We build applications for both iOS and Android platforms, using cross-platform and modern mobile frameworks that provide responsive performance, native device integrations, and consistent UI/UX.'
  },

  // Pricing
  {
    id: 'price-1',
    category: 'Pricing',
    question: 'How do you handle project pricing and quotations?',
    answer:
      'All our prices (e.g. Website Development starting from ₹7,999, AI Automation starting from ₹4,999) are initial starting estimates. Final project quotes depend entirely on custom features, workflow complexity, design depth, and overall scope. We do not provide fixed rigid pricing before discussing requirements.'
  },
  {
    id: 'price-2',
    category: 'Pricing',
    question: 'Are there hidden fees or recurring commitments?',
    answer:
      'No. We operate with complete transparency. All scope items, milestone deliverables, and estimated costs are outlined before development begins. Any additional scope requested later is quoted and approved separately.'
  },

  // Process
  {
    id: 'proc-1',
    category: 'Process',
    question: 'How is the project process structured?',
    answer:
      'Our process follows a clear 4-step sequence: (1) Discover: understanding your vision and goals. (2) Plan & Design: detailing architecture and UI/UX directions. (3) Develop & Test: writing code and executing responsiveness tests. (4) Launch & Support: deploying the system and handling maintenance.'
  },
  {
    id: 'proc-2',
    category: 'Process',
    question: 'How long do projects typically take?',
    answer:
      'Project timelines vary depending on scope. A basic website may take a couple of weeks, whereas complex custom business portals with database integrations or workflows require more time. Estimated milestones are agreed upon before work begins.'
  },
  {
    id: 'proc-3',
    category: 'Process',
    question: 'How do you communicate during the development cycle?',
    answer:
      'We maintain direct, transparent communication through scheduled milestone reviews, progress previews, and collaborative feedback channels so you always have visibility into your project’s progress.'
  },

  // Support
  {
    id: 'sup-1',
    category: 'Support',
    question: 'What is your website maintenance and update policy?',
    answer:
      'Once a website is delivered, the client receives one minor update (e.g. banner change, text edit, image replacement) free of charge. This is available only once. All subsequent updates and maintenance request items are charged separately based on scope.'
  }
];

const ALL_CATEGORIES: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: 'All Questions', value: 'ALL', icon: HelpCircle },
  { label: 'General', value: 'General', icon: MessageSquare },
  { label: 'Web Development', value: 'Web Development', icon: Code2 },
  { label: 'AI Automation', value: 'AI Automation', icon: Cpu },
  { label: 'Branding', value: 'Branding', icon: Palette },
  { label: 'Mobile Development', value: 'Mobile Development', icon: Smartphone },
  { label: 'Pricing', value: 'Pricing', icon: CreditCard },
  { label: 'Process', value: 'Process', icon: Layers },
  { label: 'Support', value: 'Support', icon: LifeBuoy }
];

const QUICK_FILTERS: { label: string; value: string }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'WEB', value: 'Web Development' },
  { label: 'AI', value: 'AI Automation' },
  { label: 'BRANDING', value: 'Branding' },
  { label: 'MOBILE', value: 'Mobile Development' },
  { label: 'PRICING', value: 'Pricing' }
];

export default function FAQPage() {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [openId, setOpenId] = useState<string | null>('gen-1');

  // Filter logic
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase();
      const matchesText =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);

      return matchesCategory && matchesText;
    });
  }, [selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: FAQ_DATA.length };
    FAQ_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
  };

  return (
    <div className="relative min-h-screen bg-[#0a0f1a] text-[#f1f5f9] selection:bg-sky-500/20 selection:text-sky-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.1),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Info */}
          <motion.div
            className="lg:col-span-8 space-y-6"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold tracking-widest text-sky-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              FAQ / FREQUENTLY ASKED QUESTIONS
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
              Questions? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-300">
                We’ve Got Answers.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94a3b8] font-light max-w-2xl leading-relaxed">
              Find transparent answers about OSAAC&apos;s development process, modern tech stack, AI automation integrations, pricing framework, and dedicated post-launch support.
            </p>
          </motion.div>

          {/* Right Column: Abstract Geometric / System Visual */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-6 rounded-2xl bg-[#0f172a]/70 border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#94a3b8]">Knowledge Base</span>
                </div>
                <span className="text-xs font-mono text-sky-400 font-semibold">{FAQ_DATA.length} Verified Topics</span>
              </div>

              {/* Connected Abstract Grid */}
              <div className="py-4 space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs">
                  <span className="text-[#cbd5e1] font-mono">1. Architecture & Code</span>
                  <span className="text-sky-400 text-[11px] font-mono">Next.js / TS</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs">
                  <span className="text-[#cbd5e1] font-mono">2. Intelligent Workflows</span>
                  <span className="text-cyan-400 text-[11px] font-mono">AI Pipelines</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs">
                  <span className="text-[#cbd5e1] font-mono">3. Transparent Quotes</span>
                  <span className="text-blue-400 text-[11px] font-mono">Custom Scope</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#64748b]">
                <span>OSAAC Help Center</span>
                <span className="text-emerald-400 font-mono">● Real-time search active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2. QUICK HORIZONTAL CATEGORY FILTER (Desktop Top & Mobile Scroll)
          ===================================================================== */}
      <section className="border-y border-white/[0.08] bg-[#0c1220]/70 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {QUICK_FILTERS.map((filter) => {
              const isActive = selectedCategory === filter.value;
              return (
                <button
                  key={filter.label}
                  onClick={() => setSelectedCategory(filter.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                      : 'text-[#94a3b8] hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center text-xs font-mono text-[#64748b] shrink-0">
            Showing <span className="text-sky-400 font-semibold mx-1">{filteredFAQs.length}</span> of {FAQ_DATA.length}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MAIN TWO-COLUMN FAQ EXPERIENCE
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Sticky Category Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-36 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b] mb-4">
                Categories
              </div>

              <div className="space-y-1">
                {ALL_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.value;
                  const count = categoryCounts[cat.value] || 0;

                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30 font-semibold'
                          : 'text-[#94a3b8] hover:text-white hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-[#64748b] group-hover:text-white'}`} />
                        <span>{cat.label}</span>
                      </div>
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-white/[0.04] text-[#64748b]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="p-6 rounded-2xl bg-[#0c1220] border border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold font-mono uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Custom Inquiries
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed font-light">
                Have a unique requirement not covered here? Reach out directly to discuss architecture, timeline, and deliverables.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 pt-1"
              >
                Send a Direct Message <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Search + FAQ Accordion List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748b]">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search frequently asked questions..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-[#0f172a] border border-white/[0.08] focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 text-white placeholder-[#64748b] text-sm transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748b] hover:text-white transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* FAQ Accordion Items */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => {
                  const isOpen = openId === faq.id;

                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)] ${
                        isOpen
                          ? 'bg-[#0f172a] border-sky-500/40 shadow-[0_0_25px_rgba(56,189,248,0.08)]'
                          : 'bg-[#0f172a]/70 border-white/[0.08] hover:border-white/[0.16] hover:bg-[#0f172a]'
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        type="button"
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group"
                      >
                        <div className="flex items-start gap-3 sm:gap-4 pr-4">
                          <span
                            className={`text-xs font-mono font-semibold mt-0.5 px-2 py-0.5 rounded transition-colors ${
                              isOpen
                                ? 'bg-sky-500/10 text-sky-400'
                                : 'bg-white/[0.04] text-[#64748b] group-hover:text-[#94a3b8]'
                            }`}
                          >
                            {faq.category}
                          </span>
                          <h2
                            className={`text-sm sm:text-base font-semibold transition-colors ${
                              isOpen
                                ? 'text-white'
                                : 'text-[#e2e8f0] group-hover:text-sky-300'
                            }`}
                          >
                            {faq.question}
                          </h2>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isOpen
                              ? 'bg-sky-500 text-white'
                              : 'bg-white/[0.04] text-[#94a3b8] group-hover:bg-white/[0.08] group-hover:text-white'
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {/* Animated Answer Section */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{
                              height: 0,
                              opacity: shouldReduceMotion ? 1 : 0
                            }}
                            animate={{
                              height: 'auto',
                              opacity: 1
                            }}
                            exit={{
                              height: 0,
                              opacity: shouldReduceMotion ? 1 : 0
                            }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#94a3b8] leading-relaxed border-t border-white/[0.06] bg-[#0c1220]/40 font-light">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                /* Empty State Card */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 rounded-2xl bg-[#0f172a] border border-white/[0.08] text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto text-[#64748b]">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">No questions found</h3>
                    <p className="text-xs sm:text-sm text-[#94a3b8] max-w-sm mx-auto font-light">
                      Try a different search term or browse another category to find what you&apos;re looking for.
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-colors"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FINAL CALL TO ACTION (Preserving Existing OSAAC Buttons)
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
              Need More Clarity?
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Still Have Questions?
            </h2>
            <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl mx-auto font-light leading-relaxed">
              If you have a unique project requirement or need tailored technical advice, our team is here to help.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
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
