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
        eyebrow: 'Werkwijze',
        title: 'Onze aanpak',
        description:
          'Van eerste contact tot oplevering: een helder proces met duidelijke communicatie. Zodat u weet wat u mag verwachten en geen verrassingen tegenkomt.',
        primaryCtaLabel: 'Plan een gesprek',
        primaryCtaHref: '/afspraak',
        secondaryCtaLabel: 'Vraag een offerte aan',
        secondaryCtaHref: '/offerte',
      },
      sections: [
        section('approach', 'steps', 'nl', 'feature-list', 1, {
          eyebrow: 'Stappen',
          title: 'Het proces in 4 stappen',
          description: 'Zo verloopt een project bij Nam Construction. Overzichtelijk en voorspelbaar.',
          items: [
            {
              title: 'Intake & Kennismaking',
              description: 'We starten met een gratis en vrijblijvend adviesgesprek. Telefonisch, via video of bij u thuis. We luisteren naar uw wensen, bekijken de situatie en bespreken de mogelijkheden.',
              items: [
                'Vrijblijvend en gratis',
                'Uw wensen en prioriteiten',
                'Eerste inschatting haalbaarheid',
                'Kennismaking met onze aanpak',
              ],
            },
            {
              title: 'Voorstel & Offerte',
              description: 'Na het plaatsbezoek stellen we een gedetailleerd voorstel op. Met duidelijke scope, materiaalopties en premie-proof offerte. Geen verrassingen achteraf.',
              items: [
                'Gedetailleerde scope',
                'Materiaalopties met prijzen',
                'Premie-proof opmaak',
                'Duidelijke planning',
              ],
            },
            {
              title: 'Uitvoering',
              description: 'Tijdens de uitvoering bent u altijd op de hoogte. Regelmatige updates, één aanspreekpunt en vakkundige uitvoering door ons team en vaste partners.',
              items: [
                'Eén vast aanspreekpunt',
                'Regelmatige updates',
                'Gecoördineerde planning',
                'Kwaliteitscontrole',
              ],
            },
            {
              title: 'Oplevering & Nazorg',
              description: 'Bij oplevering lopen we alles samen door. We zorgen voor de nodige attesten en begeleiden u bij premieaanvragen. Ook na oplevering staan we paraat.',
              items: [
                'Grondige oplevering',
                'Attesten en documenten',
                'Ondersteuning premies',
                'Nazorg en garantie',
              ],
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
        section('approach', 'guarantees', 'nl', 'feature-list', 3, {
          eyebrow: 'Garanties',
          title: 'Wat u mag verwachten',
          description: 'Onze garanties voor een zorgeloze samenwerking.',
          items: [
            {
              title: 'Kwaliteitsgarantie',
              description: 'We staan achter ons werk. Bij problemen lossen we die op, ook na oplevering.',
            },
            {
              title: 'Heldere planning',
              description: 'Duidelijke mijlpalen en realistische timing. U weet waar u aan toe bent.',
            },
            {
              title: 'Eén aanspreekpunt',
              description: 'Geen gedoe met verschillende contactpersonen. U heeft één vaste contactpersoon.',
            },
            {
              title: 'Transparante prijs',
              description: 'Gedetailleerde offerte zonder verborgen kosten. Meerwerk alleen in overleg.',
            },
          ],
        }),
        section('approach', 'faq', 'nl', 'faq', 4, {
          eyebrow: 'FAQ',
          title: 'Veelgestelde vragen',
          description: 'Antwoorden op de meest voorkomende vragen over onze werkwijze.',
          items: [
            {
              question: 'Hoe lang duurt het voor ik een offerte krijg?',
              answer: 'Na het plaatsbezoek ontvangt u binnen 1 à 2 weken een gedetailleerde offerte. Voor complexere projecten kan dit iets langer duren.',
            },
            {
              question: 'Werken jullie met vaste prijzen of nacalculatie?',
              answer: 'We werken met een gedetailleerde offerte op basis van vaste prijzen. Meerwerk wordt altijd vooraf besproken en goedgekeurd.',
            },
            {
              question: 'Hoe verloopt de communicatie tijdens het project?',
              answer: 'U heeft één vast aanspreekpunt. We geven regelmatige updates (telefonisch, per mail of via WhatsApp) en zijn bereikbaar voor vragen.',
            },
            {
              question: 'Wat als er iets misgaat of niet naar wens is?',
              answer: 'We lossen problemen snel en correct op. Bij oplevering lopen we alles samen door en puntjes worden aangepakt voor finale goedkeuring.',
            },
            {
              question: 'Helpen jullie met vergunningen?',
              answer: 'We adviseren over vergunningsplicht en kunnen doorverwijzen naar architecten indien nodig. De vergunningsaanvraag zelf valt buiten onze scope.',
            },
            {
              question: 'Kunnen jullie ook enkel een deel van de werken uitvoeren?',
              answer: 'Ja, we doen ook gerichte renovaties en afwerking. Bespreek uw specifieke wensen tijdens het adviesgesprek.',
            },
          ],
        }),
        section('approach', 'cta', 'nl', 'cta', 5, {
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
          description: 'Klaar om uw renovatieproject te bespreken? Neem contact op voor een gratis en vrijblijvend adviesgesprek. We reageren binnen 24 uur.',
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
        title: 'Hoe we persoonsgegevens verwerken volgens de AVG',
        description:
          'Deze privacyverklaring beschrijft welke gegevens NAM BV verwerkt, op welke rechtsgrond, hoe lang ze bewaard worden en welke rechten u heeft.',
      },
      sections: [
        section('privacy', 'legal', 'nl', 'legal', 1, {
          updatedAt: '14 april 2026',
          introduction:
            'Deze privacyverklaring geldt voor alle verwerkingen van persoonsgegevens door NAM BV in het kader van offerteaanvragen, projectopvolging, afspraken, facturatie, sollicitaties en website-gebruik. Zij is opgesteld in overeenstemming met de Algemene Verordening Gegevensbescherming (Verordening (EU) 2016/679, "AVG") en de Belgische Wet van 30 juli 2018 betreffende de bescherming van natuurlijke personen met betrekking tot de verwerking van persoonsgegevens.',
          sections: [
            {
              title: '1. Verwerkingsverantwoordelijke',
              body: 'NAM BV (Besloten Vennootschap)\nMaatschappelijke zetel: Zwijnaardsesteenweg 683, 9000 Gent\nOndernemingsnummer: 0792.212.559\nBTW: BE0792.212.559\nRPR: Ondernemingsrechtbank Gent, afdeling Gent\n\nContact voor privacyvragen: info@namconstruction.be · +32 493 81 27 89',
            },
            {
              title: '2. Welke persoonsgegevens we verwerken',
              body: 'Wij beperken ons tot de gegevens die strikt nodig zijn voor het doel waarvoor we ze verzamelen:',
              items: [
                'Identificatiegegevens: naam, voornaam, adres, postcode, woonplaats',
                'Contactgegevens: e-mailadres, telefoonnummer',
                'Projectgegevens: woningtype, scope, budget-indicatie, foto\u2019s die u zelf meestuurt',
                'Facturatiegegevens: factuuradres, KBO-nummer en BTW voor zakelijke klanten',
                'Afspraakvoorkeuren: gewenste timing, locatie, beschikbaarheid',
                'Sollicitatiegegevens: CV, motivatiebrief, aanvullende informatie die u zelf verstrekt',
                'Technische gegevens: IP-adres, sessie- en cookie-informatie indien u deze aanvaardt',
              ],
            },
            {
              title: '3. Doeleinden en rechtsgrond (art. 6 AVG)',
              body: 'We verwerken gegevens uitsluitend voor de hierna opgesomde doeleinden, telkens op basis van een geldige rechtsgrond:',
              items: [
                'Beantwoorden van offerteaanvragen, uitvoeren van contracten en projectopvolging \u2014 uitvoering van de overeenkomst (art. 6.1.b)',
                'Boekhouding, facturatie en fiscale bewaarplicht \u2014 wettelijke verplichting (art. 6.1.c, o.a. art. III.86 WER en BTW-wetgeving)',
                'Klantopvolging, tevredenheidspeiling en directe communicatie aan bestaande klanten \u2014 gerechtvaardigd belang (art. 6.1.f)',
                'Nieuwsbrieven, marketingcookies en gerichte advertenties \u2014 toestemming (art. 6.1.a), die u op elk moment kan intrekken',
                'Beheer van sollicitaties en aanwervingsprocedure \u2014 maatregelen vóór sluiting van een arbeidsovereenkomst (art. 6.1.b)',
              ],
            },
            {
              title: '4. Bewaartermijnen',
              body: 'We bewaren uw gegevens niet langer dan noodzakelijk:',
              items: [
                'Klant- en facturatiegegevens: 7 jaar na afsluiting van het boekjaar (fiscale bewaarplicht)',
                'Offertedossiers zonder opvolging: 5 jaar',
                'Prospectgegevens (geen klant geworden): 3 jaar na laatste contact',
                'Sollicitaties: maximaal 2 jaar, tenzij u uitdrukkelijk toestemt voor langere opname in onze kandidatenpool',
                'Cookies: zie afdeling 7 \u2014 typisch tussen sessieduur en 12 maanden',
              ],
            },
            {
              title: '5. Ontvangers en verwerkers',
              body: 'Uw gegevens worden enkel gedeeld met partijen die nodig zijn voor de uitvoering van onze opdracht of op grond van een wettelijke verplichting. Met elke verwerker sluiten we een verwerkersovereenkomst conform art. 28 AVG.',
              items: [
                'IT-leveranciers voor hosting, e-mail en website-infrastructuur',
                'Onze boekhouder, bedrijfsrevisor en fiscaal adviseur',
                'Onze decennale en BA-verzekeraar bij schadegevallen',
                'Onderaannemers en architecten binnen de projectscope',
                'Overheidsdiensten indien wettelijk vereist (RSZ, BTW-administratie, FOD Financiën)',
              ],
            },
            {
              title: '6. Internationale doorgifte',
              body: 'We verwerken gegevens in principe binnen de Europese Economische Ruimte (EER). Indien een verwerker gegevens buiten de EER verwerkt, gebeurt dit enkel op basis van een adequaatheidsbesluit van de Europese Commissie of via standaardcontractbepalingen conform art. 45 en 46 AVG.',
            },
            {
              title: '7. Cookies',
              body: 'Onze website gebruikt drie categorieën cookies. U beheert uw keuze via de cookie-banner.',
              items: [
                'Noodzakelijke cookies: sessie, taalkeuze, cookie-voorkeur \u2014 geen toestemming vereist',
                'Statistiek- en analytics-cookies: gebruiksgedrag anoniem meten \u2014 enkel na toestemming',
                'Marketing- en tracking-cookies: gepersonaliseerde advertenties \u2014 enkel na toestemming',
              ],
            },
            {
              title: '8. Uw rechten',
              body: 'U kunt de volgende rechten uitoefenen via info@namconstruction.be. We reageren binnen 30 dagen. Bij twijfel over uw identiteit kunnen we een bewijs vragen.',
              items: [
                'Recht op inzage (art. 15 AVG)',
                'Recht op rectificatie (art. 16)',
                'Recht op wissing / "vergetelheid" (art. 17)',
                'Recht op beperking van de verwerking (art. 18)',
                'Recht op overdraagbaarheid van gegevens (art. 20)',
                'Recht van bezwaar tegen een verwerking op basis van gerechtvaardigd belang (art. 21)',
                'Recht om een gegeven toestemming op elk moment in te trekken (art. 7.3)',
                'Recht om niet onderworpen te worden aan geautomatiseerde besluitvorming (art. 22) \u2014 wij passen dit niet toe',
              ],
            },
            {
              title: '9. Klachtrecht',
              body: 'Bent u niet tevreden over de manier waarop we uw gegevens verwerken? Neem eerst contact met ons op via info@namconstruction.be. U heeft ook het recht om klacht in te dienen bij de toezichthoudende autoriteit:\n\nGegevensbeschermingsautoriteit (GBA)\nDrukpersstraat 35, 1000 Brussel\ncontact@apd-gba.be · +32 2 274 48 00\nwww.gegevensbeschermingsautoriteit.be',
            },
          ],
        }),
      ],
    },
    terms: {
      hero: {
        eyebrow: 'Voorwaarden',
        title: 'Algemene voorwaarden van NAM BV',
        description:
          'Deze voorwaarden gelden voor elke offerte, overeenkomst en uitvoering van renovatiewerken door NAM BV. Versie voor particuliere en zakelijke klanten.',
      },
      sections: [
        section('terms', 'legal', 'nl', 'legal', 1, {
          updatedAt: '14 april 2026',
          introduction:
            'Deze algemene voorwaarden regelen de contractuele relatie tussen NAM BV en haar klanten. Waar de tekst onderscheid maakt tussen particuliere (B2C) en zakelijke klanten (B2B), wordt dit uitdrukkelijk vermeld. Door een offerte te ondertekenen of een opdracht te bevestigen, aanvaardt de klant deze voorwaarden.',
          sections: [
            {
              title: '1. Identificatie van de aannemer',
              body: 'NAM BV (Besloten Vennootschap)\nMaatschappelijke zetel: Zwijnaardsesteenweg 683, 9000 Gent\nOndernemingsnummer: 0792.212.559\nBTW: BE0792.212.559\nRPR: Ondernemingsrechtbank Gent, afdeling Gent\nHoofdactiviteit: NACE 41.201 (algemene bouw van residentiële gebouwen) en NACE 43.299 (overige bouwinstallatie)\n\nContact: info@namconstruction.be · +32 493 81 27 89',
            },
            {
              title: '2. Toepassingsgebied',
              body: 'Deze voorwaarden zijn van toepassing op alle offertes, opdrachten, overeenkomsten en werken uitgevoerd door NAM BV, met uitsluiting van de eventuele aankoop- of andere voorwaarden van de klant. Afwijkingen zijn enkel geldig indien schriftelijk aanvaard door NAM BV. De voorwaarden worden ter beschikking gesteld vóór het sluiten van de overeenkomst en maken er integraal deel van uit.',
            },
            {
              title: '3. Offerte en totstandkoming van de overeenkomst',
              body: 'Tenzij anders vermeld, zijn offertes 30 kalenderdagen geldig vanaf de verzenddatum. De overeenkomst komt tot stand na schriftelijke aanvaarding (inclusief e-mail) van de offerte door de klant of na een uitdrukkelijke opdrachtbevestiging. Prijzen worden vermeld exclusief BTW. Het toepasselijke BTW-tarief (6% of 21%) wordt bepaald op basis van een door de klant ondertekende verklaring conform de BTW-wetgeving (KB nr. 20, tabel A, XXXVIII) die bevestigt dat de woning ouder is dan tien jaar en uitsluitend of hoofdzakelijk als privéwoning wordt gebruikt. Onjuiste verklaringen vallen onder de verantwoordelijkheid van de klant.',
            },
            {
              title: '4. Uitvoering, planning en meerwerk',
              body: 'De uitvoeringstermijn wordt in de offerte vermeld en is indicatief tenzij uitdrukkelijk als fataal overeengekomen. Overmacht (onder meer pandemie, materiaalschaarste, extreme weersomstandigheden, stakingen, overheidsmaatregelen) verlengt de uitvoeringstermijn met de duur van de verhindering, zonder recht op schadevergoeding. Wijzigingen in de scope, meerwerk of onvoorziene omstandigheden worden schriftelijk vastgelegd, inclusief impact op prijs en timing, alvorens verder uitgevoerd te worden.',
            },
            {
              title: '5. Betaling (zakelijke klanten — B2B)',
              body: 'Facturen zijn betaalbaar binnen 30 dagen na factuurdatum, tenzij anders overeengekomen. Bij laattijdige betaling is van rechtswege en zonder ingebrekestelling verschuldigd:',
              items: [
                'Verwijlinterest van 10% per jaar op het openstaande bedrag',
                'Een forfaitaire schadevergoeding van 10% van het openstaande bedrag, met een minimum van €125',
                'Deze bedingen zijn wederkerig: dezelfde vergoeding is verschuldigd door NAM BV bij aantoonbare laattijdige uitvoering buiten overmacht',
              ],
            },
            {
              title: '6. Betaling (particuliere klanten — B2C)',
              body: 'Facturen zijn betaalbaar binnen 30 dagen na factuurdatum. Bij laattijdige betaling wordt een eerste gratis ingebrekestelling verstuurd. Indien de betaling niet volgt binnen 14 kalenderdagen na ontvangst, zijn conform Boek XIX WER verschuldigd:',
              items: [
                'Verwijlinterest aan de wettelijke rentevoet inzake betalingsachterstand (Wet 2 augustus 2002)',
                'Een forfaitaire schadevergoeding: €20 indien de schuld niet hoger is dan €150; €30 plus 10% van het deel boven €150 voor schulden tussen €150 en €500; €65 plus 5% van het deel boven €500 voor schulden boven €500, met een totaal maximum van €2.000',
                'Dezelfde regels gelden wederkerig wanneer NAM BV bedragen aan de klant verschuldigd is',
              ],
            },
            {
              title: '7. Oplevering, aanvaarding en garantie',
              body: 'Bij het einde van de werken vindt een voorlopige oplevering plaats. Zichtbare gebreken moeten op dat moment of binnen 8 kalenderdagen schriftelijk gemeld worden. De definitieve oplevering volgt één jaar na de voorlopige oplevering, tenzij anders overeengekomen.\n\nVoor lichte verborgen gebreken die na aanvaarding aan het licht komen, bedraagt de contractuele aansprakelijkheid van NAM BV 2 jaar vanaf de voorlopige oplevering, overeenkomstig de bestendige gebruiken in de bouwsector.\n\nDe tienjarige aansprakelijkheid voor ernstige gebreken die de stabiliteit of stevigheid van het bouwwerk (of een wezenlijk onderdeel daarvan) in gevaar brengen, zoals bepaald in artikel 5.86 van het Burgerlijk Wetboek (voorheen art. 1792), blijft integraal van toepassing en kan door deze voorwaarden niet worden beperkt of uitgesloten.',
            },
            {
              title: '8. Verzekeringen',
              body: 'NAM BV beschikt over de wettelijk verplichte verzekering voor de tienjarige burgerlijke aansprakelijkheid conform de Wet van 31 mei 2017 (Peeters-Borsus), evenals een BA-uitbatingsverzekering voor werfaansprakelijkheid.\n\nHet verzekeringsattest met vermelding van verzekeraar, polisnummer en dekkingsperiode wordt conform artikel 12 van voormelde wet vóór de aanvang van de werken ter beschikking gesteld van de bouwheer en de eventuele architect.',
            },
            {
              title: '9. Herroepingsrecht (enkel particuliere klanten)',
              body: 'Voor overeenkomsten gesloten op afstand (bv. online, via e-mail) of buiten onze gebruikelijke vestiging, beschikt u als consument over een herroepingsrecht van 14 kalenderdagen, zoals voorzien in artikel VI.47 en volgende WER.\n\nBelangrijke uitzondering: indien u ons uitdrukkelijk vraagt om de werken binnen deze 14 dagen aan te vatten en de werken vóór het einde van de termijn volledig zijn uitgevoerd, vervalt het herroepingsrecht (art. VI.53, 13° WER). Indien de werken deels zijn uitgevoerd, bent u een vergoeding verschuldigd evenredig met het reeds verrichte werk.\n\nHet modelformulier voor herroeping is op eenvoudig verzoek verkrijgbaar via info@namconstruction.be.',
            },
            {
              title: '10. Klachten, toepasselijk recht en bevoegde rechtbank',
              body: 'Klachten worden bij voorkeur eerst rechtstreeks gemeld via info@namconstruction.be. Wij reageren binnen 7 werkdagen.\n\nBij aanhoudende geschillen kan een beroep worden gedaan op de Verzoeningscommissie Bouw (www.bouw-verzoeningscommissie.be), die een gratis buitengerechtelijke geschilbeslechting voorziet voor bouwgeschillen.\n\nOp deze overeenkomst is uitsluitend het Belgisch recht van toepassing. Voor alle geschillen zijn, onverminderd de bijzondere bevoegdheden ten aanzien van consumenten, de rechtbanken van het gerechtelijk arrondissement Gent bevoegd, en in het bijzonder de Ondernemingsrechtbank Gent, afdeling Gent.',
            },
          ],
        }),
      ],
    },
  },
  fr: {
    approach: {
      hero: {
        eyebrow: 'Notre processus',
        title: 'Notre approche',
        description:
          'Du premier contact à la livraison : un processus clair avec une communication transparente. Pour que vous sachiez à quoi vous attendre et que vous n’ayez pas de surprises.',
        primaryCtaLabel: 'Planifier un entretien',
        primaryCtaHref: '/afspraak',
        secondaryCtaLabel: 'Demander un devis',
        secondaryCtaHref: '/offerte',
      },
      sections: [
        section('approach', 'steps', 'fr', 'feature-list', 1, {
          eyebrow: 'Étapes',
          title: 'Le processus en 4 étapes',
          description: 'Comment se déroule un projet chez Nam Construction. Clair et prévisible.',
          items: [
            {
              title: 'Prise de contact',
              description: 'Nous commençons par une consultation gratuite et sans engagement. Par téléphone, vidéo ou chez vous. Nous écoutons vos souhaits, évaluons la situation et discutons des possibilités.',
              items: [
                'Gratuit et sans engagement',
                'Vos souhaits et priorités',
                'Première évaluation de faisabilité',
                'Présentation de notre approche',
              ],
            },
            {
              title: 'Proposition & Devis',
              description: 'Après la visite sur site, nous préparons une proposition détaillée. Avec une portée claire, des options de matériaux et un devis conforme aux primes. Pas de surprises par la suite.',
              items: [
                'Portée détaillée',
                'Options de matériaux avec prix',
                'Format conforme aux primes',
                'Planning clair',
              ],
            },
            {
              title: 'Exécution',
              description: 'Pendant l’exécution, vous êtes toujours informé. Mises à jour régulières, un interlocuteur unique et travail expert par notre équipe et partenaires de confiance.',
              items: [
                'Un interlocuteur fixe',
                'Mises à jour régulières',
                'Planning coordonné',
                'Contrôle qualité',
              ],
            },
            {
              title: 'Livraison & Suivi',
              description: 'À la livraison, nous passons tout en revue ensemble. Nous fournissons les certificats nécessaires et vous accompagnons pour les demandes de primes. Nous restons disponibles après la livraison.',
              items: [
                'Livraison approfondie',
                'Certificats et documents',
                'Soutien aux primes',
                'Suivi et garantie',
              ],
            },
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
        section('approach', 'guarantees', 'fr', 'feature-list', 3, {
          eyebrow: 'Garanties',
          title: 'Ce que vous pouvez attendre',
          description: 'Nos garanties pour une collaboration sans souci.',
          items: [
            { title: 'Garantie qualité', description: 'Nous assumons notre travail. Nous résolvons les problèmes même après livraison.' },
            { title: 'Planning clair', description: 'Des jalons clairs et un timing réaliste. Vous savez où vous en êtes.' },
            { title: 'Un interlocuteur', description: 'Pas de tracas avec différents contacts. Vous avez un interlocuteur fixe.' },
            { title: 'Prix transparent', description: 'Devis détaillé sans frais cachés. Travaux supplémentaires uniquement sur accord.' },
          ],
        }),
        section('approach', 'faq', 'fr', 'faq', 4, {
          eyebrow: 'FAQ',
          title: 'Questions fréquentes',
          description: 'Réponses aux questions les plus courantes sur notre approche.',
          items: [
            {
              question: 'Combien de temps avant de recevoir un devis ?',
              answer: 'Après la visite sur site, vous recevrez un devis détaillé dans 1 à 2 semaines. Pour les projets plus complexes, cela peut prendre un peu plus de temps.',
            },
            {
              question: 'Travaillez-vous avec des prix fixes ou des calculs a posteriori ?',
              answer: 'Nous travaillons avec un devis détaillé basé sur des prix fixes. Les travaux supplémentaires sont toujours discutés et approuvés à l’avance.',
            },
            {
              question: 'Comment se passe la communication pendant le projet ?',
              answer: 'Vous avez un interlocuteur fixe. Nous donnons des mises à jour régulières (par téléphone, e-mail ou WhatsApp) et sommes disponibles pour les questions.',
            },
            {
              question: 'Et si quelque chose ne va pas ou n’est pas à votre goût ?',
              answer: 'Nous résolvons les problèmes rapidement et correctement. À la livraison, nous passons tout en revue ensemble et les points sont traités avant l’approbation finale.',
            },
            {
              question: 'Aidez-vous avec les permis ?',
              answer: 'Nous conseillons sur les exigences de permis et pouvons référer à des architectes si nécessaire. La demande de permis elle-même est en dehors de notre périmètre.',
            },
            {
              question: 'Pouvez-vous faire seulement une partie des travaux ?',
              answer: 'Oui, nous faisons aussi des rénovations ciblées et des finitions. Discutez de vos besoins spécifiques lors de la consultation.',
            },
          ],
        }),
        section('approach', 'cta', 'fr', 'cta', 5, {
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
          description: 'Envie de discuter de votre projet de renovation? Contactez-nous pour une consultation gratuite et sans engagement. Nous repondons sous 24 heures.',
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
      hero: {
        eyebrow: 'Confidentialité',
        title: 'Traitement des données personnelles selon le RGPD',
        description:
          'Cette déclaration de confidentialité décrit quelles données NAM BV traite, sur quelle base juridique, pendant combien de temps et quels sont vos droits.',
      },
      sections: [
        section('privacy', 'legal', 'fr', 'legal', 1, {
          updatedAt: '14 avril 2026',
          introduction:
            'La présente déclaration s’applique à tous les traitements de données personnelles effectués par NAM BV dans le cadre des demandes de devis, du suivi de projets, des rendez-vous, de la facturation, des candidatures et de l’utilisation du site. Elle est établie conformément au Règlement général sur la protection des données (Règlement (UE) 2016/679, « RGPD ») et à la loi belge du 30 juillet 2018 relative à la protection des personnes physiques à l’égard des traitements de données à caractère personnel.',
          sections: [
            {
              title: '1. Responsable du traitement',
              body: 'NAM BV (Société à responsabilité limitée / Besloten Vennootschap)\nSiège social : Zwijnaardsesteenweg 683, 9000 Gand\nNuméro d’entreprise : 0792.212.559\nTVA : BE0792.212.559\nRPM : Tribunal de l’entreprise de Gand, division Gand\n\nContact privacy : info@namconstruction.be · +32 493 81 27 89',
            },
            {
              title: '2. Données traitées',
              body: 'Nous limitons nos traitements aux données strictement nécessaires au but poursuivi :',
              items: [
                'Données d’identification : nom, prénom, adresse, code postal, ville',
                'Coordonnées : adresse e-mail, numéro de téléphone',
                'Données de projet : type de logement, périmètre, indication de budget, photos que vous transmettez',
                'Données de facturation : adresse de facturation, numéro BCE et TVA pour les clients professionnels',
                'Préférences de rendez-vous : disponibilité, timing et lieu souhaités',
                'Données de candidature : CV, lettre de motivation et informations complémentaires que vous communiquez',
                'Données techniques : adresse IP, informations de session et cookies si vous les acceptez',
              ],
            },
            {
              title: '3. Finalités et base juridique (art. 6 RGPD)',
              body: 'Nous traitons les données exclusivement pour les finalités énumérées, chaque fois sur une base juridique valable :',
              items: [
                'Réponse aux demandes de devis, exécution des contrats et suivi de projet — exécution du contrat (art. 6.1.b)',
                'Comptabilité, facturation et obligations fiscales — obligation légale (art. 6.1.c, notamment art. III.86 CDE et législation TVA)',
                'Suivi clientèle, enquêtes de satisfaction et communication directe vers les clients existants — intérêt légitime (art. 6.1.f)',
                'Newsletters, cookies marketing et publicité ciblée — consentement (art. 6.1.a), révocable à tout moment',
                'Gestion des candidatures et processus de recrutement — mesures précontractuelles (art. 6.1.b)',
              ],
            },
            {
              title: '4. Durées de conservation',
              body: 'Nous ne conservons pas vos données plus longtemps que nécessaire :',
              items: [
                'Données clients et de facturation : 7 ans après la clôture de l’exercice (obligation fiscale)',
                'Dossiers de devis sans suivi : 5 ans',
                'Données de prospects (non devenus clients) : 3 ans après le dernier contact',
                'Candidatures : maximum 2 ans, sauf consentement explicite à une conservation plus longue dans notre vivier',
                'Cookies : voir section 7 — généralement entre la durée de la session et 12 mois',
              ],
            },
            {
              title: '5. Destinataires et sous-traitants',
              body: 'Vos données ne sont partagées qu’avec des parties indispensables à notre mission ou en vertu d’une obligation légale. Avec chaque sous-traitant, nous concluons un contrat de sous-traitance conforme à l’art. 28 RGPD.',
              items: [
                'Fournisseurs IT pour l’hébergement, la messagerie et l’infrastructure web',
                'Notre comptable, réviseur d’entreprise et conseiller fiscal',
                'Notre assureur décennal et RC exploitation en cas de sinistre',
                'Sous-traitants et architectes dans le cadre du projet',
                'Administrations publiques si requis par la loi (ONSS, administration TVA, SPF Finances)',
              ],
            },
            {
              title: '6. Transferts internationaux',
              body: 'En principe, nous traitons les données au sein de l’Espace économique européen (EEE). Tout transfert en dehors de l’EEE se fait uniquement sur base d’une décision d’adéquation de la Commission européenne ou via des clauses contractuelles types conformes aux art. 45 et 46 RGPD.',
            },
            {
              title: '7. Cookies',
              body: 'Notre site utilise trois catégories de cookies. Vous gérez vos choix via le bandeau cookies.',
              items: [
                'Cookies nécessaires : session, langue, préférence cookies — aucun consentement requis',
                'Cookies statistiques et d’analyse : mesure anonyme de l’usage — uniquement avec consentement',
                'Cookies marketing et de tracking : publicité personnalisée — uniquement avec consentement',
              ],
            },
            {
              title: '8. Vos droits',
              body: 'Vous pouvez exercer les droits suivants via info@namconstruction.be. Nous répondons dans les 30 jours. Nous pouvons demander une preuve d’identité en cas de doute.',
              items: [
                'Droit d’accès (art. 15 RGPD)',
                'Droit de rectification (art. 16)',
                'Droit à l’effacement (« droit à l’oubli ») (art. 17)',
                'Droit à la limitation du traitement (art. 18)',
                'Droit à la portabilité (art. 20)',
                'Droit d’opposition à un traitement fondé sur l’intérêt légitime (art. 21)',
                'Droit de retirer votre consentement à tout moment (art. 7.3)',
                'Droit de ne pas faire l’objet d’une décision automatisée (art. 22) — non appliqué chez nous',
              ],
            },
            {
              title: '9. Droit de réclamation',
              body: 'Si vous n’êtes pas satisfait de la manière dont nous traitons vos données, contactez-nous d’abord via info@namconstruction.be. Vous pouvez également introduire une réclamation auprès de l’autorité de contrôle :\n\nAutorité de protection des données (APD)\nRue de la Presse 35, 1000 Bruxelles\ncontact@apd-gba.be · +32 2 274 48 00\nwww.autoriteprotectiondonnees.be',
            },
          ],
        }),
      ],
    },
    terms: {
      hero: {
        eyebrow: 'Conditions',
        title: 'Conditions générales de NAM BV',
        description:
          'Ces conditions s’appliquent à chaque offre, contrat et exécution de travaux de rénovation par NAM BV. Version à destination des clients particuliers et professionnels.',
      },
      sections: [
        section('terms', 'legal', 'fr', 'legal', 1, {
          updatedAt: '14 avril 2026',
          introduction:
            'Les présentes conditions générales régissent la relation contractuelle entre NAM BV et ses clients. Lorsqu’une distinction est faite entre clients particuliers (B2C) et professionnels (B2B), elle est mentionnée expressément. En signant un devis ou en confirmant une commande, le client accepte ces conditions.',
          sections: [
            {
              title: '1. Identification de l’entrepreneur',
              body: 'NAM BV (Société à responsabilité limitée)\nSiège social : Zwijnaardsesteenweg 683, 9000 Gand\nNuméro d’entreprise : 0792.212.559\nTVA : BE0792.212.559\nRPM : Tribunal de l’entreprise de Gand, division Gand\nActivité principale : NACE 41.201 (construction générale de bâtiments résidentiels) et NACE 43.299 (autres travaux d’installation)\n\nContact : info@namconstruction.be · +32 493 81 27 89',
            },
            {
              title: '2. Champ d’application',
              body: 'Les présentes conditions s’appliquent à toutes les offres, commandes, contrats et travaux exécutés par NAM BV, à l’exclusion des éventuelles conditions d’achat ou autres du client. Les dérogations ne sont valables que si elles sont acceptées par écrit par NAM BV. Les conditions sont mises à disposition avant la conclusion du contrat et en font partie intégrante.',
            },
            {
              title: '3. Offre et formation du contrat',
              body: 'Sauf mention contraire, les offres sont valables 30 jours calendrier à partir de leur envoi. Le contrat prend naissance par l’acceptation écrite (y compris par e-mail) de l’offre ou par une confirmation de commande explicite. Les prix sont indiqués hors TVA. Le taux de TVA applicable (6 % ou 21 %) est déterminé sur la base d’une déclaration signée par le client conformément à la législation TVA (AR n° 20, tableau A, XXXVIII), attestant que l’habitation a plus de dix ans et est utilisée exclusivement ou principalement comme logement privé. Toute déclaration inexacte relève de la responsabilité du client.',
            },
            {
              title: '4. Exécution, planning et travaux supplémentaires',
              body: 'Le délai d’exécution est mentionné dans l’offre et est indicatif, sauf accord explicite contraire. Les cas de force majeure (notamment pandémie, pénurie de matériaux, intempéries, grèves, mesures publiques) prolongent le délai à concurrence de la durée de l’empêchement, sans droit à indemnisation. Les modifications de périmètre, les travaux supplémentaires ou les imprévus sont consignés par écrit, avec leur impact sur le prix et le planning, avant toute exécution.',
            },
            {
              title: '5. Paiement (clients professionnels — B2B)',
              body: 'Les factures sont payables dans les 30 jours suivant leur date d’émission, sauf accord contraire. En cas de retard de paiement, sont dus de plein droit et sans mise en demeure :',
              items: [
                'Un intérêt de retard de 10 % par an sur le montant impayé',
                'Une indemnité forfaitaire de 10 % du montant impayé, avec un minimum de 125 €',
                'Ces clauses sont réciproques : la même indemnité est due par NAM BV en cas de retard d’exécution avéré hors force majeure',
              ],
            },
            {
              title: '6. Paiement (clients particuliers — B2C)',
              body: 'Les factures sont payables dans les 30 jours suivant leur date d’émission. En cas de retard, une première mise en demeure gratuite est envoyée. Si le paiement n’intervient pas dans les 14 jours suivant sa réception, sont dus conformément au Livre XIX CDE :',
              items: [
                'Des intérêts au taux légal en matière de retard de paiement (loi du 2 août 2002)',
                'Une indemnité forfaitaire : 20 € pour une dette ≤ 150 € ; 30 € + 10 % de la tranche au-dessus de 150 € pour une dette entre 150 € et 500 € ; 65 € + 5 % de la tranche au-dessus de 500 € pour une dette supérieure à 500 €, avec un plafond total de 2 000 €',
                'Les mêmes règles s’appliquent de manière réciproque lorsque NAM BV doit des montants au client',
              ],
            },
            {
              title: '7. Réception, acceptation et garantie',
              body: 'À la fin des travaux, il est procédé à une réception provisoire. Les défauts apparents doivent être signalés à ce moment ou dans les 8 jours calendrier par écrit. La réception définitive intervient un an après la réception provisoire, sauf accord contraire.\n\nPour les vices cachés légers apparus après acceptation, la responsabilité contractuelle de NAM BV est limitée à 2 ans à compter de la réception provisoire, conformément aux usages du secteur de la construction.\n\nLa responsabilité décennale pour les défauts graves mettant en cause la stabilité ou la solidité de l’ouvrage (ou d’une partie essentielle de celui-ci), prévue à l’article 5.86 du Code civil (anciennement art. 1792), reste intégralement applicable et ne peut être limitée ni exclue par les présentes conditions.',
            },
            {
              title: '8. Assurances',
              body: 'NAM BV dispose de l’assurance obligatoire pour la responsabilité civile décennale conformément à la loi du 31 mai 2017 (Peeters-Borsus), ainsi que d’une assurance RC exploitation pour la responsabilité de chantier.\n\nL’attestation d’assurance, mentionnant l’assureur, le numéro de police et la période de couverture, est mise à disposition du maître d’ouvrage et de l’architecte avant le début des travaux, conformément à l’article 12 de la loi précitée.',
            },
            {
              title: '9. Droit de rétractation (clients particuliers uniquement)',
              body: 'Pour les contrats conclus à distance (p. ex. en ligne, par e-mail) ou hors établissement, vous disposez en tant que consommateur d’un droit de rétractation de 14 jours calendrier, tel que prévu aux articles VI.47 et suivants du CDE.\n\nException importante : si vous demandez expressément le démarrage des travaux dans ce délai de 14 jours et que ceux-ci ont été entièrement exécutés avant son expiration, le droit de rétractation expire (art. VI.53, 13° CDE). Si les travaux sont partiellement exécutés, vous êtes redevable d’une somme proportionnelle aux prestations déjà fournies.\n\nLe formulaire-type de rétractation est disponible sur simple demande via info@namconstruction.be.',
            },
            {
              title: '10. Réclamations, droit applicable et juridiction compétente',
              body: 'Les réclamations sont de préférence adressées directement via info@namconstruction.be. Nous répondons dans les 7 jours ouvrables.\n\nEn cas de litige persistant, il peut être recouru à la Commission de conciliation Construction (www.bouw-verzoeningscommissie.be), qui offre un règlement extrajudiciaire gratuit des litiges de construction.\n\nLe présent contrat est régi exclusivement par le droit belge. Tous les litiges sont soumis, sans préjudice des compétences particulières à l’égard des consommateurs, aux tribunaux de l’arrondissement judiciaire de Gand, et en particulier au Tribunal de l’entreprise de Gand, division Gand.',
            },
          ],
        }),
      ],
    },
  },
  en: {
    approach: {
      hero: {
        eyebrow: 'Our Process',
        title: 'Our Approach',
        description:
          'From first contact to delivery: a clear process with transparent communication. So you know what to expect and won’t encounter surprises.',
        primaryCtaLabel: 'Book a consultation',
        primaryCtaHref: '/afspraak',
        secondaryCtaLabel: 'Request a quote',
        secondaryCtaHref: '/offerte',
      },
      sections: [
        section('approach', 'steps', 'en', 'feature-list', 1, {
          eyebrow: 'Steps',
          title: 'The process in 4 steps',
          description: 'How a project works at Nam Construction. Clear and predictable.',
          items: [
            {
              title: 'Intake & Introduction',
              description: 'We start with a free, no-obligation consultation. By phone, video, or at your home. We listen to your wishes, assess the situation, and discuss the possibilities.',
              items: [
                'Free and no-obligation',
                'Your wishes and priorities',
                'Initial feasibility assessment',
                'Introduction to our approach',
              ],
            },
            {
              title: 'Proposal & Quote',
              description: 'After the site visit, we prepare a detailed proposal. With clear scope, material options, and subsidy-ready quote. No surprises afterwards.',
              items: [
                'Detailed scope',
                'Material options with prices',
                'Subsidy-ready format',
                'Clear planning',
              ],
            },
            {
              title: 'Execution',
              description: 'During execution, you’re always informed. Regular updates, one point of contact, and expert work by our team and trusted partners.',
              items: [
                'One fixed contact person',
                'Regular updates',
                'Coordinated planning',
                'Quality control',
              ],
            },
            {
              title: 'Delivery & Aftercare',
              description: 'At delivery, we go through everything together. We provide the necessary certificates and guide you with subsidy applications. We’re available even after delivery.',
              items: [
                'Thorough delivery',
                'Certificates and documents',
                'Subsidy support',
                'Aftercare and warranty',
              ],
            },
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
        section('approach', 'guarantees', 'en', 'feature-list', 3, {
          eyebrow: 'Guarantees',
          title: 'What you can expect',
          description: 'Our guarantees for a worry-free collaboration.',
          items: [
            { title: 'Quality guarantee', description: 'We stand behind our work. We solve problems even after delivery.' },
            { title: 'Clear planning', description: 'Clear milestones and realistic timing. You know where you stand.' },
            { title: 'One contact person', description: 'No hassle with different contacts. You have one fixed contact person.' },
            { title: 'Transparent pricing', description: 'Detailed quote without hidden costs. Additional work only by agreement.' },
          ],
        }),
        section('approach', 'faq', 'en', 'faq', 4, {
          eyebrow: 'FAQ',
          title: 'Frequently asked questions',
          description: 'Answers to the most common questions about our approach.',
          items: [
            {
              question: 'How long until I receive a quote?',
              answer: 'After the site visit, you will receive a detailed quote within 1 to 2 weeks. For more complex projects, this may take a bit longer.',
            },
            {
              question: 'Do you work with fixed prices or post-calculation?',
              answer: 'We work with a detailed quote based on fixed prices. Additional work is always discussed and approved in advance.',
            },
            {
              question: 'How does communication work during the project?',
              answer: 'You have one fixed contact person. We provide regular updates (by phone, email, or WhatsApp) and are available for questions.',
            },
            {
              question: 'What if something goes wrong or is not to your liking?',
              answer: 'We solve problems quickly and correctly. At delivery, we go through everything together and issues are addressed before final approval.',
            },
            {
              question: 'Do you help with permits?',
              answer: 'We advise on permit requirements and can refer to architects if needed. The permit application itself is outside our scope.',
            },
            {
              question: 'Can you also do just part of the work?',
              answer: 'Yes, we also do targeted renovations and finishing. Discuss your specific needs during the consultation.',
            },
          ],
        }),
        section('approach', 'cta', 'en', 'cta', 5, {
          title: 'Need clarity on feasibility first?',
          description: 'Use a first consultation to structure scope, timing and budget before execution starts.',
          primaryCtaLabel: 'Book a consultation',
          primaryCtaHref: '/afspraak',
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
          description: 'Ready to discuss your renovation project? Get in touch for a free, no-obligation consultation. We respond within 24 hours.',
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
      hero: {
        eyebrow: 'Privacy',
        title: 'How we process personal data under the GDPR',
        description:
          'This privacy statement describes what data NAM BV processes, on which legal basis, for how long and which rights you have.',
      },
      sections: [
        section('privacy', 'legal', 'en', 'legal', 1, {
          updatedAt: 'April 14, 2026',
          introduction:
            'This privacy statement applies to all processing of personal data by NAM BV in the context of quote requests, project follow-up, appointments, invoicing, job applications and website use. It has been drafted in accordance with the General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR") and the Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data.',
          sections: [
            {
              title: '1. Data controller',
              body: 'NAM BV (private limited company / Besloten Vennootschap)\nRegistered office: Zwijnaardsesteenweg 683, 9000 Ghent, Belgium\nEnterprise number: 0792.212.559\nVAT: BE0792.212.559\nRLE: Enterprise Court of Ghent, Ghent division\n\nContact for privacy matters: info@namconstruction.be · +32 493 81 27 89',
            },
            {
              title: '2. Personal data we process',
              body: 'We limit ourselves to the data that is strictly necessary for the purpose for which we collect it:',
              items: [
                'Identification data: surname, first name, address, postal code, city',
                'Contact data: email address, phone number',
                'Project data: type of property, scope, budget indication, photos you voluntarily share',
                'Billing data: invoicing address, enterprise number and VAT for business clients',
                'Appointment preferences: preferred timing, location, availability',
                'Job application data: CV, cover letter, additional information you provide',
                'Technical data: IP address, session and cookie information if you accept them',
              ],
            },
            {
              title: '3. Purposes and legal basis (art. 6 GDPR)',
              body: 'We process data exclusively for the following purposes, each time on the basis of a valid legal ground:',
              items: [
                'Responding to quote requests, performing contracts and project follow-up \u2014 performance of the contract (art. 6.1.b)',
                'Accounting, invoicing and statutory retention \u2014 legal obligation (art. 6.1.c, including art. III.86 CEL and VAT legislation)',
                'Customer follow-up, satisfaction surveys and direct communication to existing clients \u2014 legitimate interest (art. 6.1.f)',
                'Newsletters, marketing cookies and targeted advertising \u2014 consent (art. 6.1.a), which you can withdraw at any time',
                'Management of job applications and recruitment \u2014 measures prior to entering into an employment contract (art. 6.1.b)',
              ],
            },
            {
              title: '4. Retention periods',
              body: 'We do not keep your data longer than necessary:',
              items: [
                'Client and billing data: 7 years after the end of the financial year (tax retention obligation)',
                'Quote files without follow-up: 5 years',
                'Prospect data (not converted to client): 3 years after last contact',
                'Job applications: 2 years maximum, unless you explicitly consent to a longer inclusion in our candidate pool',
                'Cookies: see section 7 \u2014 typically between session duration and 12 months',
              ],
            },
            {
              title: '5. Recipients and processors',
              body: 'Your data is only shared with parties required for the performance of our assignment or on the basis of a legal obligation. With every processor we enter into a data processing agreement in accordance with art. 28 GDPR.',
              items: [
                'IT suppliers for hosting, email and website infrastructure',
                'Our accountant, auditor and tax adviser',
                'Our decennial and civil liability insurer in case of claims',
                'Subcontractors and architects within the project scope',
                'Public authorities where legally required (NSSO, VAT administration, FPS Finance)',
              ],
            },
            {
              title: '6. International transfers',
              body: 'As a rule we process data within the European Economic Area (EEA). If a processor processes data outside the EEA, this only happens on the basis of an adequacy decision by the European Commission or through standard contractual clauses in accordance with art. 45 and 46 GDPR.',
            },
            {
              title: '7. Cookies',
              body: 'Our website uses three categories of cookies. You manage your choice via the cookie banner.',
              items: [
                'Strictly necessary cookies: session, language choice, cookie preference \u2014 no consent required',
                'Statistics and analytics cookies: measuring usage anonymously \u2014 only after consent',
                'Marketing and tracking cookies: personalised advertising \u2014 only after consent',
              ],
            },
            {
              title: '8. Your rights',
              body: 'You can exercise the following rights via info@namconstruction.be. We respond within 30 days. In case of doubt about your identity, we may ask for proof.',
              items: [
                'Right of access (art. 15 GDPR)',
                'Right of rectification (art. 16)',
                'Right to erasure / "to be forgotten" (art. 17)',
                'Right to restriction of processing (art. 18)',
                'Right to data portability (art. 20)',
                'Right to object to processing based on legitimate interest (art. 21)',
                'Right to withdraw a given consent at any time (art. 7.3)',
                'Right not to be subject to automated decision-making (art. 22) \u2014 we do not apply this',
              ],
            },
            {
              title: '9. Right to lodge a complaint',
              body: 'Not satisfied with the way we process your data? Please contact us first at info@namconstruction.be. You also have the right to lodge a complaint with the supervisory authority:\n\nData Protection Authority (APD/GBA)\nRue de la Presse 35, 1000 Brussels\ncontact@apd-gba.be · +32 2 274 48 00\nwww.dataprotectionauthority.be',
            },
          ],
        }),
      ],
    },
    terms: {
      hero: {
        eyebrow: 'Terms',
        title: 'General terms and conditions of NAM BV',
        description:
          'These terms apply to every quote, agreement and execution of renovation works by NAM BV. Version for private and business clients.',
      },
      sections: [
        section('terms', 'legal', 'en', 'legal', 1, {
          updatedAt: 'April 14, 2026',
          introduction:
            'These general terms and conditions govern the contractual relationship between NAM BV and its clients. Where the text distinguishes between private (B2C) and business clients (B2B), this is expressly indicated. By signing a quote or confirming an assignment, the client accepts these terms.',
          sections: [
            {
              title: '1. Contractor identification',
              body: 'NAM BV (private limited company / Besloten Vennootschap)\nRegistered office: Zwijnaardsesteenweg 683, 9000 Ghent, Belgium\nEnterprise number: 0792.212.559\nVAT: BE0792.212.559\nRLE: Enterprise Court of Ghent, Ghent division\nMain activity: NACE 41.201 (general construction of residential buildings) and NACE 43.299 (other building installation)\n\nContact: info@namconstruction.be · +32 493 81 27 89',
            },
            {
              title: '2. Scope',
              body: 'These terms apply to all quotes, assignments, agreements and works carried out by NAM BV, to the exclusion of any purchase or other terms of the client. Deviations are only valid if accepted in writing by NAM BV. The terms are made available before the conclusion of the agreement and form an integral part of it.',
            },
            {
              title: '3. Quote and formation of the agreement',
              body: 'Unless otherwise stated, quotes are valid for 30 calendar days from the date of issue. The agreement is formed upon written acceptance (including email) of the quote by the client or upon an express order confirmation. Prices are stated excluding VAT. The applicable VAT rate (6% or 21%) is determined on the basis of a declaration signed by the client in accordance with VAT legislation (Royal Decree no. 20, table A, XXXVIII) confirming that the dwelling is older than ten years and is exclusively or predominantly used as a private residence. Incorrect declarations are the client\u2019s responsibility.',
            },
            {
              title: '4. Execution, planning and additional work',
              body: 'The execution period is stated in the quote and is indicative unless expressly agreed as binding. Force majeure (including pandemic, material shortages, extreme weather, strikes, government measures) extends the execution period by the duration of the impediment, without entitlement to compensation. Changes to scope, additional work or unforeseen circumstances are recorded in writing, including their impact on price and schedule, before any further execution.',
            },
            {
              title: '5. Payment (business clients \u2014 B2B)',
              body: 'Invoices are payable within 30 days of the invoice date, unless otherwise agreed. In case of late payment, the following is owed by operation of law and without notice of default:',
              items: [
                'Default interest of 10% per annum on the outstanding amount',
                'A fixed compensation of 10% of the outstanding amount, with a minimum of \u20ac125',
                'These clauses are reciprocal: the same compensation is due by NAM BV in case of demonstrable late performance outside force majeure',
              ],
            },
            {
              title: '6. Payment (private clients \u2014 B2C)',
              body: 'Invoices are payable within 30 days of the invoice date. In case of late payment, a first free notice of default is sent. If payment is not made within 14 calendar days of receipt, the following is owed in accordance with Book XIX CEL:',
              items: [
                'Default interest at the statutory rate applicable to payment arrears (Act of 2 August 2002)',
                'A fixed compensation: \u20ac20 if the debt does not exceed \u20ac150; \u20ac30 plus 10% of the portion above \u20ac150 for debts between \u20ac150 and \u20ac500; \u20ac65 plus 5% of the portion above \u20ac500 for debts exceeding \u20ac500, with an overall maximum of \u20ac2,000',
                'The same rules apply reciprocally when NAM BV owes amounts to the client',
              ],
            },
            {
              title: '7. Acceptance, reception and warranty',
              body: 'At the end of the works, a provisional reception takes place. Visible defects must be reported in writing at that time or within 8 calendar days. Final reception follows one year after provisional reception, unless otherwise agreed.\n\nFor minor hidden defects that become apparent after acceptance, NAM BV\u2019s contractual liability is 2 years from the provisional reception, in accordance with established practice in the construction sector.\n\nThe ten-year liability for serious defects that jeopardise the stability or soundness of the works (or an essential part thereof), as set out in article 5.86 of the Civil Code (formerly art. 1792), remains fully applicable and cannot be limited or excluded by these terms.',
            },
            {
              title: '8. Insurance',
              body: 'NAM BV holds the statutorily required ten-year civil liability insurance in accordance with the Act of 31 May 2017 (Peeters-Borsus), as well as an operational civil liability insurance for site liability.\n\nThe insurance certificate stating the insurer, policy number and coverage period is, in accordance with article 12 of the aforementioned Act, made available to the client and any architect before the start of the works.',
            },
            {
              title: '9. Right of withdrawal (private clients only)',
              body: 'For contracts concluded at a distance (e.g. online, by email) or outside our usual place of business, you as a consumer have a right of withdrawal of 14 calendar days, as provided for in article VI.47 et seq. CEL.\n\nImportant exception: if you expressly request us to begin the works within this 14-day period and the works are fully performed before the end of that period, the right of withdrawal lapses (art. VI.53, 13\u00b0 CEL). If the works are partly performed, you owe a compensation proportionate to the work already carried out.\n\nThe model withdrawal form is available on simple request at info@namconstruction.be.',
            },
            {
              title: '10. Complaints, applicable law and jurisdiction',
              body: 'Complaints should preferably be reported first directly via info@namconstruction.be. We respond within 7 working days.\n\nIn case of persistent disputes, recourse may be had to the Construction Conciliation Committee (www.bouw-verzoeningscommissie.be), which provides free out-of-court dispute resolution for construction disputes.\n\nThis agreement is exclusively governed by Belgian law. For all disputes, without prejudice to special consumer jurisdictions, the courts of the judicial district of Ghent have jurisdiction, and in particular the Enterprise Court of Ghent, Ghent division.',
            },
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
