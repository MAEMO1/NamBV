'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  Upload,
  CheckCircle2
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefoon',
    content: '+32 123 45 67 89',
    href: 'tel:+32123456789',
    description: 'Ma-Vr 8:00-18:00'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@namconstruction.be',
    href: 'mailto:info@namconstruction.be',
    description: 'Reactie binnen 24u'
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    content: 'Stuur foto\'s van uw project',
    href: 'https://wa.me/32123456789',
    description: 'Snel en laagdrempelig'
  },
  {
    icon: MapPin,
    title: 'Regio',
    content: 'Gent en omstreken',
    description: 'Oost-Vlaanderen'
  }
];

const projectTypes = [
  'Totaalrenovatie',
  'Renovatie & verbouwing',
  'Badkamerrenovatie',
  'Keukenrenovatie',
  'Afwerking (tegelwerk, plakwerk, ...)',
  'Technieken (elektriciteit, sanitair)',
  'Anders'
];

const timings = [
  'Zo snel mogelijk',
  'Binnen 3 maanden',
  '3-6 maanden',
  'Later / nog niet bepaald'
];

const budgetRanges = [
  'Nog geen idee',
  '< €25.000',
  '€25.000 - €50.000',
  '€50.000 - €100.000',
  '€100.000 - €200.000',
  '> €200.000'
];

export default function ContactPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Contacteer ons
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Klaar om uw renovatieproject te bespreken? Neem contact op voor een gratis en
              vrijblijvend adviesgesprek. We reageren binnen 24 uur.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-white border-b border-neutral-100 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-neutral-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-neutral-700">{item.content}</p>
                    )}
                    <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-display font-semibold text-neutral-900">
                  Vraag een gratis adviesgesprek aan
                </h2>
              </div>

              {isSubmitted ? (
                <div className="bg-primary-50 rounded-2xl p-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                    Bedankt voor uw aanvraag!
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    We hebben uw bericht ontvangen en nemen binnen 24 uur contact met u op.
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
                    className="btn-secondary"
                  >
                    Nieuwe aanvraag
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Naam *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="Uw naam"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="uw@email.be"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="+32 ..."
                      />
                    </div>
                    <div>
                      <label htmlFor="gemeente" className="block text-sm font-medium text-neutral-700 mb-2">
                        Gemeente *
                      </label>
                      <input
                        type="text"
                        id="gemeente"
                        name="gemeente"
                        required
                        value={formState.gemeente}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="Gent, Mariakerke, ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-2">
                      Type project *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formState.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                    >
                      <option value="">Selecteer type project</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="timing" className="block text-sm font-medium text-neutral-700 mb-2">
                        Wanneer wilt u starten?
                      </label>
                      <select
                        id="timing"
                        name="timing"
                        value={formState.timing}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                      >
                        <option value="">Selecteer timing</option>
                        {timings.map((timing) => (
                          <option key={timing} value={timing}>{timing}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-2">
                        Indicatief budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                      >
                        <option value="">Selecteer budget</option>
                        {budgetRanges.map((budget) => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Vertel iets over uw project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
                      placeholder="Beschrijf kort uw project, wensen of vragen..."
                    />
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                    <Upload className="h-5 w-5 text-neutral-400" />
                    <p className="text-sm text-neutral-600">
                      Foto&apos;s of plannen? Stuur ze via{' '}
                      <a href="https://wa.me/32123456789" className="text-primary-600 hover:underline">
                        WhatsApp
                      </a>{' '}
                      of{' '}
                      <a href="mailto:info@namconstruction.be" className="text-primary-600 hover:underline">
                        email
                      </a>
                    </p>
                  </div>

                  <button type="submit" className="btn-primary w-full md:w-auto">
                    <Send className="h-5 w-5 mr-2" />
                    Verstuur aanvraag
                  </button>

                  <p className="text-sm text-neutral-500">
                    Door dit formulier te versturen, gaat u akkoord met onze privacyverklaring.
                    We gebruiken uw gegevens enkel om contact met u op te nemen over uw aanvraag.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:pl-8">
              <div className="bg-primary-900 text-white rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Wat kunt u verwachten?</h3>
                <ul className="space-y-4">
                  {[
                    'Reactie binnen 24 uur',
                    'Korte telefonische intake (10 min)',
                    'Indien relevant: gratis plaatsbezoek',
                    'Gedetailleerde offerte binnen 1-2 weken'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-primary-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                  <h3 className="text-xl font-semibold text-neutral-900">Openingsuren</h3>
                </div>
                <div className="space-y-2 text-neutral-600">
                  <div className="flex justify-between">
                    <span>Maandag - Vrijdag</span>
                    <span className="font-medium text-neutral-900">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zaterdag</span>
                    <span className="font-medium text-neutral-900">Op afspraak</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zondag</span>
                    <span className="font-medium text-neutral-900">Gesloten</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
