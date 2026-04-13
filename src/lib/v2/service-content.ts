import type { V2Locale } from './locale';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type V2ServiceFeature = {
  title: string;
  description: string;
};

export type V2FAQ = {
  question: string;
  answer: string;
};

export type V2ServiceCategory = {
  title: string;
  description: string;
  items: string[];
};

export type V2ServiceType = {
  title: string;
  description: string;
};

export type V2TotaalrenovatieContent = {
  badge: string;
  title: string;
  description: string;
  featuresTitle: string;
  featuresSubtitle: string;
  featuresBadge: string;
  features: V2ServiceFeature[];
  scopeBadge: string;
  scopeTitle: string;
  scopeDescription: string;
  scope: string[];
  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: V2FAQ[];
};

export type V2RenovatieContent = {
  badge: string;
  title: string;
  description: string;
  typesBadge: string;
  typesTitle: string;
  typesSubtitle: string;
  types: V2ServiceType[];
  benefitsBadge: string;
  benefitsTitle: string;
  benefitsDescription: string;
  benefits: string[];
};

export type V2AfwerkingContent = {
  badge: string;
  title: string;
  description: string;
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  services: V2ServiceCategory[];
  qualityBadge: string;
  qualityTitle: string;
  qualityDescription: string;
  qualityPoints: string[];
};

export type V2TechniekenContent = {
  badge: string;
  title: string;
  description: string;
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  services: V2ServiceCategory[];
  certBadge: string;
  certTitle: string;
  certDescription: string;
  certifications: string[];
};

export type V2ServiceDetailContent = {
  backToServices: string;
  freeConsultation: string;
  viewProjects: string;
  totaalrenovatie: V2TotaalrenovatieContent;
  renovatie: V2RenovatieContent;
  afwerking: V2AfwerkingContent;
  technieken: V2TechniekenContent;
};

export type V2WhyUsItem = {
  title: string;
  description: string;
};

export type V2ServicesOverviewEntry = {
  title: string;
  subtitle: string;
  description: string;
  tag?: string;
  features: string[];
};

export type V2ServicesPageContent = {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  services: {
    fullRenovation: V2ServicesOverviewEntry;
    renovation: V2ServicesOverviewEntry;
    finishing: V2ServicesOverviewEntry;
    technical: V2ServicesOverviewEntry;
  };
  whyUs: {
    badge: string;
    title: string;
    description: string;
    items: V2WhyUsItem[];
  };
  cta: {
    title: string;
    description: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
};

/* ------------------------------------------------------------------ */
/*  Service detail content — NL / FR / EN                              */
/* ------------------------------------------------------------------ */

const serviceDetailNl: V2ServiceDetailContent = {
  backToServices: 'Terug naar diensten',
  freeConsultation: 'Gratis adviesgesprek',
  viewProjects: 'Bekijk projecten',

  totaalrenovatie: {
    badge: 'Meest gevraagd',
    title: 'Totaalrenovatie',
    description:
      'Volledige renovatie van uw woning, van ruwbouw tot afwerking. Met een aanspreekpunt, duurzame materiaalkeuzes en premie-proof documentatie.',
    featuresTitle: 'Wat mag u verwachten?',
    featuresSubtitle:
      'Onze totaalrenovaties kenmerken zich door kwaliteit, communicatie en duurzaamheid.',
    featuresBadge: 'Voordelen',
    features: [
      {
        title: 'E\u00e9n aanspreekpunt',
        description:
          'U heeft een contactpersoon voor uw hele project. Wij co\u00f6rdineren alle vakmensen en leveranciers.',
      },
      {
        title: 'Heldere planning',
        description:
          'Duidelijke fasering en regelmatige updates. U weet altijd waar u aan toe bent.',
      },
      {
        title: 'Kwaliteitsgarantie',
        description:
          'Vakkundige uitvoering met oog voor detail en gebruik van duurzame materialen.',
      },
      {
        title: 'Premie-proof',
        description:
          'Correcte documentatie voor Mijn VerbouwPremie en andere subsidies.',
      },
    ],
    scopeBadge: 'Scope',
    scopeTitle: 'Wat omvat een totaalrenovatie?',
    scopeDescription:
      'Een totaalrenovatie betekent dat we alle aspecten van uw woning onder handen nemen. Van structurele werken tot de kleinste afwerkingsdetails.',
    scope: [
      'Structurele werken en ruwbouw',
      'Isolatie (dak, gevel, vloer)',
      'Ramen en deuren',
      'Elektriciteit (AREI-conform)',
      'Sanitair en verwarming',
      'Ventilatie',
      'Tegelwerk en vloeren',
      'Plakwerk en gyproc',
      'Schilderwerk',
      'Keuken en badkamer',
      'Buitenafwerking',
    ],
    faqBadge: 'FAQ',
    faqTitle: 'Veelgestelde vragen',
    faqSubtitle:
      'Antwoorden op de meest voorkomende vragen over totaalrenovatie.',
    faqs: [
      {
        question: 'Hoe lang duurt een totaalrenovatie?',
        answer:
          'De duur hangt af van de scope en complexiteit van uw project. Een gemiddelde totaalrenovatie duurt 3 tot 6 maanden. We maken een gedétailléerde planning bij de start.',
      },
      {
        question: 'Kan ik blijven wonen tijdens de renovatie?',
        answer:
          'Dit hangt af van de omvang van de werken. We bespreken dit tijdens het adviesgesprek en zoeken samen naar de beste oplossing.',
      },
      {
        question: 'Hoe werkt de betalingsregeling?',
        answer:
          'We werken met een betalingsplan in schijven, gekoppeld aan mijlpalen in het project. Zo heeft u budgetzekerheid en transparantie.',
      },
      {
        question: 'Helpen jullie met premieaanvragen?',
        answer:
          'Ja, we leveren premie-proof offertes en facturen, en helpen met de nodige attesten. U dient de aanvraag zelf in via het loket.',
      },
      {
        question: 'Werken jullie met onderaannemers?',
        answer:
          'Voor gespecialiseerde technieken werken we met vaste, betrouwbare partners. Zij werken onder onze co\u00f6rdinatie en kwaliteitscontrôle.',
      },
    ],
  },

  renovatie: {
    badge: 'Gerichte renovaties',
    title: 'Renovatie & Verbouwing',
    description:
      'Gerichte renovaties en verbouwingen voor specifieke ruimtes of delen van uw woning. Van badkamerrenovatie tot uitbreiding\u2014vakkundig uitgevoerd.',
    typesBadge: 'Opties',
    typesTitle: 'Mogelijkheden',
    typesSubtitle:
      'Ontdek de verschillende renovatie- en verbouwingsprojecten die we uitvoeren.',
    types: [
      {
        title: 'Badkamerrenovatie',
        description:
          'Uw badkamer volledig vernieuwen met kwalitatieve materialen en vakkundige afwerking.',
      },
      {
        title: 'Keukenrenovatie',
        description:
          'Een functionele en stijlvolle keuken die perfect aansluit bij uw levensstijl.',
      },
      {
        title: 'Uitbreidingen',
        description:
          'Extra leefruimte cre\u00ebren met een aanbouw of veranda, naadloos ge\u00efntegreerd.',
      },
      {
        title: 'Zolderinrichting',
        description:
          'Uw zolder omtoveren tot een volwaardige leefruimte met alle comfort.',
      },
    ],
    benefitsBadge: 'Voordelen',
    benefitsTitle: 'Voordelen van gerichte renovatie',
    benefitsDescription:
      'Een gerichte renovatie is ideaal wanneer u specifieke ruimtes wilt vernieuwen zonder uw hele woning onder handen te nemen.',
    benefits: [
      'Gerichte aanpak voor specifieke ruimtes',
      'Minder overlast dan bij totaalrenovatie',
      'Duidelijke scope en budget',
      'Vakkundige afwerking en materialen',
      'Coordinatie van alle vakmensen',
      'Premie-proof documentatie waar van toepassing',
    ],
  },

  afwerking: {
    badge: 'Detail & precisie',
    title: 'Afwerking',
    description:
      'Vakkundige afwerking die het verschil maakt. Tegelwerk, plakwerk, schilderwerk en meer\u2014met oog voor detail en kwaliteitsvolle materialen.',
    servicesBadge: 'Diensten',
    servicesTitle: 'Onze afwerkingsdiensten',
    servicesSubtitle:
      'Van tegelwerk tot schilderwerk\u2014alles voor een perfecte afwerking.',
    services: [
      {
        title: 'Tegelwerk',
        description:
          'Vakkundig gelegd tegelwerk voor vloer en wand. Van klassiek tot modern, met oog voor patroon en voegen.',
        items: [
          'Vloertegels',
          'Wandtegels',
          'Moza\u00efek',
          'Natuursteen',
          'Grote formaten',
        ],
      },
      {
        title: 'Plakwerk & Gyproc',
        description:
          'Strakke wanden en plafonds met gyproc of traditioneel pleisterwerk.',
        items: [
          'Gyprocwanden',
          'Verlaagde plafonds',
          'Pleisterwerk',
          'Schuurwerk',
          'Sierpleister',
        ],
      },
      {
        title: 'Schilderwerk',
        description:
          'Professioneel schilderwerk voor binnen en buiten. Met kwalitatieve verven en gezonde alternatieven.',
        items: [
          'Binnenschilderwerk',
          'Buitenschilderwerk',
          'Lakwerk',
          'Behang',
          'Decoratieve technieken',
        ],
      },
      {
        title: 'Chapewerk',
        description:
          'Egale ondervloeren voor een perfecte afwerking van uw vloerbekleding.',
        items: [
          'Traditionele chape',
          'Vloerverwarming-chape',
          'Egalisatie',
          'Sneldrogende chape',
        ],
      },
    ],
    qualityBadge: 'Kwaliteit',
    qualityTitle: 'Afwerking die blijft',
    qualityDescription:
      'De afwerking bepaalt het eindresultaat van uw renovatie. Daarom besteden we extra aandacht aan materialen, technieken en details.',
    qualityPoints: [
      'Gebruik van kwalitatieve materialen',
      'Vakkundige toepassing en verwerking',
      'Oog voor detail en afwerking',
      'Gezonde materialen waar mogelijk',
      'Strakke oplevering',
    ],
  },

  technieken: {
    badge: 'Erkende vakmensen',
    title: 'Technieken',
    description:
      'Elektriciteit, sanitair, verwarming en ventilatie door erkende vakmensen. Veilig, conform alle normen en met de juiste attesten.',
    servicesBadge: 'Expertise',
    servicesTitle: 'Onze technische diensten',
    servicesSubtitle:
      'Alle technische installaties voor uw renovatieproject.',
    services: [
      {
        title: 'Elektriciteit',
        description:
          'Volledige elektrische installaties, conform AREI-normen. Van basisinstallatie tot domotica.',
        items: [
          'Nieuwe installaties',
          'Renovatie bestaande installatie',
          'Verlichting',
          'Stopcontacten & schakelaars',
          'Elektrische keuring',
        ],
      },
      {
        title: 'Sanitair',
        description:
          'Sanitaire installaties van hoge kwaliteit. Leidingwerk, aansluitingen en toestellen.',
        items: [
          'Leidingwerk (koper, kunststof)',
          'Badkamerinstallaties',
          'Keukeninstallaties',
          'Afvoersystemen',
          'Regenwatersystemen',
        ],
      },
      {
        title: 'Verwarming',
        description:
          'Verwarmingsinstallaties voor comfort en effici\u00ebntie. Van radiatoren tot vloerverwarming.',
        items: [
          'Centrale verwarming',
          'Vloerverwarming',
          'Radiatoren',
          'Warmtepomp-ready',
          'Thermostaatregeling',
        ],
      },
      {
        title: 'Ventilatie',
        description:
          'Ventilatiesystemen voor een gezond binnenklimaat. Van basis tot systeem D.',
        items: [
          'Mechanische ventilatie',
          'Systeem C en D',
          'Dampkappen',
          'Badkamerventilatie',
          'Vraaggestuurde ventilatie',
        ],
      },
    ],
    certBadge: 'Normen & certificering',
    certTitle: 'Conform alle normen',
    certDescription:
      'Onze technische installaties worden uitgevoerd door erkende vakmensen en voldoen aan alle geldende normen en voorschriften.',
    certifications: [
      'AREI-conforme elektrische installaties',
      'Erkende keuringsorganismen voor attesten',
      'Premie-proof documentatie',
      'Garantie op materialen en uitvoering',
      'Nazorg en ondersteuning',
    ],
  },
};

const serviceDetailFr: V2ServiceDetailContent = {
  backToServices: 'Retour aux services',
  freeConsultation: 'Consultation gratuite',
  viewProjects: 'Voir les projets',

  totaalrenovatie: {
    badge: 'Le plus demandé',
    title: 'Rénovation complète',
    description:
      'Rénovation complète de votre maison, du gros oeuvre aux finitions. Avec un seul interlocuteur, des choix de matériaux durables et une documentation conforme aux primes.',
    featuresTitle: 'À quoi pouvez-vous vous attendre?',
    featuresSubtitle:
      'Nos renovations completes se caractérisent par la qualité, la communication et la durabilité.',
    featuresBadge: 'Avantages',
    features: [
      {
        title: 'Un seul interlocuteur',
        description:
          'Vous avez une seule personne de contact pour tout votre projet. Nous coordonnons tous les artisans et fournisseurs.',
      },
      {
        title: 'Planning clair',
        description:
          'Phasage clair et mises a jour régulières. Vous savez toujours où vous en êtes.',
      },
      {
        title: 'Garantie de qualité',
        description:
          'Execution experte avec attention aux details et utilisation de matériaux durables.',
      },
      {
        title: 'Conforme aux primes',
        description:
          'Documentation correcte pour les primes de renovation et autres subventions.',
      },
    ],
    scopeBadge: 'Portee',
    scopeTitle: 'Que comprend une rénovation complète?',
    scopeDescription:
      'Une rénovation complète signifie que nous prenons en charge tous les aspects de votre maison. Des travaux structurels aux plus petits details de finition.',
    scope: [
      'Travaux structurels et gros oeuvre',
      'Isolation (toit, façade, sol)',
      'Fenêtres et portes',
      'Électricité (conforme aux normes)',
      'Sanitaire et chauffage',
      'Ventilation',
      'Carrelage et revêtements de sol',
      'Plâtrage et cloisons sèches',
      'Peinture',
      'Cuisine et salle de bain',
      'Finitions extérieures',
    ],
    faqBadge: 'FAQ',
    faqTitle: 'Questions frequentes',
    faqSubtitle:
      'Reponses aux questions les plus courantes sur la rénovation complète.',
    faqs: [
      {
        question: 'Combien de temps dure une rénovation complète?',
        answer:
          'La durée dépend de l\'ampleur et de la complexite de votre projet. Une rénovation complète moyenne dure 3 a 6 mois. Nous établissons un planning détaillé au démarrage.',
      },
      {
        question: 'Puis-je rester dans ma maison pendant la renovation?',
        answer:
          'Cela dépend de l\'ampleur des travaux. Nous en discutons lors de la consultation et trouvons ensemble la meilleure solution.',
      },
      {
        question: 'Comment fonctionne le plan de paiement?',
        answer:
          'Nous travaillons avec un plan de paiement échelonné, lie aux étapes du projet. Cela vous donne une certitude budgétaire et de la transparence.',
      },
      {
        question: 'Aidez-vous avec les demandes de primes?',
        answer:
          'Oui, nous fournissons des devis et factures conformes aux primes, et aidons avec les attestations nécessaires. Vous soumettez vous-meme la demande via le portail.',
      },
      {
        question: 'Travaillez-vous avec des sous-traitants?',
        answer:
          'Pour les techniques spécialisées, nous travaillons avec des partenaires de confiance. Ils travaillent sous notre coordination et contrôle qualité.',
      },
    ],
  },

  renovatie: {
    badge: 'Rénovations ciblées',
    title: 'Renovation & Transformation',
    description:
      'Rénovations et transformations ciblées pour des pièces ou parties spécifiques de votre maison. De la rénovation de salle de bain à l\'extension\u2014exécution experte.',
    typesBadge: 'Options',
    typesTitle: 'Possibilites',
    typesSubtitle:
      'Découvrez les différents projets de renovation et transformation que nous réalisons.',
    types: [
      {
        title: 'Rénovation salle de bain',
        description:
          'Renouveler complètement votre salle de bain avec des matériaux de qualité et une finition experte.',
      },
      {
        title: 'Rénovation cuisine',
        description:
          'Une cuisine fonctionnelle et élégante qui correspond parfaitement a votre style de vie.',
      },
      {
        title: 'Extensions',
        description:
          'Creer un espace de vie supplémentaire avec une extension ou veranda, parfaitement intégrée.',
      },
      {
        title: 'Aménagement des combles',
        description:
          'Transformer vos combles en un espace de vie a part entière avec tout le confort.',
      },
    ],
    benefitsBadge: 'Avantages',
    benefitsTitle: 'Avantages de la rénovation ciblée',
    benefitsDescription:
      'Une rénovation ciblée est ideale lorsque vous souhaitez renouveler des pièces spécifiques sans rénover toute votre maison.',
    benefits: [
      'Approche ciblee pour des pièces spécifiques',
      'Moins de perturbation qu\'une rénovation complète',
      'Portee et budget clairs',
      'Finition et matériaux experts',
      'Coordination de tous les artisans',
      'Documentation conforme aux primes le cas échéant',
    ],
  },

  afwerking: {
    badge: 'Detail & précision',
    title: 'Finitions',
    description:
      'Finitions expertes qui font la différence. Carrelage, plâtrage, peinture et plus\u2014avec attention aux details et matériaux de qualité.',
    servicesBadge: 'Services',
    servicesTitle: 'Nos services de finition',
    servicesSubtitle:
      'Du carrelage a la peinture\u2014tout pour une finition parfaite.',
    services: [
      {
        title: 'Carrelage',
        description:
          'Carrelage posé avec expertise pour sol et mur. Du classique au moderne, avec attention au motif et aux joints.',
        items: [
          'Carrelage sol',
          'Carrelage mural',
          'Mosaïque',
          'Pierre naturelle',
          'Grands formats',
        ],
      },
      {
        title: 'Plâtrage & Cloisons sèches',
        description:
          'Murs et plafonds lisses avec cloisons sèches ou plâtrage traditionnel.',
        items: [
          'Cloisons en plaques de plâtre',
          'Plafonds suspendus',
          'Plâtrage',
          'Ponçage',
          'Platre décoratif',
        ],
      },
      {
        title: 'Peinture',
        description:
          'Peinture professionnelle intérieure et extérieure. Avec des peintures de qualité et des alternatives saines.',
        items: [
          'Peinture intérieure',
          'Peinture extérieure',
          'Laquage',
          'Papier peint',
          'Techniques décoratives',
        ],
      },
      {
        title: 'Chape',
        description:
          'Sous-planchers nivelés pour une finition parfaite de votre revêtement de sol.',
        items: [
          'Chape traditionnelle',
          'Chape chauffage au sol',
          'Nivellement',
          'Chape a séchage rapide',
        ],
      },
    ],
    qualityBadge: 'Qualite',
    qualityTitle: 'Des finitions qui durent',
    qualityDescription:
      'La finition détermine le résultat final de votre renovation. C\'est pourquoi nous accordons une attention particulière aux matériaux, techniques et details.',
    qualityPoints: [
      'Utilisation de matériaux de qualité',
      'Application et traitement experts',
      'Attention aux details et finitions',
      'Materiaux sains quand possible',
      'Livraison impeccable',
    ],
  },

  technieken: {
    badge: 'Professionnels certifiés',
    title: 'Techniques',
    description:
      'Électricité, plomberie, chauffage et ventilation par des professionnels certifiés. Sur, conforme a toutes les normes et avec les bons certificats.',
    servicesBadge: 'Expertise',
    servicesTitle: 'Nos services techniques',
    servicesSubtitle:
      'Toutes les installations techniques pour votre projet de renovation.',
    services: [
      {
        title: 'Électricité',
        description:
          'Installations électriques completes, conformes aux normes. De l\'installation de base a la domotique.',
        items: [
          'Nouvelles installations',
          'Rénovation installation existante',
          'Éclairage',
          'Prises & interrupteurs',
          'Inspection électrique',
        ],
      },
      {
        title: 'Plomberie',
        description:
          'Installations sanitaires de haute qualité. Tuyauterie, raccordements et appareils.',
        items: [
          'Tuyauterie (cuivre, plastique)',
          'Installations salle de bain',
          'Installations cuisine',
          'Systèmes d\'évacuation',
          'Systèmes eau de pluie',
        ],
      },
      {
        title: 'Chauffage',
        description:
          'Installations de chauffage pour confort et efficacite. Des radiateurs au chauffage au sol.',
        items: [
          'Chauffage central',
          'Chauffage au sol',
          'Radiateurs',
          'Prêt pour pompe a chaleur',
          'Controle thermostat',
        ],
      },
      {
        title: 'Ventilation',
        description:
          'Systèmes de ventilation pour un climat intérieur sain. Du basique au contrôle a la demande.',
        items: [
          'Ventilation mécanique',
          'Système C et D',
          'Hottes aspirantes',
          'Ventilation salle de bain',
          'Ventilation a la demande',
        ],
      },
    ],
    certBadge: 'Normes & certification',
    certTitle: 'Conforme a toutes les normes',
    certDescription:
      'Nos installations techniques sont réalisées par des professionnels certifiés et conformes a toutes les normes et réglementations en vigueur.',
    certifications: [
      'Installations électriques conformes aux normes',
      'Organismes de contrôle agréés pour les certificats',
      'Documentation conforme aux primes',
      'Garantie sur matériaux et exécution',
      'Service après-vente et support',
    ],
  },
};

const serviceDetailEn: V2ServiceDetailContent = {
  backToServices: 'Back to services',
  freeConsultation: 'Free consultation',
  viewProjects: 'View projects',

  totaalrenovatie: {
    badge: 'Most requested',
    title: 'Full Renovation',
    description:
      'Complete renovation of your home, from structural work to finishing. With a single point of contact, sustainable material choices and subsidy-ready documentation.',
    featuresTitle: 'What can you expect?',
    featuresSubtitle:
      'Our full renovations are characterized by quality, communication and sustainability.',
    featuresBadge: 'Benefits',
    features: [
      {
        title: 'Single point of contact',
        description:
          'You have one contact person for your entire project. We coordinate all craftsmen and suppliers.',
      },
      {
        title: 'Clear planning',
        description:
          'Clear phasing and regular updates. You always know where you stand.',
      },
      {
        title: 'Quality guarantee',
        description:
          'Expert exécution with attention to detail and use of sustainable materials.',
      },
      {
        title: 'Subsidy-ready',
        description:
          'Correct documentation for renovation subsidies and other grants.',
      },
    ],
    scopeBadge: 'Scope',
    scopeTitle: 'What does a full renovation include?',
    scopeDescription:
      'A full renovation means we take care of all aspects of your home. From structural work to the smallest finishing details.',
    scope: [
      'Structural and shell work',
      'Insulation (roof, façade, floor)',
      'Windows and doors',
      'Electrical (code-compliant)',
      'Plumbing and heating',
      'Ventilation',
      'Tiling and flooring',
      'Plastering and drywall',
      'Painting',
      'Kitchen and bathroom',
      'Exterior finishing',
    ],
    faqBadge: 'FAQ',
    faqTitle: 'Frequently asked questions',
    faqSubtitle:
      'Answers to the most common questions about full renovation.',
    faqs: [
      {
        question: 'How long does a full renovation take?',
        answer:
          'The duration dépends on the scope and complexity of your project. An average full renovation takes 3 to 6 months. We create a detailed schedule at the start.',
      },
      {
        question: 'Can I stay in my home during the renovation?',
        answer:
          'This dépends on the scope of work. We discuss this during the consultation and find the best solution together.',
      },
      {
        question: 'How does the payment arrangement work?',
        answer:
          'We work with a payment plan in installments, linked to milestones in the project. This gives you budget certainty and transparency.',
      },
      {
        question: 'Do you help with subsidy applications?',
        answer:
          'Yes, we provide subsidy-ready quotes and invoices, and help with the necessary certificates. You submit the application yourself through the portal.',
      },
      {
        question: 'Do you work with subcontractors?',
        answer:
          'For specialized techniques, we work with trusted partners. They work under our coordination and quality control.',
      },
    ],
  },

  renovatie: {
    badge: 'Targeted renovations',
    title: 'Renovation & Remodeling',
    description:
      'Targeted renovations and remodeling for specific rooms or parts of your home. From bathroom renovation to extension\u2014expertly executed.',
    typesBadge: 'Options',
    typesTitle: 'Possibilities',
    typesSubtitle:
      'Discover the various renovation and remodeling projects we carry out.',
    types: [
      {
        title: 'Bathroom renovation',
        description:
          'Completely renew your bathroom with quality materials and expert finishing.',
      },
      {
        title: 'Kitchen renovation',
        description:
          'A functional and stylish kitchen that perfectly matches your lifestyle.',
      },
      {
        title: 'Extensions',
        description:
          'Create extra living space with an extension or veranda, seamlessly integrated.',
      },
      {
        title: 'Attic conversion',
        description:
          'Transform your attic into a full-fledged living space with all comforts.',
      },
    ],
    benefitsBadge: 'Benefits',
    benefitsTitle: 'Benefits of targeted renovation',
    benefitsDescription:
      'A targeted renovation is ideal when you want to renew specific rooms without renovating your entire home.',
    benefits: [
      'Targeted approach for specific rooms',
      'Less disruption than full renovation',
      'Clear scope and budget',
      'Expert finishing and materials',
      'Coordination of all craftsmen',
      'Subsidy-ready documentation where applicable',
    ],
  },

  afwerking: {
    badge: 'Detail & précision',
    title: 'Finishing',
    description:
      'Expert finishing that makes the différence. Tiling, plastering, painting and more\u2014with attention to detail and quality materials.',
    servicesBadge: 'Services',
    servicesTitle: 'Our finishing services',
    servicesSubtitle:
      'From tiling to painting\u2014everything for a perfect finish.',
    services: [
      {
        title: 'Tiling',
        description:
          'Expertly laid tiling for floor and wall. From classic to modern, with attention to pattern and grouting.',
        items: [
          'Floor tiles',
          'Wall tiles',
          'Mosaic',
          'Natural stone',
          'Large formats',
        ],
      },
      {
        title: 'Plastering & Drywall',
        description:
          'Smooth walls and ceilings with drywall or traditional plastering.',
        items: [
          'Drywall partitions',
          'Suspended ceilings',
          'Plastering',
          'Sanding',
          'Decorative plaster',
        ],
      },
      {
        title: 'Painting',
        description:
          'Professional interior and exterior painting. With quality paints and healthy alternatives.',
        items: [
          'Interior painting',
          'Exterior painting',
          'Lacquer work',
          'Wallpaper',
          'Decorative techniques',
        ],
      },
      {
        title: 'Screeding',
        description:
          'Level subfloors for a perfect finish of your floor covering.',
        items: [
          'Traditional screed',
          'Underfloor heating screed',
          'Leveling',
          'Fast-drying screed',
        ],
      },
    ],
    qualityBadge: 'Quality',
    qualityTitle: 'Finishing that lasts',
    qualityDescription:
      'The finishing détermines the end result of your renovation. That\'s why we pay extra attention to materials, techniques and details.',
    qualityPoints: [
      'Use of quality materials',
      'Expert application and processing',
      'Attention to detail and finishing',
      'Healthy materials where possible',
      'Clean handover',
    ],
  },

  technieken: {
    badge: 'Certified professionals',
    title: 'Technical',
    description:
      'Electrical, plumbing, heating and ventilation by certified professionals. Safe, compliant with all standards and with proper certificates.',
    servicesBadge: 'Expertise',
    servicesTitle: 'Our technical services',
    servicesSubtitle:
      'All technical installations for your renovation project.',
    services: [
      {
        title: 'Electrical',
        description:
          'Complete electrical installations, code-compliant. From basic installation to home automation.',
        items: [
          'New installations',
          'Existing installation renovation',
          'Lighting',
          'Outlets & switches',
          'Electrical inspection',
        ],
      },
      {
        title: 'Plumbing',
        description:
          'High-quality plumbing installations. Piping, connections and fixtures.',
        items: [
          'Piping (copper, plastic)',
          'Bathroom installations',
          'Kitchen installations',
          'Drainage systems',
          'Rainwater systems',
        ],
      },
      {
        title: 'Heating',
        description:
          'Heating installations for comfort and efficiency. From radiators to underfloor heating.',
        items: [
          'Central heating',
          'Underfloor heating',
          'Radiators',
          'Heat pump ready',
          'Thermostat control',
        ],
      },
      {
        title: 'Ventilation',
        description:
          'Ventilation systems for a healthy indoor climate. From basic to demand-controlled.',
        items: [
          'Mechanical ventilation',
          'System C and D',
          'Extractor hoods',
          'Bathroom ventilation',
          'Demand-controlled ventilation',
        ],
      },
    ],
    certBadge: 'Standards & certification',
    certTitle: 'Compliant with all standards',
    certDescription:
      'Our technical installations are carried out by certified professionals and comply with all applicable standards and regulations.',
    certifications: [
      'Code-compliant electrical installations',
      'Certified inspection bodies for certificates',
      'Subsidy-ready documentation',
      'Warranty on materials and workmanship',
      'Aftercare and support',
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Services overview page content — NL / FR / EN                      */
/* ------------------------------------------------------------------ */

const servicesPageNl: V2ServicesPageContent = {
  hero: {
    badge: 'Onze expertise',
    titlePrefix: 'Diensten voor elke',
    titleHighlight: 'renovatie',
    description:
      'Van totaalrenovatie tot vakkundige afwerking. We begeleiden u door elk aspect van uw renovatieproject met duurzame materiaalkeuzes en heldere communicatie.',
  },
  services: {
    fullRenovation: {
      title: 'Totaalrenovatie',
      subtitle: 'Complete transformatie',
      description:
        'Volledige renovatie van uw woning, van ruwbouw tot afwerking. We co\u00f6rdineren alle aspecten van uw project met een aanspreekpunt.',
      tag: 'Meest gevraagd',
      features: [
        'Volledige projectco\u00f6rdinatie',
        'Ruwbouw en structurele werken',
        'Technieken (elektriciteit, sanitair)',
        'Afwerking en intérieur',
        'Premie-proof documentatie',
      ],
    },
    renovation: {
      title: 'Renovatie & Verbouwing',
      subtitle: 'Gerichte aanpassingen',
      description:
        'Gerichte renovaties en verbouwingen voor specifieke ruimtes of delen van uw woning. Van badkamer tot uitbreiding.',
      features: [
        'Badkamerrenovatie',
        'Keukenrenovatie',
        'Uitbreidingen en aanbouw',
        'Kelderrenovatie',
        'Zolderinrichting',
      ],
    },
    finishing: {
      title: 'Afwerking',
      subtitle: 'Het verschil zit in de details',
      description:
        'Vakkundige afwerking die het verschil maakt. Tegelwerk, plakwerk, schilderwerk en meer met oog voor detail.',
      features: [
        'Tegelwerk (vloer en wand)',
        'Plakwerk en gyproc',
        'Schilderwerk',
        'Chapewerk',
        'Decoratieve afwerking',
      ],
    },
    technical: {
      title: 'Technieken',
      subtitle: 'Veilig & conform',
      description:
        'Elektriciteit en sanitair door erkende vakmensen. Veilig, conform alle normen en met de juiste attesten.',
      features: [
        'Elektriciteitswerken (AREI-conform)',
        'Sanitaire installaties',
        'Verwarming',
        'Ventilatie',
        'Keuringsattesten',
      ],
    },
  },
  whyUs: {
    badge: 'Onze aanpak',
    title: 'Waarom NAM Construction?',
    description:
      'Wat ons onderscheidt van andere aannemers in de regio Gent.',
    items: [
      {
        title: 'Duurzame materialen',
        description:
          'We kiezen bewust voor materialen met een lange levensduur en gezonde eigenschappen voor u en het milieu.',
      },
      {
        title: 'Premie-proof dossier',
        description:
          'Correcte offerte, factuur en attesten zodat uw premieaanvraag bij de overheid vlot verloopt.',
      },
      {
        title: 'Een vast aanspreekpunt',
        description:
          'Directe communicatie met uw projectleider van start tot oplevering. Geen gedoe met tussenpersonen.',
      },
    ],
  },
  cta: {
    title: 'Benieuwd wat we voor u kunnen betekenen?',
    description: 'Plan een gratis adviesgesprek en we bespreken uw project.',
    buttonPrimary: 'Offerte aanvragen',
    buttonSecondary: 'Gratis adviesgesprek',
  },
};

const servicesPageFr: V2ServicesPageContent = {
  hero: {
    badge: 'Notre expertise',
    titlePrefix: 'Services pour chaque',
    titleHighlight: 'renovation',
    description:
      'De la rénovation complète aux finitions expertes. Nous vous accompagnons dans chaque aspect de votre projet de renovation avec des choix de matériaux durables et une communication claire.',
  },
  services: {
    fullRenovation: {
      title: 'Rénovation complète',
      subtitle: 'Transformation complète',
      description:
        'Rénovation complète de votre maison, du gros oeuvre aux finitions. Nous coordonnons tous les aspects de votre projet avec un seul interlocuteur.',
      tag: 'Le plus demandé',
      features: [
        'Coordination complete du projet',
        'Gros oeuvre et travaux structurels',
        'Techniques (électricité, plomberie)',
        'Finitions et intérieur',
        'Documentation conforme aux primes',
      ],
    },
    renovation: {
      title: 'Renovation & Transformation',
      subtitle: 'Améliorations ciblées',
      description:
        'Rénovations et transformations ciblées pour des pièces ou parties spécifiques de votre maison. De la salle de bain a l\'extension.',
      features: [
        'Rénovation salle de bain',
        'Rénovation cuisine',
        'Extensions et agrandissements',
        'Rénovation cave',
        'Aménagement des combles',
      ],
    },
    finishing: {
      title: 'Finitions',
      subtitle: 'La différence est dans les details',
      description:
        'Finitions expertes qui font la différence. Carrelage, plâtrage, peinture et plus avec attention aux details.',
      features: [
        'Carrelage (sol et mur)',
        'Plâtrage et cloisons sèches',
        'Peinture',
        'Chapes',
        'Finitions décoratives',
      ],
    },
    technical: {
      title: 'Techniques',
      subtitle: 'Sûr & conforme',
      description:
        'Électricité et plomberie par des professionnels certifiés. Sur, conforme a toutes les normes et avec les bons certificats.',
      features: [
        'Travaux électriques (conformes)',
        'Installations sanitaires',
        'Chauffage',
        'Ventilation',
        'Certificats de conformite',
      ],
    },
  },
  whyUs: {
    badge: 'Notre approche',
    title: 'Pourquoi NAM Construction?',
    description:
      'Ce qui nous distingue des autres entrepreneurs dans la région de Gand.',
    items: [
      {
        title: 'Materiaux durables',
        description:
          'Nous choisissons consciemment des matériaux a longue durée de vie et aux proprietes saines pour vous et l\'environnement.',
      },
      {
        title: 'Dossier conforme aux primes',
        description:
          'Devis, factures et attestations corrects pour que votre demande de prime aupres du gouvernement se passe bien.',
      },
      {
        title: 'Un seul interlocuteur',
        description:
          'Communication directe avec votre chef de projet du début a la fin. Pas de tracas avec les intermédiaires.',
      },
    ],
  },
  cta: {
    title: 'Curieux de savoir ce que nous pouvons faire pour vous?',
    description:
      'Planifiez une consultation gratuite et nous discuterons de votre projet.',
    buttonPrimary: 'Demander un devis',
    buttonSecondary: 'Consultation gratuite',
  },
};

const servicesPageEn: V2ServicesPageContent = {
  hero: {
    badge: 'Our expertise',
    titlePrefix: 'Services for every',
    titleHighlight: 'renovation',
    description:
      'From full renovation to expert finishing. We guide you through every aspect of your renovation project with sustainable material choices and clear communication.',
  },
  services: {
    fullRenovation: {
      title: 'Full Renovation',
      subtitle: 'Complete transformation',
      description:
        'Complete renovation of your home, from structural work to finishing. We coordinate all aspects of your project with a single point of contact.',
      tag: 'Most requested',
      features: [
        'Complete project coordination',
        'Structural and shell work',
        'Technical systems (electrical, plumbing)',
        'Finishing and interior',
        'Subsidy-ready documentation',
      ],
    },
    renovation: {
      title: 'Renovation & Remodeling',
      subtitle: 'Targeted improvements',
      description:
        'Targeted renovations and remodeling for specific rooms or parts of your home. From bathroom to extension.',
      features: [
        'Bathroom renovation',
        'Kitchen renovation',
        'Extensions and additions',
        'Basement renovation',
        'Attic conversion',
      ],
    },
    finishing: {
      title: 'Finishing',
      subtitle: 'The différence is in the details',
      description:
        'Expert finishing that makes the différence. Tiling, plastering, painting and more with attention to detail.',
      features: [
        'Tiling (floor and wall)',
        'Plastering and drywall',
        'Painting',
        'Screeding',
        'Decorative finishing',
      ],
    },
    technical: {
      title: 'Technical',
      subtitle: 'Safe & compliant',
      description:
        'Electrical and plumbing by certified professionals. Safe, compliant with all standards and with proper certificates.',
      features: [
        'Electrical work (code-compliant)',
        'Plumbing installations',
        'Heating',
        'Ventilation',
        'Inspection certificates',
      ],
    },
  },
  whyUs: {
    badge: 'Our approach',
    title: 'Why NAM Construction?',
    description:
      'What sets us apart from other contractors in the Ghent région.',
    items: [
      {
        title: 'Sustainable materials',
        description:
          'We consciously choose materials with a long lifespan and healthy properties for you and the environment.',
      },
      {
        title: 'Subsidy-ready documentation',
        description:
          'Correct quotes, invoices and certificates so your subsidy application with the government goes smoothly.',
      },
      {
        title: 'Single point of contact',
        description:
          'Direct communication with your project manager from start to completion. No hassle with intermediaries.',
      },
    ],
  },
  cta: {
    title: 'Wondering what we can do for you?',
    description:
      'Schedule a free consultation and we\'ll discuss your project.',
    buttonPrimary: 'Request a quote',
    buttonSecondary: 'Free consultation',
  },
};

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

const serviceDetailByLocale: Record<V2Locale, V2ServiceDetailContent> = {
  nl: serviceDetailNl,
  fr: serviceDetailFr,
  en: serviceDetailEn,
};

const servicesPageByLocale: Record<V2Locale, V2ServicesPageContent> = {
  nl: servicesPageNl,
  fr: servicesPageFr,
  en: servicesPageEn,
};

export function getV2ServiceDetailContent(locale: V2Locale) {
  return serviceDetailByLocale[locale];
}

export function getV2ServicesPageContent(locale: V2Locale) {
  return servicesPageByLocale[locale];
}

/** Map a page route key to its service detail content key */
export type V2ServiceKey = 'totaalrenovatie' | 'renovatie' | 'afwerking' | 'technieken';

export const PAGE_KEY_TO_SERVICE: Record<string, V2ServiceKey> = {
  'service-full-renovation': 'totaalrenovatie',
  'service-renovation': 'renovatie',
  'service-finishing': 'afwerking',
  'service-technical': 'technieken',
};
