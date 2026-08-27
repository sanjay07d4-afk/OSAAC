'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Loader2, Sparkles, Phone, MessageSquare, Mail } from 'lucide-react';

export default function StartProject() {
  const router = useRouter();
  
  // Form State — preserves existing backend payload compatibility
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    phone: '',
    email: '',
    service: '',
    budget: '', // Retained internally for backend compatibility
    requirements: '',
    additional_information: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
      playSuccessChime();
      
      // Delay redirection so the user can read the success message
      setTimeout(() => {
        router.push(`/thank-you?id=${result.enquiryId}`);
      }, 4000);

    } catch (err: any) {
      console.error('[StartProject Form] Submission Error:', err);
      setErrors([err.message || 'Unable to connect to the backend server. Please check your connection.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#005BFF]">
            Let&apos;s Work Together
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#0B0F19]">
            Start Your Project
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Provide details about your web development, AI automation, or branding requirements below to request a tailored quote.
          </p>
        </div>

        {/* Success Notification Alert */}
        {success ? (
          <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-[#F1F5F9] border-2 border-[#005BFF] rounded-xl space-y-4 text-center animate-fade-in shadow-lg">
            <div className="inline-flex p-3.5 bg-white text-[#005BFF] rounded-full border border-slate-300">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold font-display text-[#0B0F19]">Submission Successful</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Your project enquiry has been submitted successfully. Thank you for contacting OSAAC. 
              We will review your requirements and get in touch with you promptly.
            </p>
            <p className="text-xs font-mono text-[#005BFF] animate-pulse pt-2">
              Redirecting you to the confirmation dashboard...
            </p>
          </div>
        ) : (
          /* Split-Screen Agency Form Layout — Fully Responsive */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Left Panel — Form (2/3 width on desktop, full width on mobile) */}
            <div className="lg:col-span-2 w-full">
              <div className="p-6 sm:p-9 md:p-10 bg-[#F1F5F9] border border-slate-200 rounded-xl space-y-7 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005BFF] block mb-1">
                    Enquiry Form
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0B0F19]">
                    Send Us a Message
                  </h2>
                </div>

                {/* Error Message Box */}
                {errors.length > 0 && (
                  <div className="p-4 bg-white border border-red-300 text-red-700 text-xs rounded-lg space-y-1">
                    <span className="font-semibold block">Please fix the following issues:</span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="client_name" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B0F19] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="client_name"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm text-[#0B0F19] placeholder:text-slate-400 focus:outline-none focus:border-[#005BFF] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B0F19] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm text-[#0B0F19] placeholder:text-slate-400 focus:outline-none focus:border-[#005BFF] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B0F19] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm text-[#0B0F19] placeholder:text-slate-400 focus:outline-none focus:border-[#005BFF] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="company_name" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B0F19] mb-2">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="e.g. Acme Corp (optional)"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm text-[#0B0F19] placeholder:text-slate-400 focus:outline-none focus:border-[#005BFF] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B0F19] mb-2">
                      Service Required *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm text-[#0B0F19] focus:outline-none focus:border-[#005BFF] transition-all cursor-pointer"
                    >
                      <option value="" disabled className="bg-white text-slate-400">Select a service...</option>
                      <option value="Website Development" className="bg-white text-[#0B0F19]">Website Development</option>
                      <option value="AI Automation" className="bg-white text-[#0B0F19]">AI Automation</option>
                      <option value="Logo & Brand Identity" className="bg-white text-[#0B0F19]">Logo &amp; Brand Identity</option>
                      <option value="Digital Products" className="bg-white text-[#0B0F19]">Digital Products</option>
                    </select>
                  </div>

                  {/* Row 4: Project Details */}
                  <div>
                    <label htmlFor="requirements" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B0F19] mb-2">
                      Project Specifications &amp; Requirements *
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Briefly describe your project, key functionality, timelines, or specific preferences..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm text-[#0B0F19] placeholder:text-slate-400 focus:outline-none focus:border-[#005BFF] transition-all resize-y min-h-[110px]"
                    />
                  </div>

                  {/* Row 5: Additional Information */}
                  <div>
                    <label htmlFor="additional_information" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0B0F19] mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="additional_information"
                      name="additional_information"
                      value={formData.additional_information}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any integrations or other details (optional)..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm text-[#0B0F19] placeholder:text-slate-400 focus:outline-none focus:border-[#005BFF] transition-all resize-y min-h-[90px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center py-4 px-6 text-xs font-bold uppercase tracking-widest text-slate-950 bg-[#00E5FF] hover:bg-[#005BFF] hover:text-white disabled:opacity-50 rounded-sm transition-all duration-300 shadow-sm cursor-pointer hover:-translate-y-0.5 min-h-[50px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Submitting Enquiry...
                        </>
                      ) : (
                        <>
                          START YOUR PROJECT
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Panel — Reach Us Directly (1/3 width on desktop, stacks below on mobile) */}
            <div className="lg:col-span-1 w-full flex flex-col">
              <div className="p-6 sm:p-8 bg-[#F1F5F9] border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.04)] rounded-xl flex-1 flex flex-col justify-between space-y-8">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005BFF] block">
                    Direct Channels
                  </span>
                  <h2 className="text-xl font-bold font-display text-[#0B0F19]">
                    Reach Us Directly
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Prefer to reach out directly? Connect with us via any of our verified communication channels.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Phone */}
                  <a
                    href="tel:+917603881020"
                    className="flex items-start gap-3.5 group p-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="p-2.5 bg-white rounded-lg text-[#005BFF] border border-slate-200 shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Phone</span>
                      <span className="text-sm font-bold font-display text-[#0B0F19] group-hover:text-[#005BFF] transition-colors">+91 7603881020</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917603881020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group p-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="p-2.5 bg-white rounded-lg text-[#005BFF] border border-slate-200 shrink-0">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">WhatsApp</span>
                      <span className="text-sm font-bold font-display text-[#0B0F19] group-hover:text-[#005BFF] transition-colors">+91 7603881020</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:OSAAC@gmail.com"
                    className="flex items-start gap-3.5 group p-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="p-2.5 bg-white rounded-lg text-[#005BFF] border border-slate-200 shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Email</span>
                      <span className="text-sm font-bold font-display text-[#0B0F19] group-hover:text-[#005BFF] transition-colors break-all">OSAAC@gmail.com</span>
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
