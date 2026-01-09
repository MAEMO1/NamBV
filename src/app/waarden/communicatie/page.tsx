import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Users,
  Smartphone,
  Mail,
  Phone
} from 'lucide-react';
import { CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Heldere Communicatie | Nam Construction',
  description: 'Eén vast aanspreekpunt, regelmatige updates en duidelijke afspraken. U weet altijd waar u aan toe bent.',
};

const communicationPillars = [
  {
    icon: Users,
    title: 'Eén vast aanspreekpunt',
    description: 'U communiceert steeds met dezelfde projectverantwoordelijke. Geen gedoe met verschillende contactpersonen.',
    color: 'forest'
  },
  {
    icon: Smartphone,
    title: 'Regelmatige updates',
    description: 'Wekelijkse voortgangsrapporten via telefoon, e-mail of WhatsApp. U kiest het kanaal dat u prefereert.',
    color: 'terracotta'
  },
  {
    icon: Mail,
    title: 'Bereikbaarheid',
    description: 'Snelle reactie op vragen of opmerkingen. Geen weken wachten op antwoord.',
    color: 'sand'
  }
];

const expectations = [
  'Wekelijks voortgangsrapport',
  'Directe lijn met projectverantwoordelijke',
  'Proactieve communicatie bij wijzigingen',
  'Duidelijke planning en tijdlijn',
  'Foto-updates van de werken'
];

export default function CommunicatiePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-stone-100 via-cream-50 to-sand-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-stone-200/40 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          {/* Breadcrumb */}
          <Link href="/#waarden" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug naar onze waarden</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-200 rounded-full text-sm font-medium text-stone-700 mb-6">
                <MessageSquare className="h-4 w-4" />
                Onze waarden
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Heldere Communicatie
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Eén vast aanspreekpunt, regelmatige updates en duidelijke afspraken.
                U weet altijd waar u aan toe bent.
              </p>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center px-8 py-4 bg-stone-800 text-white rounded-full font-medium hover:bg-stone-900 transition-all duration-300 hover:shadow-lg hover:shadow-stone-800/25"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Plan een adviesgesprek
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Heldere communicatie"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-stone-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Communication Pillars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-stone-400" />
              <span className="text-sm font-medium text-stone-600 tracking-wide uppercase">Onze aanpak</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
              Communicatie die werkt
            </h2>
            <p className="text-xl text-stone-500">
              Een renovatie vraagt om heldere afspraken en regelmatige updates.
              Zo weet u altijd waar uw project staat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {communicationPillars.map((pillar) => (
              <div key={pillar.title} className="bg-cream-50 rounded-3xl p-8 border border-sand-100">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  pillar.color === 'forest' ? 'bg-forest-100' :
                  pillar.color === 'terracotta' ? 'bg-terracotta-100' :
                  'bg-sand-100'
                }`}>
                  <pillar.icon className={`h-7 w-7 ${
                    pillar.color === 'forest' ? 'text-forest-600' :
                    pillar.color === 'terracotta' ? 'text-terracotta-600' :
                    'text-sand-700'
                  }`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{pillar.title}</h3>
                <p className="text-stone-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-cream-50 to-sand-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-stone-400" />
                <span className="text-sm font-medium text-stone-600 tracking-wide uppercase">Verwachtingen</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Wat u mag verwachten
              </h2>
              <p className="text-xl text-stone-500 mb-8">
                Tijdens uw renovatieproject houden we u voortdurend op de hoogte.
                Geen onzekerheid, geen verrassingen.
              </p>

              <div className="space-y-4">
                {expectations.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-sand-100">
                    <CheckCircle2 className="h-5 w-5 text-forest-600 flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-800 rounded-3xl p-8 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-700 mb-6">
                <MessageSquare className="h-8 w-8 text-stone-300" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4">Altijd op de hoogte</h3>
              <p className="text-stone-300 mb-6">
                U weet altijd waar uw project staat. Geen weken wachten op informatie,
                geen onduidelijkheid over de planning.
              </p>

              <div className="space-y-4 pt-6 border-t border-stone-700">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-stone-400" />
                  <span className="text-stone-300">Telefonisch bereikbaar</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-stone-400" />
                  <span className="text-stone-300">Mail binnen 24u beantwoord</span>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-stone-400" />
                  <span className="text-stone-300">WhatsApp voor snelle vragen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline example */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <span className="w-8 h-[2px] bg-stone-400" />
                <span className="text-sm font-medium text-stone-600 tracking-wide uppercase">Voorbeeld</span>
                <span className="w-8 h-[2px] bg-stone-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Communicatie tijdens uw project
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-24 text-right text-stone-400 text-sm pt-1">Week 1</div>
                <div className="flex-1 bg-cream-50 rounded-2xl p-6 border border-sand-100">
                  <h4 className="font-semibold text-stone-900 mb-2">Kickoff meeting</h4>
                  <p className="text-stone-600 text-sm">Planning doorlopen, afspraken vastleggen, contactgegevens uitwisselen</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-24 text-right text-stone-400 text-sm pt-1">Wekelijks</div>
                <div className="flex-1 bg-cream-50 rounded-2xl p-6 border border-sand-100">
                  <h4 className="font-semibold text-stone-900 mb-2">Voortgangsupdate</h4>
                  <p className="text-stone-600 text-sm">Telefonisch of per mail: wat is er gedaan, wat staat er gepland</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-24 text-right text-stone-400 text-sm pt-1">Bij wijzigingen</div>
                <div className="flex-1 bg-cream-50 rounded-2xl p-6 border border-sand-100">
                  <h4 className="font-semibold text-stone-900 mb-2">Proactief contact</h4>
                  <p className="text-stone-600 text-sm">Bij onvoorziene zaken nemen wij direct contact op om te overleggen</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-24 text-right text-stone-400 text-sm pt-1">Oplevering</div>
                <div className="flex-1 bg-cream-50 rounded-2xl p-6 border border-sand-100">
                  <h4 className="font-semibold text-stone-900 mb-2">Gezamenlijke doorloop</h4>
                  <p className="text-stone-600 text-sm">Alles samen nalopen, puntjes afwerken, documenten overhandigen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Klaar voor een project zonder zorgen?"
        subtitle="Ontdek hoe onze heldere communicatie het verschil maakt."
      />
    </>
  );
}
