'use client';

import { Check, Info, HelpCircle } from 'lucide-react';
import StartProjectButton from '@/components/StartProjectButton';
import ServicesScrollExperience from '@/components/ServicesScrollExperience';

export default function Services() {
  const webDevFeatures = [
    'Responsive layout (Mobile & Desktop)',
    'Custom contact form integration',
    'SEO metadata configurations',
    'Multi-page navigation routes',
    'Speed optimization setup',
    'Enhanced visual styling',
    'Database collection settings',
    'Backend Express/Node integrations',
    'Advanced workflow/database setup',
    'Secure API endpoint connections'
  ];

  const aiServices = [
    'Lead automation',
    'Customer support automation',
    'WhatsApp automation',
    'Enquiry automation',
    'AI assistants',
    'Business workflow automation',
    'Data processing workflows'
  ];

  const brandDeliverables = [
    'Logo design',
    'Typography systems',
    'Brand color palettes',
    'Complete brand identity setup',
    'Business card layout concepts',
    'Social media branding elements'
  ];

  const mobileAppWhatWeBuild = [
    'Business & Enterprise Mobile Apps',
    'Customer-Facing Applications',
    'E-commerce & Shopping Apps',
    'On-Demand Service Apps',
    'Booking & Appointment Apps',
    'Education & Learning Apps',
    'Social & Community Apps',
    'Healthcare & Wellness Apps',
    'Productivity Applications',
    'Custom Mobile Applications'
  ];

  const mobileAppCapabilities = [
    {
      title: 'UI/UX Development',
      desc: 'Create intuitive, modern mobile interfaces focused on usability, accessibility, and smooth user experiences.'
    },
    {
      title: 'iOS Development',
      desc: 'Build polished applications optimized for Apple’s mobile ecosystem.'
    },
    {
      title: 'Android Development',
      desc: 'Develop scalable Android applications designed for a wide range of devices and screen sizes.'
    },
    {
      title: 'Cross-Platform Development',
      desc: 'Build efficient applications that deliver consistent experiences across iOS and Android.'
    },
    {
      title: 'API & Backend Integration',
      desc: 'Connect mobile applications with APIs, databases, authentication systems, payment platforms, and third-party services.'
    },
    {
      title: 'Performance Optimization',
      desc: 'Optimize applications for fast loading, smooth interactions, efficient resource usage, and reliable performance.'
    },
    {
      title: 'Testing & Quality Assurance',
      desc: 'Test applications across supported devices and scenarios to identify usability, performance, and functional issues before release.'
    },
    {
      title: 'App Deployment',
      desc: 'Prepare applications for production deployment and app-store release workflows.'
    }
  ];

  return (
    <div className="bg-[#0a0f1a] text-[#f1f5f9] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3b82f6]">
          What We Offer
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#f1f5f9]">
          Services &amp; Pricing
        </h1>
        <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
          Transparent starting estimates based on code quality and architectural requirements. 
          Final pricing depends on requirements, design, integrations, features, and overall project scope.
        </p>
      </div>

      {/* Interactive Animated Scroll Experience */}
      <ServicesScrollExperience />

      {/* Website Development Section */}
      <div className="border-t border-white/[0.08] pt-16 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <span className="inline-block px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#3b82f6] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
              01 / Web
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
              Website Development
            </h2>
            <p className="text-sm text-[#3b82f6] font-semibold font-display">
              Starting from ₹7,999 — Pricing varies based on project scope and requirements.
            </p>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              Modern, secure frontend interfaces backed by responsive web engineering. We architect and build 
              production-ready websites with clean code, modular structure, and search-engine-ready technical standards.
            </p>
            <div className="pt-2">
              <StartProjectButton
                href="/start-project"
                className="px-5 py-2.5 text-xs"
              >
                Start Project
              </StartProjectButton>
            </div>
          </div>

          <div className="bg-[#111827] p-7 border border-white/[0.08] rounded-xl space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
              What We Offer:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94a3b8]">
              {webDevFeatures.map((feature) => (
                <li key={feature} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-[#3b82f6] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 bg-[#111827] border border-white/[0.08] rounded-lg flex items-start space-x-3 text-xs text-[#94a3b8] max-w-3xl">
          <Info className="h-5 w-5 text-[#3b82f6] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#f1f5f9]">Important Notice:</strong> These starting estimates represent base setups. 
            Final pricing depends on requirements, design, integrations, features, and overall project scope.
          </p>
        </div>
      </div>

      {/* AI Automation Section */}
      <div className="border-t border-white/[0.08] pt-16 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <span className="inline-block px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#3b82f6] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
              02 / AI
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
              AI Automation
            </h2>
            <p className="text-sm text-[#3b82f6] font-semibold font-display">
              Starting from ₹4,999 — Pricing varies based on workflow complexity and scope.
            </p>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              Boost operations by automating repetitive tasks, customer support triggers, and business processes. 
              We implement tailored automation scripts and tool integrations according to your specifications.
            </p>
            <div className="pt-2">
              <StartProjectButton
                href="/start-project"
                className="px-5 py-2.5 text-xs"
              >
                Start Project
              </StartProjectButton>
            </div>
          </div>

          <div className="bg-[#111827] p-7 border border-white/[0.08] rounded-xl space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
              Possible Automations:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94a3b8]">
              {aiServices.map((service) => (
                <li key={service} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-[#3b82f6] shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 bg-[#111827] border border-white/[0.08] rounded-lg flex items-start space-x-3 text-xs text-[#94a3b8] max-w-3xl">
          <Info className="h-5 w-5 text-[#3b82f6] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#f1f5f9]">Disclaimer:</strong> Final pricing depends on business requirements, workflow complexity, 
            integrations, and automation scope. We do not promise functionality before requirements are understood.
          </p>
        </div>
      </div>

      {/* Logo & Brand Identity Section */}
      <div className="border-t border-white/[0.08] pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <span className="inline-block px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#3b82f6] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
              03 / Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
              Logo &amp; Brand Identity
            </h2>
            <p className="text-sm text-[#3b82f6] font-semibold font-display">
              Pricing is customized based on your concept and deliverables.
            </p>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              Create a premium presence that aligns with your tech assets. We compile comprehensive logo 
              proportions, typography tokens, custom business stationery concepts, and complete visual branding kits.
            </p>
            <div className="pt-2">
              <StartProjectButton
                href="/start-project"
                className="px-5 py-2.5 text-xs"
              >
                Start Project
              </StartProjectButton>
            </div>
          </div>

          <div className="bg-[#111827] p-7 border border-white/[0.08] rounded-xl space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
              Possible Deliverables:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94a3b8]">
              {brandDeliverables.map((deliv) => (
                <li key={deliv} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-[#3b82f6] shrink-0" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile App Development Section */}
      <div id="mobile-app-development" className="border-t border-white/[0.08] pt-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <span className="inline-block px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#3b82f6] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
              04 / Mobile
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
              Mobile App Development
            </h2>
            <p className="text-sm text-[#3b82f6] font-semibold font-display">
              Pricing is customized based on project scope and architecture.
            </p>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              We design and develop high-quality mobile applications that turn ideas and business requirements into reliable digital experiences. Our development approach focuses on intuitive user experiences, scalable architecture, strong performance, and seamless integration with modern technologies.
            </p>
            <div className="pt-2">
              <StartProjectButton
                href="/start-project"
                className="px-5 py-2.5 text-xs"
              >
                Start Project
              </StartProjectButton>
            </div>
          </div>

          <div className="bg-[#111827] p-7 border border-white/[0.08] rounded-xl space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
              What We Build:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94a3b8]">
              {mobileAppWhatWeBuild.map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-[#3b82f6] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Capabilities Subgrid */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold font-display text-[#f1f5f9] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
            Core Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mobileAppCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-5 bg-[#111827] border border-white/[0.08] rounded-xl space-y-2 hover:border-[#3b82f6]/40 transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <h4 className="text-xs font-bold font-display text-[#3b82f6] uppercase tracking-wider">
                  {cap.title}
                </h4>
                <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance & Updates Policy */}
      <div className="bg-[#111827] p-8 border border-white/[0.08] rounded-xl space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center space-x-2 text-[#f1f5f9]">
          <HelpCircle className="h-5 w-5 text-[#3b82f6]" />
          <h2 className="text-xl font-bold font-display">Maintenance &amp; Update Policy</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
          To ensure transparency, once a website is delivered, the client receives <strong>one minor update free of charge</strong>. 
          This includes adjustments like banner revisions, small text corrections, minor image replacements, or minor content modifications. 
          This update is available only once.
        </p>
        <p className="text-xs sm:text-sm text-[#f1f5f9] leading-relaxed font-semibold">
          One minor update is included after website delivery. Additional updates are charged separately based on the scope of work.
        </p>
      </div>
    </div>
  );
}
