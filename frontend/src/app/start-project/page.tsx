'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Phone, MessageSquare, Mail, AlertCircle } from 'lucide-react';
import StartProjectFormButton from '@/components/StartProjectFormButton';

export default function StartProject() {
  const router = useRouter();
  
  // Form State — preserves existing backend payload compatibility
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    phone: '',
    email: '',
    service: 'Website Development',
    budget: '', // Retained internally for backend compatibility
    requirements: '',
    additional_information: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const services = [
    'Website Development',
    'AI Automation',
    'Logo & Brand Identity',
    'Mobile App Development'
  ];

  // Play custom synthesized sound chime
  const playSuccessChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      // High-pitched pleasant dual chime
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);

      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(880.00, ctx.currentTime); // A5
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.5);
      }, 120);

    } catch (e) {
      console.warn('Web Audio Context not supported or allowed by browser policies.', e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceName: string) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
  };

  const validateForm = () => {
    const errs: string[] = [];
    if (!formData.client_name.trim()) errs.push('Full Name is required');
    if (!formData.phone.trim()) errs.push('Phone Number is required');
    if (!formData.email.trim() || !formData.email.includes('@')) errs.push('A valid Email address is required');
    if (!formData.service) errs.push('Please select a Service Required');
    if (!formData.requirements.trim() || formData.requirements.trim().length < 10) {
      errs.push('Project requirements details must be at least 10 characters');
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const rawBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://osaac.onrender.com';
    const backendUrl = rawBackendUrl.replace(/\/+$/, '').replace(/\/api$/, '');

    try {
      const response = await fetch(`${backendUrl}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || result.errors?.join(', ') || 'Submission failed');
      }

      // Success sequence
      setIsSent(true);
      playSuccessChime();
      
      // Delay transition so user clearly observes the "Sent" checkmark state
      setTimeout(() => {
        setSuccess(true);
      }, 1500);

      // Delay redirection so the user can read the success message
      setTimeout(() => {
        router.push(`/thank-you?id=${result.enquiryId}`);
      }, 4500);

    } catch (err: any) {
      console.error('[StartProject Form] Submission Error:', err);
      setIsSent(false);
      setErrors([err.message || 'Unable to connect to the backend server. Please check your connection.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0f1a] text-[#f1f5f9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3b82f6]">
            Let&apos;s Work Together
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#f1f5f9]">
            Start Your Project
          </h1>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            Provide details about your web development, AI automation, or branding requirements below to request a tailored quote.
          </p>
        </div>

        {/* Success Notification Alert */}
        {success ? (
          <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-[#111827] border-2 border-[#3b82f6] rounded-2xl space-y-4 text-center animate-fade-in shadow-xl">
            <div className="inline-flex p-3.5 bg-[#0a0f1a] text-[#3b82f6] rounded-full border border-white/[0.08]">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold font-display text-[#f1f5f9]">Submission Successful</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-lg mx-auto">
              Your project enquiry has been submitted successfully. Thank you for contacting OSAAC. 
              We will review your requirements and get in touch with you promptly.
            </p>
            <p className="text-xs font-mono text-[#3b82f6] animate-pulse pt-2">
              Redirecting you to the confirmation dashboard...
            </p>
          </div>
        ) : (
          /* Split-Screen Agency Form Layout — Fully Responsive */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Left Panel — Reference Inspired Contact Form Box (2/3 width on desktop) */}
            <div className="lg:col-span-2 w-full">
              <div className="osaac-start-project-contact-box">
                {/* Subtle Ambient Moving Glow Aura */}
                <div className="osaac-start-project-contact-box__glow" aria-hidden="true" />
                <div className="osaac-start-project-contact-box__beam" aria-hidden="true" />

                {/* Form Surface Content */}
                <div className="osaac-start-project-contact-box__content">
                  <div className="space-y-2 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-[11px] font-mono font-medium tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                      Direct Project Brief
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9] tracking-tight">
                      Leave us a brief message
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                      Tell us about your goals, timeline, and key requirements. We&apos;ll analyze your brief and respond with a strategic estimate.
                    </p>
                  </div>

                  {/* Error Message Box */}
                  {errors.length > 0 && (
                    <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-xl space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                        <span>Please review the following requirements:</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-red-300">
                        {errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Row 1: Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="client_name" className="text-xs font-medium text-[#cbd5e1] block">
                          Your Name <span className="text-[#38bdf8]">*</span>
                        </label>
                        <input
                          type="text"
                          id="client_name"
                          name="client_name"
                          value={formData.client_name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Alex Morgan"
                          className="osaac-sp-cb-input"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-medium text-[#cbd5e1] block">
                          Email <span className="text-[#38bdf8]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="alex@example.com"
                          className="osaac-sp-cb-input"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-medium text-[#cbd5e1] block">
                          Phone Number <span className="text-[#38bdf8]">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="+91 9876543210"
                          className="osaac-sp-cb-input"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="company_name" className="text-xs font-medium text-[#cbd5e1] block">
                          Company / Business Name <span className="text-[#64748b] text-[10px]">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="company_name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="Acme Corp"
                          className="osaac-sp-cb-input"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#cbd5e1] block">
                        I&apos;m looking for... <span className="text-[#38bdf8]">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((srv) => {
                          const isSelected = formData.service === srv;
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => handleServiceSelect(srv)}
                              disabled={loading}
                              className={`osaac-sp-cb-pill ${isSelected ? 'is-selected' : ''}`}
                            >
                              <span className="osaac-sp-cb-pill__dot" aria-hidden="true" />
                              <span>{srv}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 4: Project Description / Requirements */}
                    <div className="space-y-1.5">
                      <label htmlFor="requirements" className="text-xs font-medium text-[#cbd5e1] block">
                        Briefly describe your project idea... <span className="text-[#38bdf8]">*</span>
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                        rows={4}
                        disabled={loading}
                        placeholder="Tell us about the project goals, functionality, timeline, or reference designs you love..."
                        className="osaac-sp-cb-input osaac-sp-cb-textarea"
                      />
                    </div>

                    {/* Row 5: Additional Information */}
                    <div className="space-y-1.5">
                      <label htmlFor="additional_information" className="text-xs font-medium text-[#cbd5e1] block">
                        Additional Information <span className="text-[#64748b] text-[10px]">(Optional)</span>
                      </label>
                      <textarea
                        id="additional_information"
                        name="additional_information"
                        value={formData.additional_information}
                        onChange={handleChange}
                        rows={2}
                        disabled={loading}
                        placeholder="Any integrations, tech stacks, or other requirements..."
                        className="osaac-sp-cb-input osaac-sp-cb-textarea"
                      />
                    </div>

                    {/* Send Message CTA Button with Animated States */}
                    <div className="pt-2">
                      <StartProjectFormButton
                        type="submit"
                        disabled={loading || isSent}
                        loading={loading}
                        success={isSent}
                        fullWidth
                      >
                        Send Message
                      </StartProjectFormButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Panel — Reach Us Directly (1/3 width on desktop) */}
            <div className="lg:col-span-1 w-full flex flex-col">
              <div className="p-6 sm:p-8 bg-[#111827] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-2xl flex-1 flex flex-col justify-between space-y-8">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] block">
                    Direct Channels
                  </span>
                  <h2 className="text-xl font-bold font-display text-[#f1f5f9]">
                    Reach Us Directly
                  </h2>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    Prefer to reach out directly? Connect with us via any of our verified communication channels.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Phone */}
                  <a
                    href="tel:+917603881020"
                    className="flex items-start gap-3.5 group p-3 rounded-xl hover:bg-[#0a0f1a] transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="p-2.5 bg-[#0a0f1a] rounded-lg text-[#3b82f6] border border-white/[0.08] shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider block">Phone</span>
                      <span className="text-sm font-bold font-display text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors">+91 7603881020</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917603881020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group p-3 rounded-xl hover:bg-[#0a0f1a] transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="p-2.5 bg-[#0a0f1a] rounded-lg text-[#3b82f6] border border-white/[0.08] shrink-0">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider block">WhatsApp</span>
                      <span className="text-sm font-bold font-display text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors">+91 7603881020</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:osaactech@gmail.com"
                    className="flex items-start gap-3.5 group p-3 rounded-xl hover:bg-[#0a0f1a] transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="p-2.5 bg-[#0a0f1a] rounded-lg text-[#3b82f6] border border-white/[0.08] shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider block">Email</span>
                      <span className="text-sm font-bold font-display text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors break-all">osaactech@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
