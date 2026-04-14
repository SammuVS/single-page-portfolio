/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import profileImg from "./assets/SAMIULLA .jpg";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Mail, 
  ChevronUp, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Terminal,
  Menu,
  X,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulating a real API call to send the email
      // In a real production app, you would use a service like Formspree, EmailJS, 
      // or a custom backend endpoint to send to sammuvs31@gmail.com
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setSubmitStatus('idle');
  };

  const navLinks = [
    { name: 'Intro', href: '#intro' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  const projects = [
    {
      title: "Smart City Traffic Simulator",
      tags: ["Spring Boot", "Java", "React"],
      description: "A real-time traffic simulation system using multi-agent modeling to optimize urban traffic flow and reduce congestion.",
      github: "https://github.com/SammuVS"
    },
    {
      title: "AU Lost and Found",
      tags: ["React", "Firebase", "Tailwind"],
      description: "A community-driven platform for students to report and recover lost items within the university campus.",
      github: "https://github.com/SammuVS"
    },
    {
      title: "IT Helpdesk Automation",
      tags: ["Python", "ML", "FastAPI"],
      description: "An automated ticketing system that uses machine learning to categorize and prioritize IT support requests.",
      github: "https://github.com/SammuVS"
    }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
          >
            SAMIULLA
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-brand-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="intro" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
              Available for Projects
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 text-balance">
              Hi, I'm Samiulla...
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed mb-10">
              I specialize in building scalable, high-performance applications
              with Java and Spring Boot, focusing on clean architecture and
              seamless user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#work"
                className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 animate-pulse" />
              <img
                src={profileImg}
                alt="Samiulla"
                className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                referrerPolicy="no-referrer"
              />
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                Selected Work
              </h2>
              <p className="text-gray-500 max-w-md">
                A collection of projects that demonstrate my technical expertise
                and problem-solving skills.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-black rounded-full" />
              <div className="w-4 h-1 bg-gray-200 rounded-full" />
              <div className="w-4 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass p-8 rounded-3xl hover:bg-white transition-all duration-500 hover:shadow-2xl flex flex-col h-full"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 bg-gray-100 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
                    {index === 0 ? (
                      <Cpu size={24} />
                    ) : index === 1 ? (
                      <Terminal size={24} />
                    ) : (
                      <Code2 size={24} />
                    )}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                >
                  View on GitHub <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
                Let's build <br /> something <br />{" "}
                <span className="text-gray-500">extraordinary.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                      Email Me
                    </p>
                    <p className="text-lg">sammuvs31@gmail.com</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">
                    Follow Me
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/SammuVS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      title="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sammu-vs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://x.com/SAMMU_VS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      title="X (Twitter)"
                    >
                      <Twitter size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61578711275375"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      title="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 p-8 md:p-12 rounded-[2rem] border border-zinc-800"
            >
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="text-black" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-zinc-400 mb-8">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="px-8 py-3 border border-zinc-800 rounded-xl font-bold hover:bg-zinc-800 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors placeholder:text-zinc-700 ${
                          errors.name
                            ? "border-red-500"
                            : "border-zinc-800 focus:border-white"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors placeholder:text-zinc-700 ${
                          errors.email
                            ? "border-red-500"
                            : "border-zinc-800 focus:border-white"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell me about your project..."
                      className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors placeholder:text-zinc-700 resize-none ${
                        errors.message
                          ? "border-red-500"
                          : "border-zinc-800 focus:border-white"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-red-500 text-sm font-medium">
                      Something went wrong. Please try again later.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-white text-black py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-8 py-4 border border-zinc-800 rounded-xl font-bold hover:bg-zinc-800 transition-all"
                    >
                      RESET
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          <div className="mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 text-sm">
              © 2026 Samiulla. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm font-medium text-zinc-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
