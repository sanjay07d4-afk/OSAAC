'use client';

import Link from 'next/link';
import { Check, Info, ArrowUpRight, HelpCircle, Code, Cpu, Palette, Smartphone, Terminal, CheckCircle2 } from 'lucide-react';
import StartProjectButton from '@/components/StartProjectButton';

export default function Services() {
  const websiteTiers = [
    {
      name: 'Basic Website',
      price: '₹7,999',
      features: [
        'Responsive layout (Mobile & Desktop)',
        'Custom contact form integration',
        'SEO metadata configurations',
        'Standard layout structure',
        '1 Included minor post-launch update'
      ]
    },
    {
      name: 'Business Website',
      price: '₹14,999',
      features: [
        'Enhanced visual styling',
        'Multi-page navigation routes',
        'In-depth contact/inquiry system',
        'Database collection settings',
        'Speed optimization setup',
        '1 Included minor post-launch update'
      ],
      popular: true
    },
    {
      name: 'Premium Website',
      price: '₹29,999',
      features: [
        'Full custom styling systems',
        'Backend Express/Node integrations',
        'Advanced workflow/database setup',
        'Custom visual components',
        'Secure API endpoint connections',
        '1 Included minor post-launch update'
      ]
    }
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

  const overviewCards = [
    {
      title: 'Web Development',
      desc: 'Modern, secure, responsive websites built on premium frameworks with clean architectural practices.',
      icon: <Code className="h-6 w-6 text-[#3b82f6]" />,
      tag: '01 / Web',
      preview: 'Next.js / React / TypeScript'
    },
    {
      title: 'AI Automation',
      desc: 'Automate workflows, inquiries, and business processes intelligently to reduce manual operational overhead.',
      icon: <Cpu className="h-6 w-6 text-[#3b82f6]" />,
      tag: '02 / AI',
      preview: 'Lead Pipelines / Triggers'
    },
    {
      title: 'Logo & Brand Identity',
      desc: 'Memorable brand visuals, logos, typography, and identity kits tailored to establish your tech presence.',
      icon: <Palette className="h-6 w-6 text-[#3b82f6]" />,
      tag: '03 / Identity',
      preview: 'Vectors / Color Tokens'
    },
    {
      title: 'Mobile App Development',
      desc: 'We build modern, scalable mobile applications that deliver seamless experiences across iOS and Android.',
      icon: <Smartphone className="h-6 w-6 text-[#3b82f6]" />,
      tag: '04 / Mobile',
      preview: 'iOS / Android / Cross-Platform'
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

      {/* Visual-Driven Service Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((svc) => (
          <div
            key={svc.title}
            className="group p-6 bg-[#111827] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-xl hover:border-white/20 transition-all duration-300 space-y-4 flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#0a0f1a] rounded-lg text-[#3b82f6] border border-white/[0.08] transition-colors">
                  {svc.icon}
                </div>
                <span className="text-[10px] font-mono text-[#3b82f6] uppercase font-bold">
                  {svc.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors">
                {svc.title}
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                {svc.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-white/[0.08] text-[10px] font-mono text-[#3b82f6]">
              {svc.preview}
            </div>
          </div>
        ))}
      </div>

      {/* Website Pricing Tiers */}
      <div className="space-y-10 border-t border-white/[0.08] pt-16">
        <div className="text-center md:text-left space-y-2">
          <span className="inline-block px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#3b82f6] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
            Websites
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
            Website Development
          </h2>
          <p className="text-xs sm:text-sm text-[#94a3b8]">
            Modern, secure frontend interfaces backed by responsive web engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {websiteTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-[#111827] rounded-xl border ${
                tier.popular ? 'border-[#3b82f6] shadow-lg shadow-blue-500/10' : 'border-white/[0.08]'
              } flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#3b82f6] text-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                  Recommended
                </span>
              )}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-[#f1f5f9]">{tier.name}</h3>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-xs font-medium text-[#94a3b8]">Starting from</span>
                  <span className="text-3xl font-bold font-display text-[#f1f5f9]">{tier.price}</span>
                </div>
                <ul className="space-y-2.5 pt-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-2 text-xs text-[#94a3b8]">
                      <Check className="h-4 w-4 text-[#3b82f6] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <Link
                  href="/start-project"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-bold uppercase tracking-widest text-white bg-[#3b82f6] hover:bg-[#2563eb] rounded-sm transition-colors duration-300 shadow-sm shadow-blue-500/20"
                >
                  Select &amp; Inquire
                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#111827] border border-white/[0.08] rounded-lg flex items-start space-x-3 text-xs text-[#94a3b8] max-w-3xl mx-auto">
          <Info className="h-5 w-5 text-[#3b82f6] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#f1f5f9]">Important Notice:</strong> These starting estimates represent base setups. 
            Final pricing depends on requirements, design, integrations, features, and overall project scope.
          </p>
        </div>
      </div>

      {/* AI Automation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-white/[0.08] pt-16">
        <div className="space-y-5">
          <span className="inline-block px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#3b82f6] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
            Automations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9]">
            AI Automation
          </h2>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xs font-medium text-[#94a3b8]">Starting from</span>
            <span className="text-2xl font-bold font-display text-[#f1f5f9]">₹4,999</span>
          </div>
          <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
            Boost operations by automating repetitive tasks, customer support triggers, and business processes. 
            We implement tailored automation scripts and tool integrations according to your specifications.
          </p>
          <div className="p-4 bg-[#111827] border border-white/[0.08] rounded-lg text-xs text-[#94a3b8] leading-relaxed space-y-2">
            <p>
              <strong className="text-[#f1f5f9]">Disclaimer:</strong> Final pricing depends on business requirements, workflow complexity, 
              integrations, and automation scope. We do not promise functionality before requirements are understood.
            </p>
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

      {/* Logo & Brand Identity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-white/[0.08] pt-16">
        <div className="space-y-5 lg:order-2">
          <span className="inline-block px-3 py-1 bg-[#111827] border border-white/[0.08] text-[#3b82f6] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
            Design
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
        </div>

        <div className="bg-[#111827] p-7 border border-white/[0.08] rounded-xl space-y-4 lg:order-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
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
