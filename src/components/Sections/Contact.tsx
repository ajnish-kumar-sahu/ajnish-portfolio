import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { personalInfo, socialLinks } from '../../data/portfolio';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import type { ContactFormData, ContactFormErrors } from '../../types';

// Map social icon string → Lucide component
const SocialIcon: React.FC<{ icon: string; className?: string; style?: React.CSSProperties }> = ({ icon, className = '', style }) => {
  switch (icon.toLowerCase()) {
    case 'github': return <Github className={className} style={style} />;
    case 'linkedin': return <Linkedin className={className} style={style} />;
    case 'twitter': return <Twitter className={className} style={style} />;
    default: return <MessageCircle className={className} style={style} />;
  }
};

const SOCIAL_ACCENTS = ['#53ddfc', '#ba9eff', '#ff86c3', '#ffd580'];

export const Contact: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: formData.name.trim(), email: formData.email.trim(),
        subject: formData.subject.trim(), message: formData.message.trim(), status: 'new',
      }]).select();
      if (error) throw new Error(error.message);
      toast.success('Message sent! I\'ll get back to you soon. 🚀');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      toast.error('Failed to send. Please try emailing me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = 'w-full px-4 py-3.5 bg-[#0e0e0e] border rounded-xl text-white placeholder-[#494847] font-mono text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#53ddfc]/40';

  return (
    <section id="contact" className="py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#53ddfc]/6 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ba9eff]/6 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#131313] border border-[#262626] text-[#53ddfc] text-xs font-bold font-mono tracking-widest uppercase mb-6"
          >
            <Mail size={14} />
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-display mb-6"
          >
            Let's{' '}
            <span className="italic text-[#53ddfc]">Collaborate</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-[#adaaaa] font-sans"
          >
            Open to internships, collaborative projects, and networking opportunities. Let's build something remarkable together.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                { icon: <Mail size={20} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, accent: '#53ddfc', glow: 'rgba(83,221,252,0.2)' },
                { icon: <Phone size={20} />, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, accent: '#6ee7b7', glow: 'rgba(110,231,183,0.2)' },
                { icon: <MapPin size={20} />, label: 'Location', value: personalInfo.location, href: undefined, accent: '#ba9eff', glow: 'rgba(186,158,255,0.2)' },
              ].filter(item => item.value).map(item => (
                <div
                  key={item.label}
                  className="group relative bg-[#131313] border border-[#262626] rounded-2xl p-5 hover:border-[#494847] transition-all duration-500 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at top left, ${item.glow}, transparent 60%)` }}
                  />
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}` }}
                  />
                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-[#0e0e0e] shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: item.accent, boxShadow: `0 4px 16px ${item.glow}` }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-[#494847] uppercase tracking-[0.2em] mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white text-sm font-medium hover:text-[#53ddfc] transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-white text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-[10px] font-mono font-bold text-[#494847] uppercase tracking-[0.25em] mb-5">Connect On Social</p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, idx) => {
                  const accent = SOCIAL_ACCENTS[idx % SOCIAL_ACCENTS.length];
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 bg-[#131313] border border-[#262626] rounded-xl px-4 py-3 hover:border-[#494847] transition-all duration-300"
                    >
                      <SocialIcon icon={social.icon} className="w-4 h-4 transition-colors duration-300" style={{ color: accent } as React.CSSProperties} />
                      <span className="text-xs font-mono font-semibold text-[#adaaaa] group-hover:text-white transition-colors">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 bg-[#131313] border border-[#262626] rounded-2xl px-5 py-4">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-60" />
              </div>
              <p className="text-sm text-[#adaaaa] font-sans">
                <span className="text-emerald-400 font-bold font-mono">Available</span> for internships &amp; freelance projects
              </p>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-[#131313] border border-[#262626] rounded-2xl p-8 overflow-hidden" style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#53ddfc]/8 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ba9eff]/8 rounded-full blur-2xl pointer-events-none" />

              {/* Grid texture */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              <div className="relative z-10">
                <p className="text-[10px] font-mono font-bold text-[#494847] uppercase tracking-[0.25em] mb-6">Send Message</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-400 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 32px rgba(52,211,153,0.4)' }}>
                      <CheckCircle size={32} className="text-[#0e0e0e]" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-[#adaaaa] font-sans text-sm">I'll get back to you as soon as possible.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#494847] uppercase tracking-[0.15em] mb-2">Name *</label>
                        <input
                          type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}
                          placeholder="Ajnish Kumar"
                          className={`${inputBase} ${errors.name ? 'border-red-500 focus:ring-red-500/30' : 'border-[#262626] hover:border-[#494847] focus:border-[#53ddfc]'}`}
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#494847] uppercase tracking-[0.15em] mb-2">Email *</label>
                        <input
                          type="email" name="email" id="email" value={formData.email} onChange={handleInputChange}
                          placeholder="you@example.com"
                          className={`${inputBase} ${errors.email ? 'border-red-500 focus:ring-red-500/30' : 'border-[#262626] hover:border-[#494847] focus:border-[#53ddfc]'}`}
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#494847] uppercase tracking-[0.15em] mb-2">Subject *</label>
                      <input
                        type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange}
                        placeholder="Project collaboration, internship..."
                        className={`${inputBase} ${errors.subject ? 'border-red-500 focus:ring-red-500/30' : 'border-[#262626] hover:border-[#494847] focus:border-[#53ddfc]'}`}
                      />
                      {errors.subject && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#494847] uppercase tracking-[0.15em] mb-2">Message *</label>
                      <textarea
                        name="message" id="message" value={formData.message} onChange={handleInputChange} rows={5}
                        placeholder="Tell me about your project or how we can work together..."
                        className={`${inputBase} resize-none ${errors.message ? 'border-red-500 focus:ring-red-500/30' : 'border-[#262626] hover:border-[#494847] focus:border-[#53ddfc]'}`}
                      />
                      <div className="flex justify-between items-center mt-1.5">
                        {errors.message ? <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p> : <div />}
                        <p className={`text-xs font-mono ${formData.message.length > 800 ? 'text-red-400' : formData.message.length > 600 ? 'text-yellow-400' : 'text-[#494847]'}`}>
                          {formData.message.length}/1000
                        </p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 py-4 text-[#0e0e0e] font-display font-bold text-sm rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #53ddfc, #ba9eff)',
                        boxShadow: '0 4px 24px rgba(83,221,252,0.25)',
                      }}
                    >
                      {isSubmitting ? (
                        <><LoadingSpinner size="sm" className="text-[#0e0e0e]" /><span>Transmitting...</span></>
                      ) : (
                        <><Send size={18} /><span>Send Message</span></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
