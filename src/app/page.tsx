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
  CheckCircle2
} from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

// USP data according to strategic plan
const usps = [
  {
    icon: Recycle,
    title: 'Circulaire aanpak',
    description: 'Hergebruik & selectieve demontage waar zinvol'
  },
  {
    icon: Calendar,
    title: 'Gratis adviesgesprek',
    description: 'Direct online in te plannen'
  },
  {
    icon: FileCheck,
    title: 'Attesten & keuringen',
    description: 'Documenten op orde via erkende partners'
  },
  {
    icon: CreditCard,
    title: 'Betalingsplan per mijlpaal',
    description: 'Transparant en voorspelbaar'
  },
  {
    icon: Shield,
    title: 'Premies & dossiers',
    description: 'Begeleiding en premie-proof facturatie'
  }
];

// 4 pillars according to strategic plan
const pillars = [
  {
    icon: Leaf,
    title: 'Duurzame materiaalkeuzes',
    description: 'We kiezen voor materialen met een lange levensduur en gezonde eigenschappen. Lokale leveranciers waar mogelijk.'
  },
  {
    icon: Wrench,
    title: 'Vakmanschap & levensduur',
    description: 'Technisch correct, esthetisch sterk. Afwerking die blijft en waar u jarenlang plezier van hebt.'
  },
  {
    icon: MessageSquare,
    title: 'Heldere communicatie',
    description: 'Duidelijke planning, regelmatige updates en geen verrassingen. U weet altijd waar u aan toe bent.'
  },
  {
    icon: Users,
    title: 'Lokale partners',
    description: 'We werken met betrouwbare lokale vakmensen en leveranciers uit de regio Gent.'
  }
];

// Services
const services = [
  {
    title: 'Totaalrenovatie',
    description: 'Volledige renovatie van uw woning, van ruwbouw tot afwerking. Eén aanspreekpunt voor uw hele project.',
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop'
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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-primary-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-secondary-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
                Duurzaam renoveren in Gent, met afwerking die <span className="text-primary-600">blijft</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
                We renoveren voor milieubewuste gezinnen en eigenaars die kwaliteit verkiezen boven
                &apos;goedkoop snel&apos;. Met hergebruik waar mogelijk, premie-proof documenten en een
                transparant betalingsplan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  Vrijblijvend adviesgesprek
                </Link>
                <a href="tel:+32123456789" className="btn-secondary text-lg px-8 py-4">
                  <Phone className="h-5 w-5 mr-2" />
                  Bel of WhatsApp
                </a>
              </div>
            </div>
            <div className="relative lg:h-[500px] hidden lg:block">
              <div className="absolute inset-0 bg-primary-200/20 rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Gerenoveerde woning"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center">
                        <Star className="h-4 w-4 text-primary-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">50+ projecten</p>
                    <p className="text-sm text-neutral-500">in Gent en omstreken</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP Trust Bar */}
      <section className="bg-white border-y border-neutral-100 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {usps.map((usp) => (
              <div key={usp.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                  <usp.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">{usp.title}</p>
                  <p className="text-xs text-neutral-500">{usp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Waarvoor we staan"
            subtitle="Onze 4 pijlers vormen de basis van elk project. Duurzaamheid, vakmanschap, communicatie en lokale verankering."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="group">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                  <pillar.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{pillar.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Onze diensten"
            subtitle="Van totaalrenovatie tot vakkundige afwerking. We begeleiden u door elk aspect van uw project."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="card group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">{service.description}</p>
                  <span className="inline-flex items-center text-primary-600 font-medium">
                    Meer info
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Highlight */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-800 rounded-full text-primary-200 text-sm font-medium mb-6">
                Duurzaam & Ecologisch
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
                Circulair waar het kan. Perfect afgewerkt waar het moet.
              </h2>
              <p className="text-primary-100 text-lg mb-8 leading-relaxed">
                Waar het technisch en esthetisch kan, hergebruiken we bestaande elementen of
                recupereren we ze zorgvuldig—zo reduceren we afval zonder in te boeten op afwerking.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Hergebruikscan bij de start van elk project',
                  'Selectieve demontage i.p.v. brute afbraak',
                  'Minder afval, meer recuperatie',
                  'Gezonde materialen voor een gezond binnenklimaat'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-primary-100">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/duurzaam" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
                Ontdek onze aanpak
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                alt="Duurzame renovatie"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <SectionHeader
              title="Recente projecten"
              subtitle="Bekijk een selectie van onze realisaties in Gent en omstreken."
              centered={false}
              className="mb-0"
            />
            <Link href="/projecten" className="btn-secondary mt-6 md:mt-0">
              Alle projecten bekijken
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project.title} href="/projecten" className="card group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{project.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Onze aanpak in 4 stappen"
            subtitle="Van eerste contact tot oplevering: een helder proces met duidelijke communicatie."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-100 -translate-y-1/2 z-0" />
                )}
                <div className="relative z-10">
                  <span className="text-5xl font-display font-bold text-primary-100">{step.step}</span>
                  <h3 className="text-xl font-semibold text-neutral-900 mt-4 mb-2">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/aanpak" className="btn-primary">
              Meer over onze werkwijze
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Wat klanten zeggen"
            subtitle="Eerlijke feedback van huiseigenaars die we mochten helpen."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-neutral-50 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-neutral-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                  <p className="text-sm text-neutral-500">{testimonial.location}</p>
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
