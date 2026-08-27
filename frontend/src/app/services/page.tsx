'use client';

import Link from 'next/link';
import { Check, Info, ArrowUpRight, HelpCircle, Code, Cpu, Palette, LayoutDashboard, Terminal, CheckCircle2 } from 'lucide-react';

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

  const digitalProductFeatures = [
    'Custom dashboard systems',
    'Database architecture design',
    'Internal business tools',
    'Data management platforms',
    'Custom admin panels',
    'API-integrated digital systems'
  ];

  const overviewCards = [
    {
      title: 'Web Development',
      desc: 'Modern, secure, responsive websites built on premium frameworks with clean architectural practices.',
      icon: <Code className="h-6 w-6 text-champagne" />,
      tag: '01 / Web',
      preview: 'Next.js / React / TypeScript'
    },
    {
      title: 'AI Automation',
      desc: 'Automate workflows, inquiries, and business processes intelligently to reduce manual operational overhead.',
      icon: <Cpu className="h-6 w-6 text-champagne" />,
      tag: '02 / AI',
      preview: 'Lead Pipelines / Triggers'
    },
    {
      title: 'Logo & Brand Identity',
      desc: 'Memorable brand visuals, logos, typography, and identity kits tailored to establish your tech presence.',
      icon: <Palette className="h-6 w-6 text-champagne" />,
      tag: '03 / Identity',
      preview: 'Vectors / Color Tokens'
    },
    {
      title: 'Digital Products',
      desc: 'Custom dashboards, databases, admin panels, and digital tools architected for scalability and ease of use.',
      icon: <LayoutDashboard className="h-6 w-6 text-champagne" />,
      tag: '04 / Systems',
      preview: 'PostgreSQL / RLS / Dashboards'
    }
  ];

  return (
    <div className="bg-obsidian text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#005BFF]">
          What We Offer
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#0B0F19]">
          Services &amp; Pricing
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Transparent starting estimates based on code quality and architectural requirements. 
          Final pricing depends on requirements, design, integrations, features, and overall project scope.
        </p>
      </div>

      {/* Visual-Driven Service Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((svc) => (
          <div
            key={svc.title}
            className="group p-6 bg-[#F1F5F9] border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.04)] rounded-xl hover:border-slate-300 transition-all duration-300 space-y-4 flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-white rounded-lg text-[#005BFF] border border-slate-200 transition-colors">
                  {svc.icon}
                </div>
                <span className="text-[10px] font-mono text-[#005BFF] uppercase font-bold">
                  {svc.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-[#0B0F19] group-hover:text-[#005BFF] transition-colors">
                {svc.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {svc.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-[#005BFF]">
              {svc.preview}
            </div>
          </div>
        ))}
      </div>

      {/* Website Pricing Tiers */}
      <div className="space-y-10 border-t border-slate-200 pt-16">
        <div className="text-center md:text-left space-y-2">
          <span className="inline-block px-3 py-1 bg-[#F1F5F9] border border-slate-200 text-[#005BFF] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
            Websites
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B0F19]">
            Website Development
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Modern, secure frontend interfaces backed by responsive web engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {websiteTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-[#F1F5F9] rounded-xl border ${
                tier.popular ? 'border-[#005BFF] shadow-md' : 'border-slate-200'
              } flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#00E5FF] text-slate-950 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Recommended
                </span>
              )}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-[#0B0F19]">{tier.name}</h3>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-xs font-medium text-slate-600">Starting from</span>
                  <span className="text-3xl font-bold font-display text-[#0B0F19]">{tier.price}</span>
                </div>
                <ul className="space-y-2.5 pt-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-2 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-[#005BFF] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <Link
                  href="/start-project"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-bold uppercase tracking-widest text-slate-950 bg-[#00E5FF] hover:bg-[#005BFF] hover:text-white rounded-sm transition-colors duration-300 shadow-sm"
                >
                  Select &amp; Inquire
                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#F1F5F9] border border-slate-200 rounded-lg flex items-start space-x-3 text-xs text-slate-600 max-w-3xl mx-auto">
          <Info className="h-5 w-5 text-[#005BFF] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#0B0F19]">Important Notice:</strong> These starting estimates represent base setups. 
            Final pricing depends on requirements, design, integrations, features, and overall project scope.
          </p>
        </div>
      </div>

      {/* AI Automation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-slate-200 pt-16">
        <div className="space-y-5">
          <span className="inline-block px-3 py-1 bg-[#F1F5F9] border border-slate-200 text-[#005BFF] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
            Automations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B0F19]">
            AI Automation
          </h2>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xs font-medium text-slate-600">Starting from</span>
            <span className="text-2xl font-bold font-display text-[#0B0F19]">₹4,999</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Boost operations by automating repetitive tasks, customer support triggers, and business processes. 
            We implement tailored automation scripts and tool integrations according to your specifications.
          </p>
          <div className="p-4 bg-[#F1F5F9] border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed space-y-2">
            <p>
              <strong className="text-[#0B0F19]">Disclaimer:</strong> Final pricing depends on business requirements, workflow complexity, 
              integrations, and automation scope. We do not promise functionality before requirements are understood.
            </p>
          </div>
        </div>

        <div className="bg-[#F1F5F9] p-7 border border-slate-200 rounded-xl space-y-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#005BFF]">
            Possible Automations:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            {aiServices.map((service) => (
              <li key={service} className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-[#005BFF] shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logo & Brand Identity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-slate-200 pt-16">
        <div className="space-y-5 lg:order-2">
          <span className="inline-block px-3 py-1 bg-[#F1F5F9] border border-slate-200 text-[#005BFF] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
            Design
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B0F19]">
            Logo &amp; Brand Identity
          </h2>
          <p className="text-sm text-[#005BFF] font-semibold font-display">
            Pricing is customized based on your concept and deliverables.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Create a premium presence that aligns with your tech assets. We compile comprehensive logo 
            proportions, typography tokens, custom business stationery concepts, and complete visual branding kits.
          </p>
        </div>

        <div className="bg-[#F1F5F9] p-7 border border-slate-200 rounded-xl space-y-4 lg:order-1 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#005BFF]">
            Possible Deliverables:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            {brandDeliverables.map((deliv) => (
              <li key={deliv} className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-[#005BFF] shrink-0" />
                <span>{deliv}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Digital Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-slate-200 pt-16">
        <div className="space-y-5">
          <span className="inline-block px-3 py-1 bg-[#F1F5F9] border border-slate-200 text-[#005BFF] rounded-lg text-xs font-mono font-bold uppercase tracking-widest">
            Products
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B0F19]">
            Digital Products
          </h2>
          <p className="text-sm text-[#005BFF] font-semibold font-display">
            Pricing is customized based on project scope and architecture.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Architecting future-proof digital tools, custom dashboards, database management systems, 
            admin panels, and internal business tools designed around your specific operational needs.
          </p>
        </div>

        <div className="bg-[#F1F5F9] p-7 border border-slate-200 rounded-xl space-y-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#005BFF]">
            Possible Solutions:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            {digitalProductFeatures.map((feat) => (
              <li key={feat} className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-[#005BFF] shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile App Section */}
      <div className="p-8 bg-[#F1F5F9] border border-slate-200 rounded-xl flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold font-display text-[#0B0F19]">Mobile App Development</h2>
          <p className="text-xs text-slate-600">
            Cross-platform applications optimized for iOS and Android environments.
          </p>
        </div>
        <div className="px-5 py-2 bg-white border border-slate-300 text-[#005BFF] rounded-full text-xs font-mono font-semibold uppercase tracking-widest">
          Coming Soon
        </div>
      </div>

      {/* Maintenance & Updates Policy */}
      <div className="bg-[#F1F5F9] p-8 border border-slate-200 rounded-xl space-y-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        <div className="flex items-center space-x-2 text-[#0B0F19]">
          <HelpCircle className="h-5 w-5 text-[#005BFF]" />
          <h2 className="text-xl font-bold font-display">Maintenance &amp; Update Policy</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          To ensure transparency, once a website is delivered, the client receives <strong>one minor update free of charge</strong>. 
          This includes adjustments like banner revisions, small text corrections, minor image replacements, or minor content modifications. 
          This update is available only once.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
          One minor update is included after website delivery. Additional updates are charged separately based on the scope of work.
        </p>
      </div>
    </div>
  );
}
