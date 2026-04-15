// All public Schema.org / JSON-LD building blocks. Each component returns a
// single <script type="application/ld+json"> tag. The schema object is built
// first and stringified once — never inject user-controlled HTML.

import type { Locale } from '@/i18n/routing';

type JsonLdScriptProps = { schema: Record<string, unknown> | Array<Record<string, unknown>> };

function JsonLdScript({ schema }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON.stringify output is safe for script[type=ld+json]
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// -----------------------------------------------------------------------------
// Organization
// -----------------------------------------------------------------------------

type CompanySettings = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  instagram?: string;
  whatsapp?: string;
};

type CompanyLegal = {
  legalName?: string;
  vatNumber?: string;
  enterpriseNumber?: string;
  foundedDate?: string;
  registeredSeat?: string;
};

function toSameAs(company: CompanySettings): string[] {
  return [company.instagram, company.whatsapp].filter((v): v is string => Boolean(v));
}

export function OrganizationJsonLd({
  company,
  legal,
  siteUrl,
}: {
  company: CompanySettings;
  legal: CompanyLegal;
  siteUrl: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: company.name ?? legal.legalName ?? 'Nam Construction',
    legalName: legal.legalName,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    email: company.email,
    telephone: company.phone,
    vatID: legal.vatNumber,
    foundingDate: legal.foundedDate,
    sameAs: toSameAs(company),
  };
  if (company.address || legal.registeredSeat) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: company.address ?? legal.registeredSeat,
      addressCountry: 'BE',
      addressLocality: 'Gent',
    };
  }
  return <JsonLdScript schema={schema} />;
}

// -----------------------------------------------------------------------------
// LocalBusiness (GeneralContractor)
// -----------------------------------------------------------------------------

export function LocalBusinessJsonLd({
  company,
  legal,
  siteUrl,
}: {
  company: CompanySettings;
  legal: CompanyLegal;
  siteUrl: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${siteUrl}#localbusiness`,
    name: company.name ?? legal.legalName ?? 'Nam Construction',
    url: siteUrl,
    image: `${siteUrl}/logo.svg`,
    telephone: company.phone,
    email: company.email,
    priceRange: '€€',
    areaServed: [
      { '@type': 'City', name: 'Gent' },
      { '@type': 'AdministrativeArea', name: 'Oost-Vlaanderen' },
    ],
    sameAs: toSameAs(company),
  };
  if (company.address || legal.registeredSeat) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: company.address ?? legal.registeredSeat,
      addressCountry: 'BE',
      addressLocality: 'Gent',
      postalCode: '9000',
    };
  }
  return <JsonLdScript schema={schema} />;
}

// -----------------------------------------------------------------------------
// BreadcrumbList
// -----------------------------------------------------------------------------

export type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbListJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLdScript schema={schema} />;
}

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

export function ServiceJsonLd({
  name,
  description,
  url,
  providerUrl,
  locale,
}: {
  name: string;
  description: string;
  url: string;
  providerUrl: string;
  locale: Locale;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    inLanguage: locale,
    areaServed: [
      { '@type': 'City', name: 'Gent' },
      { '@type': 'AdministrativeArea', name: 'Oost-Vlaanderen' },
    ],
    provider: {
      '@id': `${providerUrl}#localbusiness`,
    },
  };
  return <JsonLdScript schema={schema} />;
}

// -----------------------------------------------------------------------------
// FAQPage
// -----------------------------------------------------------------------------

export type FaqItem = { question: string; answer: string };

export function FaqPageJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return <JsonLdScript schema={schema} />;
}

// -----------------------------------------------------------------------------
// CreativeWork / Project detail
// -----------------------------------------------------------------------------

export function ProjectJsonLd({
  name,
  description,
  url,
  image,
  datePublished,
  location,
  providerUrl,
}: {
  name: string;
  description?: string;
  url: string;
  image?: string | null;
  datePublished?: string | number | null;
  location?: string | null;
  providerUrl: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    url,
    creator: { '@id': `${providerUrl}#organization` },
  };
  if (description) schema.description = description;
  if (image) schema.image = image;
  if (datePublished) schema.datePublished = String(datePublished);
  if (location) {
    schema.contentLocation = {
      '@type': 'Place',
      name: location,
    };
  }
  return <JsonLdScript schema={schema} />;
}
