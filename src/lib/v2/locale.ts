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

type V2UiCopy = {
  nav: {
    home: string;
    projects: string;
    quote: string;
    appointment: string;
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
  };
  quote: {
    title: string;
    description: string;
    submit: string;
    success: string;
    fields: Record<string, string>;
  };
  appointment: {
    title: string;
    description: string;
    submit: string;
    success: string;
    fields: Record<string, string>;
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
      projects: 'Projecten',
      quote: 'Offerte',
      appointment: 'Afspraak',
      admin: 'Admin v2',
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
      projects: 'Projets',
      quote: 'Devis',
      appointment: 'Rendez-vous',
      admin: 'Admin v2',
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
    },
    appointment: {
      title: 'Planifier un entretien',
      description: 'Choisissez un moment adapté et donnez-nous le contexte de votre projet.',
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
      projects: 'Projects',
      quote: 'Quote',
      appointment: 'Appointment',
      admin: 'Admin v2',
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
