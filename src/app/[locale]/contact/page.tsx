'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

const regions = ['Gent', 'Mariakerke', 'Drongen', 'Sint-Martens-Latem', 'Ledeberg', 'Gentbrugge', 'Merelbeke'];

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    gemeente: '',
    projectType: '',
    timing: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  // Build contact info from translations
  const contactInfo = [
    {
      icon: Phone,
      title: t('phone'),
      content: '+32 493 81 27 89',
      href: 'tel:+32493812789',
      description: t('monFri')
    },
    {
      icon: Mail,
      title: t('email'),
      content: 'info@namconstruction.be',
      href: 'mailto:info@namconstruction.be',
      description: t('responseTime')
    },
    {
      icon: MessageSquare,
      title: t('whatsapp'),
      content: t('directContact'),
      href: 'https://wa.me/32493812789',
      description: t('sendPhotos')
    },
    {
      icon: MapPin,
      title: t('office'),
      content: 'Zwijnaardsesteenweg 683',
      description: '9000 Gent'
    }
  ];

  // Build arrays from translations
  const projectTypes = [
    t('projectTypes.0'),
    t('projectTypes.1'),
    t('projectTypes.2'),
    t('projectTypes.3'),
    t('projectTypes.4'),
    t('projectTypes.5'),
    t('projectTypes.6'),
  ];

  const timings = [
    t('timings.0'),
    t('timings.1'),
    t('timings.2'),
    t('timings.3'),
  ];

  const budgetRanges = [
    t('budgetRanges.0'),
    t('budgetRanges.1'),
    t('budgetRanges.2'),
    t('budgetRanges.3'),
    t('budgetRanges.4'),
    t('budgetRanges.5'),
  ];

  const expectations = [
    { text: t('processItems.0'), icon: Clock },
    { text: t('processItems.1'), icon: Phone },
    { text: t('processItems.2'), icon: MapPin },
    { text: t('processItems.3'), icon: CheckCircle2 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-ivory-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-accent-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-12 h-px bg-accent-500" />
                <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                  {t('badge')}
                </span>
              </div>

              <h1
                className={`text-display-lg md:text-display-xl font-display font-medium text-noir-900 mb-6 transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                {t('title')}{' '}
                <span className="text-accent-600 italic">{t('titleHighlight')}</span>
              </h1>

              <p
                className={`text-xl text-noir-500 leading-relaxed mb-10 transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                {t('description')}
              </p>

              {/* Quick contact buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <a
                  href="tel:+32493812789"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-500 text-white font-medium overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <Phone className="relative z-10 h-5 w-5" />
                  <span className="relative z-10 uppercase tracking-wider text-sm">{t('callUs')}</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="https://wa.me/32493812789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-noir-200 text-noir-700 font-medium hover:border-accent-500 hover:text-accent-600 transition-all duration-300"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="uppercase tracking-wider text-sm">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Image */}
            <div
              className={`relative hidden lg:block transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Contact Nam Construction"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-900/60 via-transparent to-transparent" />

                {/* Hover border */}
                <div className="absolute inset-4 border-2 border-accent-400/50" />

                {/* Floating card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent-500 flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-medium text-noir-900 text-lg">{t('freeConsultation')}</p>
                      <p className="text-sm text-noir-500">{t('noObligations')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-noir-900 py-12 border-t border-white/10">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="group p-6 border border-white/10 hover:border-accent-500/50 bg-white/5 hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-500/20 flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-500">
                      <item.icon className="h-5 w-5 text-accent-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{item.title}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('https') ? '_blank' : undefined}
                          rel={item.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                          className="text-accent-400 hover:text-accent-300 transition-colors font-medium"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-white/80">{item.content}</p>
                      )}
                      <p className="text-sm text-white/50 mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <div className="bg-white p-8 md:p-12 border border-noir-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-px bg-accent-500" />
                  <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                    {t('formBadge')}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2">
                  {t('formTitle')}
                </h2>
                <p className="text-noir-500 mb-10">
                  {t('formDescription')}
                </p>

                {isSubmitted ? (
                  <div className="bg-accent-50 border border-accent-200 p-10 text-center">
                    <div className="w-20 h-20 bg-accent-500 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-noir-900 mb-3">
                      {t('successTitle')}
                    </h3>
                    <p className="text-noir-600 mb-8 max-w-md mx-auto">
                      {t('successMessage')}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({
                          name: '',
                          email: '',
                          phone: '',
                          gemeente: '',
                          projectType: '',
                          timing: '',
                          budget: '',
                          message: ''
                        });
                      }}
                      className="inline-flex items-center px-6 py-3 border-2 border-accent-500 text-accent-600 font-medium hover:bg-accent-500 hover:text-white transition-all duration-300"
                    >
                      {t('newRequest')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                          {t('nameLabel')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none"
                          placeholder={t('namePlaceholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                          {t('emailLabel')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none"
                          placeholder={t('emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                          {t('phoneLabel')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none"
                          placeholder={t('phonePlaceholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="gemeente" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                          {t('municipalityLabel')} *
                        </label>
                        <input
                          type="text"
                          id="gemeente"
                          name="gemeente"
                          required
                          value={formState.gemeente}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none"
                          placeholder={t('municipalityPlaceholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                        {t('projectTypeLabel')} *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formState.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none"
                      >
                        <option value="">{t('projectTypePlaceholder')}</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="timing" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                          {t('timingLabel')}
                        </label>
                        <select
                          id="timing"
                          name="timing"
                          value={formState.timing}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none"
                        >
                          <option value="">{t('timingPlaceholder')}</option>
                          {timings.map((timing) => (
                            <option key={timing} value={timing}>{timing}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                          {t('budgetLabel')}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formState.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none"
                        >
                          <option value="">{t('budgetPlaceholder')}</option>
                          {budgetRanges.map((budget) => (
                            <option key={budget} value={budget}>{budget}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-noir-700 mb-2 uppercase tracking-wider">
                        {t('messageLabel')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-noir-200 bg-ivory-50 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all duration-300 outline-none resize-none"
                        placeholder={t('messagePlaceholder')}
                      />
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-ivory-50 border border-noir-100">
                      <div className="w-10 h-10 bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-accent-600" />
                      </div>
                      <p className="text-sm text-noir-600">
                        {t('photoTip')}{' '}
                        <a href="https://wa.me/32493812789" className="text-accent-600 hover:underline font-medium">
                          WhatsApp
                        </a>{' '}
                        {t('or')}{' '}
                        <a href="mailto:info@namconstruction.be" className="text-accent-600 hover:underline font-medium">
                          email
                        </a>
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent-500 text-white font-medium overflow-hidden transition-all duration-500 hover:shadow-xl"
                    >
                      <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <Send className="relative z-10 h-5 w-5" />
                      <span className="relative z-10 uppercase tracking-wider text-sm">{t('submitButton')}</span>
                      <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-sm text-noir-500">
                      {t('privacyConsent')}{' '}
                      <Link href="/privacy" className="text-accent-600 hover:underline">
                        {t('privacyLink')}
                      </Link>.
                    </p>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* What to expect */}
              <AnimatedSection delay={100}>
                <div className="bg-noir-900 text-white p-8 relative overflow-hidden">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-px bg-accent-400" />
                      <span className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                        {t('processBadge')}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-medium mb-6">{t('processTitle')}</h3>
                    <ul className="space-y-4">
                      {expectations.map((item, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-5 w-5 text-accent-400" />
                          </div>
                          <span className="text-white/80 pt-2">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>

              {/* Opening hours */}
              <AnimatedSection delay={200}>
                <div className="bg-white p-8 border border-noir-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-px bg-accent-500" />
                    <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                      {t('availabilityBadge')}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-medium text-noir-900 mb-6">{t('openingHours')}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-noir-100">
                      <span className="text-noir-600">{t('monday-friday')}</span>
                      <span className="font-medium text-noir-900 bg-accent-50 px-3 py-1 text-sm">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-noir-100">
                      <span className="text-noir-600">{t('saturday')}</span>
                      <span className="font-medium text-noir-900 bg-ivory-100 px-3 py-1 text-sm">{t('byAppointment')}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-noir-600">{t('sunday')}</span>
                      <span className="font-medium text-noir-500 bg-noir-100 px-3 py-1 text-sm">{t('closed')}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Region info */}
              <AnimatedSection delay={300}>
                <div className="bg-accent-50 p-8 border border-accent-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-px bg-accent-500" />
                    <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                      {t('regionBadge')}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-medium text-noir-900 mb-4">{t('regionTitle')}</h3>
                  <p className="text-noir-600 mb-6">
                    {t('regionDescription')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <span
                        key={region}
                        className="px-3 py-1.5 bg-white text-sm text-noir-700 border border-accent-200"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-accent-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg font-display font-medium text-white mb-6">
                {t('ctaTitle')}
              </h2>
              <p className="text-xl text-white/80 mb-10">
                {t('ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/offerte"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-accent-700 font-medium overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                    {t('ctaPrimary')}
                  </span>
                  <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="/afspraak"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <span className="uppercase tracking-wider text-sm">{t('ctaSecondary')}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
