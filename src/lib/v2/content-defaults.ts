import type { V2DefaultPageSection } from './defaults';
import type { V2Locale } from './locale';

type SectionData = Record<string, unknown>;

function section(
  pageKey: string,
  sectionKey: string,
  locale: V2Locale,
  schemaKey: string,
  displayOrder: number,
  dataJson: SectionData,
): V2DefaultPageSection {
  return {
    pageKey,
    sectionKey,
    locale,
    schemaKey,
    displayOrder,
    published: true,
    dataJson,
  };
}

const pageContent: Record<V2Locale, Record<string, { hero: SectionData; sections: V2DefaultPageSection[] }>> = {
  nl: {
    approach: {
      hero: {
        eyebrow: 'Aanpak',
        title: 'Een beheerste renovatie, van eerste gesprek tot oplevering',
        description:
          'We structureren elke opdracht in duidelijke stappen, met vaste communicatie, realistische planning en scherpe verantwoordelijkheid per fase.',
        primaryCtaLabel: 'Plan een gesprek',
        primaryCtaHref: '/afspraak',
        secondaryCtaLabel: 'Vraag een offerte aan',
        secondaryCtaHref: '/offerte',
      },
      sections: [
        section('approach', 'steps', 'nl', 'feature-list', 1, {
          eyebrow: 'Werkwijze',
          title: 'Vier vaste bouwstenen',
          description: 'Zo blijft scope, timing en uitvoering ook bij complexere renovaties controleerbaar.',
          items: [
            {
              title: '1. Intake en plaatsbezoek',
              description: 'We begrijpen eerst de woning, uw prioriteiten en de technische randvoorwaarden.',
            },
            {
              title: '2. Scope en budgetkader',
              description: 'We maken helder wat inbegrepen is, welke keuzes openstaan en waar budgetdruk ontstaat.',
            },
            {
              title: '3. Planning en uitvoering',
              description: 'Werkpakketten, leveranciers en beslismomenten worden vooraf op elkaar afgestemd.',
            },
            {
              title: '4. Oplevering en nazorg',
              description: 'We sluiten af met een gecontroleerde oplevering en een duidelijke lijst van restpunten.',
            },
          ],
        }),
        section('approach', 'principles', 'nl', 'content', 2, {
          eyebrow: 'Principes',
          title: 'Wat u van ons mag verwachten',
          description:
            'Geen ruis in de uitvoering, geen losse eindes in de communicatie en geen onduidelijke eigenaarschapssituaties.',
          paragraphs: [
            'We sturen renovaties op ritme: eerst inhoud, dan planning, dan uitvoering. Daardoor blijven beslissingen navolgbaar voor klant en werf.',
            'U krijgt één duidelijke lijn voor vragen, budgetimpact en timing. Dat voorkomt dat informatie tussen werf, administratie en klant verloren gaat.',
          ],
          items: [
            {
              title: 'Transparant',
              description: 'Wijzigingen worden expliciet gemaakt voordat ze uitvoering of budget beïnvloeden.',
            },
            {
              title: 'Pragmatisch',
              description: 'We kiezen oplossingen die technisch kloppen én praktisch uitvoerbaar blijven.',
            },
            {
              title: 'Verantwoord',
              description: 'We bouwen met respect voor bestaande structuren, materiaalkeuze en gebruik op lange termijn.',
            },
          ],
        }),
        section('approach', 'cta', 'nl', 'cta', 3, {
          title: 'Wilt u eerst scherpte op planning en haalbaarheid?',
          description: 'Gebruik een eerste gesprek om scope, timing en budgetkader vroeg te structureren.',
          primaryCtaLabel: 'Plan een gesprek',
          primaryCtaHref: '/afspraak',
        }),
      ],
    },
    contact: {
      hero: {
        eyebrow: 'Contact',
        title: 'Bespreek uw renovatie met een team dat snel en concreet reageert',
        description:
          'Voor nieuwe projecten, een werfbezoek of een gerichte vraag over aanpak, planning of materiaalkeuzes.',
        primaryCtaLabel: 'Vraag een offerte aan',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Plan een afspraak',
        secondaryCtaHref: '/afspraak',
      },
      sections: [
        section('contact', 'details', 'nl', 'contact', 1, {
          eyebrow: 'Bereikbaarheid',
          title: 'Contactgegevens',
          description: 'Telefoon, e-mail en adres worden vanuit de site-instellingen beheerd en hier direct weergegeven.',
          highlights: ['Reactie binnen 1 werkdag', 'Plaatsbezoeken op afspraak', 'Focus op regio Gent en omgeving'],
          primaryCtaLabel: 'Offerte aanvragen',
          primaryCtaHref: '/offerte',
        }),
      ],
    },
    services: {
      hero: {
        eyebrow: 'Diensten',
        title: 'Van totaalrenovatie tot technische afwerking',
        description:
          'We combineren ontwerpgevoelige uitvoering met technische coördinatie, zodat structuur, afwerking en gebruik op elkaar aansluiten.',
        primaryCtaLabel: 'Vraag een offerte aan',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Bekijk aanpak',
        secondaryCtaHref: '/aanpak',
      },
      sections: [
        section('services', 'overview', 'nl', 'feature-list', 1, {
          eyebrow: 'Werkvelden',
          title: 'Waar NAM Construction op levert',
          description: 'Elke dienst heeft een eigen scope, maar wordt altijd beoordeeld in de context van de volledige woning.',
          items: [
            {
              title: 'Totaalrenovatie',
              description: 'Eén integrale lijn voor structuur, technieken, afwerking en planning.',
              href: '/diensten/totaalrenovatie',
              ctaLabel: 'Meer over totaalrenovatie',
            },
            {
              title: 'Renovatie & verbouwing',
              description: 'Gerichte verbouwingen met aandacht voor circulatie, licht en gebruik.',
              href: '/diensten/renovatie',
              ctaLabel: 'Meer over renovatie',
            },
            {
              title: 'Afwerking',
              description: 'Interieurafwerking die detail, ritme en materiaalconsistentie bewaakt.',
              href: '/diensten/afwerking',
              ctaLabel: 'Meer over afwerking',
            },
            {
              title: 'Technieken',
              description: 'Elektriciteit, sanitair, HVAC en integratie met de rest van de werf.',
              href: '/diensten/technieken',
              ctaLabel: 'Meer over technieken',
            },
          ],
        }),
        section('services', 'cta', 'nl', 'cta', 2, {
          title: 'Nog niet zeker welke scope past?',
          description: 'Een eerste gesprek helpt om uw vraag te vertalen naar de juiste aanpak en fasering.',
          primaryCtaLabel: 'Plan een gesprek',
          primaryCtaHref: '/afspraak',
        }),
      ],
    },
    'service-full-renovation': {
      hero: {
        eyebrow: 'Totaalrenovatie',
        title: 'Voor woningen die volledig hertekend moeten worden',
        description:
          'We sturen totaalrenovaties op samenhang: ruwbouw, technieken, afwerking en beslissingen moeten één geheel blijven.',
        primaryCtaLabel: 'Start een totaalrenovatie',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Bekijk projecten',
        secondaryCtaHref: '/projecten',
      },
      sections: [
        section('service-full-renovation', 'scope', 'nl', 'content', 1, {
          eyebrow: 'Scope',
          title: 'Wanneer deze dienst past',
          description: 'Voor panden waar structuur, technieken en afwerking samen herbekeken moeten worden.',
          paragraphs: [
            'Totaalrenovatie vraagt meer dan losse uitvoering. De keuzes in plan, technische opbouw en materialisatie moeten vroeg op elkaar afgestemd worden.',
            'Wij organiseren het traject zodat de werf niet ontspoort door late beslissingen of botsende deeloplossingen.',
          ],
          items: [
            {
              title: 'Volledige woning',
              description: 'Herindeling, technieken, afwerking en oplevering in één traject.',
            },
            {
              title: 'Bewoonde context',
              description: 'Fasering en werforganisatie worden mee afgestemd op praktische leefbaarheid.',
            },
          ],
        }),
        section('service-full-renovation', 'cta', 'nl', 'cta', 2, {
          title: 'Wilt u weten of een totaalrenovatie haalbaar is binnen uw kader?',
          description: 'We helpen u eerst met scope, timing en budgetrealiteit.',
          primaryCtaLabel: 'Plan een gesprek',
          primaryCtaHref: '/afspraak',
        }),
      ],
    },
    'service-renovation': {
      hero: {
        eyebrow: 'Renovatie & verbouwing',
        title: 'Gerichte ingrepen met duidelijke technische controle',
        description:
          'Voor verbouwingen die geen volledige reset vragen, maar wel degelijk gecoördineerd moeten worden.',
        primaryCtaLabel: 'Bespreek uw verbouwing',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Bekijk aanpak',
        secondaryCtaHref: '/aanpak',
      },
      sections: [
        section('service-renovation', 'scope', 'nl', 'content', 1, {
          eyebrow: 'Focus',
          title: 'Verbouw zonder de samenhang te verliezen',
          description: 'We koppelen bestaande toestand, nieuwe wensen en werfimpact aan elkaar.',
          paragraphs: [
            'Bij verbouwingen zit de complexiteit vaak in de aansluiting op wat al bestaat. Daarom werken we met een heldere opname van randvoorwaarden en afhankelijkheden.',
            'Zo vermijden we dat een beperkte ingreep onverwacht uitloopt door verborgen technische of structurele conflicten.',
          ],
          items: [
            { title: 'Keuken- en leefruimtes', description: 'Ingrepen op circulatie, gebruik en lichtwerking.' },
            { title: 'Interne verbouwingen', description: 'Aanpassingen met respect voor bestaande structuur en technieken.' },
          ],
        }),
      ],
    },
    'service-finishing': {
      hero: {
        eyebrow: 'Afwerking',
        title: 'Afwerking die rust, detail en materiaalritme bewaakt',
        description: 'Voor interieurs waar de laatste laag de kwaliteit van het hele project moet dragen.',
        primaryCtaLabel: 'Vraag een offerte aan',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Bekijk projecten',
        secondaryCtaHref: '/projecten',
      },
      sections: [
        section('service-finishing', 'scope', 'nl', 'content', 1, {
          eyebrow: 'Detailniveau',
          title: 'Een afgewerkte woning voelt coherent',
          description: 'Afwerking is meer dan materiaalkeuze: het gaat ook over lijnvoering, aansluitingen en ritme.',
          paragraphs: [
            'We stemmen schilderwerk, schrijnwerk, vloeren, maatwerk en einddetails op elkaar af zodat het geheel leesbaar en rustig aanvoelt.',
          ],
          items: [
            { title: 'Interieurafwerking', description: 'Wanden, vloeren, plafonds en maatwerk met consistente detailoplossingen.' },
            { title: 'Laatste coördinatie', description: 'We vermijden dat de slotfase versnipperd en foutgevoelig wordt.' },
          ],
        }),
      ],
    },
    'service-technical': {
      hero: {
        eyebrow: 'Technieken',
        title: 'Technische installaties die de woning ondersteunen, niet verstoren',
        description:
          'We integreren technieken zo dat comfort, onderhoud en afwerking logisch op elkaar aansluiten.',
        primaryCtaLabel: 'Bespreek uw project',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Plan een afspraak',
        secondaryCtaHref: '/afspraak',
      },
      sections: [
        section('service-technical', 'scope', 'nl', 'content', 1, {
          eyebrow: 'Installaties',
          title: 'Van techniek naar bruikbare woning',
          description: 'Technische keuzes worden mee afgestemd op indeling, afwerking en toekomstig gebruik.',
          paragraphs: [
            'Elektriciteit, sanitair, ventilatie en verwarming moeten technisch kloppen en tegelijk inpasbaar blijven binnen de architectuur van de woning.',
          ],
          items: [
            { title: 'Integratie', description: 'Techniek en afwerking worden samen bekeken om herwerk te voorkomen.' },
            { title: 'Praktisch onderhoud', description: 'Toegankelijkheid, service en latere aanpasbaarheid blijven mee in beeld.' },
          ],
        }),
      ],
    },
    'value-certification': {
      hero: {
        eyebrow: 'Waarden',
        title: 'Attestering die zekerheid geeft bij renovatie en btw-kader',
        description: 'We zorgen dat erkende attesten en administratieve randvoorwaarden niet pas op het einde aandacht krijgen.',
        primaryCtaLabel: 'Bespreek uw project',
        primaryCtaHref: '/afspraak',
      },
      sections: [
        section('value-certification', 'content', 'nl', 'content', 1, {
          eyebrow: 'Waarom dit telt',
          title: 'Administratieve correctheid voorkomt dure vertraging',
          description: 'Attesten en fiscale voorwaarden moeten vanaf het begin in de werkwijze zitten.',
          paragraphs: [
            'We brengen vroeg in kaart welke documenten of voorwaarden relevant zijn voor uw dossier, zodat uitvoering en facturatie daarop afgestemd blijven.',
          ],
        }),
      ],
    },
    'value-payment-spread': {
      hero: {
        eyebrow: 'Waarden',
        title: 'Betalingsspreiding vraagt duidelijke afspraken, geen verrassingen',
        description: 'We benaderen budgetfasering nuchter: transparant, schriftelijk en afgestemd op voortgang.',
        primaryCtaLabel: 'Plan een gesprek',
        primaryCtaHref: '/afspraak',
      },
      sections: [
        section('value-payment-spread', 'content', 'nl', 'content', 1, {
          eyebrow: 'Financiële helderheid',
          title: 'Koppeling tussen voortgang en betaling',
          description: 'Dat houdt verwachtingen beheersbaar voor alle partijen.',
          paragraphs: [
            'We structureren betaalmomenten op basis van duidelijke mijlpalen, zodat financiële afspraken niet los komen te staan van de werkelijke werfstatus.',
          ],
        }),
      ],
    },
    'value-communication': {
      hero: {
        eyebrow: 'Waarden',
        title: 'Communicatie is alleen nuttig als ze beslissingen vooruit helpt',
        description: 'We verkiezen een strakke informatiestroom boven losse updates zonder eigenaarschap.',
        primaryCtaLabel: 'Bekijk aanpak',
        primaryCtaHref: '/aanpak',
      },
      sections: [
        section('value-communication', 'content', 'nl', 'content', 1, {
          eyebrow: 'Samenwerking',
          title: 'Duidelijke lijn tussen klant, administratie en werf',
          description: 'Elke beslissing moet zichtbaar, traceerbaar en uitvoerbaar zijn.',
          paragraphs: [
            'Daarom houden we de communicatielijn compact en koppelen we vragen terug aan planning, budget of technische impact.',
          ],
        }),
      ],
    },
    'value-reuse': {
      hero: {
        eyebrow: 'Waarden',
        title: 'Hergebruik waar het technisch en esthetisch echt klopt',
        description: 'Duurzaamheid is voor ons geen losse belofte, maar een afweging per materiaal en context.',
        primaryCtaLabel: 'Bespreek uw renovatie',
        primaryCtaHref: '/offerte',
      },
      sections: [
        section('value-reuse', 'content', 'nl', 'content', 1, {
          eyebrow: 'Circulariteit',
          title: 'Bewust omgaan met wat al aanwezig is',
          description: 'We beoordelen materialen en onderdelen op bruikbaarheid, levensduur en esthetische meerwaarde.',
          paragraphs: [
            'Hergebruik is zinvol wanneer het de kwaliteit van het eindresultaat ondersteunt en niet wanneer het later extra complexiteit veroorzaakt.',
          ],
        }),
      ],
    },
    'value-subsidies': {
      hero: {
        eyebrow: 'Waarden',
        title: 'Subsidies worden bruikbaar als ze vroeg in het project worden meegenomen',
        description: 'We signaleren waar subsidiepotentieel zit, zodat keuzes in timing en scope daarop kunnen inspelen.',
        primaryCtaLabel: 'Plan een gesprek',
        primaryCtaHref: '/afspraak',
      },
      sections: [
        section('value-subsidies', 'content', 'nl', 'content', 1, {
          eyebrow: 'Ondersteuning',
          title: 'Subsidielogica koppelen aan uitvoeringsbeslissingen',
          description: 'Zo blijft het geen administratieve bijzaak die te laat opduikt.',
          paragraphs: [
            'We helpen om subsidiemogelijkheden mee te nemen in de vroege scopevorming, zodat technische keuzes en documentatie daarop aansluiten.',
          ],
        }),
      ],
    },
    privacy: {
      hero: {
        eyebrow: 'Privacy',
        title: 'Hoe we gegevens verwerken voor offerte- en afspraakaanvragen',
        description:
          'Deze pagina beschrijft welke gegevens we verzamelen, waarom we dat doen en hoe we ze beveiligen binnen de commerciële klantreis.',
      },
      sections: [
        section('privacy', 'legal', 'nl', 'legal', 1, {
          updatedAt: '11 april 2026',
          introduction: 'Wij beperken gegevensverwerking tot wat nodig is voor contactopname, projectopvolging, afspraakplanning en operationele administratie.',
          sections: [
            {
              title: 'Welke gegevens we verwerken',
              body: 'Naam, contactgegevens, projectinformatie, afspraakvoorkeuren en eventuele aanvullende context die u zelf meestuurt.',
            },
            {
              title: 'Waarom we deze gegevens gebruiken',
              body: 'Om uw aanvraag te beantwoorden, een afspraak in te plannen, interne opvolging te doen en relevante communicatie over uw project te sturen.',
            },
            {
              title: 'Bewaring en beveiliging',
              body: 'Gegevens worden alleen bewaard zolang dat operationeel of wettelijk nodig is. Toegang is beperkt tot geautoriseerde medewerkers en beheerde systemen.',
            },
            {
              title: 'Uw rechten',
              body: 'U kunt vragen om inzage, correctie of verwijdering van uw persoonsgegevens door contact op te nemen via de contactgegevens op deze site.',
            },
          ],
        }),
      ],
    },
    terms: {
      hero: {
        eyebrow: 'Voorwaarden',
        title: 'Algemene voorwaarden voor samenwerking en uitvoering',
        description: 'Deze voorwaarden schetsen het contractuele kader voor offertes, planning, uitvoering en oplevering.',
      },
      sections: [
        section('terms', 'legal', 'nl', 'legal', 1, {
          updatedAt: '11 april 2026',
          introduction: 'De algemene voorwaarden verduidelijken de basisregels voor prijsopbouw, uitvoering, wijzigingen, oplevering en aansprakelijkheid.',
          sections: [
            {
              title: 'Offertes en opdrachtbevestiging',
              body: 'Een offerte wordt bindend na schriftelijke bevestiging en na eventuele verduidelijking van scope, timing en randvoorwaarden.',
            },
            {
              title: 'Wijzigingen en meerwerk',
              body: 'Wijzigingen tijdens de uitvoering worden expliciet beoordeeld op impact voor budget, planning en technische samenhang.',
            },
            {
              title: 'Planning en oplevering',
              body: 'Planning is gebaseerd op gekende randvoorwaarden. Verstoringen buiten redelijke controle kunnen timing beïnvloeden.',
            },
            {
              title: 'Betalingen',
              body: 'Facturatie gebeurt volgens de overeengekomen betaalmomenten. Betalingstermijnen en eventuele fasering worden schriftelijk vastgelegd.',
            },
          ],
        }),
      ],
    },
  },
  fr: {
    approach: {
      hero: {
        eyebrow: 'Approche',
        title: 'Une rénovation pilotée avec méthode, du premier échange à la livraison',
        description:
          'Chaque mission est structurée en étapes claires avec une communication compacte, un planning réaliste et des responsabilités nettes.',
        primaryCtaLabel: 'Planifier un entretien',
        primaryCtaHref: '/afspraak',
        secondaryCtaLabel: 'Demander un devis',
        secondaryCtaHref: '/offerte',
      },
      sections: [
        section('approach', 'steps', 'fr', 'feature-list', 1, {
          eyebrow: 'Méthode',
          title: 'Quatre repères fixes',
          description: 'Ils permettent de garder la portée, le budget et l’exécution lisibles.',
          items: [
            { title: '1. Intake et visite', description: 'Nous cadrons d’abord le lieu, vos priorités et les contraintes techniques.' },
            { title: '2. Périmètre et budget', description: 'Le cadre du projet et les choix ouverts sont explicités très tôt.' },
            { title: '3. Planning et chantier', description: 'Lots, fournisseurs et moments de décision sont synchronisés.' },
            { title: '4. Livraison et suivi', description: 'Nous clôturons par une réception contrôlée et une liste de points restants.' },
          ],
        }),
        section('approach', 'principles', 'fr', 'content', 2, {
          eyebrow: 'Principes',
          title: 'Ce que vous pouvez attendre de nous',
          description: 'Moins de bruit dans l’exécution, moins de flottement dans les décisions.',
          paragraphs: [
            'Nous faisons avancer le chantier dans le bon ordre: d’abord le contenu, puis le planning, puis l’exécution.',
            'Chaque question est reliée à son impact concret sur le budget, le timing ou la technique.',
          ],
          items: [
            { title: 'Transparence', description: 'Les changements sont rendus explicites avant d’impacter le chantier.' },
            { title: 'Pragmatisme', description: 'Nous cherchons des solutions robustes et réellement réalisables.' },
            { title: 'Responsabilité', description: 'Les décisions gardent un propriétaire clair et un effet identifiable.' },
          ],
        }),
        section('approach', 'cta', 'fr', 'cta', 3, {
          title: 'Besoin d’abord de clarté sur la faisabilité ?',
          description: 'Un premier entretien permet de cadrer le projet avant d’entrer en exécution.',
          primaryCtaLabel: 'Planifier un entretien',
          primaryCtaHref: '/afspraak',
        }),
      ],
    },
    contact: {
      hero: {
        eyebrow: 'Contact',
        title: 'Parlez de votre projet avec une équipe qui répond vite et clairement',
        description: 'Pour un nouveau projet, une visite ou une question ciblée sur le planning, l’approche ou les matériaux.',
        primaryCtaLabel: 'Demander un devis',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Planifier un rendez-vous',
        secondaryCtaHref: '/afspraak',
      },
      sections: [
        section('contact', 'details', 'fr', 'contact', 1, {
          eyebrow: 'Disponibilité',
          title: 'Coordonnées',
          description: 'Téléphone, e-mail et adresse sont pilotés depuis les réglages du site.',
          highlights: ['Réponse sous 1 jour ouvrable', 'Visites sur rendez-vous', 'Forte présence à Gand et autour'],
          primaryCtaLabel: 'Demander un devis',
          primaryCtaHref: '/offerte',
        }),
      ],
    },
    services: {
      hero: {
        eyebrow: 'Services',
        title: 'De la rénovation complète aux finitions techniques',
        description:
          'Nous traitons chaque service comme une partie d’un ensemble cohérent: structure, techniques, finitions et usage final.',
        primaryCtaLabel: 'Demander un devis',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Voir notre approche',
        secondaryCtaHref: '/aanpak',
      },
      sections: [
        section('services', 'overview', 'fr', 'feature-list', 1, {
          eyebrow: 'Domaines',
          title: 'Ce que nous réalisons',
          description: 'Chaque service a son cadre propre, mais il reste intégré à la logique globale du logement.',
          items: [
            { title: 'Rénovation complète', description: 'Une seule ligne directrice pour structure, techniques et finitions.', href: '/diensten/totaalrenovatie', ctaLabel: 'En savoir plus' },
            { title: 'Rénovation', description: 'Interventions ciblées avec attention portée à l’usage et à la circulation.', href: '/diensten/renovatie', ctaLabel: 'En savoir plus' },
            { title: 'Finitions', description: 'Finitions intérieures qui tiennent le niveau de détail jusqu’au bout.', href: '/diensten/afwerking', ctaLabel: 'En savoir plus' },
            { title: 'Techniques', description: 'Installations techniques coordonnées avec le reste du chantier.', href: '/diensten/technieken', ctaLabel: 'En savoir plus' },
          ],
        }),
      ],
    },
    'service-full-renovation': {
      hero: {
        eyebrow: 'Rénovation complète',
        title: 'Pour les logements qui demandent une relecture globale',
        description: 'Nous gardons structure, techniques, finitions et planning dans une seule chaîne de décision.',
        primaryCtaLabel: 'Lancer une rénovation complète',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Voir les projets',
        secondaryCtaHref: '/projecten',
      },
      sections: [
        section('service-full-renovation', 'scope', 'fr', 'content', 1, {
          eyebrow: 'Périmètre',
          title: 'Quand ce service est adapté',
          description: 'Lorsque la structure, les techniques et les finitions doivent être repensées ensemble.',
          paragraphs: [
            'Une rénovation complète demande une coordination plus forte qu’une suite de lots séparés.',
          ],
        }),
      ],
    },
    'service-renovation': {
      hero: {
        eyebrow: 'Rénovation',
        title: 'Des transformations ciblées avec contrôle technique',
        description: 'Pour des interventions plus ciblées qui doivent malgré tout rester bien coordonnées.',
        primaryCtaLabel: 'Parler de votre chantier',
        primaryCtaHref: '/offerte',
      },
      sections: [
        section('service-renovation', 'scope', 'fr', 'content', 1, {
          eyebrow: 'Focus',
          title: 'Transformer sans perdre la cohérence',
          description: 'Nous relions l’existant, les souhaits et l’impact chantier.',
          paragraphs: [
            'La difficulté d’une rénovation partielle est souvent dans l’articulation avec ce qui existe déjà.',
          ],
        }),
      ],
    },
    'service-finishing': {
      hero: {
        eyebrow: 'Finitions',
        title: 'Des finitions qui donnent de la tenue au projet entier',
        description: 'Pour des intérieurs où le détail final doit porter la qualité d’ensemble.',
        primaryCtaLabel: 'Demander un devis',
        primaryCtaHref: '/offerte',
      },
      sections: [
        section('service-finishing', 'scope', 'fr', 'content', 1, {
          eyebrow: 'Détail',
          title: 'Un intérieur fini doit rester lisible et calme',
          description: 'Les raccords, lignes et matériaux doivent former un tout.',
          paragraphs: [
            'Nous coordonnons les dernières couches pour éviter une fin de chantier fragmentée.',
          ],
        }),
      ],
    },
    'service-technical': {
      hero: {
        eyebrow: 'Techniques',
        title: 'Des installations pensées pour le confort et la cohérence',
        description: 'Les choix techniques sont évalués avec leur impact sur l’usage et la finition.',
        primaryCtaLabel: 'Discuter du projet',
        primaryCtaHref: '/offerte',
      },
      sections: [
        section('service-technical', 'scope', 'fr', 'content', 1, {
          eyebrow: 'Installations',
          title: 'La technique doit servir le logement',
          description: 'Electricité, sanitaire et HVAC sont cadrés avec le reste du projet.',
          paragraphs: [
            'Nous intégrons les techniques dans une logique de chantier lisible et maintenable.',
          ],
        }),
      ],
    },
    'value-certification': {
      hero: { eyebrow: 'Valeurs', title: 'La certification doit être cadrée tôt', description: 'Les exigences administratives ne doivent pas arriver trop tard dans le projet.', primaryCtaLabel: 'Planifier un entretien', primaryCtaHref: '/afspraak' },
      sections: [section('value-certification', 'content', 'fr', 'content', 1, { eyebrow: 'Cadre', title: 'Une administration claire évite des retards inutiles', description: 'Nous intégrons les attestations et conditions dès le début du trajet.' })],
    },
    'value-payment-spread': {
      hero: { eyebrow: 'Valeurs', title: 'L’échelonnement demande des accords nets', description: 'Le cadre financier reste lié à l’avancement réel du chantier.', primaryCtaLabel: 'Planifier un entretien', primaryCtaHref: '/afspraak' },
      sections: [section('value-payment-spread', 'content', 'fr', 'content', 1, { eyebrow: 'Clarté', title: 'Paiements et jalons doivent rester alignés', description: 'Nous structurons les paiements sur des étapes visibles et convenues.' })],
    },
    'value-communication': {
      hero: { eyebrow: 'Valeurs', title: 'La communication doit faire avancer les décisions', description: 'Nous privilégions un flux compact et exploitable.', primaryCtaLabel: 'Voir notre approche', primaryCtaHref: '/aanpak' },
      sections: [section('value-communication', 'content', 'fr', 'content', 1, { eyebrow: 'Coordination', title: 'Une ligne claire entre client, administration et chantier', description: 'Chaque information doit rester traçable et actionnable.' })],
    },
    'value-reuse': {
      hero: { eyebrow: 'Valeurs', title: 'Le réemploi lorsqu’il améliore vraiment le résultat', description: 'Le durable doit rester techniquement juste et visuellement cohérent.', primaryCtaLabel: 'Parler de votre projet', primaryCtaHref: '/offerte' },
      sections: [section('value-reuse', 'content', 'fr', 'content', 1, { eyebrow: 'Circularité', title: 'Réutiliser avec discernement', description: 'Nous évaluons la qualité, la durée de vie et la cohérence d’ensemble.' })],
    },
    'value-subsidies': {
      hero: { eyebrow: 'Valeurs', title: 'Les subventions deviennent utiles lorsqu’elles sont anticipées', description: 'Les choix techniques et le timing peuvent alors s’y ajuster.', primaryCtaLabel: 'Planifier un entretien', primaryCtaHref: '/afspraak' },
      sections: [section('value-subsidies', 'content', 'fr', 'content', 1, { eyebrow: 'Soutien', title: 'Relier les subventions aux décisions du projet', description: 'Nous aidons à les intégrer dans le cadrage initial.' })],
    },
    privacy: {
      hero: { eyebrow: 'Confidentialité', title: 'Comment nous traitons les données de contact et de projet', description: 'Cette page décrit les données utilisées pour les demandes de devis et de rendez-vous.' },
      sections: [
        section('privacy', 'legal', 'fr', 'legal', 1, {
          updatedAt: '11 avril 2026',
          introduction: 'Nous limitons le traitement aux données nécessaires pour répondre à une demande, organiser un rendez-vous et suivre le projet.',
          sections: [
            { title: 'Données traitées', body: 'Coordonnées, informations projet, préférences de rendez-vous et contexte complémentaire transmis par le visiteur.' },
            { title: 'Finalités', body: 'Réponse commerciale, planification, suivi opérationnel et communication liée au projet.' },
            { title: 'Conservation et sécurité', body: 'Les accès sont limités et les données ne sont conservées que le temps nécessaire au cadre légal ou opérationnel.' },
            { title: 'Vos droits', body: 'Vous pouvez demander un accès, une correction ou une suppression via les coordonnées publiées sur le site.' },
          ],
        }),
      ],
    },
    terms: {
      hero: { eyebrow: 'Conditions', title: 'Conditions générales de collaboration et d’exécution', description: 'Ces conditions décrivent les règles de base relatives aux offres, à l’exécution et à la facturation.' },
      sections: [
        section('terms', 'legal', 'fr', 'legal', 1, {
          updatedAt: '11 avril 2026',
          introduction: 'Les conditions générales encadrent l’offre, les modifications, le planning, la réception et les paiements.',
          sections: [
            { title: 'Offres et confirmation', body: 'Une offre devient ferme après validation écrite et clarification du périmètre.' },
            { title: 'Modifications', body: 'Les changements sont évalués explicitement sur le budget, le délai et la faisabilité.' },
            { title: 'Planning', body: 'Le planning dépend des informations disponibles et des conditions du chantier.' },
            { title: 'Paiements', body: 'La facturation suit les jalons convenus et les modalités écrites.' },
          ],
        }),
      ],
    },
  },
  en: {
    approach: {
      hero: {
        eyebrow: 'Approach',
        title: 'A renovation process with clear ownership from first call to handover',
        description:
          'We organise each project in fixed stages with a tighter information flow, realistic planning and explicit responsibility.',
        primaryCtaLabel: 'Book a consultation',
        primaryCtaHref: '/afspraak',
        secondaryCtaLabel: 'Request a quote',
        secondaryCtaHref: '/offerte',
      },
      sections: [
        section('approach', 'steps', 'en', 'feature-list', 1, {
          eyebrow: 'Process',
          title: 'Four fixed stages',
          description: 'This keeps scope, timing and delivery understandable even when the renovation grows more complex.',
          items: [
            { title: '1. Intake and site visit', description: 'We start by understanding the building, your priorities and the technical constraints.' },
            { title: '2. Scope and budget frame', description: 'Inclusions, open choices and budget pressure points are made explicit early.' },
            { title: '3. Planning and delivery', description: 'Work packages, suppliers and decision moments are aligned before execution.' },
            { title: '4. Handover and follow-up', description: 'We close with a controlled handover and a visible list of remaining points.' },
          ],
        }),
        section('approach', 'principles', 'en', 'content', 2, {
          eyebrow: 'Principles',
          title: 'What this should feel like for the client',
          description: 'Less noise in execution, fewer unclear decisions and a stronger line between planning and delivery.',
          paragraphs: [
            'We move projects in the right order: first content, then planning, then execution.',
            'Questions are always tied back to budget impact, timing or technical consequences.',
          ],
          items: [
            { title: 'Transparent', description: 'Changes are made explicit before they affect the build.' },
            { title: 'Pragmatic', description: 'We choose solutions that are technically sound and actually buildable.' },
            { title: 'Accountable', description: 'Every relevant decision keeps a visible owner and impact.' },
          ],
        }),
      ],
    },
    contact: {
      hero: {
        eyebrow: 'Contact',
        title: 'Talk to a renovation team that responds fast and clearly',
        description: 'For new projects, site visits or focused questions about scope, planning or materials.',
        primaryCtaLabel: 'Request a quote',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'Book an appointment',
        secondaryCtaHref: '/afspraak',
      },
      sections: [
        section('contact', 'details', 'en', 'contact', 1, {
          eyebrow: 'Availability',
          title: 'Contact details',
          description: 'Phone, email and address are managed from site settings and rendered directly here.',
          highlights: ['Reply within 1 business day', 'Site visits by appointment', 'Strong coverage in Ghent and nearby'],
          primaryCtaLabel: 'Request a quote',
          primaryCtaHref: '/offerte',
        }),
      ],
    },
    services: {
      hero: {
        eyebrow: 'Services',
        title: 'From full renovation to finishing and technical integration',
        description:
          'We treat each service as part of a coherent whole so structure, systems, finishing and final use still fit together.',
        primaryCtaLabel: 'Request a quote',
        primaryCtaHref: '/offerte',
        secondaryCtaLabel: 'See our approach',
        secondaryCtaHref: '/aanpak',
      },
      sections: [
        section('services', 'overview', 'en', 'feature-list', 1, {
          eyebrow: 'Scope',
          title: 'What we deliver',
          description: 'Each service has its own scope, but it is still assessed against the full home context.',
          items: [
            { title: 'Full renovation', description: 'One coordinated line for structure, systems and finish.', href: '/diensten/totaalrenovatie', ctaLabel: 'Learn more' },
            { title: 'Renovation', description: 'Targeted changes with attention to circulation, light and use.', href: '/diensten/renovatie', ctaLabel: 'Learn more' },
            { title: 'Finishing', description: 'Interior finishing that protects detail quality through the last phase.', href: '/diensten/afwerking', ctaLabel: 'Learn more' },
            { title: 'Technical systems', description: 'Electrical, plumbing and HVAC aligned with the rest of the build.', href: '/diensten/technieken', ctaLabel: 'Learn more' },
          ],
        }),
      ],
    },
    'service-full-renovation': {
      hero: { eyebrow: 'Full renovation', title: 'For homes that need to be reworked as one whole', description: 'We keep structure, systems, finish and planning in a single decision chain.', primaryCtaLabel: 'Start your renovation', primaryCtaHref: '/offerte', secondaryCtaLabel: 'View projects', secondaryCtaHref: '/projecten' },
      sections: [section('service-full-renovation', 'scope', 'en', 'content', 1, { eyebrow: 'Fit', title: 'When this service makes sense', description: 'When structure, systems and finish all need to be reconsidered together.', paragraphs: ['Full renovation only works well when coordination is treated as part of the job, not an afterthought.'] })],
    },
    'service-renovation': {
      hero: { eyebrow: 'Renovation', title: 'Targeted changes with proper technical control', description: 'For partial transformations that still need disciplined coordination.', primaryCtaLabel: 'Discuss your project', primaryCtaHref: '/offerte' },
      sections: [section('service-renovation', 'scope', 'en', 'content', 1, { eyebrow: 'Focus', title: 'Transform without losing coherence', description: 'We connect the existing building, your ambitions and site impact.', paragraphs: ['Partial renovation often becomes difficult at the edges where old and new meet.'] })],
    },
    'service-finishing': {
      hero: { eyebrow: 'Finishing', title: 'Finishing work that carries the quality of the whole project', description: 'For interiors where the last layer needs to feel deliberate and calm.', primaryCtaLabel: 'Request a quote', primaryCtaHref: '/offerte' },
      sections: [section('service-finishing', 'scope', 'en', 'content', 1, { eyebrow: 'Detail', title: 'A finished interior should read as one whole', description: 'Joints, lines and material rhythm matter just as much as the material choice itself.', paragraphs: ['We coordinate the final phase so it does not fragment into rushed, low-signal decisions.'] })],
    },
    'service-technical': {
      hero: { eyebrow: 'Technical systems', title: 'Systems that support the home instead of disrupting it', description: 'Technical choices are evaluated against comfort, maintenance and finish quality.', primaryCtaLabel: 'Discuss your project', primaryCtaHref: '/offerte' },
      sections: [section('service-technical', 'scope', 'en', 'content', 1, { eyebrow: 'Systems', title: 'From engineering decisions to a usable home', description: 'Electrical, plumbing and HVAC need to be technically right and spatially well integrated.', paragraphs: ['We align systems with layout, finish and future use so the build stays maintainable.'] })],
    },
    'value-certification': {
      hero: { eyebrow: 'Values', title: 'Certification only helps when it is considered early', description: 'Administrative and fiscal conditions should not surface after the build logic is already fixed.', primaryCtaLabel: 'Book a consultation', primaryCtaHref: '/afspraak' },
      sections: [section('value-certification', 'content', 'en', 'content', 1, { eyebrow: 'Framework', title: 'Administrative clarity prevents delay', description: 'We pull relevant certificate and tax considerations forward into the early project frame.' })],
    },
    'value-payment-spread': {
      hero: { eyebrow: 'Values', title: 'Payment spreading only works with explicit milestones', description: 'Financial pacing should stay tied to visible progress and agreed moments.', primaryCtaLabel: 'Book a consultation', primaryCtaHref: '/afspraak' },
      sections: [section('value-payment-spread', 'content', 'en', 'content', 1, { eyebrow: 'Clarity', title: 'Payment and progress need to stay aligned', description: 'We structure payment timing around explicit project milestones.' })],
    },
    'value-communication': {
      hero: { eyebrow: 'Values', title: 'Communication matters when it improves decisions', description: 'We prefer a compact, accountable information flow over scattered status noise.', primaryCtaLabel: 'See our approach', primaryCtaHref: '/aanpak' },
      sections: [section('value-communication', 'content', 'en', 'content', 1, { eyebrow: 'Coordination', title: 'A clearer line between client, admin and site', description: 'Information should stay traceable and actionable.' })],
    },
    'value-reuse': {
      hero: { eyebrow: 'Values', title: 'Reuse where it genuinely strengthens the result', description: 'Sustainability should still be technically sound and visually coherent.', primaryCtaLabel: 'Discuss your renovation', primaryCtaHref: '/offerte' },
      sections: [section('value-reuse', 'content', 'en', 'content', 1, { eyebrow: 'Circularity', title: 'Use what exists with judgement', description: 'We assess materials for quality, life span and fit within the final composition.' })],
    },
    'value-subsidies': {
      hero: { eyebrow: 'Values', title: 'Subsidies become useful when they shape decisions early', description: 'That lets scope, timing and technical choices respond to them in time.', primaryCtaLabel: 'Book a consultation', primaryCtaHref: '/afspraak' },
      sections: [section('value-subsidies', 'content', 'en', 'content', 1, { eyebrow: 'Support', title: 'Tie subsidy logic to project decisions', description: 'We help fold subsidy opportunities into the early project frame.' })],
    },
    privacy: {
      hero: { eyebrow: 'Privacy', title: 'How we process contact and project data', description: 'This page outlines how information is used for quote requests, appointments and project follow-up.' },
      sections: [
        section('privacy', 'legal', 'en', 'legal', 1, {
          updatedAt: 'April 11, 2026',
          introduction: 'We limit processing to what is needed for contact requests, appointment scheduling, project follow-up and operational administration.',
          sections: [
            { title: 'What we process', body: 'Name, contact details, project information, appointment preferences and any context you choose to share.' },
            { title: 'Why we use it', body: 'To answer requests, schedule visits, follow up internally and communicate about the relevant project scope.' },
            { title: 'Storage and security', body: 'Access is limited to authorised staff and managed systems, and data is retained only as long as operationally or legally required.' },
            { title: 'Your rights', body: 'You can request access, correction or deletion through the contact details published on this site.' },
          ],
        }),
      ],
    },
    terms: {
      hero: { eyebrow: 'Terms', title: 'General terms for collaboration and delivery', description: 'These terms define the baseline rules for offers, scope changes, planning, delivery and payments.' },
      sections: [
        section('terms', 'legal', 'en', 'legal', 1, {
          updatedAt: 'April 11, 2026',
          introduction: 'The general terms outline how quotes, changes, planning, delivery and payment milestones are handled.',
          sections: [
            { title: 'Offers and confirmation', body: 'A quote becomes binding after written confirmation and scope clarification.' },
            { title: 'Changes and additional work', body: 'Changes are evaluated explicitly for budget, timing and feasibility impact.' },
            { title: 'Planning and handover', body: 'Schedules depend on known conditions and can shift if site conditions change materially.' },
            { title: 'Payments', body: 'Invoices follow the written milestone and payment structure agreed with the client.' },
          ],
        }),
      ],
    },
  },
};

export const additionalDefaultPageSections: V2DefaultPageSection[] = (['nl', 'fr', 'en'] as const).flatMap((locale) =>
  Object.entries(pageContent[locale]).flatMap(([pageKey, config]) => [
    section(pageKey, 'hero', locale, 'hero', 0, config.hero),
    ...config.sections,
  ]),
);
