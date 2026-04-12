import { homepageImages, projectImages } from '@/lib/images';
import type { V2Locale } from './locale';
import { additionalDefaultPageSections } from './content-defaults';

export type V2DefaultPageSection = {
  pageKey: string;
  sectionKey: string;
  locale: V2Locale;
  schemaKey: string;
  displayOrder: number;
  published: boolean;
  dataJson: Record<string, unknown>;
};

export type V2DefaultProject = {
  slug: string;
  category: string;
  location: string;
  year: number;
  featured: boolean;
  isPublished: boolean;
  sortOrder: number;
  coverImageUrl?: string;
  images: Array<{
    imageUrl: string;
    alt?: string;
    caption?: string;
    sortOrder: number;
    kind?: string;
  }>;
  translations: Array<{
    locale: V2Locale;
    title: string;
    shortDescription?: string;
    description?: string;
    challengeText?: string;
    approachText?: string;
    resultText?: string;
    projectType?: string;
    duration?: string;
    surface?: string;
    completionDate?: string;
  }>;
};

export const defaultQuoteFormOptions = {
  propertyTypes: [
    { id: 'appartement', name: 'Appartement', slug: 'appartement' },
    { id: 'tussenwoning', name: 'Tussenwoning', slug: 'tussenwoning' },
    { id: 'vrijstaand', name: 'Vrijstaande woning', slug: 'vrijstaand' },
    { id: 'bedrijfspand', name: 'Bedrijfspand', slug: 'bedrijfspand' },
  ],
  serviceTypes: [
    { id: 'totaalrenovatie', name: 'Totaalrenovatie', slug: 'totaalrenovatie', icon: 'home' },
    { id: 'renovatie', name: 'Renovatie & verbouwing', slug: 'renovatie', icon: 'hammer' },
    { id: 'afwerking', name: 'Afwerking', slug: 'afwerking', icon: 'paintbrush' },
    { id: 'technieken', name: 'Technieken', slug: 'technieken', icon: 'zap' },
  ],
};

export const defaultAvailabilityRules = [
  { dayOfWeek: 0, timeSlots: [], isActive: false },
  { dayOfWeek: 1, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], isActive: true },
  { dayOfWeek: 2, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], isActive: true },
  { dayOfWeek: 3, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], isActive: true },
  { dayOfWeek: 4, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], isActive: true },
  { dayOfWeek: 5, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], isActive: true },
  { dayOfWeek: 6, timeSlots: [], isActive: false },
];

export const defaultSettings = [
  {
    key: 'company',
    category: 'company',
    description: 'Basale bedrijfsinformatie voor header en footer',
    valueJson: {
      name: 'Nam Construction',
      phone: '+32 493 81 27 89',
      email: 'info@namconstruction.be',
      address: 'Zwijnaardsesteenweg 683, 9000 Gent',
      instagram: 'https://www.instagram.com/namconstruction.be/',
      whatsapp: 'https://wa.me/32493812789',
    },
  },
  {
    key: 'seo',
    category: 'seo',
    description: 'Fallback SEO-instellingen voor v2',
    valueJson: {
      siteName: 'Nam Construction',
      siteUrl: 'https://namconstruction.be',
      titleSuffix: ' | Nam Construction',
      defaultDescription: 'Vakkundige renovatie in Gent met een slanke, betrouwbare klantreis.',
    },
  },
  {
    key: 'analytics',
    category: 'analytics',
    description: 'Consent-aware GTM instellingen',
    valueJson: {
      gtmId: null,
      consentVersion: 'v2',
      marketingEnabled: true,
    },
  },
];

const localizedHero = {
  nl: {
    eyebrow: 'Parallelle v2-preview',
    title: 'Een snellere, veiligere renovatie-ervaring',
    description:
      'Deze v2 brengt dezelfde merkidentiteit naar een betrouwbaardere basis: duidelijke leadflows, veilige backoffice en content die per taal beheerd kan worden.',
    primaryCtaLabel: 'Vraag een offerte aan',
    secondaryCtaLabel: 'Bekijk projecten',
  },
  fr: {
    eyebrow: 'Prévisualisation v2 parallèle',
    title: 'Une expérience rénovation plus rapide et plus fiable',
    description:
      "La v2 conserve l'identité de marque tout en apportant une base plus robuste: parcours leads clairs, backoffice sécurisé et contenu structuré par langue.",
    primaryCtaLabel: 'Demander un devis',
    secondaryCtaLabel: 'Voir les projets',
  },
  en: {
    eyebrow: 'Parallel v2 preview',
    title: 'A faster, safer renovation experience',
    description:
      'This v2 keeps the brand feel while moving the site to a more reliable foundation with safer admin flows and structured multilingual content.',
    primaryCtaLabel: 'Request a quote',
    secondaryCtaLabel: 'View projects',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedServices = {
  nl: {
    eyebrow: 'Waar we op sturen',
    title: 'Kernvoordelen van v2',
    description:
      'De preview combineert betere performance, veiligere leadverwerking en een rustiger beheerproces.',
    items: [
      {
        title: 'Leadflows zonder ruis',
        description: 'Offerte en afspraak zijn opgesplitst in heldere public read- en write-contracten.',
      },
      {
        title: 'Gestructureerde content',
        description: 'Belangrijke secties kunnen per pagina en per taal aangepast worden.',
      },
      {
        title: 'Veilige admin-basis',
        description: 'Sessies worden server-side gevalideerd en loginpogingen worden begrensd.',
      },
    ],
  },
  fr: {
    eyebrow: 'Notre cap',
    title: 'Les bénéfices clés de la v2',
    description:
      'La préversion combine meilleures performances, traitement plus sûr des leads et gestion plus claire.',
    items: [
      {
        title: 'Parcours leads plus nets',
        description: 'Le devis et le rendez-vous utilisent des contrats publics explicites pour lecture et écriture.',
      },
      {
        title: 'Contenu structuré',
        description: 'Les sections importantes peuvent être gérées par page et par langue.',
      },
      {
        title: 'Base admin sécurisée',
        description: 'Les sessions sont validées côté serveur et les tentatives de connexion sont limitées.',
      },
    ],
  },
  en: {
    eyebrow: 'What v2 improves',
    title: 'Core benefits of the rebuild',
    description:
      'The preview combines better performance, safer lead handling and a calmer admin experience.',
    items: [
      {
        title: 'Cleaner lead flows',
        description: 'Quote and appointment now use explicit public read/write contracts.',
      },
      {
        title: 'Structured content',
        description: 'Key sections can be managed per page and per locale.',
      },
      {
        title: 'Safer admin foundation',
        description: 'Sessions are validated server-side and login attempts are rate limited.',
      },
    ],
  },
} satisfies Record<V2Locale, Record<string, unknown>>;

const localizedCta = {
  nl: {
    title: 'Klaar voor een betrouwbaardere klantreis?',
    description: 'Gebruik v2 om de nieuwe flows en contentstructuur te testen zonder legacy te verstoren.',
    primaryCtaLabel: 'Plan een adviesgesprek',
    primaryCtaHref: '/afspraak',
  },
  fr: {
    title: 'Prêt pour un parcours client plus fiable ?',
    description: 'Utilisez la v2 pour tester les nouveaux flux et la nouvelle structure de contenu sans perturber le legacy.',
    primaryCtaLabel: 'Planifier un entretien',
    primaryCtaHref: '/afspraak',
  },
  en: {
    title: 'Ready for a more reliable customer journey?',
    description: 'Use v2 to validate the new flows and CMS structure without disturbing the legacy app.',
    primaryCtaLabel: 'Book a consultation',
    primaryCtaHref: '/afspraak',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedProjectsHero = {
  nl: {
    eyebrow: 'Projecten',
    title: 'Database-gedreven referenties',
    description: 'Projectlisting en detail lezen in v2 uit dezelfde bron, met lokale content per taal.',
  },
  fr: {
    eyebrow: 'Projets',
    title: 'Références pilotées par la base de données',
    description: 'La liste et le détail utilisent la même source avec contenu localisé.',
  },
  en: {
    eyebrow: 'Projects',
    title: 'Database-driven references',
    description: 'Listing and detail now read from the same source with locale-aware content.',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedQuoteHero = {
  nl: {
    eyebrow: 'Offerte',
    title: 'Vertel ons wat u wilt aanpakken',
    description: 'De v2-offerteflow gebruikt gedeelde validatie en schrijft alleen naar de nieuwe leadtabellen.',
  },
  fr: {
    eyebrow: 'Devis',
    title: 'Décrivez ce que vous voulez rénover',
    description: 'Le flux devis v2 utilise une validation partagée et écrit uniquement dans les nouvelles tables leads.',
  },
  en: {
    eyebrow: 'Quote',
    title: 'Tell us what you want to improve',
    description: 'The v2 quote flow uses shared validation and only writes to the new lead tables.',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedAppointmentHero = {
  nl: {
    eyebrow: 'Afspraak',
    title: 'Kies een passend moment',
    description: 'Beschikbaarheid, uitzonderingen en statusupdates worden in v2 apart beheerd.',
  },
  fr: {
    eyebrow: 'Rendez-vous',
    title: 'Choisissez un créneau adapté',
    description: 'Disponibilités, exceptions et statuts sont gérés séparément dans la v2.',
  },
  en: {
    eyebrow: 'Appointment',
    title: 'Choose a suitable slot',
    description: 'Availability, exceptions and status handling are managed separately in v2.',
  },
} satisfies Record<V2Locale, Record<string, string>>;

export const defaultPageSections: V2DefaultPageSection[] = [
  ...( ['nl', 'fr', 'en'] as const).flatMap((locale) => [
  {
    pageKey: 'home',
    sectionKey: 'hero',
    locale,
    schemaKey: 'hero',
    displayOrder: 0,
    published: true,
    dataJson: {
      ...localizedHero[locale],
      primaryCtaHref: '/offerte',
      secondaryCtaHref: '/projecten',
      image: homepageImages.hero,
    },
  },
  {
    pageKey: 'home',
    sectionKey: 'services',
    locale,
    schemaKey: 'feature-list',
    displayOrder: 1,
    published: true,
    dataJson: localizedServices[locale],
  },
  {
    pageKey: 'home',
    sectionKey: 'cta',
    locale,
    schemaKey: 'cta',
    displayOrder: 2,
    published: true,
    dataJson: localizedCta[locale],
  },
  {
    pageKey: 'projects',
    sectionKey: 'hero',
    locale,
    schemaKey: 'hero',
    displayOrder: 0,
    published: true,
    dataJson: localizedProjectsHero[locale],
  },
  {
    pageKey: 'quote',
    sectionKey: 'hero',
    locale,
    schemaKey: 'hero',
    displayOrder: 0,
    published: true,
    dataJson: localizedQuoteHero[locale],
  },
  {
    pageKey: 'appointment',
    sectionKey: 'hero',
    locale,
    schemaKey: 'hero',
    displayOrder: 0,
    published: true,
    dataJson: localizedAppointmentHero[locale],
  },
  ]),
  ...additionalDefaultPageSections,
];

export const defaultProjects: V2DefaultProject[] = [
  {
    slug: 'meulemanstraat-34',
    category: 'Totaalrenovatie',
    location: 'Sint-Lievens-Houtem',
    year: 2024,
    featured: true,
    isPublished: true,
    sortOrder: 1,
    coverImageUrl: projectImages.meulemanstraat.main,
    images: [
      ...projectImages.meulemanstraat.after.map((imageUrl, index) => ({
        imageUrl,
        alt: 'Meulemanstraat after photo',
        sortOrder: index,
      })),
    ],
    translations: [
      {
        locale: 'nl',
        title: 'Meulemanstraat 34',
        shortDescription: 'Volledige transformatie van een rijwoning naar een moderne gezinswoning.',
        description: 'Een totaalrenovatie met focus op ritme, licht en een rustige materiaalkeuze.',
        challengeText: 'De woning had een verouderde schil en een gefragmenteerde binnenstructuur.',
        approachText: 'We stripten de woning tot de ruwbouw en brachten nieuwe circulatie, afwerking en technieken aan.',
        resultText: 'De woning voelt opnieuw coherent, helder en energiezuinig aan.',
        projectType: 'Totaalrenovatie',
        duration: '7 maanden',
        surface: '280 m²',
        completionDate: '2024',
      },
      {
        locale: 'fr',
        title: 'Meulemanstraat 34',
        shortDescription: 'Transformation complète d’une maison mitoyenne en habitation familiale contemporaine.',
        description: 'Une rénovation complète axée sur la lumière, la circulation et des matériaux apaisés.',
        projectType: 'Rénovation complète',
        duration: '7 mois',
        surface: '280 m²',
        completionDate: '2024',
      },
      {
        locale: 'en',
        title: 'Meulemanstraat 34',
        shortDescription: 'A full townhouse transformation into a calm contemporary family home.',
        description: 'A full renovation focused on light, circulation and a quieter material palette.',
        projectType: 'Full renovation',
        duration: '7 months',
        surface: '280 m²',
        completionDate: '2024',
      },
    ],
  },
  {
    slug: 'reginald-warnefordstraat',
    category: 'Totaalrenovatie',
    location: 'Gent',
    year: 2022,
    featured: true,
    isPublished: true,
    sortOrder: 2,
    coverImageUrl: projectImages.reginaldWarneford.main,
    images: [
      ...projectImages.reginaldWarneford.photos.map((imageUrl, index) => ({
        imageUrl,
        alt: 'Reginald Warnefordstraat project photo',
        sortOrder: index,
      })),
    ],
    translations: [
      {
        locale: 'nl',
        title: 'Reginald Warnefordstraat',
        shortDescription: 'Stijlvolle renovatie met heldere volumes, een moderne keuken en industriële accenten.',
        description: 'Een binnenstedelijke totaalrenovatie waarin keuken, circulatie en lichtinval centraal staan.',
        challengeText: 'De eigenaars wilden een stoere maar warme woning binnen een historische context.',
        approachText: 'We werkten met stalen deuren, een rustige vloer en een open keuken als ankerpunt.',
        resultText: 'Het resultaat is een woning die strak aanvoelt zonder afstandelijk te worden.',
        projectType: 'Totaalrenovatie',
        duration: '6 maanden',
        surface: '130 m²',
        completionDate: '2022',
      },
      {
        locale: 'fr',
        title: 'Reginald Warnefordstraat',
        shortDescription: 'Rénovation élégante avec cuisine contemporaine et accents industriels.',
        description: 'Une rénovation urbaine pensée autour de la lumière, de la cuisine et de la circulation.',
        projectType: 'Rénovation complète',
        duration: '6 mois',
        surface: '130 m²',
        completionDate: '2022',
      },
      {
        locale: 'en',
        title: 'Reginald Warnefordstraat',
        shortDescription: 'A refined city-home renovation with a bright kitchen and industrial accents.',
        description: 'An urban renovation built around light, kitchen space and cleaner circulation.',
        projectType: 'Full renovation',
        duration: '6 months',
        surface: '130 m²',
        completionDate: '2022',
      },
    ],
  },
  {
    slug: 'afwerking-parijs',
    category: 'Afwerking',
    location: 'Parijs',
    year: 2025,
    featured: false,
    isPublished: true,
    sortOrder: 3,
    coverImageUrl: projectImages.parijs.main,
    images: [
      ...projectImages.parijs.after.map((imageUrl, index) => ({
        imageUrl,
        alt: 'Paris finishing project photo',
        sortOrder: index,
      })),
    ],
    translations: [
      {
        locale: 'nl',
        title: 'Afwerking Parijs',
        shortDescription: 'Afwerking van een gestript appartement naar een warme, woonklare plek.',
        description: 'Vloeren, verlichting en schilderwerk werden op korte doorlooptijd afgestemd.',
        challengeText: 'De ruimte was kaal en logistiek uitdagend door de buitenlandse ligging.',
        approachText: 'We combineerden eiken parket, railverlichting en een compacte uitvoeringsplanning.',
        resultText: 'Een afgewerkt appartement met karakter en een duidelijke ritmiek in materiaal en licht.',
        projectType: 'Afwerking',
        duration: '2 maanden',
        surface: '75 m²',
        completionDate: '2025',
      },
      {
        locale: 'fr',
        title: 'Finitions Paris',
        shortDescription: 'Finitions complètes d’un appartement nu vers un lieu chaleureux et habitable.',
        description: 'Parquet, lumière et peinture ont été coordonnés sur un planning court.',
        projectType: 'Finitions',
        duration: '2 mois',
        surface: '75 m²',
        completionDate: '2025',
      },
      {
        locale: 'en',
        title: 'Paris finishing project',
        shortDescription: 'A stripped apartment finished into a warm, ready-to-live interior.',
        description: 'Flooring, lighting and paint were coordinated within a short delivery window.',
        projectType: 'Finishing',
        duration: '2 months',
        surface: '75 m²',
        completionDate: '2025',
      },
    ],
  },
];
