'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  Upload,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Shield,
  Sparkles
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefoon',
    content: '+32 (0) 493 81 27 89',
    href: 'tel:+32493812789',
    description: 'Ma-Vr 8:00-18:00',
    color: 'forest'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@namconstruction.be',
    href: 'mailto:info@namconstruction.be',
    description: 'Reactie binnen 24u',
    color: 'terracotta'
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    content: 'Stuur foto\'s van uw project',
    href: 'https://wa.me/32493812789',
    description: 'Snel en laagdrempelig',
    color: 'sand'
  },
  {
    icon: MapPin,
    title: 'Kantoor',
    content: 'Zwijnaardsesteenweg 683, 9000 Gent',
    description: 'Oost-Vlaanderen',
    color: 'stone'
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

const expectations = [
  { text: 'Reactie binnen 24 uur', icon: Clock },
  { text: 'Korte telefonische intake (10 min)', icon: Phone },
  { text: 'Indien relevant: gratis plaatsbezoek', icon: MapPin },
  { text: 'Gedetailleerde offerte binnen 1-2 weken', icon: CheckCircle2 }
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
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-40 w-64 h-64 bg-terracotta-100/20 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none">
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-sand-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sand-200 text-sm font-medium text-stone-600 mb-6">
                <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
                Neem contact op
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Laten we
                <span className="block text-forest-600">samenwerken</span>
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Klaar om uw renovatieproject te bespreken? Neem contact op voor een gratis en
                vrijblijvend adviesgesprek. We reageren binnen 24 uur.
              </p>

              {/* Quick contact buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+32493812789"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Bel ons direct
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="https://wa.me/32493812789"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-full font-medium hover:border-forest-600 hover:text-forest-700 transition-all duration-300"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Contact Nam Construction"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />

                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-forest-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">Gratis adviesgesprek</p>
                      <p className="text-sm text-stone-600">Vrijblijvend en zonder verplichtingen</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-forest-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-white border-b border-sand-100 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="group bg-cream-50 rounded-2xl p-6 border border-sand-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    item.color === 'forest' ? 'bg-forest-100' :
                    item.color === 'terracotta' ? 'bg-terracotta-100' :
                    item.color === 'sand' ? 'bg-sand-100' :
                    'bg-stone-100'
                  }`}>
                    <item.icon className={`h-6 w-6 ${
                      item.color === 'forest' ? 'text-forest-600' :
                      item.color === 'terracotta' ? 'text-terracotta-600' :
                      item.color === 'sand' ? 'text-sand-700' :
                      'text-stone-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-forest-600 hover:text-forest-700 transition-colors font-medium"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-stone-700">{item.content}</p>
                    )}
                    <p className="text-sm text-stone-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-gradient-to-br from-white via-cream-50/50 to-sand-50/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-soft border border-sand-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-forest-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-forest-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-stone-900">
                      Vraag een gratis adviesgesprek aan
                    </h2>
                    <p className="text-stone-500 text-sm">Vul het formulier in en we nemen contact op</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="bg-gradient-to-br from-forest-50 to-cream-50 rounded-3xl p-10 text-center border border-forest-100">
                    <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-forest-600" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-stone-900 mb-3">
                      Bedankt voor uw aanvraag!
                    </h3>
                    <p className="text-stone-600 mb-8 max-w-md mx-auto">
                      We hebben uw bericht ontvangen en nemen binnen 24 uur contact met u op
                      om uw project te bespreken.
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
                      className="inline-flex items-center px-6 py-3 bg-white border-2 border-forest-200 text-forest-700 rounded-full font-medium hover:bg-forest-50 transition-all duration-300"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Nieuwe aanvraag
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                          Naam *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300"
                          placeholder="Uw naam"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300"
                          placeholder="uw@email.be"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                          Telefoon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300"
                          placeholder="+32 ..."
                        />
                      </div>
                      <div>
                        <label htmlFor="gemeente" className="block text-sm font-medium text-stone-700 mb-2">
                          Gemeente *
                        </label>
                        <input
                          type="text"
                          id="gemeente"
                          name="gemeente"
                          required
                          value={formState.gemeente}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300"
                          placeholder="Gent, Mariakerke, ..."
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-stone-700 mb-2">
                        Type project *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formState.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300"
                      >
                        <option value="">Selecteer type project</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="timing" className="block text-sm font-medium text-stone-700 mb-2">
                          Wanneer wilt u starten?
                        </label>
                        <select
                          id="timing"
                          name="timing"
                          value={formState.timing}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300"
                        >
                          <option value="">Selecteer timing</option>
                          {timings.map((timing) => (
                            <option key={timing} value={timing}>{timing}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-stone-700 mb-2">
                          Indicatief budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formState.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300"
                        >
                          <option value="">Selecteer budget</option>
                          {budgetRanges.map((budget) => (
                            <option key={budget} value={budget}>{budget}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                        Vertel iets over uw project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all duration-300 resize-none"
                        placeholder="Beschrijf kort uw project, wensen of vragen..."
                      />
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-sand-50 rounded-2xl border border-sand-100">
                      <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0">
                        <Upload className="h-5 w-5 text-sand-700" />
                      </div>
                      <p className="text-sm text-stone-600">
                        Foto&apos;s of plannen? Stuur ze via{' '}
                        <a href="https://wa.me/32493812789" className="text-forest-600 hover:underline font-medium">
                          WhatsApp
                        </a>{' '}
                        of{' '}
                        <a href="mailto:info@namconstruction.be" className="text-forest-600 hover:underline font-medium">
                          email
                        </a>
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="group w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Verstuur aanvraag
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-sm text-stone-500">
                      Door dit formulier te versturen, gaat u akkoord met onze privacyverklaring.
                      We gebruiken uw gegevens enkel om contact met u op te nemen over uw aanvraag.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* What to expect */}
              <div className="bg-gradient-to-br from-forest-900 to-forest-950 text-white rounded-3xl p-8 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-forest-800/50 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-terracotta-900/30 rounded-full blur-2xl" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-forest-300" />
                    </div>
                    <h3 className="text-xl font-display font-semibold">Wat kunt u verwachten?</h3>
                  </div>
                  <ul className="space-y-4">
                    {expectations.map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-terracotta-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4 text-terracotta-400" />
                        </div>
                        <span className="text-forest-100 pt-1">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Opening hours */}
              <div className="bg-cream-50 rounded-3xl p-8 border border-sand-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-sand-700" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-stone-900">Openingsuren</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-sand-100">
                    <span className="text-stone-600">Maandag - Vrijdag</span>
                    <span className="font-semibold text-stone-900 bg-forest-50 px-3 py-1 rounded-full text-sm">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-sand-100">
                    <span className="text-stone-600">Zaterdag</span>
                    <span className="font-semibold text-stone-900 bg-sand-100 px-3 py-1 rounded-full text-sm">Op afspraak</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-600">Zondag</span>
                    <span className="font-semibold text-stone-500 bg-stone-100 px-3 py-1 rounded-full text-sm">Gesloten</span>
                  </div>
                </div>
              </div>

              {/* Region info */}
              <div className="bg-gradient-to-br from-sand-50 to-cream-50 rounded-3xl p-8 border border-sand-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-terracotta-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-stone-900">Werkgebied</h3>
                </div>
                <p className="text-stone-600 mb-4">
                  We zijn actief in Gent en de ruime regio errond:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Gent', 'Mariakerke', 'Drongen', 'Sint-Martens-Latem', 'Ledeberg', 'Gentbrugge', 'Merelbeke'].map((region) => (
                    <span
                      key={region}
                      className="px-3 py-1.5 bg-white rounded-full text-sm text-stone-700 border border-sand-200"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
