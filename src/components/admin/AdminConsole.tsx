'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

type ModuleKey =
  | 'analytics'
  | 'quotes'
  | 'appointments'
  | 'content'
  | 'projects'
  | 'assets'
  | 'settings'
  | 'availability';

type AnalyticsOverview = {
  totals: {
    quotes: number;
    appointments: number;
  };
  quoteStatuses: Array<{ status: string; _count: number | { _all?: number } }>;
  appointmentStatuses: Array<{ status: string; _count: number | { _all?: number } }>;
};

type QuoteRecord = {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  adminNotes: string | null;
  createdAt: string;
};

type AppointmentRecord = {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  municipality: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  adminNotes: string | null;
  proposedDate: string | null;
  proposedTime: string | null;
  createdAt: string;
};

type ContentSchemaKey = 'hero' | 'feature-list' | 'content' | 'contact' | 'cta' | 'legal';

type ContentSection = {
  id: string | null;
  pageKey: string;
  sectionKey: string;
  locale: 'nl' | 'fr' | 'en';
  schemaKey: ContentSchemaKey;
  displayOrder: number;
  published: boolean;
  dataJson: Record<string, unknown>;
  hasStoredValue: boolean;
  isDefault: boolean;
  previewPath: string;
};

type ProjectTranslation = {
  locale: 'nl' | 'fr' | 'en';
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  challengeText?: string | null;
  approachText?: string | null;
  resultText?: string | null;
  projectType?: string | null;
  duration?: string | null;
  surface?: string | null;
  completionDate?: string | null;
};

type ProjectImage = {
  imageUrl: string;
  alt?: string | null;
  caption?: string | null;
  sortOrder: number;
  kind?: string | null;
};

type ProjectRecord = {
  id: string | null;
  slug: string;
  category: string;
  location: string;
  year: number;
  featured: boolean;
  isPublished: boolean;
  sortOrder: number;
  coverImageUrl?: string | null;
  translations: ProjectTranslation[];
  images: ProjectImage[];
  hasStoredValue: boolean;
};

type AssetRecord = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  bucket: string;
  path: string;
  url: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
};

type SettingRecord = {
  id: string | null;
  key: string;
  category: string;
  description?: string | null;
  valueJson: Record<string, unknown>;
  hasStoredValue: boolean;
  isKnownKey: boolean;
};

type AvailabilityRule = {
  id?: string;
  dayOfWeek: number;
  timeSlots: string[];
  isActive: boolean;
};

type AvailabilityException = {
  id: string;
  date: string;
  blockedTimes: string[];
  reason?: string | null;
};

type PageOption = {
  key: string;
  previewPath: string;
};

type AssetResponseMeta = {
  storageEnabled: boolean;
  uploadBucket: string;
};

const modules: Array<{ key: ModuleKey; label: string }> = [
  { key: 'analytics', label: 'Analytics' },
  { key: 'quotes', label: 'Offertes' },
  { key: 'appointments', label: 'Afspraken' },
  { key: 'content', label: 'Content' },
  { key: 'projects', label: 'Projecten' },
  { key: 'assets', label: 'Assets' },
  { key: 'settings', label: 'Instellingen' },
  { key: 'availability', label: 'Beschikbaarheid' },
];

const locales: Array<{ value: 'nl' | 'fr' | 'en'; label: string }> = [
  { value: 'nl', label: 'NL' },
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
];

const contentSchemaOptions: Array<{ value: ContentSchemaKey; label: string }> = [
  { value: 'hero', label: 'Hero' },
  { value: 'feature-list', label: 'Feature list' },
  { value: 'content', label: 'Content' },
  { value: 'contact', label: 'Contact' },
  { value: 'cta', label: 'CTA' },
  { value: 'legal', label: 'Legal' },
];

const quoteStatusOptions = ['NEW', 'CONTACTED', 'SITE_VISIT', 'QUOTE_SENT', 'NEGOTIATING', 'WON', 'LOST', 'CANCELLED'];
const appointmentStatusOptions = ['PENDING', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED', 'REJECTED', 'NO_SHOW'];
const weekdays = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

async function fetchJson<T>(input: string, init?: RequestInit) {
  const response = await fetch(input, {
    cache: 'no-store',
    ...init,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((payload as { error?: string }).error || 'Request failed');
  }

  return payload as T;
}

function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getSelectionKey(value: { id: string | null; pageKey?: string; locale?: string; sectionKey?: string; displayOrder?: number; slug?: string }) {
  if (value.id) {
    return value.id;
  }

  if (value.slug) {
    return `slug:${value.slug}`;
  }

  return `${value.pageKey}:${value.locale}:${value.sectionKey}:${value.displayOrder}`;
}

function ensureString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function ensureStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((entry) => String(entry ?? '')) : [];
}

function ensureItemArray(value: unknown) {
  return Array.isArray(value) ? value.map((entry) => (entry && typeof entry === 'object' ? { ...(entry as Record<string, unknown>) } : {})) : [];
}

function createEmptySectionData(schemaKey: ContentSchemaKey): Record<string, unknown> {
  switch (schemaKey) {
    case 'hero':
      return {
        eyebrow: '',
        title: '',
        description: '',
        primaryCtaLabel: '',
        primaryCtaHref: '',
        secondaryCtaLabel: '',
        secondaryCtaHref: '',
        image: '',
      };
    case 'feature-list':
      return {
        eyebrow: '',
        title: '',
        description: '',
        items: [],
      };
    case 'content':
      return {
        eyebrow: '',
        title: '',
        description: '',
        paragraphs: [],
        items: [],
      };
    case 'contact':
      return {
        eyebrow: '',
        title: '',
        description: '',
        highlights: [],
        primaryCtaLabel: '',
        primaryCtaHref: '',
      };
    case 'cta':
      return {
        title: '',
        description: '',
        primaryCtaLabel: '',
        primaryCtaHref: '',
      };
    case 'legal':
      return {
        updatedAt: '',
        introduction: '',
        sections: [],
      };
  }
}

function createNewSection(pageKey: string, locale: 'nl' | 'fr' | 'en', sections: ContentSection[]): ContentSection {
  const maxDisplayOrder = sections.length > 0 ? Math.max(...sections.map((section) => section.displayOrder)) : -1;

  return {
    id: null,
    pageKey,
    sectionKey: `section-${Date.now()}`,
    locale,
    schemaKey: 'content',
    displayOrder: maxDisplayOrder + 1,
    published: true,
    dataJson: createEmptySectionData('content'),
    hasStoredValue: false,
    isDefault: false,
    previewPath: '',
  };
}

function createEmptyProject(sortOrder: number): ProjectRecord {
  return {
    id: null,
    slug: `nieuw-project-${Date.now()}`,
    category: '',
    location: '',
    year: new Date().getFullYear(),
    featured: false,
    isPublished: true,
    sortOrder,
    coverImageUrl: '',
    translations: locales.map((locale) => ({
      locale: locale.value,
      title: '',
      shortDescription: '',
      description: '',
      challengeText: '',
      approachText: '',
      resultText: '',
      projectType: '',
      duration: '',
      surface: '',
      completionDate: '',
    })),
    images: [],
    hasStoredValue: false,
  };
}

function buildPreviewUrl(locale: string, previewPath: string) {
  const path = previewPath || '';
  return path ? `/${locale}${path}` : `/${locale}`;
}

function parseTags(value: string) {
  return value.split(',').map((tag) => tag.trim()).filter(Boolean);
}

function formatDate(value?: string | null) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleDateString('nl-BE');
}

function getStatusCountValue(value: number | { _all?: number }) {
  if (typeof value === 'number') {
    return value;
  }

  return value?._all ?? 0;
}

export default function AdminConsole({ adminName }: { adminName: string }) {
  const [activeModule, setActiveModule] = useState<ModuleKey>('analytics');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [contentPages, setContentPages] = useState<PageOption[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [projectCategories, setProjectCategories] = useState<string[]>([]);
  const [assets, setAssets] = useState<AssetRecord[]>([]);
  const [assetMeta, setAssetMeta] = useState<AssetResponseMeta>({
    storageEnabled: false,
    uploadBucket: 'project-photos',
  });
  const [settings, setSettings] = useState<SettingRecord[]>([]);
  const [availabilityRules, setAvailabilityRules] = useState<AvailabilityRule[]>([]);
  const [availabilityExceptions, setAvailabilityExceptions] = useState<AvailabilityException[]>([]);

  const counts = useMemo(
    () => ({
      quotes: quotes.length,
      appointments: appointments.length,
    }),
    [appointments.length, quotes.length],
  );

  async function loadAnalytics() {
    const payload = await fetchJson<AnalyticsOverview>('/api/admin/analytics/overview');
    setAnalytics(payload);
  }

  async function loadQuotes() {
    const payload = await fetchJson<{ quotes: QuoteRecord[] }>('/api/admin/quotes');
    setQuotes(payload.quotes);
  }

  async function loadAppointments() {
    const payload = await fetchJson<{ appointments: AppointmentRecord[] }>('/api/admin/appointments');
    setAppointments(payload.appointments);
  }

  async function loadContent() {
    const payload = await fetchJson<{ sections: ContentSection[]; pages: PageOption[] }>('/api/admin/content');
    setContentSections(payload.sections);
    setContentPages(payload.pages);
  }

  async function loadProjects() {
    const payload = await fetchJson<{ projects: ProjectRecord[]; categories: string[] }>('/api/admin/projects');
    setProjects(payload.projects);
    setProjectCategories(payload.categories);
  }

  async function loadAssets() {
    const payload = await fetchJson<{ assets: AssetRecord[]; storageEnabled: boolean; uploadBucket: string }>('/api/admin/assets');
    setAssets(payload.assets);
    setAssetMeta({
      storageEnabled: payload.storageEnabled,
      uploadBucket: payload.uploadBucket,
    });
  }

  async function loadSettings() {
    const payload = await fetchJson<{ settings: SettingRecord[] }>('/api/admin/settings');
    setSettings(payload.settings);
  }

  async function loadAvailability() {
    const payload = await fetchJson<{ rules: AvailabilityRule[]; exceptions: AvailabilityException[] }>('/api/admin/availability');
    setAvailabilityRules(payload.rules);
    setAvailabilityExceptions(payload.exceptions.map((exception) => ({
      ...exception,
      date: exception.date.slice(0, 10),
    })));
  }

  useEffect(() => {
    async function bootstrapAdmin() {
      setLoading(true);
      setError(null);

      try {
        await Promise.all([
          loadAnalytics(),
          loadQuotes(),
          loadAppointments(),
          loadContent(),
          loadProjects(),
          loadAssets(),
          loadSettings(),
          loadAvailability(),
        ]);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Admin laden mislukt');
      } finally {
        setLoading(false);
      }
    }

    void bootstrapAdmin();
  }, []);

  async function saveQuote(quoteId: string, status: string, adminNotes: string) {
    const payload = await fetchJson<{ quote: QuoteRecord }>(`/api/admin/quotes/${quoteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });

    setQuotes((current) => current.map((quote) => (quote.id === payload.quote.id ? payload.quote : quote)));
    await loadAnalytics();
  }

  async function deleteQuote(quoteId: string) {
    await fetchJson(`/api/admin/quotes/${quoteId}`, { method: 'DELETE' });
    setQuotes((current) => current.filter((quote) => quote.id !== quoteId));
    await loadAnalytics();
  }

  async function saveAppointment(appointmentId: string, payload: {
    status: string;
    adminNotes: string;
    proposedDate?: string | null;
    proposedTime?: string | null;
  }) {
    const response = await fetchJson<{ appointment: AppointmentRecord }>(`/api/admin/appointments/${appointmentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setAppointments((current) => current.map((appointment) => (
      appointment.id === response.appointment.id ? response.appointment : appointment
    )));
    await loadAnalytics();
  }

  async function deleteAppointment(appointmentId: string) {
    await fetchJson(`/api/admin/appointments/${appointmentId}`, { method: 'DELETE' });
    setAppointments((current) => current.filter((appointment) => appointment.id !== appointmentId));
    await loadAnalytics();
  }

  async function saveContentSection(section: ContentSection) {
    const response = await fetchJson<{ section: ContentSection }>(
      section.id ? `/api/admin/content/${section.id}` : '/api/admin/content',
      {
        method: section.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section.id ? {
          displayOrder: section.displayOrder,
          published: section.published,
          dataJson: section.dataJson,
        } : {
          pageKey: section.pageKey,
          sectionKey: section.sectionKey,
          locale: section.locale,
          schemaKey: section.schemaKey,
          displayOrder: section.displayOrder,
          published: section.published,
          dataJson: section.dataJson,
        }),
      },
    );

    await loadContent();
    return response.section;
  }

  async function removeContentSection(section: ContentSection) {
    if (!section.id) {
      return;
    }

    await fetchJson(`/api/admin/content/${section.id}`, { method: 'DELETE' });
    await loadContent();
  }

  async function saveProject(project: ProjectRecord) {
    const payload = {
      slug: project.slug,
      category: project.category,
      location: project.location,
      year: project.year,
      featured: project.featured,
      isPublished: project.isPublished,
      sortOrder: project.sortOrder,
      coverImageUrl: project.coverImageUrl || null,
      translations: project.translations,
      images: project.images,
    };

    const response = await fetchJson<{ project: ProjectRecord }>(
      project.id ? `/api/admin/projects/${project.id}` : '/api/admin/projects',
      {
        method: project.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    await loadProjects();
    return response.project;
  }

  async function removeProject(project: ProjectRecord) {
    if (!project.id) {
      return;
    }

    await fetchJson(`/api/admin/projects/${project.id}`, { method: 'DELETE' });
    await loadProjects();
  }

  async function saveAllSettings(nextSettings: SettingRecord[]) {
    const knownSettings = nextSettings.filter((setting) => setting.isKnownKey);

    await Promise.all(knownSettings.map((setting) => (
      fetchJson(`/api/admin/settings/${setting.key}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: setting.category,
          description: setting.description ?? null,
          valueJson: setting.valueJson,
        }),
      })
    )));

    await loadSettings();
  }

  async function saveAvailability(nextRules: AvailabilityRule[]) {
    await Promise.all(nextRules.map((rule) => (
      fetchJson(`/api/admin/availability/rules/${rule.dayOfWeek}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      })
    )));

    await loadAvailability();
  }

  async function createAvailabilityException(exception: Omit<AvailabilityException, 'id'>) {
    await fetchJson('/api/admin/availability/exceptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exception),
    });

    await loadAvailability();
  }

  async function updateAvailabilityException(exception: AvailabilityException) {
    await fetchJson(`/api/admin/availability/exceptions/${exception.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: exception.date,
        blockedTimes: exception.blockedTimes,
        reason: exception.reason ?? null,
      }),
    });

    await loadAvailability();
  }

  async function deleteAvailabilityException(exceptionId: string) {
    await fetchJson(`/api/admin/availability/exceptions/${exceptionId}`, {
      method: 'DELETE',
    });

    await loadAvailability();
  }

  async function uploadAsset(file: File, alt: string, tags: string[]) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', alt);
    formData.append('tags', tags.join(','));
    formData.append('bucket', assetMeta.uploadBucket);

    const response = await fetchJson<{ asset: AssetRecord }>('/api/admin/assets/upload', {
      method: 'POST',
      body: formData,
    });

    await loadAssets();
    return response.asset;
  }

  async function saveAsset(asset: AssetRecord) {
    await fetchJson(`/api/admin/assets/${asset.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: asset.filename,
        originalName: asset.originalName,
        mimeType: asset.mimeType,
        size: asset.size,
        bucket: asset.bucket,
        path: asset.path,
        url: asset.url,
        alt: asset.alt ?? null,
        width: asset.width ?? null,
        height: asset.height ?? null,
        tags: asset.tags,
      }),
    });

    await loadAssets();
  }

  async function createAssetFromUrl(asset: Omit<AssetRecord, 'id'>) {
    await fetchJson('/api/admin/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(asset),
    });

    await loadAssets();
  }

  async function removeAsset(assetId: string) {
    await fetchJson(`/api/admin/assets/${assetId}`, { method: 'DELETE' });
    await loadAssets();
  }

  async function signOut() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    window.location.href = '/admin/login';
  }

  return (
    <div className="min-h-screen bg-noir-50">
      <div className="border-b border-noir-200 bg-white">
        <div className="container-wide flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-noir-900">Admin console</h1>
            <p className="text-sm text-noir-600">
              Ingelogd als {adminName}. Deze backoffice gebruikt typed editors en item-level admin-contracten.
            </p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300 hover:text-noir-900"
          >
            Uitloggen
          </button>
        </div>
      </div>

      <div className="container-wide grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-3xl border border-noir-200 bg-white p-4 shadow-soft">
          <div className="grid gap-2">
            {modules.map((module) => (
              <button
                key={module.key}
                type="button"
                onClick={() => setActiveModule(module.key)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeModule === module.key ? 'bg-accent-600 text-white' : 'text-noir-700 hover:bg-noir-100'
                }`}
              >
                {module.label}
                {module.key === 'quotes' ? <span className="ml-2 text-xs opacity-75">({counts.quotes})</span> : null}
                {module.key === 'appointments' ? <span className="ml-2 text-xs opacity-75">({counts.appointments})</span> : null}
              </button>
            ))}
          </div>
        </aside>

        <main className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft lg:p-8">
          {error ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

          {loading ? (
            <div className="grid gap-4">
              <div className="h-24 animate-pulse rounded-3xl bg-noir-100" />
              <div className="h-72 animate-pulse rounded-3xl bg-noir-100" />
            </div>
          ) : null}

          {!loading && activeModule === 'analytics' && analytics ? (
            <AnalyticsPanel analytics={analytics} />
          ) : null}

          {!loading && activeModule === 'quotes' ? (
            <LeadModule
              title="Offertes"
              items={quotes}
              statusOptions={quoteStatusOptions}
              onSave={(item) => saveQuote(item.id, item.status, item.adminNotes ?? '')}
              onDelete={(item) => deleteQuote(item.id)}
              getSubtitle={(item) => `${item.fullName} · ${item.email} · ${formatDate(item.createdAt)}`}
            />
          ) : null}

          {!loading && activeModule === 'appointments' ? (
            <AppointmentModule
              appointments={appointments}
              onSave={saveAppointment}
              onDelete={(appointment) => deleteAppointment(appointment.id)}
            />
          ) : null}

          {!loading && activeModule === 'content' ? (
            <ContentModule
              sections={contentSections}
              pages={contentPages}
              assets={assets}
              onSave={saveContentSection}
              onDelete={removeContentSection}
            />
          ) : null}

          {!loading && activeModule === 'projects' ? (
            <ProjectsModule
              projects={projects}
              categories={projectCategories}
              assets={assets}
              onSave={saveProject}
              onDelete={removeProject}
            />
          ) : null}

          {!loading && activeModule === 'assets' ? (
            <AssetsModule
              assets={assets}
              storageEnabled={assetMeta.storageEnabled}
              onUpload={uploadAsset}
              onSave={saveAsset}
              onCreateFromUrl={createAssetFromUrl}
              onDelete={removeAsset}
            />
          ) : null}

          {!loading && activeModule === 'settings' ? (
            <SettingsModule
              settings={settings}
              onSave={saveAllSettings}
            />
          ) : null}

          {!loading && activeModule === 'availability' ? (
            <AvailabilityModule
              rules={availabilityRules}
              exceptions={availabilityExceptions}
              onSaveRules={saveAvailability}
              onCreateException={createAvailabilityException}
              onUpdateException={updateAvailabilityException}
              onDeleteException={deleteAvailabilityException}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

function AnalyticsPanel({ analytics }: { analytics: AnalyticsOverview }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard label="Offertes" value={analytics.totals.quotes} />
        <StatCard label="Afspraken" value={analytics.totals.appointments} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <StatusList title="Quote statussen" items={analytics.quoteStatuses} />
        <StatusList title="Afspraak statussen" items={analytics.appointmentStatuses} />
      </div>
    </div>
  );
}

function LeadModule<T extends QuoteRecord>({
  title,
  items,
  statusOptions,
  onSave,
  onDelete,
  getSubtitle,
}: {
  title: string;
  items: T[];
  statusOptions: string[];
  onSave: (item: T) => Promise<void>;
  onDelete: (item: T) => Promise<void>;
  getSubtitle: (item: T) => string;
}) {
  return (
    <div className="grid gap-4">
      <SectionHeader title={title} description={`${items.length} records`} />
      {items.map((item) => (
        <LeadCard
          key={`${item.id}:${item.status}:${item.adminNotes ?? ''}`}
          title={item.referenceNumber}
          subtitle={getSubtitle(item)}
          currentStatus={item.status}
          note={item.adminNotes ?? ''}
          statusOptions={statusOptions}
          onSave={(status, note) => onSave({ ...item, status, adminNotes: note } as T)}
          onDelete={() => onDelete(item)}
        />
      ))}
      {items.length === 0 ? <EmptyState label="Nog geen items beschikbaar." /> : null}
    </div>
  );
}

function AppointmentModule({
  appointments,
  onSave,
  onDelete,
}: {
  appointments: AppointmentRecord[];
  onSave: (appointmentId: string, payload: {
    status: string;
    adminNotes: string;
    proposedDate?: string | null;
    proposedTime?: string | null;
  }) => Promise<void>;
  onDelete: (appointment: AppointmentRecord) => Promise<void>;
}) {
  return (
    <div className="grid gap-4">
      <SectionHeader title="Afspraken" description={`${appointments.length} records`} />
      {appointments.map((appointment) => (
        <AppointmentCard
          key={`${appointment.id}:${appointment.status}:${appointment.adminNotes ?? ''}:${appointment.proposedDate ?? ''}:${appointment.proposedTime ?? ''}`}
          appointment={appointment}
          onSave={onSave}
          onDelete={() => onDelete(appointment)}
        />
      ))}
      {appointments.length === 0 ? <EmptyState label="Nog geen afspraken beschikbaar." /> : null}
    </div>
  );
}

function ContentModule({
  sections,
  pages,
  assets,
  onSave,
  onDelete,
}: {
  sections: ContentSection[];
  pages: PageOption[];
  assets: AssetRecord[];
  onSave: (section: ContentSection) => Promise<ContentSection>;
  onDelete: (section: ContentSection) => Promise<void>;
}) {
  const [pageKey, setPageKey] = useState(pages[0]?.key ?? 'home');
  const [locale, setLocale] = useState<'nl' | 'fr' | 'en'>('nl');
  const [selectionKey, setSelectionKey] = useState<string | null>(null);
  const [draft, setDraft] = useState<ContentSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [assetPicker, setAssetPicker] = useState<null | { title: string; onSelect: (url: string) => void }>(null);

  const filteredSections = useMemo(
    () => sections.filter((section) => section.pageKey === pageKey && section.locale === locale)
      .sort((left, right) => left.displayOrder - right.displayOrder),
    [locale, pageKey, sections],
  );

  useEffect(() => {
    if (pages.length > 0 && !pages.some((page) => page.key === pageKey)) {
      setPageKey(pages[0].key);
    }
  }, [pageKey, pages]);

  useEffect(() => {
    if (filteredSections.length === 0) {
      setSelectionKey(null);
      setDraft(createNewSection(pageKey, locale, filteredSections));
      return;
    }

    if (selectionKey?.startsWith('new:')) {
      return;
    }

    if (!selectionKey || !filteredSections.some((section) => getSelectionKey(section) === selectionKey)) {
      setSelectionKey(getSelectionKey(filteredSections[0]));
      return;
    }

    const selected = filteredSections.find((section) => getSelectionKey(section) === selectionKey);
    if (selected) {
      setDraft(deepCopy(selected));
    }
  }, [filteredSections, locale, pageKey, selectionKey]);

  const selectedSection = filteredSections.find((section) => getSelectionKey(section) === selectionKey) ?? null;

  async function handleSave() {
    if (!draft) {
      return;
    }

    setSaving(true);
    try {
      const saved = await onSave(draft);
      setSelectionKey(saved.id ?? getSelectionKey(draft));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedSection?.id) {
      return;
    }

    if (!window.confirm('Deze opgeslagen override verwijderen? Bij default-secties valt de site dan terug op de standaardcontent.')) {
      return;
    }

    await onDelete(selectedSection);
  }

  function updateDraftField(key: string, value: unknown) {
    setDraft((current) => current ? { ...current, dataJson: { ...current.dataJson, [key]: value } } : current);
  }

  function renderSchemaEditor() {
    if (!draft) {
      return null;
    }

    switch (draft.schemaKey) {
      case 'hero':
        return (
          <>
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={4} />
            <div className="grid gap-4 md:grid-cols-2">
              <LabeledInput label="Primary CTA label" value={ensureString(draft.dataJson.primaryCtaLabel)} onChange={(value) => updateDraftField('primaryCtaLabel', value)} />
              <LabeledInput label="Primary CTA href" value={ensureString(draft.dataJson.primaryCtaHref)} onChange={(value) => updateDraftField('primaryCtaHref', value)} />
              <LabeledInput label="Secondary CTA label" value={ensureString(draft.dataJson.secondaryCtaLabel)} onChange={(value) => updateDraftField('secondaryCtaLabel', value)} />
              <LabeledInput label="Secondary CTA href" value={ensureString(draft.dataJson.secondaryCtaHref)} onChange={(value) => updateDraftField('secondaryCtaHref', value)} />
            </div>
            <ImageUrlInput
              label="Hero image"
              value={ensureString(draft.dataJson.image)}
              onChange={(value) => updateDraftField('image', value)}
              onPickAsset={() => setAssetPicker({
                title: 'Kies hero image',
                onSelect: (url) => updateDraftField('image', url),
              })}
            />
          </>
        );
      case 'feature-list':
        return (
          <>
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
            <ItemListEditor
              label="Items"
              items={ensureItemArray(draft.dataJson.items)}
              onChange={(items) => updateDraftField('items', items)}
              fields={[
                { key: 'title', label: 'Titel' },
                { key: 'description', label: 'Beschrijving', multiline: true },
                { key: 'href', label: 'Href' },
                { key: 'ctaLabel', label: 'CTA label' },
              ]}
            />
          </>
        );
      case 'content':
        return (
          <>
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
            <TextListEditor
              label="Paragrafen"
              items={ensureStringArray(draft.dataJson.paragraphs)}
              onChange={(items) => updateDraftField('paragraphs', items)}
            />
            <ItemListEditor
              label="Detail cards"
              items={ensureItemArray(draft.dataJson.items)}
              onChange={(items) => updateDraftField('items', items)}
              fields={[
                { key: 'title', label: 'Titel' },
                { key: 'description', label: 'Beschrijving', multiline: true },
              ]}
            />
          </>
        );
      case 'contact':
        return (
          <>
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
            <TextListEditor
              label="Highlights"
              items={ensureStringArray(draft.dataJson.highlights)}
              onChange={(items) => updateDraftField('highlights', items)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <LabeledInput label="CTA label" value={ensureString(draft.dataJson.primaryCtaLabel)} onChange={(value) => updateDraftField('primaryCtaLabel', value)} />
              <LabeledInput label="CTA href" value={ensureString(draft.dataJson.primaryCtaHref)} onChange={(value) => updateDraftField('primaryCtaHref', value)} />
            </div>
          </>
        );
      case 'cta':
        return (
          <>
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
            <div className="grid gap-4 md:grid-cols-2">
              <LabeledInput label="CTA label" value={ensureString(draft.dataJson.primaryCtaLabel)} onChange={(value) => updateDraftField('primaryCtaLabel', value)} />
              <LabeledInput label="CTA href" value={ensureString(draft.dataJson.primaryCtaHref)} onChange={(value) => updateDraftField('primaryCtaHref', value)} />
            </div>
          </>
        );
      case 'legal':
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <LabeledInput label="Updated at" value={ensureString(draft.dataJson.updatedAt)} onChange={(value) => updateDraftField('updatedAt', value)} />
            </div>
            <LabeledTextarea label="Introductie" value={ensureString(draft.dataJson.introduction)} onChange={(value) => updateDraftField('introduction', value)} rows={4} />
            <ItemListEditor
              label="Legal secties"
              items={ensureItemArray(draft.dataJson.sections)}
              onChange={(items) => updateDraftField('sections', items)}
              fields={[
                { key: 'title', label: 'Titel' },
                { key: 'body', label: 'Body', multiline: true },
                { key: 'items', label: 'Items (1 per regel)', multiline: true, isStringList: true },
              ]}
            />
          </>
        );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div className="grid gap-4">
        <SectionHeader title="Content" description="Gestructureerde page sections per pagina en taal." />
        <div className="rounded-3xl border border-noir-200 bg-noir-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-noir-500">Pagina</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pages.map((page) => (
              <button
                key={page.key}
                type="button"
                onClick={() => setPageKey(page.key)}
                className={`rounded-full px-3 py-2 text-sm ${pageKey === page.key ? 'bg-accent-600 text-white' : 'bg-white text-noir-700'}`}
              >
                {page.key}
              </button>
            ))}
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-noir-500">Taal</p>
          <div className="mt-3 flex gap-2">
            {locales.map((entry) => (
              <button
                key={entry.value}
                type="button"
                onClick={() => setLocale(entry.value)}
                className={`rounded-full px-3 py-2 text-sm ${locale === entry.value ? 'bg-accent-600 text-white' : 'bg-white text-noir-700'}`}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const created = createNewSection(pageKey, locale, filteredSections);
              setDraft(created);
              setSelectionKey(`new:${Date.now()}`);
            }}
            className="mt-5 w-full rounded-full border border-noir-200 px-4 py-3 text-sm font-medium text-noir-700 transition hover:border-noir-300"
          >
            Nieuwe sectie
          </button>
        </div>

        <div className="grid gap-3">
          {filteredSections.map((section) => (
            <button
              key={getSelectionKey(section)}
              type="button"
              onClick={() => setSelectionKey(getSelectionKey(section))}
              className={`rounded-3xl border p-4 text-left transition ${
                selectionKey === getSelectionKey(section)
                  ? 'border-accent-600 bg-accent-50'
                  : 'border-noir-200 bg-white hover:border-noir-300'
              }`}
            >
              <p className="text-sm font-semibold text-noir-900">{section.sectionKey}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-noir-500">
                {section.schemaKey} · order {section.displayOrder}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-noir-500">
                <span className={`rounded-full px-2 py-1 ${section.published ? 'bg-green-50 text-green-700' : 'bg-noir-100 text-noir-600'}`}>
                  {section.published ? 'Published' : 'Hidden'}
                </span>
                <span className="rounded-full bg-noir-100 px-2 py-1">
                  {section.hasStoredValue ? 'Stored' : 'Default'}
                </span>
              </div>
            </button>
          ))}
          {filteredSections.length === 0 ? <EmptyState label="Nog geen secties voor deze pagina/taal." compact /> : null}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-noir-900">
              {draft ? `${draft.pageKey} / ${draft.locale} / ${draft.sectionKey}` : 'Selecteer een sectie'}
            </h2>
            {draft ? (
              <a
                href={buildPreviewUrl(draft.locale, draft.previewPath)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-sm font-semibold text-accent-700 transition hover:text-accent-900"
              >
                Open preview
              </a>
            ) : null}
          </div>
          <div className="flex gap-3">
            {selectedSection?.id ? (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
              >
                Reset/delete override
              </button>
            ) : null}
            <button
              type="button"
              disabled={!draft || saving}
              onClick={() => {
                void handleSave();
              }}
              className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
            >
              {saving ? 'Opslaan...' : 'Opslaan'}
            </button>
          </div>
        </div>

        {draft ? (
          <div className="grid gap-4 rounded-3xl border border-noir-200 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <LabeledInput label="Section key" value={draft.sectionKey} onChange={(value) => setDraft((current) => current ? { ...current, sectionKey: value } : current)} />
              <LabeledSelect
                label="Schema"
                value={draft.schemaKey}
                options={contentSchemaOptions}
                onChange={(value) => setDraft((current) => current ? {
                  ...current,
                  schemaKey: value as ContentSchemaKey,
                  dataJson: createEmptySectionData(value as ContentSchemaKey),
                } : current)}
              />
              <LabeledInput
                label="Display order"
                value={String(draft.displayOrder)}
                onChange={(value) => setDraft((current) => current ? { ...current, displayOrder: Number.parseInt(value || '0', 10) || 0 } : current)}
                inputMode="numeric"
              />
              <ToggleField
                label="Published"
                checked={draft.published}
                onChange={(checked) => setDraft((current) => current ? { ...current, published: checked } : current)}
              />
            </div>
            {renderSchemaEditor()}
          </div>
        ) : <EmptyState label="Selecteer of maak een sectie om te bewerken." />}
      </div>

      {assetPicker ? (
        <AssetPickerModal
          title={assetPicker.title}
          assets={assets}
          onClose={() => setAssetPicker(null)}
          onSelect={(asset) => {
            assetPicker.onSelect(asset.url);
            setAssetPicker(null);
          }}
        />
      ) : null}
    </div>
  );
}

function ProjectsModule({
  projects,
  categories,
  assets,
  onSave,
  onDelete,
}: {
  projects: ProjectRecord[];
  categories: string[];
  assets: AssetRecord[];
  onSave: (project: ProjectRecord) => Promise<ProjectRecord>;
  onDelete: (project: ProjectRecord) => Promise<void>;
}) {
  const [selectionKey, setSelectionKey] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProjectRecord | null>(null);
  const [translationLocale, setTranslationLocale] = useState<'nl' | 'fr' | 'en'>('nl');
  const [saving, setSaving] = useState(false);
  const [assetPicker, setAssetPicker] = useState<null | { title: string; onSelect: (url: string) => void }>(null);

  useEffect(() => {
    if (projects.length === 0) {
      const created = createEmptyProject(0);
      setDraft(created);
      setSelectionKey(getSelectionKey(created));
      return;
    }

    if (selectionKey?.startsWith('new:')) {
      return;
    }

    if (!selectionKey || !projects.some((project) => getSelectionKey(project) === selectionKey)) {
      setSelectionKey(getSelectionKey(projects[0]));
      return;
    }

    const selected = projects.find((project) => getSelectionKey(project) === selectionKey);
    if (selected) {
      setDraft(deepCopy(selected));
    }
  }, [projects, selectionKey]);

  const selectedProject = projects.find((project) => getSelectionKey(project) === selectionKey) ?? null;
  const activeTranslation = draft?.translations.find((translation) => translation.locale === translationLocale) ?? null;

  async function handleSave() {
    if (!draft) {
      return;
    }

    setSaving(true);
    try {
      const saved = await onSave(draft);
      setSelectionKey(saved.id ?? getSelectionKey(saved));
    } finally {
      setSaving(false);
    }
  }

  function updateTranslation(key: keyof ProjectTranslation, value: string) {
    setDraft((current) => current ? {
      ...current,
      translations: current.translations.map((translation) => (
        translation.locale === translationLocale ? { ...translation, [key]: value } : translation
      )),
    } : current);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="grid gap-4">
        <SectionHeader title="Projecten" description="CRUD voor projecten, vertalingen en galerijen." />
        <button
          type="button"
          onClick={() => {
            const sortOrder = projects.length > 0 ? Math.max(...projects.map((project) => project.sortOrder)) + 1 : 0;
            const created = createEmptyProject(sortOrder);
            setDraft(created);
            setSelectionKey(`new:${Date.now()}`);
            setTranslationLocale('nl');
          }}
          className="rounded-full border border-noir-200 px-4 py-3 text-sm font-medium text-noir-700 transition hover:border-noir-300"
        >
          Nieuw project
        </button>
        <div className="grid gap-3">
          {projects
            .slice()
            .sort((left, right) => left.sortOrder - right.sortOrder)
            .map((project) => (
              <button
                key={getSelectionKey(project)}
                type="button"
                onClick={() => setSelectionKey(getSelectionKey(project))}
                className={`rounded-3xl border p-4 text-left transition ${
                  selectionKey === getSelectionKey(project)
                    ? 'border-accent-600 bg-accent-50'
                    : 'border-noir-200 bg-white hover:border-noir-300'
                }`}
              >
                <p className="text-sm font-semibold text-noir-900">{project.translations.find((translation) => translation.locale === 'nl')?.title || project.slug}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-noir-500">
                  {project.category || 'Geen categorie'} · {project.sortOrder}
                </p>
                <div className="mt-3 flex gap-2 text-xs">
                  <span className={`rounded-full px-2 py-1 ${project.isPublished ? 'bg-green-50 text-green-700' : 'bg-noir-100 text-noir-600'}`}>
                    {project.isPublished ? 'Published' : 'Hidden'}
                  </span>
                  {project.featured ? <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">Featured</span> : null}
                  <span className="rounded-full bg-noir-100 px-2 py-1 text-noir-600">
                    {project.hasStoredValue ? 'Stored' : 'Default'}
                  </span>
                </div>
              </button>
            ))}
          {projects.length === 0 ? <EmptyState label="Nog geen projecten gevonden." compact /> : null}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-noir-900">{draft ? draft.slug : 'Selecteer een project'}</h2>
            <p className="mt-2 text-sm text-noir-500">Cover, vertalingen en gallery-afbeeldingen blijven URL-based.</p>
          </div>
          <div className="flex gap-3">
            {selectedProject?.id ? (
              <button
                type="button"
                onClick={() => {
                  if (selectedProject && window.confirm('Dit project verwijderen?')) {
                    void onDelete(selectedProject);
                  }
                }}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
              >
                Verwijderen
              </button>
            ) : null}
            <button
              type="button"
              disabled={!draft || saving}
              onClick={() => {
                void handleSave();
              }}
              className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
            >
              {saving ? 'Opslaan...' : 'Opslaan'}
            </button>
          </div>
        </div>

        {draft ? (
          <div className="grid gap-6 rounded-3xl border border-noir-200 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <LabeledInput label="Slug" value={draft.slug} onChange={(value) => setDraft((current) => current ? { ...current, slug: value } : current)} />
              <LabeledInput label="Categorie" value={draft.category} onChange={(value) => setDraft((current) => current ? { ...current, category: value } : current)} datalistId="project-categories" />
              <datalist id="project-categories">
                {categories.map((category) => <option key={category} value={category} />)}
              </datalist>
              <LabeledInput label="Locatie" value={draft.location} onChange={(value) => setDraft((current) => current ? { ...current, location: value } : current)} />
              <LabeledInput label="Jaar" value={String(draft.year)} onChange={(value) => setDraft((current) => current ? { ...current, year: Number.parseInt(value || '0', 10) || new Date().getFullYear() } : current)} inputMode="numeric" />
              <LabeledInput label="Sort order" value={String(draft.sortOrder)} onChange={(value) => setDraft((current) => current ? { ...current, sortOrder: Number.parseInt(value || '0', 10) || 0 } : current)} inputMode="numeric" />
              <ToggleField label="Published" checked={draft.isPublished} onChange={(checked) => setDraft((current) => current ? { ...current, isPublished: checked } : current)} />
              <ToggleField label="Featured" checked={draft.featured} onChange={(checked) => setDraft((current) => current ? { ...current, featured: checked } : current)} />
            </div>

            <ImageUrlInput
              label="Cover image URL"
              value={draft.coverImageUrl || ''}
              onChange={(value) => setDraft((current) => current ? { ...current, coverImageUrl: value } : current)}
              onPickAsset={() => setAssetPicker({
                title: 'Kies cover image',
                onSelect: (url) => setDraft((current) => current ? { ...current, coverImageUrl: url } : current),
              })}
            />

            <div className="rounded-3xl border border-noir-200 p-4">
              <div className="flex flex-wrap gap-2">
                {locales.map((entry) => (
                  <button
                    key={entry.value}
                    type="button"
                    onClick={() => setTranslationLocale(entry.value)}
                    className={`rounded-full px-3 py-2 text-sm ${translationLocale === entry.value ? 'bg-accent-600 text-white' : 'bg-noir-50 text-noir-700'}`}
                  >
                    {entry.label}
                  </button>
                ))}
              </div>

              {activeTranslation ? (
                <div className="mt-4 grid gap-4">
                  <LabeledInput label="Titel" value={activeTranslation.title} onChange={(value) => updateTranslation('title', value)} />
                  <LabeledTextarea label="Korte beschrijving" value={activeTranslation.shortDescription ?? ''} onChange={(value) => updateTranslation('shortDescription', value)} rows={3} />
                  <LabeledTextarea label="Beschrijving" value={activeTranslation.description ?? ''} onChange={(value) => updateTranslation('description', value)} rows={5} />
                  <LabeledTextarea label="Challenge" value={activeTranslation.challengeText ?? ''} onChange={(value) => updateTranslation('challengeText', value)} rows={4} />
                  <LabeledTextarea label="Approach" value={activeTranslation.approachText ?? ''} onChange={(value) => updateTranslation('approachText', value)} rows={4} />
                  <LabeledTextarea label="Result" value={activeTranslation.resultText ?? ''} onChange={(value) => updateTranslation('resultText', value)} rows={4} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <LabeledInput label="Project type" value={activeTranslation.projectType ?? ''} onChange={(value) => updateTranslation('projectType', value)} />
                    <LabeledInput label="Duration" value={activeTranslation.duration ?? ''} onChange={(value) => updateTranslation('duration', value)} />
                    <LabeledInput label="Surface" value={activeTranslation.surface ?? ''} onChange={(value) => updateTranslation('surface', value)} />
                    <LabeledInput label="Completion date" value={activeTranslation.completionDate ?? ''} onChange={(value) => updateTranslation('completionDate', value)} />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-noir-900">Gallery</h3>
                <button
                  type="button"
                  onClick={() => setDraft((current) => current ? {
                    ...current,
                    images: [...current.images, { imageUrl: '', alt: '', caption: '', sortOrder: current.images.length, kind: 'gallery' }],
                  } : current)}
                  className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300"
                >
                  Afbeelding toevoegen
                </button>
              </div>
              {draft.images.map((image, index) => (
                <div key={`${image.imageUrl}-${index}`} className="rounded-3xl border border-noir-200 p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <ImageUrlInput
                      label="Image URL"
                      value={image.imageUrl}
                      onChange={(value) => setDraft((current) => current ? {
                        ...current,
                        images: current.images.map((entry, entryIndex) => entryIndex === index ? { ...entry, imageUrl: value } : entry),
                      } : current)}
                      onPickAsset={() => setAssetPicker({
                        title: 'Kies gallery image',
                        onSelect: (url) => setDraft((current) => current ? {
                          ...current,
                          images: current.images.map((entry, entryIndex) => entryIndex === index ? { ...entry, imageUrl: url } : entry),
                        } : current),
                      })}
                    />
                    <LabeledInput
                      label="Sort order"
                      value={String(image.sortOrder)}
                      onChange={(value) => setDraft((current) => current ? {
                        ...current,
                        images: current.images.map((entry, entryIndex) => entryIndex === index ? { ...entry, sortOrder: Number.parseInt(value || '0', 10) || 0 } : entry),
                      } : current)}
                      inputMode="numeric"
                    />
                    <LabeledInput
                      label="Alt"
                      value={image.alt ?? ''}
                      onChange={(value) => setDraft((current) => current ? {
                        ...current,
                        images: current.images.map((entry, entryIndex) => entryIndex === index ? { ...entry, alt: value } : entry),
                      } : current)}
                    />
                    <LabeledInput
                      label="Kind"
                      value={image.kind ?? 'gallery'}
                      onChange={(value) => setDraft((current) => current ? {
                        ...current,
                        images: current.images.map((entry, entryIndex) => entryIndex === index ? { ...entry, kind: value } : entry),
                      } : current)}
                    />
                  </div>
                  <LabeledTextarea
                    label="Caption"
                    value={image.caption ?? ''}
                    onChange={(value) => setDraft((current) => current ? {
                      ...current,
                      images: current.images.map((entry, entryIndex) => entryIndex === index ? { ...entry, caption: value } : entry),
                    } : current)}
                    rows={3}
                  />
                  <button
                    type="button"
                    onClick={() => setDraft((current) => current ? {
                      ...current,
                      images: current.images.filter((_, entryIndex) => entryIndex !== index),
                    } : current)}
                    className="mt-3 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
                  >
                    Verwijderen
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : <EmptyState label="Selecteer of maak een project." />}
      </div>

      {assetPicker ? (
        <AssetPickerModal
          title={assetPicker.title}
          assets={assets}
          onClose={() => setAssetPicker(null)}
          onSelect={(asset) => {
            assetPicker.onSelect(asset.url);
            setAssetPicker(null);
          }}
        />
      ) : null}
    </div>
  );
}

function SettingsModule({
  settings,
  onSave,
}: {
  settings: SettingRecord[];
  onSave: (settings: SettingRecord[]) => Promise<void>;
}) {
  const [drafts, setDrafts] = useState<SettingRecord[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDrafts(deepCopy(settings));
  }, [settings]);

  const company = drafts.find((setting) => setting.key === 'company');
  const seo = drafts.find((setting) => setting.key === 'seo');
  const analytics = drafts.find((setting) => setting.key === 'analytics');
  const unknown = drafts.filter((setting) => !setting.isKnownKey);

  function updateSetting(key: string, field: string, value: unknown) {
    setDrafts((current) => current.map((setting) => (
      setting.key === key
        ? { ...setting, valueJson: { ...setting.valueJson, [field]: value } }
        : setting
    )));
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader title="Instellingen" description="Typed editors voor company, SEO en analytics." />
        <button
          type="button"
          disabled={saving}
          onClick={() => {
            setSaving(true);
            void onSave(drafts).finally(() => setSaving(false));
          }}
          className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
        >
          {saving ? 'Opslaan...' : 'Alle settings opslaan'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {company ? (
          <SettingsCard title="Company" description={company.description ?? ''}>
            <LabeledInput label="Naam" value={ensureString(company.valueJson.name)} onChange={(value) => updateSetting('company', 'name', value)} />
            <LabeledInput label="Telefoon" value={ensureString(company.valueJson.phone)} onChange={(value) => updateSetting('company', 'phone', value)} />
            <LabeledInput label="E-mail" value={ensureString(company.valueJson.email)} onChange={(value) => updateSetting('company', 'email', value)} />
            <LabeledInput label="Adres" value={ensureString(company.valueJson.address)} onChange={(value) => updateSetting('company', 'address', value)} />
            <LabeledInput label="Instagram" value={ensureString(company.valueJson.instagram)} onChange={(value) => updateSetting('company', 'instagram', value)} />
            <LabeledInput label="WhatsApp" value={ensureString(company.valueJson.whatsapp)} onChange={(value) => updateSetting('company', 'whatsapp', value)} />
          </SettingsCard>
        ) : null}

        {seo ? (
          <SettingsCard title="SEO" description={seo.description ?? ''}>
            <LabeledInput label="Site name" value={ensureString(seo.valueJson.siteName)} onChange={(value) => updateSetting('seo', 'siteName', value)} />
            <LabeledInput label="Site URL" value={ensureString(seo.valueJson.siteUrl)} onChange={(value) => updateSetting('seo', 'siteUrl', value)} />
            <LabeledInput label="Title suffix" value={ensureString(seo.valueJson.titleSuffix)} onChange={(value) => updateSetting('seo', 'titleSuffix', value)} />
            <LabeledTextarea label="Default description" value={ensureString(seo.valueJson.defaultDescription)} onChange={(value) => updateSetting('seo', 'defaultDescription', value)} rows={4} />
          </SettingsCard>
        ) : null}
      </div>

      {analytics ? (
        <SettingsCard title="Analytics" description={analytics.description ?? ''}>
          <LabeledInput label="GTM ID" value={ensureString(analytics.valueJson.gtmId)} onChange={(value) => updateSetting('analytics', 'gtmId', value || null)} />
          <LabeledInput label="Consent version" value={ensureString(analytics.valueJson.consentVersion)} onChange={(value) => updateSetting('analytics', 'consentVersion', value)} />
          <ToggleField label="Marketing enabled" checked={Boolean(analytics.valueJson.marketingEnabled)} onChange={(checked) => updateSetting('analytics', 'marketingEnabled', checked)} />
        </SettingsCard>
      ) : null}

      {unknown.length > 0 ? (
        <div className="grid gap-4">
          <SectionHeader title="Read-only keys" description="Onbekende setting-keys blijven read-only tot ze expliciet gemodelleerd zijn." />
          {unknown.map((setting) => (
            <div key={setting.key} className="rounded-3xl border border-noir-200 bg-noir-50 p-5">
              <p className="text-sm font-semibold text-noir-900">{setting.key}</p>
              <pre className="mt-3 overflow-x-auto rounded-2xl bg-noir-950 p-4 text-xs text-white">{JSON.stringify(setting.valueJson, null, 2)}</pre>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AssetsModule({
  assets,
  storageEnabled,
  onUpload,
  onSave,
  onCreateFromUrl,
  onDelete,
}: {
  assets: AssetRecord[];
  storageEnabled: boolean;
  onUpload: (file: File, alt: string, tags: string[]) => Promise<AssetRecord>;
  onSave: (asset: AssetRecord) => Promise<void>;
  onCreateFromUrl: (asset: Omit<AssetRecord, 'id'>) => Promise<void>;
  onDelete: (assetId: string) => Promise<void>;
}) {
  const [search, setSearch] = useState('');
  const [selectionId, setSelectionId] = useState<string | null>(assets[0]?.id ?? null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [manualName, setManualName] = useState('');

  const filteredAssets = useMemo(
    () => assets.filter((asset) => asset.originalName.toLowerCase().includes(search.toLowerCase())),
    [assets, search],
  );
  const activeSelectionId = selectionId ?? assets[0]?.id ?? null;
  const selectedAsset = activeSelectionId ? assets.find((asset) => asset.id === activeSelectionId) ?? null : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="grid gap-4">
        <SectionHeader title="Assets" description="Upload naar Supabase storage en koppel URLs in content/projecten." />
        <div className="rounded-3xl border border-noir-200 p-4">
          <p className={`text-sm ${storageEnabled ? 'text-green-700' : 'text-amber-700'}`}>
            {storageEnabled ? 'Supabase upload is actief.' : 'Upload is niet geconfigureerd. Je kunt wel externe URLs registreren.'}
          </p>
          {storageEnabled ? (
            <>
              <input type="file" accept="image/*" className="mt-4 block w-full text-sm text-noir-700" onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)} />
              <LabeledInput label="Alt" value={uploadAlt} onChange={setUploadAlt} />
              <LabeledInput label="Tags (comma separated)" value={uploadTags} onChange={setUploadTags} />
              <button
                type="button"
                disabled={!uploadFile}
                onClick={() => {
                  if (uploadFile) {
                    void onUpload(uploadFile, uploadAlt, parseTags(uploadTags)).then(() => {
                      setUploadFile(null);
                      setUploadAlt('');
                      setUploadTags('');
                    });
                  }
                }}
                className="mt-3 rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
              >
                Upload asset
              </button>
            </>
          ) : null}

          <div className="mt-6 border-t border-noir-200 pt-6">
            <p className="text-sm font-semibold text-noir-900">Externe URL registreren</p>
            <LabeledInput label="Naam" value={manualName} onChange={setManualName} />
            <LabeledInput label="URL" value={manualUrl} onChange={setManualUrl} />
            <button
              type="button"
              disabled={!manualUrl || !manualName}
              onClick={() => {
                void onCreateFromUrl({
                  filename: manualName.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-'),
                  originalName: manualName,
                  mimeType: 'image/jpeg',
                  size: 0,
                  bucket: 'external',
                  path: manualUrl,
                  url: manualUrl,
                  alt: null,
                  width: null,
                  height: null,
                  tags: [],
                  createdAt: undefined,
                  updatedAt: undefined,
                }).then(() => {
                  setManualName('');
                  setManualUrl('');
                });
              }}
              className="mt-3 rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300 disabled:opacity-60"
            >
              Registreer URL
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-noir-200 bg-noir-50 p-4">
          <LabeledInput label="Zoeken" value={search} onChange={setSearch} />
          <div className="mt-4 grid gap-3">
            {filteredAssets.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => setSelectionId(asset.id)}
                className={`rounded-3xl border p-4 text-left transition ${
                  activeSelectionId === asset.id ? 'border-accent-600 bg-accent-50' : 'border-noir-200 bg-white hover:border-noir-300'
                }`}
              >
                <p className="text-sm font-semibold text-noir-900">{asset.originalName}</p>
                <p className="mt-1 text-xs text-noir-500">{asset.bucket} · {asset.tags.join(', ') || 'geen tags'}</p>
              </button>
            ))}
            {filteredAssets.length === 0 ? <EmptyState label="Geen assets gevonden." compact /> : null}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <SectionHeader title={selectedAsset?.originalName ?? 'Selecteer een asset'} description="Metadata aanpassen en URL kopiëren." />
        {selectedAsset ? (
          <AssetEditor
            key={selectedAsset.id}
            asset={selectedAsset}
            onSave={onSave}
            onDelete={onDelete}
          />
        ) : <EmptyState label="Selecteer een asset om metadata te beheren." />}
      </div>
    </div>
  );
}

function AssetEditor({
  asset,
  onSave,
  onDelete,
}: {
  asset: AssetRecord;
  onSave: (asset: AssetRecord) => Promise<void>;
  onDelete: (assetId: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState<AssetRecord>(() => deepCopy(asset));
  const [copyState, setCopyState] = useState(false);

  return (
    <div className="grid gap-4 rounded-3xl border border-noir-200 p-6">
      {draft.mimeType.startsWith('image/') ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={draft.url} alt={draft.alt ?? draft.originalName} className="h-64 w-full rounded-3xl object-cover" />
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <LabeledInput label="Original name" value={draft.originalName} onChange={(value) => setDraft((current) => ({ ...current, originalName: value }))} />
        <LabeledInput label="Filename" value={draft.filename} onChange={(value) => setDraft((current) => ({ ...current, filename: value }))} />
        <LabeledInput label="Bucket" value={draft.bucket} onChange={(value) => setDraft((current) => ({ ...current, bucket: value }))} />
        <LabeledInput label="Path" value={draft.path} onChange={(value) => setDraft((current) => ({ ...current, path: value }))} />
        <LabeledInput label="URL" value={draft.url} onChange={(value) => setDraft((current) => ({ ...current, url: value }))} />
        <LabeledInput label="Mime type" value={draft.mimeType} onChange={(value) => setDraft((current) => ({ ...current, mimeType: value }))} />
        <LabeledInput label="Size" value={String(draft.size)} onChange={(value) => setDraft((current) => ({ ...current, size: Number.parseInt(value || '0', 10) || 0 }))} inputMode="numeric" />
        <LabeledInput label="Alt" value={draft.alt ?? ''} onChange={(value) => setDraft((current) => ({ ...current, alt: value }))} />
      </div>
      <LabeledInput label="Tags (comma separated)" value={draft.tags.join(', ')} onChange={(value) => setDraft((current) => ({ ...current, tags: parseTags(value) }))} />
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(draft.url);
            setCopyState(true);
            window.setTimeout(() => setCopyState(false), 1200);
          }}
          className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300"
        >
          {copyState ? 'Gekopieerd' : 'Kopieer URL'}
        </button>
        <button
          type="button"
          onClick={() => {
            void onSave(draft);
          }}
          className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
        >
          Asset opslaan
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Deze asset verwijderen?')) {
              void onDelete(draft.id);
            }
          }}
          className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
        >
          Asset verwijderen
        </button>
      </div>
    </div>
  );
}

function AvailabilityModule({
  rules,
  exceptions,
  onSaveRules,
  onCreateException,
  onUpdateException,
  onDeleteException,
}: {
  rules: AvailabilityRule[];
  exceptions: AvailabilityException[];
  onSaveRules: (rules: AvailabilityRule[]) => Promise<void>;
  onCreateException: (exception: Omit<AvailabilityException, 'id'>) => Promise<void>;
  onUpdateException: (exception: AvailabilityException) => Promise<void>;
  onDeleteException: (exceptionId: string) => Promise<void>;
}) {
  const [ruleDrafts, setRuleDrafts] = useState<AvailabilityRule[]>([]);
  const [savingRules, setSavingRules] = useState(false);
  const [editingException, setEditingException] = useState<AvailabilityException | null>(null);
  const [newException, setNewException] = useState<Omit<AvailabilityException, 'id'>>({
    date: '',
    blockedTimes: [],
    reason: '',
  });

  useEffect(() => {
    setRuleDrafts(deepCopy(rules));
  }, [rules]);

  return (
    <div className="grid gap-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader title="Beschikbaarheid" description="Weekrooster per dag en aparte uitzonderingen." />
        <button
          type="button"
          disabled={savingRules}
          onClick={() => {
            setSavingRules(true);
            void onSaveRules(ruleDrafts).finally(() => setSavingRules(false));
          }}
          className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
        >
          {savingRules ? 'Opslaan...' : 'Rooster opslaan'}
        </button>
      </div>

      <div className="grid gap-4">
        {ruleDrafts.map((rule) => (
          <div key={rule.dayOfWeek} className="rounded-3xl border border-noir-200 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-noir-900">{weekdays[rule.dayOfWeek]}</p>
              <ToggleField
                label="Actief"
                checked={rule.isActive}
                onChange={(checked) => setRuleDrafts((current) => current.map((entry) => (
                  entry.dayOfWeek === rule.dayOfWeek ? { ...entry, isActive: checked } : entry
                )))}
              />
            </div>
            <TimeSlotEditor
              slots={rule.timeSlots}
              onChange={(slots) => setRuleDrafts((current) => current.map((entry) => (
                entry.dayOfWeek === rule.dayOfWeek ? { ...entry, timeSlots: slots } : entry
              )))}
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 rounded-3xl border border-noir-200 p-6">
        <SectionHeader title="Uitzonderingen" description="Blokkeer specifieke data of volledige dagen." />

        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <LabeledInput label="Datum" value={newException.date} onChange={(value) => setNewException((current) => ({ ...current, date: value }))} type="date" />
          <LabeledInput
            label="Reason"
            value={newException.reason ?? ''}
            onChange={(value) => setNewException((current) => ({ ...current, reason: value }))}
          />
          <button
            type="button"
            onClick={() => {
              void onCreateException(newException).then(() => {
                setNewException({ date: '', blockedTimes: [], reason: '' });
              });
            }}
            className="mt-7 rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
          >
            Uitzondering toevoegen
          </button>
        </div>

        <div className="rounded-2xl border border-noir-200 p-4">
          <ToggleField
            label="Hele dag blokkeren"
            checked={newException.blockedTimes.includes('all')}
            onChange={(checked) => setNewException((current) => ({
              ...current,
              blockedTimes: checked ? ['all'] : [],
            }))}
          />
          {!newException.blockedTimes.includes('all') ? (
            <TimeSlotEditor
              slots={newException.blockedTimes}
              onChange={(slots) => setNewException((current) => ({ ...current, blockedTimes: slots }))}
            />
          ) : null}
        </div>

        <div className="grid gap-3">
          {exceptions.map((exception) => {
            const isEditing = editingException?.id === exception.id;
            const source = isEditing ? editingException : exception;

            return (
              <div key={exception.id} className="rounded-3xl border border-noir-200 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <LabeledInput label="Datum" value={source.date} onChange={(value) => setEditingException({ ...source, date: value })} type="date" />
                  <LabeledInput label="Reason" value={source.reason ?? ''} onChange={(value) => setEditingException({ ...source, reason: value })} />
                </div>
                <div className="mt-4 rounded-2xl border border-noir-200 p-4">
                  <ToggleField
                    label="Hele dag blokkeren"
                    checked={source.blockedTimes.includes('all')}
                    onChange={(checked) => setEditingException({
                      ...source,
                      blockedTimes: checked ? ['all'] : [],
                    })}
                  />
                  {!source.blockedTimes.includes('all') ? (
                    <TimeSlotEditor
                      slots={source.blockedTimes}
                      onChange={(slots) => setEditingException({ ...source, blockedTimes: slots })}
                    />
                  ) : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      void onUpdateException(source);
                    }}
                    className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
                  >
                    Uitzondering opslaan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Deze uitzondering verwijderen?')) {
                        void onDeleteException(exception.id);
                      }
                    }}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            );
          })}
          {exceptions.length === 0 ? <EmptyState label="Nog geen uitzonderingen ingesteld." compact /> : null}
        </div>
      </div>
    </div>
  );
}

function LeadCard({
  title,
  subtitle,
  currentStatus,
  note,
  statusOptions,
  onSave,
  onDelete,
}: {
  title: string;
  subtitle: string;
  currentStatus: string;
  note: string;
  statusOptions: string[];
  onSave: (status: string, note: string) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [internalNote, setInternalNote] = useState(note);
  const [saving, setSaving] = useState(false);

  return (
    <div className="grid gap-4 rounded-3xl border border-noir-200 p-5">
      <div>
        <p className="text-sm font-semibold text-noir-900">{title}</p>
        <p className="text-sm text-noir-500">{subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-[200px_1fr_auto_auto]">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className={inputClassName}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input value={internalNote} onChange={(event) => setInternalNote(event.target.value)} placeholder="Admin note" className={inputClassName} />
        <button
          type="button"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            await onSave(status, internalNote);
            setSaving(false);
          }}
          className="rounded-full bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Dit record verwijderen?')) {
              void onDelete();
            }
          }}
          className="rounded-full border border-red-200 px-5 py-3 text-sm font-medium text-red-700 transition hover:border-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function AppointmentCard({
  appointment,
  onSave,
  onDelete,
}: {
  appointment: AppointmentRecord;
  onSave: (appointmentId: string, payload: {
    status: string;
    adminNotes: string;
    proposedDate?: string | null;
    proposedTime?: string | null;
  }) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [status, setStatus] = useState(appointment.status);
  const [internalNote, setInternalNote] = useState(appointment.adminNotes ?? '');
  const [proposedDate, setProposedDate] = useState(appointment.proposedDate?.slice(0, 10) ?? '');
  const [proposedTime, setProposedTime] = useState(appointment.proposedTime ?? '');
  const [saving, setSaving] = useState(false);

  return (
    <div className="grid gap-4 rounded-3xl border border-noir-200 p-5">
      <div>
        <p className="text-sm font-semibold text-noir-900">{appointment.referenceNumber}</p>
        <p className="text-sm text-noir-500">
          {appointment.fullName} · {appointment.email} · {formatDate(appointment.appointmentDate)} {appointment.appointmentTime}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className={inputClassName}>
          {appointmentStatusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input value={internalNote} onChange={(event) => setInternalNote(event.target.value)} placeholder="Admin note" className={inputClassName} />
      </div>
      {status === 'RESCHEDULED' ? (
        <div className="grid gap-4 md:grid-cols-2">
          <LabeledInput label="Voorgestelde datum" value={proposedDate} onChange={setProposedDate} type="date" />
          <LabeledInput label="Voorgestelde tijd" value={proposedTime} onChange={setProposedTime} type="time" />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            await onSave(appointment.id, {
              status,
              adminNotes: internalNote,
              proposedDate: status === 'RESCHEDULED' ? proposedDate || null : null,
              proposedTime: status === 'RESCHEDULED' ? proposedTime || null : null,
            });
            setSaving(false);
          }}
          className="rounded-full bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Deze afspraak verwijderen?')) {
              void onDelete();
            }
          }}
          className="rounded-full border border-red-200 px-5 py-3 text-sm font-medium text-red-700 transition hover:border-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function AssetPickerModal({
  title,
  assets,
  onClose,
  onSelect,
}: {
  title: string;
  assets: AssetRecord[];
  onClose: () => void;
  onSelect: (asset: AssetRecord) => void;
}) {
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => assets.filter((asset) => asset.originalName.toLowerCase().includes(search.toLowerCase())),
    [assets, search],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-soft-lg">
        <div className="flex items-center justify-between border-b border-noir-200 px-6 py-4">
          <div>
            <p className="text-lg font-display font-bold text-noir-900">{title}</p>
            <p className="text-sm text-noir-500">Kies een bestaande asset-URL.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-noir-200 px-4 py-2 text-sm text-noir-700">
            Sluiten
          </button>
        </div>
        <div className="p-6">
          <LabeledInput label="Zoeken" value={search} onChange={setSearch} />
          <div className="mt-4 grid max-h-[60vh] gap-4 overflow-y-auto md:grid-cols-3">
            {filtered.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => onSelect(asset)}
                className="rounded-3xl border border-noir-200 p-4 text-left transition hover:border-accent-600 hover:bg-accent-50"
              >
                {asset.mimeType.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset.url} alt={asset.alt ?? asset.originalName} className="h-40 w-full rounded-2xl object-cover" />
                ) : null}
                <p className="mt-3 text-sm font-semibold text-noir-900">{asset.originalName}</p>
                <p className="mt-1 text-xs text-noir-500">{asset.tags.join(', ') || 'geen tags'}</p>
              </button>
            ))}
            {filtered.length === 0 ? <EmptyState label="Geen assets gevonden." compact /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemListEditor({
  label,
  items,
  onChange,
  fields,
}: {
  label: string;
  items: Array<Record<string, unknown>>;
  onChange: (items: Array<Record<string, unknown>>) => void;
  fields: Array<{ key: string; label: string; multiline?: boolean; isStringList?: boolean }>;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-noir-900">{label}</p>
        <button
          type="button"
          onClick={() => onChange([...items, {}])}
          className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300"
        >
          Item toevoegen
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="rounded-3xl border border-noir-200 p-4">
          <div className="grid gap-4">
            {fields.map((field) => (
              field.multiline ? (
                <LabeledTextarea
                  key={field.key}
                  label={field.label}
                  value={field.isStringList ? ensureStringArray(item[field.key]).join('\n') : ensureString(item[field.key])}
                  onChange={(value) => onChange(items.map((entry, entryIndex) => (
                    entryIndex === index
                      ? {
                          ...entry,
                          [field.key]: field.isStringList ? value.split('\n').map((row) => row.trim()).filter(Boolean) : value,
                        }
                      : entry
                  )))}
                  rows={field.isStringList ? 4 : 5}
                />
              ) : (
                <LabeledInput
                  key={field.key}
                  label={field.label}
                  value={ensureString(item[field.key])}
                  onChange={(value) => onChange(items.map((entry, entryIndex) => (
                    entryIndex === index ? { ...entry, [field.key]: value } : entry
                  )))}
                />
              )
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange(items.filter((_, entryIndex) => entryIndex !== index))}
            className="mt-3 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
          >
            Verwijderen
          </button>
        </div>
      ))}
      {items.length === 0 ? <EmptyState label="Nog geen items toegevoegd." compact /> : null}
    </div>
  );
}

function TextListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-noir-900">{label}</p>
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300"
        >
          Regel toevoegen
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex gap-3">
          <input
            value={item}
            onChange={(event) => onChange(items.map((entry, entryIndex) => entryIndex === index ? event.target.value : entry))}
            className={inputClassName}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, entryIndex) => entryIndex !== index))}
            className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
          >
            Verwijderen
          </button>
        </div>
      ))}
      {items.length === 0 ? <EmptyState label="Nog geen regels toegevoegd." compact /> : null}
    </div>
  );
}

function TimeSlotEditor({
  slots,
  onChange,
}: {
  slots: string[];
  onChange: (slots: string[]) => void;
}) {
  return (
    <div className="mt-4 grid gap-3">
      {slots.map((slot, index) => (
        <div key={`${slot}-${index}`} className="flex gap-3">
          <input
            type="time"
            value={slot}
            onChange={(event) => onChange(slots.map((entry, entryIndex) => entryIndex === index ? event.target.value : entry))}
            className={inputClassName}
          />
          <button
            type="button"
            onClick={() => onChange(slots.filter((_, entryIndex) => entryIndex !== index))}
            className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
          >
            Verwijderen
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...slots, '09:00'])}
        className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300"
      >
        Tijdslot toevoegen
      </button>
    </div>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 rounded-3xl border border-noir-200 p-6">
      <div>
        <p className="text-lg font-display font-bold text-noir-900">{title}</p>
        <p className="mt-1 text-sm text-noir-500">{description}</p>
      </div>
      {children}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-noir-200 bg-noir-50 p-5">
      <p className="text-sm text-noir-500">{label}</p>
      <p className="mt-2 text-3xl font-display font-bold text-noir-900">{value}</p>
    </div>
  );
}

function StatusList({
  title,
  items,
}: {
  title: string;
  items: Array<{ status: string; _count: number | { _all?: number } }>;
}) {
  return (
    <div className="rounded-3xl border border-noir-200 p-5">
      <p className="text-sm font-semibold text-noir-900">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="flex items-center justify-between rounded-2xl bg-noir-50 px-4 py-3 text-sm text-noir-700">
            <span>{String(item.status ?? 'unknown')}</span>
            <span className="font-semibold">{getStatusCountValue(item._count)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-lg font-display font-bold text-noir-900">{title}</h2>
      <p className="mt-1 text-sm text-noir-500">{description}</p>
    </div>
  );
}

function EmptyState({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div className={`rounded-3xl border border-dashed border-noir-200 bg-noir-50 text-center text-sm text-noir-500 ${compact ? 'p-4' : 'p-10'}`}>
      {label}
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = 'text',
  inputMode,
  datalistId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  datalistId?: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-noir-700">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        list={datalistId}
        onChange={(event) => onChange(event.target.value)}
        className={inputClassName}
      />
    </label>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="grid gap-2 text-sm text-noir-700">
      <span className="font-medium">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClassName} min-h-[120px] resize-y`}
      />
    </label>
  );
}

function LabeledSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm text-noir-700">
      <span className="font-medium">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={inputClassName}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-noir-200 px-4 py-3 text-sm text-noir-700">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="font-medium">{label}</span>
    </label>
  );
}

function ImageUrlInput({
  label,
  value,
  onChange,
  onPickAsset,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPickAsset: () => void;
}) {
  return (
    <div className="grid gap-2">
      <LabeledInput label={label} value={value} onChange={onChange} />
      <button
        type="button"
        onClick={onPickAsset}
        className="justify-self-start rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300"
      >
        Kies uit assets
      </button>
    </div>
  );
}

const inputClassName =
  'w-full rounded-2xl border border-noir-200 bg-white px-4 py-3 text-sm text-noir-900 outline-none transition focus:border-accent-500';
