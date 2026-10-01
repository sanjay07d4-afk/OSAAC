'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactBox() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    phone: '',
    email: '',
    service: 'Website',
    budget: '',
    requirements: '',
    additional_information: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const services = [
    'Website',
    'AI Automation',
    'Mobile App',
    'Logo & Brand Identity'
  ];

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
    if (!formData.service) errs.push('Please select a Service');
    if (!formData.requirements.trim() || formData.requirements.trim().length < 10) {
      errs.push('Message/Requirements must be at least 10 characters long');
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
        throw new Error(result.message || result.errors?.join(', ') || 'Submission failed. Please check details.');
      }

      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        if (result.enquiryId) {
          router.push(`/thank-you?id=${result.enquiryId}`);
        }
      }, 3500);

    } catch (err: any) {
      console.error('[ContactBox] Submission Error:', err);
      setErrors([err.message || 'Unable to connect to the backend server. Please check your connection.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="osaac-contact-box">
      {/* Ambient Moving Glow Aura */}
      <div className="osaac-contact-box__glow" aria-hidden="true" />
      <div className="osaac-contact-box__beam" aria-hidden="true" />

      {/* Main Content Surface */}
      <div className="osaac-contact-box__content">
        {/* Box Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-[11px] font-mono font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            Send a Direct Message
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#f1f5f9] tracking-tight">
            Start a Conversation
          </h3>
          <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
            Fill in your project brief or inquiry. Our engineering team responds within 24 business hours.
          </p>
        </div>

        {/* Success Alert View */}
        {success ? (
          <div className="osaac-contact-box__success animate-fade-in">
            <div className="inline-flex p-3 bg-[#0a1324] rounded-full text-[#38bdf8] border border-[#38bdf8]/30 mb-3">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <h4 className="text-lg font-bold text-[#f1f5f9] mb-1">Message Received!</h4>
            <p className="text-xs text-[#94a3b8] max-w-sm mx-auto mb-3 leading-relaxed">
              Thank you for reaching out. We have received your message and will get back to you promptly.
            </p>
            <span className="text-[11px] font-mono text-[#38bdf8] animate-pulse">
              Redirecting to confirmation dashboard...
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Error Notification */}
            {errors.length > 0 && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1 text-xs text-red-400">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Please review the following:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] pl-1 text-red-300">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Input Row: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact_name" className="text-xs font-medium text-[#cbd5e1] block">
                  Full Name <span className="text-[#38bdf8]">*</span>
                </label>
                <input
                  id="contact_name"
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  disabled={loading}
                  className="osaac-contact-box__input"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact_phone" className="text-xs font-medium text-[#cbd5e1] block">
                  Phone Number <span className="text-[#38bdf8]">*</span>
                </label>
                <input
                  id="contact_phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  disabled={loading}
                  className="osaac-contact-box__input"
                  required
                />
              </div>
            </div>

            {/* Input Row: Email & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact_email" className="text-xs font-medium text-[#cbd5e1] block">
                  Email Address <span className="text-[#38bdf8]">*</span>
                </label>
                <input
                  id="contact_email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  disabled={loading}
                  className="osaac-contact-box__input"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact_company" className="text-xs font-medium text-[#cbd5e1] block">
                  Company / Organization <span className="text-[#64748b] text-[10px]">(Optional)</span>
                </label>
                <input
                  id="contact_company"
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  disabled={loading}
                  className="osaac-contact-box__input"
                />
              </div>
            </div>

            {/* Service Selection Pills */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#cbd5e1] block">
                Select Service Category <span className="text-[#38bdf8]">*</span>
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
                      className={`osaac-contact-box__pill ${isSelected ? 'is-selected' : ''}`}
                    >
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Requirements / Message */}
            <div className="space-y-1.5">
              <label htmlFor="contact_requirements" className="text-xs font-medium text-[#cbd5e1] block">
                Your Requirements or Message <span className="text-[#38bdf8]">*</span>
              </label>
              <textarea
                id="contact_requirements"
                name="requirements"
                rows={3}
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Tell us about what you want to build, workflow goals, or timelines..."
                disabled={loading}
                className="osaac-contact-box__input osaac-contact-box__textarea"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="osaac-contact-box__submit"
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[#071324]" />
                    <span>Transmitting Message...</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
