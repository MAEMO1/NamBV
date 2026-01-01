import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Leaf,
  Wrench,
  MessageSquare,
  Users,
  Recycle,
  Calendar,
  FileCheck,
  CreditCard,
  Shield,
  Star,
  Phone,
  CheckCircle2,
  MapPin,
  Play
} from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

// USP data according to strategic plan - the 5 key differentiators
const usps = [
  {
    icon: Recycle,
    title: 'Hergebruik materiaal',
    description: 'Bestaand materiaal behouden waar mogelijk',
    color: 'terracotta',
    href: '/duurzaam#hergebruik'
  },
  {
    icon: Calendar,
    title: 'Gratis adviesgesprek',
    description: 'Direct online inplannen',
    color: 'forest',
    href: '/afspraak'
  },
  {
    icon: FileCheck,
    title: 'Volledige attestering',
    description: 'AREI, EPB & alle certificaten',
    color: 'forest',
    href: '/aanpak#garanties'
  },
  {
    icon: CreditCard,
    title: 'Betalingsspreiding',
    description: 'Betaal per mijlpaal',
    color: 'sand',
    href: '/aanpak'
  },
  {
    icon: Shield,
    title: 'Subsidie-ondersteuning',
    description: 'Hulp bij premieaanvragen',
    color: 'terracotta',
    href: '/duurzaam#premies'
  }
];

// 5 pillars aligned with USPs - with links to detailed sections
const pillars = [
  {
    icon: Recycle,
    title: 'Hergebruik & Circulariteit',
    description: 'Waar mogelijk behouden en hergebruiken we bestaand materiaal. Minder afval, meer karakter, lagere kosten.',
    color: 'terracotta',
    href: '/duurzaam#hergebruik',
    cta: 'Bekijk voorbeelden'
  },
  {
    icon: FileCheck,
    title: 'Volledige Attestering',
    description: 'AREI-conforme installaties, EPB-attesten en alle nodige certificaten. Premie-proof en zonder zorgen.',
    color: 'forest',
    href: '/duurzaam#premies',
    cta: 'Bekijk attesten & premies'
  },
  {
    icon: CreditCard,
    title: 'Betalingsspreiding',
    description: 'Betaal in fasen per afgeronde mijlpaal. Transparant, eerlijk en overzichtelijk voor uw budget.',
    color: 'sand',
    href: '/aanpak#betaling',
    cta: 'Bekijk betalingsplan'
  },
  {
    icon: Shield,
    title: 'Subsidie-ondersteuning',
    description: 'We helpen bij het aanvragen van beschikbare premies en subsidies. Maximaal voordeel uit uw investering.',
    color: 'terracotta',
    href: '/duurzaam#premies',
    cta: 'Bekijk premies'
  },
  {
    icon: MessageSquare,
    title: 'Heldere Communicatie',
    description: 'Eén vast aanspreekpunt, regelmatige updates en duidelijke afspraken. U weet altijd waar u aan toe bent.',
    color: 'stone',
    href: '/aanpak#communicatie',
    cta: 'Bekijk werkwijze'
  }
];

// Services
const services = [
  {
    title: 'Totaalrenovatie',
    description: 'Volledige renovatie van uw woning, van ruwbouw tot afwerking. Eén aanspreekpunt voor uw hele project.',
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    tag: 'Populair'
  },
  {
    title: 'Renovatie & Verbouwing',
    description: 'Gerichte renovaties en verbouwingen. Of het nu gaat om een badkamer, keuken of uitbreiding.',
    href: '/diensten/renovatie',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop'
  },
  {
    title: 'Afwerking',
    description: 'Tegelwerk, plakwerk, schilderwerk en meer. Vakkundige afwerking die het verschil maakt.',
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
  },
  {
    title: 'Technieken',
    description: 'Sanitair en elektriciteit door erkende vakmensen. Veilig en volgens alle normen.',
    href: '/diensten/technieken',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop'
  }
];

// Projects
const projects = [
  {
    title: 'Herenhuis Gent-centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop'
  },
  {
    title: 'Rijwoning Mariakerke',
    category: 'Renovatie & Afwerking',
    location: 'Mariakerke',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop'
  },
  {
    title: 'Appartement Ledeberg',
    category: 'Badkamerrenovatie',
    location: 'Ledeberg',
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=600&h=400&fit=crop'
  }
];

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'Intake',
    description: 'Gratis kennismaking en bespreking van uw wensen en mogelijkheden.'
  },
  {
    step: '02',
    title: 'Voorstel & Offerte',
    description: 'Gedetailleerde offerte met duidelijke scope en premie-proof opmaak.'
  },
  {
    step: '03',
    title: 'Uitvoering',
    description: 'Vakkundige uitvoering met regelmatige updates en heldere communicatie.'
  },
  {
    step: '04',
    title: 'Oplevering & Nazorg',
    description: 'Grondige oplevering en ondersteuning bij premieaanvragen en attesten.'
  }
];

// Testimonials
const testimonials = [
  {
    quote: "Nam Construction heeft onze volledige woning gerenoveerd met oog voor detail en duurzaamheid. De communicatie was uitstekend.",
    author: "Sarah & Thomas",
    location: "Gent-centrum",
    rating: 5
  },
  {
    quote: "Professioneel, betrouwbaar en vakkundig. De afwerking is prachtig en alles werd netjes opgeleverd.",
    author: "Marc D.",
    location: "Mariakerke",
    rating: 5
  },
  {
    quote: "Fijne samenwerking met duidelijke afspraken. Ze denken mee over duurzame oplossingen.",
    author: "Familie Peeters",
    location: "Ledeberg",
    rating: 5
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full-bleed image/video background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
            alt="Prachtig gerenoveerde woning"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-stone-900/40" />
        </div>

        {/* Video play button - centered, doesn't block other elements */}
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30">
            <Play className="h-10 w-10 md:h-12 md:w-12 text-white ml-1" />
          </div>
        </button>

        <div className="container-custom relative z-10 py-32 lg:py-40">
          <div className="max-w-3xl">
              {/* Minimal badge */}
              <div className="inline-flex items-center gap-2 mb-10 animate-fade-up">
                <span className="w-8 h-[2px] bg-terracotta-400" />
                <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Gent & omstreken</span>
              </div>

              {/* Large aspirational heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-semibold text-white leading-[1.05] mb-10 animate-fade-up animation-delay-100">
                Wonen met{' '}
                <span className="text-terracotta-400">ziel</span>
              </h1>

              {/* Refined subtitle - shorter, more aspirational */}
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed font-light animate-fade-up animation-delay-200">
                Vakkundige renovatie met respect voor karakter.
                Hergebruik waar het kan, perfectie waar het moet.
              </p>

              {/* Single prominent CTA */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
                <Link
                  href="/afspraak"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-terracotta-500 text-white rounded-full font-medium text-lg hover:bg-terracotta-400 transition-all duration-500 hover:shadow-xl hover:shadow-terracotta-500/30 hover:-translate-y-0.5"
                >
                  Begin uw verhaal
                  <ArrowRight className="h-5 w-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+32123456789"
                  className="inline-flex items-center justify-center px-8 py-5 text-white/80 font-medium hover:text-white transition-colors duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +32 123 45 67 89
                </a>
              </div>

              {/* Minimal trust indicators */}
              <div className="mt-16 flex flex-wrap items-center gap-4 md:gap-8 text-sm text-white/60 animate-fade-up animation-delay-400">
                <span>10+ jaar ervaring</span>
                <span className="w-1 h-1 rounded-full bg-white/40 hidden md:block" />
                <span>50+ projecten</span>
                <span className="w-1 h-1 rounded-full bg-white/40 hidden md:block" />
                <span>Lokaal vakmanschap</span>
              </div>
          </div>
        </div>

        {/* Scroll indicator - white for dark bg */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* USP Trust Bar - Simplified, Brightstone-inspired */}
      <section className="bg-white border-y border-sand-100 py-6 md:py-8">
        <div className="container-custom">
          <div className="flex gap-8 overflow-x-auto pb-2 md:pb-0 md:justify-center lg:justify-between scrollbar-hide">
            {usps.map((usp) => (
              <Link
                key={usp.title}
                href={usp.href}
                className="flex items-center gap-3 group min-w-max transition-all duration-300 hover:opacity-70"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  usp.color === 'forest' ? 'bg-forest-100' :
                  usp.color === 'terracotta' ? 'bg-terracotta-100' :
                  'bg-sand-100'
                }`}>
                  <usp.icon className={`h-5 w-5 ${
                    usp.color === 'forest' ? 'text-forest-600' :
                    usp.color === 'terracotta' ? 'text-terracotta-600' :
                    'text-sand-700'
                  }`} />
                </div>
                <span className="font-medium text-stone-700 text-sm">{usp.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Pillars Section - Clean & Minimal */}
      <section className="py-24 md:py-32 bg-cream-50 relative overflow-hidden">
        <div className="container-custom relative">
          {/* Minimal section header */}
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-terracotta-400" />
              <span className="text-sm font-medium text-terracotta-600 tracking-wide uppercase">Onze waarden</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-stone-900 mb-6">
              Waarvoor we staan
            </h2>
            <p className="text-xl text-stone-500">
              Vijf pijlers die elk project vormgeven.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group relative bg-white rounded-2xl p-8 border border-sand-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-transparent overflow-hidden"
              >
                {/* Hover background effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  pillar.color === 'forest' ? 'bg-gradient-to-br from-forest-50 to-transparent' :
                  pillar.color === 'terracotta' ? 'bg-gradient-to-br from-terracotta-50 to-transparent' :
                  pillar.color === 'sand' ? 'bg-gradient-to-br from-sand-50 to-transparent' :
                  'bg-gradient-to-br from-stone-50 to-transparent'
                }`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    pillar.color === 'forest' ? 'bg-forest-100' :
                    pillar.color === 'terracotta' ? 'bg-terracotta-100' :
                    pillar.color === 'sand' ? 'bg-sand-100' :
                    'bg-stone-100'
                  }`}>
                    <pillar.icon className={`h-7 w-7 ${
                      pillar.color === 'forest' ? 'text-forest-600' :
                      pillar.color === 'terracotta' ? 'text-terracotta-600' :
                      pillar.color === 'sand' ? 'text-sand-700' :
                      'text-stone-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{pillar.title}</h3>
                  <p className="text-stone-600 leading-relaxed mb-6">{pillar.description}</p>

                  {/* CTA Link with arrow animation */}
                  <span className="inline-flex items-center text-sm font-medium text-stone-500 group-hover:text-forest-600 transition-colors duration-300">
                    {pillar.cta}
                    <ArrowRight className="h-4 w-4 ml-2 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Clean Grid */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="container-custom">
          {/* Minimal section header */}
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-forest-500" />
              <span className="text-sm font-medium text-forest-600 tracking-wide uppercase">Wat we doen</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-stone-900 mb-6">
              Onze diensten
            </h2>
            <p className="text-xl text-stone-500">
              Van totaalrenovatie tot vakkundige afwerking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-sand-100 hover:border-transparent transition-all duration-500"
              >
                {/* Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-stone-900/10 group-hover:from-stone-900/90 transition-all duration-300" />

                {/* Tag */}
                {service.tag && (
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 bg-terracotta-500 text-white rounded-full text-xs font-medium">
                      {service.tag}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 mb-4 max-w-md">{service.description}</p>
                  <span className="inline-flex items-center text-white font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Meer ontdekken
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/diensten"
              className="group inline-flex items-center px-6 py-3 border border-stone-200 rounded-full font-medium text-stone-600 hover:border-forest-600 hover:text-forest-700 transition-all duration-300"
            >
              Bekijk alle diensten
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability Highlight - Full width visual */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-forest-900">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          {/* Organic shapes */}
          <div className="absolute top-0 left-0 w-1/2 h-full">
            <div className="absolute top-20 left-20 w-96 h-96 bg-forest-800/50 rounded-full blur-3xl" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2">
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-terracotta-900/30 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-800 rounded-full text-forest-300 text-sm font-medium mb-8">
                <Leaf className="h-4 w-4" />
                Duurzaam & Ecologisch
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-6 leading-tight">
                Circulair waar het kan.{' '}
                <span className="text-terracotta-400">Perfect afgewerkt</span>{' '}
                waar het moet.
              </h2>

              <p className="text-forest-200 text-lg mb-10 leading-relaxed">
                Waar het technisch en esthetisch kan, hergebruiken we bestaande elementen of
                recupereren we ze zorgvuldig—zo reduceren we afval zonder in te boeten op afwerking.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Hergebruikscan bij de start van elk project',
                  'Selectieve demontage i.p.v. brute afbraak',
                  'Minder afval, meer recuperatie',
                  'Gezonde materialen voor een gezond binnenklimaat'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-terracotta-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-forest-100">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/duurzaam"
                className="group inline-flex items-center px-8 py-4 bg-terracotta-500 text-white rounded-full font-medium hover:bg-terracotta-400 transition-all duration-300 hover:shadow-lg hover:shadow-terracotta-500/25"
              >
                Ontdek onze aanpak
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image composition */}
            <div className="relative hidden lg:block">
              <div className="relative h-[550px]">
                {/* Main image */}
                <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                    alt="Duurzame renovatie"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Secondary image */}
                <div className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-3xl overflow-hidden shadow-2xl border-4 border-forest-900">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop"
                    alt="Duurzame materialen"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Accent card */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
                      <Recycle className="h-6 w-6 text-forest-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">Circulair</p>
                      <p className="text-sm text-stone-500">Hergebruik waar mogelijk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Prominent Gallery */}
      <section className="py-24 md:py-32 bg-stone-900 relative overflow-hidden">
        <div className="container-custom relative">
          {/* Header with CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-terracotta-400" />
                <span className="text-sm font-medium text-terracotta-400 tracking-wide uppercase">Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-4">
                Recente projecten
              </h2>
              <p className="text-lg text-stone-400">
                Een selectie van realisaties in Gent en omstreken.
              </p>
            </div>
            <Link
              href="/projecten"
              className="group inline-flex items-center px-6 py-3 bg-white rounded-full font-medium text-stone-900 hover:bg-terracotta-400 hover:text-white transition-all duration-300 mt-8 md:mt-0"
            >
              Bekijk alle projecten
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Large project grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href="/projecten"
                className={`group relative rounded-2xl overflow-hidden ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content - revealed on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  {/* Category tag */}
                  <span className="inline-block w-fit px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {project.category}
                  </span>
                  <h3 className={`font-display font-semibold text-white mb-2 ${
                    index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Minimal */}
      <section className="py-24 md:py-32 bg-cream-50 relative">
        <div className="container-custom">
          {/* Minimal section header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-[2px] bg-sand-400" />
              <span className="text-sm font-medium text-sand-600 tracking-wide uppercase">Werkwijze</span>
              <span className="w-8 h-[2px] bg-sand-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-stone-900 mb-6">
              Vier stappen naar uw droomwoning
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative text-center group">
                {/* Step number - large and faded */}
                <div className="text-8xl font-display font-bold text-sand-200 mb-4 transition-colors duration-300 group-hover:text-sand-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-500">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/aanpak"
              className="group inline-flex items-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-500 hover:shadow-xl hover:shadow-forest-600/20 hover:-translate-y-0.5"
            >
              Meer over onze werkwijze
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Clean */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="container-custom relative">
          {/* Minimal section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-[2px] bg-terracotta-300" />
              <span className="text-sm font-medium text-terracotta-500 tracking-wide uppercase">Ervaringen</span>
              <span className="w-8 h-[2px] bg-terracotta-300" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-stone-900">
              Wat klanten zeggen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-cream-50 rounded-2xl p-8 border border-sand-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-terracotta-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-stone-700 mb-8 leading-relaxed text-lg">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                    <span className="font-semibold text-forest-600 text-sm">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">{testimonial.author}</p>
                    <p className="text-sm text-stone-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner variant="dark" />
    </>
  );
}
