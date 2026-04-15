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
    { id: 'anders', name: 'Anders', slug: 'anders', icon: 'help-circle' },
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
    key: 'companyLegal',
    category: 'company',
    description: 'Juridische bedrijfsgegevens voor voorwaarden, privacy en facturatie',
    valueJson: {
      legalName: 'NAM BV',
      legalForm: 'Besloten Vennootschap',
      enterpriseNumber: '0792.212.559',
      vatNumber: 'BE0792.212.559',
      registeredSeat: 'Zwijnaardsesteenweg 683, 9000 Gent',
      rpr: 'Ondernemingsrechtbank Gent, afdeling Gent',
      foundedDate: '2022-10-07',
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
      defaultDescription: 'Vakkundige renovatie in Gent. Van concept tot oplevering, wij realiseren uw droomwoning.',
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
    eyebrow: 'Nam Construction',
    title: 'Kwaliteit die je blijft voelen',
    description:
      'Vakmanschap met respect voor elk detail. Van concept tot oplevering, wij realiseren uw droomwoning.',
    primaryCtaLabel: 'Gratis offerte aanvragen',
    secondaryCtaLabel: 'Bekijk projecten',
  },
  fr: {
    eyebrow: 'Nam Construction',
    title: 'La qualit\u00e9 que vous ressentez',
    description:
      'Artisanat avec respect pour chaque d\u00e9tail. Du concept \u00e0 la livraison, nous r\u00e9alisons la maison de vos r\u00eaves.',
    primaryCtaLabel: 'Demander un devis gratuit',
    secondaryCtaLabel: 'Voir les projets',
  },
  en: {
    eyebrow: 'Nam Construction',
    title: 'Quality you can feel',
    description:
      'Craftsmanship with respect for every detail. From concept to delivery, we realize your dream home.',
    primaryCtaLabel: 'Get a free quote',
    secondaryCtaLabel: 'View projects',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedServices = {
  nl: {
    eyebrow: 'Onze expertise',
    title: 'Van concept tot afwerking',
    description:
      'Elk project verdient vakmanschap. Ontdek onze diensten.',
    items: [
      {
        title: 'Kwaliteitsgarantie',
        description: 'Wij garanderen vakkundige afwerking met hoogwaardige materialen.',
      },
      {
        title: 'Transparante prijzen',
        description: 'Geen verrassingen. Duidelijke offertes en eerlijke communicatie.',
      },
      {
        title: 'Persoonlijke aanpak',
        description: 'E\u00e9n aanspreekpunt van start tot oplevering.',
      },
    ],
  },
  fr: {
    eyebrow: 'Notre expertise',
    title: 'Du concept \u00e0 la finition',
    description:
      'Chaque projet m\u00e9rite un savoir-faire. D\u00e9couvrez nos services.',
    items: [
      {
        title: 'Garantie de qualit\u00e9',
        description: 'Nous garantissons des finitions expertes avec des mat\u00e9riaux de haute qualit\u00e9.',
      },
      {
        title: 'Prix transparents',
        description: 'Pas de surprises. Devis clairs et communication honn\u00eate.',
      },
      {
        title: 'Approche personnelle',
        description: 'Un seul point de contact du d\u00e9but \u00e0 la livraison.',
      },
    ],
  },
  en: {
    eyebrow: 'Our expertise',
    title: 'From concept to finish',
    description:
      'Every project deserves craftsmanship. Discover our services.',
    items: [
      {
        title: 'Quality guarantee',
        description: 'We guarantee expert finishing with high-quality materials.',
      },
      {
        title: 'Transparent pricing',
        description: 'No surprises. Clear quotes and honest communication.',
      },
      {
        title: 'Personal approach',
        description: 'One point of contact from start to delivery.',
      },
    ],
  },
} satisfies Record<V2Locale, Record<string, unknown>>;

const localizedCta = {
  nl: {
    title: 'Klaar om te beginnen?',
    description: 'Neem contact op voor een vrijblijvend adviesgesprek. Wij denken graag met u mee.',
    primaryCtaLabel: 'Vraag een offerte aan',
    primaryCtaHref: '/offerte',
  },
  fr: {
    title: 'Pr\u00eat \u00e0 commencer ?',
    description: 'Contactez-nous pour une consultation gratuite. Nous r\u00e9fl\u00e9chissons avec vous.',
    primaryCtaLabel: 'Demandez un devis',
    primaryCtaHref: '/offerte',
  },
  en: {
    title: 'Ready to start?',
    description: 'Contact us for a free consultation. We\u2019re happy to think along with you.',
    primaryCtaLabel: 'Request a quote',
    primaryCtaHref: '/offerte',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedProjectsHero = {
  nl: {
    eyebrow: 'Portfolio',
    title: 'Onze realisaties',
    description: 'Ontdek de projecten waar wij trots op zijn. Elke renovatie vertelt een verhaal.',
  },
  fr: {
    eyebrow: 'Portfolio',
    title: 'Nos r\u00e9alisations',
    description: 'D\u00e9couvrez les projets dont nous sommes fiers. Chaque r\u00e9novation raconte une histoire.',
  },
  en: {
    eyebrow: 'Portfolio',
    title: 'Our realizations',
    description: 'Discover the projects we\u2019re proud of. Every renovation tells a story.',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedQuoteHero = {
  nl: {
    eyebrow: 'Offerte aanvragen',
    title: 'Vraag een gratis offerte aan',
    description: 'Vertel ons over uw project en ontvang een vrijblijvende offerte.',
  },
  fr: {
    eyebrow: 'Demande de devis',
    title: 'Demandez un devis gratuit',
    description: 'Parlez-nous de votre projet et recevez un devis sans engagement.',
  },
  en: {
    eyebrow: 'Quote request',
    title: 'Request a free quote',
    description: 'Tell us about your project and receive a no-obligation quote.',
  },
} satisfies Record<V2Locale, Record<string, string>>;

const localizedAppointmentHero = {
  nl: {
    eyebrow: 'Afspraak maken',
    title: 'Boek een gratis adviesgesprek',
    description: 'Kies een moment dat u past en we bespreken uw renovatieplannen.',
  },
  fr: {
    eyebrow: 'Prendre rendez-vous',
    title: 'R\u00e9servez une consultation gratuite',
    description: 'Choisissez un moment qui vous convient et nous discuterons de vos plans de r\u00e9novation.',
  },
  en: {
    eyebrow: 'Make an appointment',
    title: 'Book a free consultation',
    description: 'Choose a time that suits you and we\u2019ll discuss your renovation plans.',
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
        shortDescription: 'Volledige transformatie van een onbewoonbaar verklaarde rijwoning tot een modern pareltje met witte gevel en strak interieur.',
        description: 'Volledige transformatie van een onbewoonbaar verklaarde rijwoning tot een modern pareltje met witte gevel en strak interieur.',
        challengeText: 'Deze klassieke bakstenen rijwoning had haar beste tijd gehad. De gevel was verouderd, het interieur was gedateerd met een oude trap en versleten vloeren. De eigenaar droomde van een complete metamorfose — een moderne woning met behoud van het karakter van het pand.',
        approachText: 'We pakten dit project aan als een volledige totaalrenovatie. Eerst werd het interieur volledig gestript tot op de ruwbouw. Vervolgens volgde een grondige heropbouw: nieuwe vloeren in eiken parket en grijze tegels, strakke witte wanden met ingebouwde spots, en moderne deuren. De gevel werd volledig vernieuwd met een strakke witte afwerking en een nieuw donker dak. De oprit werd heraangelegd met moderne klinkers en er kwam een nieuwe garage.',
        resultText: 'Het resultaat is een woning die niet meer te herkennen is. De witte gevel straalt moderniteit uit, terwijl het interieur warmte en comfort biedt dankzij de eiken vloeren en strakke afwerking. Een totaaltransformatie waar de eigenaar trots op mag zijn.',
        projectType: 'Totaalrenovatie',
        duration: '7 maanden',
        surface: '280 m²',
        completionDate: '2024',
      },
      {
        locale: 'fr',
        title: 'Meulemanstraat 34',
        shortDescription: 'Transformation complète d\u2019une maison déclarée inhabitable en un bijou moderne avec façade blanche et intérieur épuré.',
        description: 'Transformation complète d\u2019une maison déclarée inhabitable en un bijou moderne avec façade blanche et intérieur épuré.',
        challengeText: 'Cette maison mitoyenne en brique classique avait connu des jours meilleurs. La façade était vétuste, l\u2019intérieur désuet avec un vieil escalier et des sols usés. Le propriétaire rêvait d\u2019une métamorphose complète — une maison moderne tout en préservant le caractère du bâtiment.',
        approachText: 'Nous avons abordé ce projet comme une rénovation totale. D\u2019abord, l\u2019intérieur a été entièrement démoli jusqu\u2019au gros œuvre. Puis une reconstruction approfondie a suivi : nouveaux sols en parquet de chêne et carrelage gris, murs blancs épurés avec spots encastrés et portes modernes. La façade a été entièrement refaite avec une finition blanche et une nouvelle toiture sombre. L\u2019allée a été réaménagée avec des pavés modernes et un nouveau garage.',
        resultText: 'Le résultat est une maison méconnaissable. La façade blanche rayonne de modernité, tandis que l\u2019intérieur offre chaleur et confort grâce aux sols en chêne et aux finitions épurées. Une transformation totale dont le propriétaire peut être fier.',
        projectType: 'Rénovation complète',
        duration: '7 mois',
        surface: '280 m²',
        completionDate: '2024',
      },
      {
        locale: 'en',
        title: 'Meulemanstraat 34',
        shortDescription: 'Complete transformation of an uninhabitable townhouse into a modern gem with white facade and sleek interior.',
        description: 'Complete transformation of an uninhabitable townhouse into a modern gem with white facade and sleek interior.',
        challengeText: 'This classic brick townhouse had seen better days. The facade was outdated, the interior dated with an old staircase and worn floors. The owner dreamed of a complete metamorphosis — a modern home while preserving the character of the building.',
        approachText: 'We approached this project as a complete renovation. First, the interior was fully stripped to the shell. Then a thorough rebuild followed: new floors in oak parquet and grey tiles, sleek white walls with recessed spotlights, and modern doors. The facade was completely renewed with a clean white finish and a new dark roof. The driveway was redesigned with modern pavers and a new garage was added.',
        resultText: 'The result is a home that is unrecognizable. The white facade radiates modernity, while the interior offers warmth and comfort thanks to the oak floors and sleek finishing. A total transformation the owner can be proud of.',
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
        shortDescription: 'Stijlvolle totaalrenovatie in het hart van Gent met moderne keuken, stalen deuren en betonvloer.',
        description: 'Stijlvolle totaalrenovatie in het hart van Gent met moderne keuken, stalen deuren en betonvloer.',
        challengeText: 'In een van de mooiste straten van Gent stond deze woning te wachten op een grondige renovatie. De eigenaars wilden een strakke, moderne woning met industriële accenten. De uitdaging was om een tijdloos design te creëren dat past in de historische omgeving.',
        approachText: 'We kozen voor een minimalistische aanpak met sterke materialen. Een moderne witte keuken met zwarte handgrepen en inbouwtoestellen vormt het hart van de woning. Stalen deuren met glas zorgen voor lichtinval en een industriële toets. De betonvloer geeft het geheel een stoere, eigentijdse uitstraling. Een apart keukeneiland met barkrukken maakt de leefruimte compleet.',
        resultText: 'Het resultaat is een woning die industrieel design combineert met huiselijk comfort. De witte keuken, stalen deuren en betonvloer vormen een harmonieus geheel. Dit project bewijst dat minimalisme en warmte perfect samengaan.',
        projectType: 'Totaalrenovatie',
        duration: '6 maanden',
        surface: '130 m²',
        completionDate: '2022',
      },
      {
        locale: 'fr',
        title: 'Reginald Warnefordstraat',
        shortDescription: 'Rénovation totale élégante au cœur de Gand avec cuisine moderne, portes en acier et sol en béton.',
        description: 'Rénovation totale élégante au cœur de Gand avec cuisine moderne, portes en acier et sol en béton.',
        challengeText: 'Dans l\u2019une des plus belles rues de Gand, cette maison attendait une rénovation en profondeur. Les propriétaires souhaitaient une habitation épurée et moderne avec des accents industriels. Le défi était de créer un design intemporel en harmonie avec le quartier historique.',
        approachText: 'Nous avons opté pour une approche minimaliste avec des matériaux forts. Une cuisine blanche moderne avec poignées noires et électroménager encastré forme le cœur de la maison. Des portes en acier et verre apportent lumière et touche industrielle. Le sol en béton donne un caractère brut et contemporain. Un îlot séparé avec tabourets complète l\u2019espace de vie.',
        resultText: 'Le résultat est une maison qui allie design industriel et confort domestique. La cuisine blanche, les portes en acier et le sol en béton forment un ensemble harmonieux. Ce projet prouve que minimalisme et chaleur peuvent parfaitement coexister.',
        projectType: 'Rénovation complète',
        duration: '6 mois',
        surface: '130 m²',
        completionDate: '2022',
      },
      {
        locale: 'en',
        title: 'Reginald Warnefordstraat',
        shortDescription: 'Stylish full renovation in the heart of Ghent with modern kitchen, steel doors and concrete floor.',
        description: 'Stylish full renovation in the heart of Ghent with modern kitchen, steel doors and concrete floor.',
        challengeText: 'In one of the most beautiful streets of Ghent, this home was awaiting a thorough renovation. The owners wanted a sleek, modern home with industrial accents. The challenge was to create a timeless design that fits within the historic surroundings.',
        approachText: 'We chose a minimalist approach with strong materials. A modern white kitchen with black handles and built-in appliances forms the heart of the home. Steel-framed glass doors bring in light and an industrial touch. The concrete floor gives the whole space a bold, contemporary feel. A separate kitchen island with bar stools completes the living area.',
        resultText: 'The result is a home that combines industrial design with domestic comfort. The white kitchen, steel doors and concrete floor form a harmonious whole. This project proves that minimalism and warmth go perfectly together.',
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
        shortDescription: 'Volledige afwerking van een Parijse appartement: vloeren, verlichting en schilderwerk.',
        description: 'Volledige afwerking van een Parijse appartement: vloeren, verlichting en schilderwerk.',
        challengeText: 'Dit appartement in Parijs was volledig gestript en klaar voor afwerking. De vloerbalken lagen bloot, de elektriciteit moest vernieuwd worden en de muren waren kaal. De eigenaar wilde een warme, moderne afwerking met karakter. Op vraag van een Franse professor hebben wij op twee maanden de ganse woning gerenoveerd. Ondanks de lange afstand en het feit dat wij de materialen uit Gent moesten transporteren, zijn wij erin geslaagd om deze woning om te toveren tot een aangename woning.',
        approachText: 'We begonnen met de elektrische installatie en het leggen van een prachtig eiken parket. De muren werden geschilderd, met als blikvanger een groene accentmuur in de woonkamer. Moderne railverlichting werd geïnstalleerd voor een strak en flexibel lichtplan. Elke ruimte kreeg zijn eigen sfeer.',
        resultText: 'Van een kale ruwbouw naar een stijlvol Parijs appartement. De combinatie van het eiken parket, de groene accentmuur en de railverlichting geeft het geheel een eigentijdse maar warme uitstraling. De eigenaar was bijzonder tevreden met het eindresultaat.',
        projectType: 'Afwerking',
        duration: '2 maanden',
        surface: '75 m²',
        completionDate: '2025',
      },
      {
        locale: 'fr',
        title: 'Finitions Paris',
        shortDescription: 'Finitions complètes d\u2019un appartement parisien : sols, éclairage et peinture.',
        description: 'Finitions complètes d\u2019un appartement parisien : sols, éclairage et peinture.',
        challengeText: 'Cet appartement à Paris avait été entièrement démoli et était prêt pour les finitions. Les solives étaient apparentes, l\u2019électricité devait être refaite et les murs étaient nus. Le propriétaire souhaitait une finition chaleureuse et moderne avec du caractère. À la demande d\u2019un professeur français, nous avons rénové l\u2019ensemble de l\u2019appartement en deux mois. Malgré la distance et le transport des matériaux depuis Gand, nous avons réussi à transformer ce logement en un lieu de vie agréable.',
        approachText: 'Nous avons commencé par l\u2019installation électrique et la pose d\u2019un magnifique parquet en chêne. Les murs ont été peints, avec comme point focal un mur d\u2019accent vert dans le salon. Un éclairage moderne sur rail a été installé pour un plan lumineux épuré et flexible. Chaque pièce a reçu sa propre ambiance.',
        resultText: 'D\u2019un gros œuvre nu à un appartement parisien élégant. La combinaison du parquet en chêne, du mur d\u2019accent vert et de l\u2019éclairage sur rail donne à l\u2019ensemble un caractère contemporain mais chaleureux. Le propriétaire était particulièrement satisfait du résultat final.',
        projectType: 'Finitions',
        duration: '2 mois',
        surface: '75 m²',
        completionDate: '2025',
      },
      {
        locale: 'en',
        title: 'Paris finishing project',
        shortDescription: 'Complete finishing of a Parisian apartment: floors, lighting and paintwork.',
        description: 'Complete finishing of a Parisian apartment: floors, lighting and paintwork.',
        challengeText: 'This apartment in Paris had been fully stripped and was ready for finishing. The floor joists were exposed, the electrics needed renewing and the walls were bare. The owner wanted a warm, modern finish with character. At the request of a French professor, we renovated the entire apartment in two months. Despite the long distance and transporting materials from Ghent, we managed to transform this dwelling into a pleasant home.',
        approachText: 'We started with the electrical installation and laying beautiful oak parquet. The walls were painted, with a green accent wall in the living room as the eye-catcher. Modern rail lighting was installed for a sleek and flexible lighting plan. Each room received its own atmosphere.',
        resultText: 'From bare shell to a stylish Parisian apartment. The combination of oak parquet, the green accent wall and rail lighting gives the whole space a contemporary yet warm feel. The owner was particularly pleased with the end result.',
        projectType: 'Finishing',
        duration: '2 months',
        surface: '75 m²',
        completionDate: '2025',
      },
    ],
  },
];
