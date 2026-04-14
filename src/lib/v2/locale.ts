export const V2_LOCALES = ['nl', 'fr', 'en'] as const;

export type V2Locale = (typeof V2_LOCALES)[number];

export function isV2Locale(value: string): value is V2Locale {
  return (V2_LOCALES as readonly string[]).includes(value);
}

export function normalizeV2Locale(value?: string | null): V2Locale {
  if (!value) {
    return 'nl';
  }

  return isV2Locale(value) ? value : 'nl';
}

type V2SelectOption = { id: string; label: string };
type V2ProjectTypeOption = { id: string; label: string; description: string };

type V2UiCopy = {
  nav: {
    home: string;
    services: string;
    approach: string;
    projects: string;
    quote: string;
    appointment: string;
    contact: string;
    admin: string;
  };
  common: {
    loading: string;
    save: string;
    cancel: string;
    phone: string;
    email: string;
    address: string;
    status: string;
    viewAllProjects: string;
    getQuote: string;
    bookAppointment: string;
    trustedBy: string;
    leadTime: string;
    noData: string;
    lastUpdated: string;
    lastUpdatedRecently: string;
  };
  quote: {
    title: string;
    description: string;
    submit: string;
    success: string;
    fields: Record<string, string>;
    sectionLabels: string[];
    newQuote: string;
    serviceCategories: { slug: string; label: string; services: string[] }[];
  };
  appointment: {
    title: string;
    description: string;
    submit: string;
    success: string;
    fields: Record<string, string>;
    stepLabels: string[];
    steps: {
      contact: { title: string; subtitle: string };
      project: { title: string; subtitle: string };
      dateTime: { title: string; subtitle: string };
      confirm: { title: string; subtitle: string };
    };
    next: string;
    back: string;
    newAppointment: string;
    projectTypes: V2ProjectTypeOption[];
    propertyTypes: V2SelectOption[];
    budgetRanges: V2SelectOption[];
    weekDays: string[];
    monthNames: string[];
    noSlotsAvailable: string;
    selectDateFirst: string;
    slotsAvailable: string;
    reviewTitle: string;
    editStep: string;
    subsidyTitle: string;
    subsidyDescription: string;
    paymentSpreadTitle: string;
    paymentSpreadDescription: string;
  };
  admin: {
    title: string;
    loginTitle: string;
    loginDescription: string;
    signIn: string;
    signOut: string;
    modules: Record<string, string>;
  };
};

export const v2UiCopy: Record<V2Locale, V2UiCopy> = {
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      approach: 'Aanpak',
      projects: 'Projecten',
      quote: 'Offerte',
      appointment: 'Afspraak',
      contact: 'Contact',
      admin: 'Admin',
    },
    common: {
      loading: 'Laden...',
      save: 'Opslaan',
      cancel: 'Annuleren',
      phone: 'Telefoon',
      email: 'E-mail',
      address: 'Adres',
      status: 'Status',
      viewAllProjects: 'Bekijk alle projecten',
      getQuote: 'Vraag een offerte aan',
      bookAppointment: 'Plan een gesprek',
      trustedBy: 'Vertrouwd door renovatieklanten in en rond Gent',
      leadTime: 'Reactie binnen 1 werkdag',
      noData: 'Nog geen gegevens beschikbaar.',
      lastUpdated: 'Laatst bijgewerkt',
      lastUpdatedRecently: 'Recent bijgewerkt',
    },
    quote: {
      title: 'Vraag een offerte aan',
      description: 'Vertel kort wat u wilt aanpakken. Wij reageren snel en concreet.',
      submit: 'Offerte versturen',
      success: 'Uw aanvraag is ontvangen. We nemen snel contact op.',
      fields: {
        fullName: 'Naam',
        email: 'E-mail',
        phone: 'Telefoon',
        postalCode: 'Postcode',
        city: 'Stad',
        propertyTypeId: 'Type woning',
        serviceTypeIds: 'Gevraagde werken',
        description: 'Projectomschrijving',
        preferredStart: 'Gewenste start',
        budgetRange: 'Budgetindicatie',
        gdprConsent: 'Ik ga akkoord met de privacyverklaring',
      },
      sectionLabels: ['Uw gegevens', 'Uw woning', 'Uw project', 'Bevestiging'],
      newQuote: 'Nieuwe offerte aanvragen',
      serviceCategories: [
        { slug: 'volledig', label: 'Volledig', services: ['totaalrenovatie'] },
        { slug: 'ruimtes', label: 'Ruimtes', services: ['badkamer', 'keuken', 'toilet', 'woonkamer', 'slaapkamer', 'uitbouw-zolder'] },
        { slug: 'werken', label: 'Werken', services: ['elektriciteit', 'sanitair', 'vloeren', 'schilderwerk'] },
        { slug: 'overig', label: 'Overig', services: ['anders'] },
      ],
    },
    appointment: {
      title: 'Plan een adviesgesprek',
      description: 'Kies een geschikt moment en geef ons de context van uw project.',
      submit: 'Afspraak aanvragen',
      success: 'Uw afspraak is geregistreerd. U ontvangt een bevestiging per e-mail.',
      fields: {
        name: 'Naam',
        email: 'E-mail',
        phone: 'Telefoon',
        gemeente: 'Gemeente',
        selectedDate: 'Datum',
        selectedTime: 'Tijdslot',
        projectType: 'Projecttype',
        propertyType: 'Type woning',
        propertyAge: 'Leeftijd woning',
        priorities: 'Prioriteiten',
        materialPreference: 'Materiaalvoorkeur',
        budget: 'Budget',
        timing: 'Timing',
        subsidyInterest: 'Interesse in subsidies',
        paymentSpread: 'Interesse in betalingsspreiding',
        motivation: 'Motivatie',
        message: 'Extra context',
      },
      stepLabels: ['Contact', 'Project', 'Datum & Tijd', 'Bevestig'],
      steps: {
        contact: { title: 'Uw contactgegevens', subtitle: 'Hoe kunnen wij u bereiken?' },
        project: { title: 'Uw project', subtitle: 'Vertel ons meer over uw plannen.' },
        dateTime: { title: 'Kies een moment', subtitle: 'Selecteer een datum en tijdstip.' },
        confirm: { title: 'Bevestig uw afspraak', subtitle: 'Controleer uw gegevens en verstuur.' },
      },
      next: 'Volgende',
      back: 'Vorige',
      newAppointment: 'Nieuwe afspraak plannen',
      projectTypes: [
        { id: 'totaalrenovatie', label: 'Totaalrenovatie', description: 'Volledige renovatie van uw woning' },
        { id: 'keuken', label: 'Keukenrenovatie', description: 'Nieuwe keuken of keukenverbouwing' },
        { id: 'badkamer', label: 'Badkamerrenovatie', description: 'Moderne badkamer op maat' },
        { id: 'schilderwerk', label: 'Schilderwerk', description: 'Binnen- en buitenschilderwerk' },
        { id: 'elektriciteit', label: 'Elektriciteit', description: 'Elektrische installaties en keuring' },
        { id: 'loodgieterij', label: 'Loodgieterij', description: 'Sanitair en leidingwerk' },
      ],
      propertyTypes: [
        { id: 'appartement', label: 'Appartement' },
        { id: 'rijwoning', label: 'Rijwoning' },
        { id: 'vrijstaand', label: 'Vrijstaande woning' },
        { id: 'bedrijfspand', label: 'Bedrijfspand' },
      ],
      budgetRanges: [
        { id: 'under_10k', label: '< \u20AC10.000' },
        { id: '10k_25k', label: '\u20AC10.000 - \u20AC25.000' },
        { id: '25k_50k', label: '\u20AC25.000 - \u20AC50.000' },
        { id: '50k_100k', label: '\u20AC50.000 - \u20AC100.000' },
        { id: 'over_100k', label: '> \u20AC100.000' },
        { id: 'unknown', label: 'Nog niet bepaald' },
      ],
      weekDays: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      monthNames: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
      noSlotsAvailable: 'Geen beschikbare tijdslots op deze dag.',
      selectDateFirst: 'Kies eerst een datum.',
      slotsAvailable: '{count} slots beschikbaar',
      reviewTitle: 'Overzicht',
      editStep: 'Wijzig',
      subsidyTitle: 'Subsidies',
      subsidyDescription: 'Ik wil graag weten of ik in aanmerking kom voor renovatiepremies.',
      paymentSpreadTitle: 'Betalingsspreiding',
      paymentSpreadDescription: 'Ik heb interesse in gespreide betaling voor mijn project.',
    },
    admin: {
      title: 'Nam Construction v2',
      loginTitle: 'Veilige v2-login',
      loginDescription: 'Beheer content, leads en instellingen voor de parallelle v2.',
      signIn: 'Inloggen',
      signOut: 'Uitloggen',
      modules: {
        analytics: 'Analytics',
        quotes: 'Offertes',
        appointments: 'Afspraken',
        availability: 'Beschikbaarheid',
        projects: 'Projecten',
        content: 'Content',
        assets: 'Assets',
        settings: 'Instellingen',
      },
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      approach: 'Approche',
      projects: 'Projets',
      quote: 'Devis',
      appointment: 'Rendez-vous',
      contact: 'Contact',
      admin: 'Admin',
    },
    common: {
      loading: 'Chargement...',
      save: 'Enregistrer',
      cancel: 'Annuler',
      phone: 'Téléphone',
      email: 'E-mail',
      address: 'Adresse',
      status: 'Statut',
      viewAllProjects: 'Voir tous les projets',
      getQuote: 'Demander un devis',
      bookAppointment: 'Planifier un rendez-vous',
      trustedBy: 'Une équipe de rénovation de confiance à Gand et aux alentours',
      leadTime: 'Réponse sous 1 jour ouvrable',
      noData: 'Aucune donnée disponible.',
      lastUpdated: 'Mis à jour le',
      lastUpdatedRecently: 'Récemment mis à jour',
    },
    quote: {
      title: 'Demander un devis',
      description: 'Expliquez brièvement votre projet. Nous revenons rapidement avec une réponse concrète.',
      submit: 'Envoyer la demande',
      success: 'Votre demande a bien été reçue. Nous vous contacterons rapidement.',
      fields: {
        fullName: 'Nom',
        email: 'E-mail',
        phone: 'Téléphone',
        postalCode: 'Code postal',
        city: 'Ville',
        propertyTypeId: 'Type de bien',
        serviceTypeIds: 'Travaux souhaités',
        description: 'Description du projet',
        preferredStart: 'Début souhaité',
        budgetRange: 'Budget estimé',
        gdprConsent: "J'accepte la politique de confidentialité",
      },
      sectionLabels: ['Vos coordonn\u00e9es', 'Votre bien', 'Votre projet', 'Confirmation'],
      newQuote: 'Nouvelle demande de devis',
      serviceCategories: [
        { slug: 'volledig', label: 'Complet', services: ['totaalrenovatie'] },
        { slug: 'ruimtes', label: 'Pi\u00e8ces', services: ['badkamer', 'keuken', 'toilet', 'woonkamer', 'slaapkamer', 'uitbouw-zolder'] },
        { slug: 'werken', label: 'Travaux', services: ['elektriciteit', 'sanitair', 'vloeren', 'schilderwerk'] },
        { slug: 'overig', label: 'Autre', services: ['anders'] },
      ],
    },
    appointment: {
      title: 'Planifier un entretien',
      description: 'Choisissez un moment adapt\u00e9 et donnez-nous le contexte de votre projet.',
      submit: 'Demander le rendez-vous',
      success: 'Votre rendez-vous est enregistré. Vous recevrez une confirmation par e-mail.',
      fields: {
        name: 'Nom',
        email: 'E-mail',
        phone: 'Téléphone',
        gemeente: 'Commune',
        selectedDate: 'Date',
        selectedTime: 'Créneau',
        projectType: 'Type de projet',
        propertyType: 'Type de bien',
        propertyAge: 'Âge du bien',
        priorities: 'Priorités',
        materialPreference: 'Préférence matériaux',
        budget: 'Budget',
        timing: 'Timing',
        subsidyInterest: 'Intérêt pour les subventions',
        paymentSpread: "Intérêt pour l'échelonnement",
        motivation: 'Motivation',
        message: 'Contexte supplémentaire',
      },
      stepLabels: ['Contact', 'Projet', 'Date & Heure', 'Confirmer'],
      steps: {
        contact: { title: 'Vos coordonnées', subtitle: 'Comment pouvons-nous vous joindre ?' },
        project: { title: 'Votre projet', subtitle: 'Parlez-nous de vos plans.' },
        dateTime: { title: 'Choisissez un moment', subtitle: 'Sélectionnez une date et une heure.' },
        confirm: { title: 'Confirmez votre rendez-vous', subtitle: 'Vérifiez vos données et envoyez.' },
      },
      next: 'Suivant',
      back: 'Précédent',
      newAppointment: 'Planifier un nouveau rendez-vous',
      projectTypes: [
        { id: 'totaalrenovatie', label: 'Rénovation complète', description: 'Rénovation intégrale de votre bien' },
        { id: 'keuken', label: 'Rénovation cuisine', description: 'Nouvelle cuisine ou transformation' },
        { id: 'badkamer', label: 'Rénovation salle de bain', description: 'Salle de bain moderne sur mesure' },
        { id: 'schilderwerk', label: 'Peinture', description: 'Peinture intérieure et extérieure' },
        { id: 'elektriciteit', label: 'Électricité', description: 'Installations électriques et contrôle' },
        { id: 'loodgieterij', label: 'Plomberie', description: 'Sanitaire et tuyauterie' },
      ],
      propertyTypes: [
        { id: 'appartement', label: 'Appartement' },
        { id: 'rijwoning', label: 'Maison mitoyenne' },
        { id: 'vrijstaand', label: 'Maison individuelle' },
        { id: 'bedrijfspand', label: 'Bâtiment commercial' },
      ],
      budgetRanges: [
        { id: 'under_10k', label: '< \u20AC10.000' },
        { id: '10k_25k', label: '\u20AC10.000 - \u20AC25.000' },
        { id: '25k_50k', label: '\u20AC25.000 - \u20AC50.000' },
        { id: '50k_100k', label: '\u20AC50.000 - \u20AC100.000' },
        { id: 'over_100k', label: '> \u20AC100.000' },
        { id: 'unknown', label: 'Pas encore défini' },
      ],
      weekDays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      noSlotsAvailable: 'Aucun créneau disponible ce jour.',
      selectDateFirst: 'Veuillez d\'abord choisir une date.',
      slotsAvailable: '{count} créneaux disponibles',
      reviewTitle: 'Récapitulatif',
      editStep: 'Modifier',
      subsidyTitle: 'Subventions',
      subsidyDescription: 'Je souhaite savoir si je peux bénéficier de primes à la rénovation.',
      paymentSpreadTitle: 'Échelonnement',
      paymentSpreadDescription: 'Je suis intéressé(e) par un paiement échelonné pour mon projet.',
    },
    admin: {
      title: 'Nam Construction v2',
      loginTitle: 'Connexion v2 sécurisée',
      loginDescription: 'Gérez le contenu, les leads et les réglages de la v2 parallèle.',
      signIn: 'Se connecter',
      signOut: 'Se déconnecter',
      modules: {
        analytics: 'Analytics',
        quotes: 'Devis',
        appointments: 'Rendez-vous',
        availability: 'Disponibilités',
        projects: 'Projets',
        content: 'Contenu',
        assets: 'Assets',
        settings: 'Réglages',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      approach: 'Approach',
      projects: 'Projects',
      quote: 'Quote',
      appointment: 'Appointment',
      contact: 'Contact',
      admin: 'Admin',
    },
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      status: 'Status',
      viewAllProjects: 'View all projects',
      getQuote: 'Request a quote',
      bookAppointment: 'Book a consultation',
      trustedBy: 'Trusted renovation partner in Ghent and beyond',
      leadTime: 'Reply within 1 business day',
      noData: 'No data available yet.',
      lastUpdated: 'Last updated',
      lastUpdatedRecently: 'Recently updated',
    },
    quote: {
      title: 'Request a quote',
      description: 'Briefly explain your scope. We respond fast with a concrete next step.',
      submit: 'Send quote request',
      success: 'Your request was received. We will get back to you shortly.',
      fields: {
        fullName: 'Name',
        email: 'Email',
        phone: 'Phone',
        postalCode: 'Postal code',
        city: 'City',
        propertyTypeId: 'Property type',
        serviceTypeIds: 'Requested works',
        description: 'Project description',
        preferredStart: 'Preferred start',
        budgetRange: 'Budget range',
        gdprConsent: 'I agree to the privacy policy',
      },
      sectionLabels: ['Your details', 'Your property', 'Your project', 'Confirmation'],
      newQuote: 'Request another quote',
      serviceCategories: [
        { slug: 'volledig', label: 'Full scope', services: ['totaalrenovatie'] },
        { slug: 'ruimtes', label: 'Rooms', services: ['badkamer', 'keuken', 'toilet', 'woonkamer', 'slaapkamer', 'uitbouw-zolder'] },
        { slug: 'werken', label: 'Works', services: ['elektriciteit', 'sanitair', 'vloeren', 'schilderwerk'] },
        { slug: 'overig', label: 'Other', services: ['anders'] },
      ],
    },
    appointment: {
      title: 'Book a consultation',
      description: 'Pick a suitable slot and tell us what your project needs.',
      submit: 'Request appointment',
      success: 'Your appointment was captured. A confirmation email is on its way.',
      fields: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        gemeente: 'Municipality',
        selectedDate: 'Date',
        selectedTime: 'Time slot',
        projectType: 'Project type',
        propertyType: 'Property type',
        propertyAge: 'Property age',
        priorities: 'Priorities',
        materialPreference: 'Material preference',
        budget: 'Budget',
        timing: 'Timing',
        subsidyInterest: 'Interested in subsidies',
        paymentSpread: 'Interested in payment spread',
        motivation: 'Motivation',
        message: 'Additional context',
      },
      stepLabels: ['Contact', 'Project', 'Date & Time', 'Confirm'],
      steps: {
        contact: { title: 'Your contact details', subtitle: 'How can we reach you?' },
        project: { title: 'Your project', subtitle: 'Tell us more about your plans.' },
        dateTime: { title: 'Pick a time', subtitle: 'Select a date and time slot.' },
        confirm: { title: 'Confirm your appointment', subtitle: 'Review your details and submit.' },
      },
      next: 'Next',
      back: 'Back',
      newAppointment: 'Schedule a new appointment',
      projectTypes: [
        { id: 'totaalrenovatie', label: 'Full renovation', description: 'Complete renovation of your property' },
        { id: 'keuken', label: 'Kitchen renovation', description: 'New kitchen or kitchen remodel' },
        { id: 'badkamer', label: 'Bathroom renovation', description: 'Custom modern bathroom' },
        { id: 'schilderwerk', label: 'Painting', description: 'Interior and exterior painting' },
        { id: 'elektriciteit', label: 'Electrical', description: 'Electrical installations and inspection' },
        { id: 'loodgieterij', label: 'Plumbing', description: 'Plumbing and pipe work' },
      ],
      propertyTypes: [
        { id: 'appartement', label: 'Apartment' },
        { id: 'rijwoning', label: 'Terraced house' },
        { id: 'vrijstaand', label: 'Detached house' },
        { id: 'bedrijfspand', label: 'Commercial property' },
      ],
      budgetRanges: [
        { id: 'under_10k', label: '< \u20AC10,000' },
        { id: '10k_25k', label: '\u20AC10,000 - \u20AC25,000' },
        { id: '25k_50k', label: '\u20AC25,000 - \u20AC50,000' },
        { id: '50k_100k', label: '\u20AC50,000 - \u20AC100,000' },
        { id: 'over_100k', label: '> \u20AC100,000' },
        { id: 'unknown', label: 'Not sure yet' },
      ],
      weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      noSlotsAvailable: 'No time slots available on this day.',
      selectDateFirst: 'Please select a date first.',
      slotsAvailable: '{count} slots available',
      reviewTitle: 'Summary',
      editStep: 'Edit',
      subsidyTitle: 'Subsidies',
      subsidyDescription: 'I would like to know if I qualify for renovation subsidies.',
      paymentSpreadTitle: 'Payment plan',
      paymentSpreadDescription: 'I am interested in a payment plan for my project.',
    },
    admin: {
      title: 'Nam Construction v2',
      loginTitle: 'Secure v2 login',
      loginDescription: 'Manage content, leads and settings for the parallel v2.',
      signIn: 'Sign in',
      signOut: 'Sign out',
      modules: {
        analytics: 'Analytics',
        quotes: 'Quotes',
        appointments: 'Appointments',
        availability: 'Availability',
        projects: 'Projects',
        content: 'Content',
        assets: 'Assets',
        settings: 'Settings',
      },
    },
  },
};

export function getV2UiCopy(locale: V2Locale) {
  return v2UiCopy[locale];
}
