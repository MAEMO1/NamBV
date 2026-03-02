// Central image registry - all project photos from Supabase Storage
// Single source of truth for every image URL on the site

const STORAGE_BASE = `https://hqqbaukibydxdwsmupdz.supabase.co/storage/v1/object/public/project-photos`

// ============================================================================
// SITE-WIDE IMAGES
// ============================================================================
export const siteImages = {
  heroHome: `${STORAGE_BASE}/site/hero-meulemanstraat-na.webp`,
  ctaBackground: `${STORAGE_BASE}/meulemanstraat/after/02-modern-interieur-eik.webp`,
  whyUsSection: `${STORAGE_BASE}/reginald-warnefordstraat/01-moderne-keuken-wit.webp`,
}

// ============================================================================
// PROJECT IMAGES BY PROJECT
// ============================================================================
export const projectImages = {
  meulemanstraat: {
    before: [
      `${STORAGE_BASE}/meulemanstraat/before/01-oude-gevel.webp`,
      `${STORAGE_BASE}/meulemanstraat/before/02-oude-trap.webp`,
      `${STORAGE_BASE}/meulemanstraat/before/03-oud-interieur.webp`,
    ],
    after: [
      `${STORAGE_BASE}/meulemanstraat/after/01-gerenoveerde-gevel.webp`,
      `${STORAGE_BASE}/meulemanstraat/after/02-modern-interieur-eik.webp`,
      `${STORAGE_BASE}/meulemanstraat/after/03-moderne-kamer-tegels.webp`,
    ],
    main: `${STORAGE_BASE}/meulemanstraat/after/01-gerenoveerde-gevel.webp`,
  },
  oostende: {
    photos: [
      `${STORAGE_BASE}/oostende/01-woonkamer-plafond-spots.webp`,
      `${STORAGE_BASE}/oostende/02-eetkamer-design.webp`,
      `${STORAGE_BASE}/oostende/03-dakwerken-pannen.webp`,
      `${STORAGE_BASE}/oostende/04-dakwerken-osb.webp`,
      `${STORAGE_BASE}/oostende/05-woonkamer-haard.webp`,
    ],
    main: `${STORAGE_BASE}/oostende/02-eetkamer-design.webp`,
  },
  parijs: {
    before: [
      `${STORAGE_BASE}/parijs/before/01-gestripte-vloer.webp`,
      `${STORAGE_BASE}/parijs/before/02-elektra-muren.webp`,
    ],
    after: [
      `${STORAGE_BASE}/parijs/after/01-eiken-parket.webp`,
      `${STORAGE_BASE}/parijs/after/02-groene-muur-salon.webp`,
      `${STORAGE_BASE}/parijs/after/03-rail-verlichting.webp`,
    ],
    main: `${STORAGE_BASE}/parijs/after/03-rail-verlichting.webp`,
  },
  reginaldWarneford: {
    photos: [
      `${STORAGE_BASE}/reginald-warnefordstraat/01-moderne-keuken-wit.webp`,
      `${STORAGE_BASE}/reginald-warnefordstraat/02-stalen-deur-glas.webp`,
      `${STORAGE_BASE}/reginald-warnefordstraat/03-keuken-bar-eiland.webp`,
      `${STORAGE_BASE}/reginald-warnefordstraat/04-woonkamer-beton.webp`,
    ],
    main: `${STORAGE_BASE}/reginald-warnefordstraat/01-moderne-keuken-wit.webp`,
  },
  gavere: {
    photos: [
      `${STORAGE_BASE}/gavere/01-zolder-balken.webp`,
      `${STORAGE_BASE}/gavere/02-afbraak-interieur.webp`,
      `${STORAGE_BASE}/gavere/03-gestripte-kamers.webp`,
      `${STORAGE_BASE}/gavere/04-vloer-uitgebroken.webp`,
    ],
    main: `${STORAGE_BASE}/gavere/01-zolder-balken.webp`,
  },
  visitatiestraat: {
    photos: [
      `${STORAGE_BASE}/visitatiestraat/01-ruwbouw-opening.webp`,
      `${STORAGE_BASE}/visitatiestraat/02-funderingswerk-dpc.webp`,
      `${STORAGE_BASE}/visitatiestraat/03-afbraak-binnenplaats.webp`,
      `${STORAGE_BASE}/visitatiestraat/04-leidingwerk-muren.webp`,
    ],
    main: `${STORAGE_BASE}/visitatiestraat/02-funderingswerk-dpc.webp`,
  },
}

// ============================================================================
// SERVICE PAGE IMAGES
// ============================================================================
export const servicePageImages = {
  totaalrenovatie: {
    hero: projectImages.meulemanstraat.main,
    scope: projectImages.meulemanstraat.after[1],
    card: projectImages.meulemanstraat.main,
  },
  renovatie: {
    hero: projectImages.oostende.main,
    types: [
      projectImages.gavere.photos[0],
      projectImages.reginaldWarneford.photos[0],
      projectImages.visitatiestraat.photos[3],
      projectImages.oostende.photos[1],
    ],
    benefits: projectImages.oostende.photos[0],
    card: projectImages.oostende.main,
  },
  afwerking: {
    hero: projectImages.parijs.main,
    quality: projectImages.parijs.after[0],
    card: projectImages.parijs.main,
  },
  technieken: {
    hero: projectImages.oostende.photos[2],
    certifications: projectImages.visitatiestraat.photos[1],
    certBackground: projectImages.visitatiestraat.photos[1],
    card: projectImages.oostende.photos[2],
  },
}

// ============================================================================
// HOMEPAGE IMAGES
// ============================================================================
export const homepageImages = {
  hero: siteImages.heroHome,
  whyUs: siteImages.whyUsSection,
  ctaBackground: siteImages.ctaBackground,
  services: [
    servicePageImages.totaalrenovatie.card,
    servicePageImages.renovatie.card,
    servicePageImages.afwerking.card,
  ],
  projects: [
    projectImages.meulemanstraat.main,
    projectImages.reginaldWarneford.main,
    projectImages.parijs.main,
  ],
}

// ============================================================================
// WAARDEN (VALUES) PAGE IMAGES
// ============================================================================
export const waardenImages = {
  attestering: {
    hero: projectImages.meulemanstraat.after[2],
    whyImportant: projectImages.reginaldWarneford.photos[1],
  },
  betalingsspreiding: {
    hero: projectImages.meulemanstraat.after[1],
  },
  communicatie: {
    hero: projectImages.oostende.photos[1],
  },
  hergebruik: {
    hero: projectImages.gavere.photos[0],
    beforeAfter1: {
      before: projectImages.meulemanstraat.before[0],
      after: projectImages.meulemanstraat.main,
    },
    beforeAfter2: {
      before: projectImages.parijs.before[0],
      after: projectImages.parijs.after[0],
    },
    benefits: projectImages.meulemanstraat.after[2],
  },
  subsidies: {
    hero: projectImages.reginaldWarneford.photos[2],
  },
}

// ============================================================================
// AANPAK PAGE IMAGE
// ============================================================================
export const aanpakImages = {
  hero: projectImages.reginaldWarneford.photos[3],
}
