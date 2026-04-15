'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { ExternalLink, Monitor, Plus, Smartphone, Tablet } from 'lucide-react';

import AdminShell, { type AdminShellModule } from './AdminShell';
import { moduleOrder } from './icons';
import {
  buildPreviewUrl,
  createEmptyProject,
  createEmptySectionData,
  createNewSection,
  deepCopy,
  ensureItemArray,
  ensureString,
  ensureStringArray,
  fetchJson,
  formatDate,
  getSelectionKey,
  parseTags,
} from './lib';
import { AnalyticsModule } from './modules/AnalyticsModule';
import type {
  AnalyticsOverview,
  AppointmentRecord,
  AssetRecord,
  AssetResponseMeta,
  AvailabilityException,
  AvailabilityRule,
  ContentSchemaKey,
  ContentSection,
  ModuleKey,
  PageOption,
  ProjectRecord,
  ProjectTranslation,
  QuoteRecord,
  SettingRecord,
} from './types';
import {
  appointmentStatusOptions,
  contentSchemaOptions,
  locales,
  quoteStatusOptions,
  weekdays,
} from './types';
import { Banner } from './ui/Banner';
import { EmptyState } from './ui/EmptyState';
import { LabeledInput, LabeledSelect, LabeledTextarea, ToggleField } from './ui/Input';
import { ItemListEditor, TextListEditor, TimeSlotEditor } from './ui/ListEditors';
import { SectionHeader } from './ui/SectionHeader';

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

  const shellModules: ReadonlyArray<AdminShellModule> = moduleOrder.map((key) => ({
    key,
    count:
      key === 'quotes'
        ? counts.quotes
        : key === 'appointments'
          ? counts.appointments
          : undefined,
  }));

  return (
    <AdminShell
      adminName={adminName}
      modules={shellModules}
      activeModule={activeModule}
      onChangeModule={setActiveModule}
      onSignOut={signOut}
      padded={activeModule !== 'content'}
    >
      {error ? (
        <div className="mb-4">
          <Banner variant="danger">{error}</Banner>
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4">
          <div className="h-24 animate-pulse rounded-2xl bg-parchment-100" />
          <div className="h-64 animate-pulse rounded-2xl bg-parchment-100" />
          <div className="h-40 animate-pulse rounded-2xl bg-parchment-100" />
        </div>
      ) : null}

      {!loading && activeModule === 'analytics' && analytics ? (
        <AnalyticsModule
          analytics={analytics}
          quotes={quotes}
          appointments={appointments}
          onJumpTo={setActiveModule}
        />
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
    </AdminShell>
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
  statusOptions: ReadonlyArray<string>;
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
      {items.length === 0 ? <EmptyState description="Nog geen items beschikbaar." /> : null}
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
      {appointments.length === 0 ? <EmptyState description="Nog geen afspraken beschikbaar." /> : null}
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
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [previewNonce, setPreviewNonce] = useState(0);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'phone'>('desktop');
  const [metaCollapsed, setMetaCollapsed] = useState(true);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const filteredSections = useMemo(
    () => sections.filter((section) => section.pageKey === pageKey && section.locale === locale)
      .sort((left, right) => left.displayOrder - right.displayOrder),
    [locale, pageKey, sections],
  );

  // Locale availability for the currently focused sectionKey (used by tabs)
  const currentSectionKey = draft?.sectionKey;
  const localeAvailability = useMemo(() => {
    const map: Record<'nl' | 'fr' | 'en', boolean> = { nl: true, fr: false, en: false };
    if (!currentSectionKey) return map;
    for (const section of sections) {
      if (section.pageKey === pageKey && section.sectionKey === currentSectionKey && section.hasStoredValue) {
        map[section.locale] = true;
      }
    }
    return map;
  }, [sections, pageKey, currentSectionKey]);

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

  const isDirty = useMemo(() => {
    if (!draft) return false;
    if (selectedSection) {
      const left = JSON.stringify({
        sectionKey: selectedSection.sectionKey,
        schemaKey: selectedSection.schemaKey,
        displayOrder: selectedSection.displayOrder,
        published: selectedSection.published,
        dataJson: selectedSection.dataJson,
      });
      const right = JSON.stringify({
        sectionKey: draft.sectionKey,
        schemaKey: draft.schemaKey,
        displayOrder: draft.displayOrder,
        published: draft.published,
        dataJson: draft.dataJson,
      });
      return left !== right;
    }
    // New section is dirty if any data field carries content
    return Object.values(draft.dataJson).some((value) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return value != null;
    });
  }, [draft, selectedSection]);

  async function handleSave() {
    if (!draft) {
      return;
    }

    setSaving(true);
    try {
      const saved = await onSave(draft);
      setSelectionKey(saved.id ?? getSelectionKey(draft));
      setLastSavedAt(new Date());
      setPreviewNonce((value) => value + 1);
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
    setPreviewNonce((value) => value + 1);
  }

  function updateDraftField(key: string, value: unknown) {
    setDraft((current) => current ? { ...current, dataJson: { ...current.dataJson, [key]: value } } : current);
  }

  function handleNewSection() {
    const created = createNewSection(pageKey, locale, filteredSections);
    setDraft(created);
    setSelectionKey(`new:${Date.now()}`);
    setMobileView('detail');
  }

  // Save-state label
  let saveLabel = 'Geen wijzigingen';
  let saveDirty = false;
  if (saving) {
    saveLabel = 'Opslaan…';
  } else if (isDirty) {
    saveLabel = 'Niet opgeslagen';
    saveDirty = true;
  } else if (lastSavedAt) {
    saveLabel = `Laatst opgeslagen ${lastSavedAt.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}`;
  }

  const previewUrl = draft ? buildPreviewUrl(draft.locale, draft.previewPath) : '';
  const frameClass =
    viewport === 'tablet'
      ? 'admin-preview-frame admin-preview-frame-tablet'
      : viewport === 'phone'
        ? 'admin-preview-frame admin-preview-frame-phone'
        : 'admin-preview-frame';

  return (
    <div className="admin-workspace">
      {/* RAIL */}
      <aside className={`admin-rail ${mobileView === 'list' ? '' : 'hidden lg:flex'}`}>
        <div className="admin-rail-head">
          <div className="admin-pill-row">
            {pages.map((page) => (
              <button
                key={page.key}
                type="button"
                onClick={() => {
                  setPageKey(page.key);
                  setSelectionKey(null);
                }}
                className={`admin-pill ${pageKey === page.key ? 'admin-pill-active' : ''}`}
              >
                {page.key}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNewSection}
            className="admin-btn-secondary admin-btn-sm"
            style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={13} strokeWidth={1.8} />
            <span>Nieuwe sectie</span>
          </button>
        </div>
        <div className="admin-rail-body">
          <div className="admin-rail-group-label">
            <span>Secties · {locale.toUpperCase()}</span>
            <span style={{ color: 'var(--adm-text-4)' }}>{filteredSections.length}</span>
          </div>
          {filteredSections.length === 0 ? (
            <div style={{ padding: '24px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: 'var(--adm-text-3)' }}>
                Nog geen secties voor deze pagina/taal.
              </p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 2 }}>
              {filteredSections.map((section) => {
                const key = getSelectionKey(section);
                const isActive = selectionKey === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectionKey(key);
                        setMobileView('detail');
                      }}
                      className={`admin-section-card ${isActive ? 'admin-section-card-active' : ''}`}
                    >
                      <span className="admin-drag-handle" aria-hidden="true">⋮⋮</span>
                      <span style={{ minWidth: 0, display: 'block' }}>
                        <span className="admin-section-card-name">{section.sectionKey}</span>
                        <span className="admin-section-card-meta">
                          <span>{section.schemaKey}</span>
                          <span className="dot">·</span>
                          <span>order {section.displayOrder}</span>
                        </span>
                        <span style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                          <span className={`admin-chip ${section.published ? 'admin-chip-success' : 'admin-chip-neutral'}`}>
                            {section.published ? 'Live' : 'Hidden'}
                          </span>
                          <span className={`admin-chip ${section.hasStoredValue ? 'admin-chip-accent' : 'admin-chip-neutral'}`}>
                            {section.hasStoredValue ? 'Override' : 'Default'}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* EDITOR */}
      <section className={`admin-editor ${mobileView === 'detail' ? '' : 'hidden lg:flex'}`}>
        <div className="admin-editor-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4, paddingBottom: 12, flexWrap: 'wrap' }}>
            <BackToListButton onClick={() => setMobileView('list')} />
            <div className="admin-crumbs" style={{ flex: 1, minWidth: 0 }}>
              <span>Content</span>
              <span className="sep">/</span>
              <span>{pageKey}</span>
              <span className="sep">/</span>
              <span>{locale}</span>
              {draft ? (
                <span className="leaf" style={{ marginLeft: 4 }}>{draft.sectionKey || '—'}</span>
              ) : null}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className={`admin-save-state ${saveDirty ? 'dirty' : ''}`}>
                <span className="dot" />
                {saveLabel}
              </span>
              {selectedSection?.id ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="admin-btn-ghost admin-btn-sm"
                >
                  Reset override
                </button>
              ) : null}
              <button
                type="button"
                disabled={!draft || saving || !isDirty}
                onClick={() => {
                  void handleSave();
                }}
                className="admin-btn-primary admin-btn-sm"
              >
                {saving ? 'Bezig…' : 'Opslaan'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingBottom: 14, flexWrap: 'wrap' }}>
            <div className="admin-locale-tabs" role="tablist" aria-label="Taal">
              {locales.map((entry) => {
                const ok = entry.value === 'nl' || localeAvailability[entry.value];
                return (
                  <button
                    key={entry.value}
                    type="button"
                    role="tab"
                    aria-selected={locale === entry.value}
                    onClick={() => setLocale(entry.value)}
                    className={`admin-locale-tab ${locale === entry.value ? 'admin-locale-tab-active' : ''}`}
                    title={ok ? `${entry.label} — beschikbaar` : `${entry.label} — geen override (synced from NL)`}
                  >
                    <span className={`admin-locale-badge ${ok ? 'admin-locale-badge-ok' : ''}`} />
                    {entry.label}
                  </button>
                );
              })}
            </div>
            {draft ? (
              <span className={`admin-chip ${draft.hasStoredValue ? 'admin-chip-accent' : 'admin-chip-neutral'}`}>
                {draft.hasStoredValue ? 'Overschrijft default' : 'Default waarde'}
              </span>
            ) : null}
          </div>
        </div>

        <div className="admin-editor-body">
          {draft ? (
            <>
              <h2 className="admin-editor-title">
                Sectie: <em>{draft.sectionKey || 'nieuw'}</em>
              </h2>
              <p className="admin-eyebrow" style={{ marginTop: 6, marginBottom: 22 }}>
                {draft.hasStoredValue
                  ? 'Wijzigingen overschrijven de default content voor deze taal.'
                  : 'Bewerken maakt een override op de default content.'}
              </p>

              <ContentSchemaFields draft={draft} updateDraftField={updateDraftField} setAssetPicker={setAssetPicker} />

              <FieldGroupBlock
                label="Meta"
                hint="Infrastructuur"
                collapsed={metaCollapsed}
                onToggle={() => setMetaCollapsed((value) => !value)}
              >
                <div className="admin-field-row">
                  <LabeledInput
                    label="Section key"
                    value={draft.sectionKey}
                    onChange={(value) => setDraft((current) => current ? { ...current, sectionKey: value } : current)}
                    style={{ fontFamily: 'var(--adm-mono)', fontSize: 12.5 }}
                  />
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
                </div>
                <div className="admin-field-row">
                  <LabeledInput
                    label="Display order"
                    value={String(draft.displayOrder)}
                    onChange={(value) => setDraft((current) => current ? { ...current, displayOrder: Number.parseInt(value || '0', 10) || 0 } : current)}
                    inputMode="numeric"
                  />
                  <label className="admin-field">
                    <span className="admin-field-label">Status</span>
                    <span style={{ paddingTop: 6, display: 'inline-flex' }}>
                      <ToggleField
                        label={draft.published ? 'Gepubliceerd' : 'Verborgen'}
                        description={draft.published ? 'Zichtbaar op de site' : 'Niet zichtbaar voor bezoekers'}
                        checked={draft.published}
                        onChange={(checked) => setDraft((current) => current ? { ...current, published: checked } : current)}
                      />
                    </span>
                  </label>
                </div>
              </FieldGroupBlock>
            </>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--adm-text-3)', padding: 24 }}>
              Selecteer of maak een sectie om te bewerken.
            </p>
          )}
        </div>
      </section>

      {/* PREVIEW */}
      <aside className="admin-preview">
        <div className="admin-preview-head">
          <span className="admin-preview-url" title={previewUrl || 'Geen preview-pad'}>
            {previewUrl || '—'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {previewUrl ? (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="admin-link-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
              >
                <ExternalLink size={12} strokeWidth={1.8} />
                <span>Open</span>
              </a>
            ) : null}
            <div className="admin-vp-toggle" role="group" aria-label="Viewport">
              <button
                type="button"
                className={`admin-vp-btn ${viewport === 'desktop' ? 'admin-vp-btn-active' : ''}`}
                onClick={() => setViewport('desktop')}
                aria-label="Desktop"
                title="Desktop"
              >
                <Monitor size={13} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                className={`admin-vp-btn ${viewport === 'tablet' ? 'admin-vp-btn-active' : ''}`}
                onClick={() => setViewport('tablet')}
                aria-label="Tablet"
                title="Tablet"
              >
                <Tablet size={13} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                className={`admin-vp-btn ${viewport === 'phone' ? 'admin-vp-btn-active' : ''}`}
                onClick={() => setViewport('phone')}
                aria-label="Telefoon"
                title="Telefoon"
              >
                <Smartphone size={13} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
        <div className="admin-preview-body">
          {previewUrl ? (
            <div className={frameClass}>
              <iframe
                key={previewNonce}
                src={previewUrl}
                title="Live preview"
                loading="lazy"
              />
            </div>
          ) : (
            <div style={{ alignSelf: 'center', textAlign: 'center', color: 'var(--adm-text-3)' }}>
              <p style={{ fontSize: 13 }}>Geen preview beschikbaar.</p>
            </div>
          )}
        </div>
      </aside>

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

function ContentSchemaFields({
  draft,
  updateDraftField,
  setAssetPicker,
}: {
  draft: ContentSection;
  updateDraftField: (key: string, value: unknown) => void;
  setAssetPicker: (picker: { title: string; onSelect: (url: string) => void } | null) => void;
}) {
  switch (draft.schemaKey) {
    case 'hero':
      return (
        <>
          <FieldGroupBlock label="Kop" hint="Header copy">
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={4} />
          </FieldGroupBlock>
          <FieldGroupBlock label="Acties" hint="Call-to-actions">
            <CtaPair
              variant="primary"
              labelValue={ensureString(draft.dataJson.primaryCtaLabel)}
              onLabelChange={(value) => updateDraftField('primaryCtaLabel', value)}
              hrefValue={ensureString(draft.dataJson.primaryCtaHref)}
              onHrefChange={(value) => updateDraftField('primaryCtaHref', value)}
            />
            <CtaPair
              variant="secondary"
              labelValue={ensureString(draft.dataJson.secondaryCtaLabel)}
              onLabelChange={(value) => updateDraftField('secondaryCtaLabel', value)}
              hrefValue={ensureString(draft.dataJson.secondaryCtaHref)}
              onHrefChange={(value) => updateDraftField('secondaryCtaHref', value)}
            />
          </FieldGroupBlock>
          <FieldGroupBlock label="Media" hint="Hero image">
            <Dropzone
              value={ensureString(draft.dataJson.image)}
              onChange={(value) => updateDraftField('image', value)}
              onPickAsset={() => setAssetPicker({
                title: 'Kies hero image',
                onSelect: (url) => updateDraftField('image', url),
              })}
            />
          </FieldGroupBlock>
        </>
      );
    case 'feature-list':
      return (
        <>
          <FieldGroupBlock label="Kop" hint="Header copy">
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
          </FieldGroupBlock>
          <FieldGroupBlock label="Items" hint="Lijst items">
            <ItemListEditor
              label=""
              items={ensureItemArray(draft.dataJson.items)}
              onChange={(items) => updateDraftField('items', items)}
              fields={[
                { key: 'title', label: 'Titel' },
                { key: 'description', label: 'Beschrijving', multiline: true },
                { key: 'href', label: 'Href' },
                { key: 'ctaLabel', label: 'CTA label' },
              ]}
            />
          </FieldGroupBlock>
        </>
      );
    case 'content':
      return (
        <>
          <FieldGroupBlock label="Kop" hint="Header copy">
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
          </FieldGroupBlock>
          <FieldGroupBlock label="Paragrafen" hint="Lopende tekst">
            <TextListEditor
              label=""
              items={ensureStringArray(draft.dataJson.paragraphs)}
              onChange={(items) => updateDraftField('paragraphs', items)}
            />
          </FieldGroupBlock>
          <FieldGroupBlock label="Detail cards" hint="Optionele cards">
            <ItemListEditor
              label=""
              items={ensureItemArray(draft.dataJson.items)}
              onChange={(items) => updateDraftField('items', items)}
              fields={[
                { key: 'title', label: 'Titel' },
                { key: 'description', label: 'Beschrijving', multiline: true },
              ]}
            />
          </FieldGroupBlock>
        </>
      );
    case 'contact':
      return (
        <>
          <FieldGroupBlock label="Kop" hint="Header copy">
            <LabeledInput label="Eyebrow" value={ensureString(draft.dataJson.eyebrow)} onChange={(value) => updateDraftField('eyebrow', value)} />
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
          </FieldGroupBlock>
          <FieldGroupBlock label="Highlights" hint="Bullet points">
            <TextListEditor
              label=""
              items={ensureStringArray(draft.dataJson.highlights)}
              onChange={(items) => updateDraftField('highlights', items)}
            />
          </FieldGroupBlock>
          <FieldGroupBlock label="Acties" hint="Call-to-action">
            <CtaPair
              variant="primary"
              labelValue={ensureString(draft.dataJson.primaryCtaLabel)}
              onLabelChange={(value) => updateDraftField('primaryCtaLabel', value)}
              hrefValue={ensureString(draft.dataJson.primaryCtaHref)}
              onHrefChange={(value) => updateDraftField('primaryCtaHref', value)}
            />
          </FieldGroupBlock>
        </>
      );
    case 'cta':
      return (
        <>
          <FieldGroupBlock label="Kop" hint="Header copy">
            <LabeledInput label="Titel" value={ensureString(draft.dataJson.title)} onChange={(value) => updateDraftField('title', value)} />
            <LabeledTextarea label="Beschrijving" value={ensureString(draft.dataJson.description)} onChange={(value) => updateDraftField('description', value)} rows={3} />
          </FieldGroupBlock>
          <FieldGroupBlock label="Acties" hint="Call-to-action">
            <CtaPair
              variant="primary"
              labelValue={ensureString(draft.dataJson.primaryCtaLabel)}
              onLabelChange={(value) => updateDraftField('primaryCtaLabel', value)}
              hrefValue={ensureString(draft.dataJson.primaryCtaHref)}
              onHrefChange={(value) => updateDraftField('primaryCtaHref', value)}
            />
          </FieldGroupBlock>
        </>
      );
    case 'legal':
      return (
        <>
          <FieldGroupBlock label="Kop" hint="Header">
            <LabeledInput label="Updated at" value={ensureString(draft.dataJson.updatedAt)} onChange={(value) => updateDraftField('updatedAt', value)} />
            <LabeledTextarea label="Introductie" value={ensureString(draft.dataJson.introduction)} onChange={(value) => updateDraftField('introduction', value)} rows={4} />
          </FieldGroupBlock>
          <FieldGroupBlock label="Legal secties" hint="Body">
            <ItemListEditor
              label=""
              items={ensureItemArray(draft.dataJson.sections)}
              onChange={(items) => updateDraftField('sections', items)}
              fields={[
                { key: 'title', label: 'Titel' },
                { key: 'body', label: 'Body', multiline: true },
                { key: 'items', label: 'Items (1 per regel)', multiline: true, isStringList: true },
              ]}
            />
          </FieldGroupBlock>
        </>
      );
    default:
      return null;
  }
}

function FieldGroupBlock({
  label,
  hint,
  collapsed,
  onToggle,
  children,
}: {
  label: string;
  hint?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`admin-field-group ${collapsed ? 'collapsed' : ''}`}>
      <div
        className="admin-field-group-head"
        style={onToggle ? { cursor: 'pointer', userSelect: 'none' } : undefined}
        onClick={onToggle}
      >
        <span className="admin-field-group-label">{label}</span>
        {hint ? <span className="admin-field-group-hint">{hint}</span> : null}
      </div>
      <div className="admin-field-group-body">{children}</div>
    </div>
  );
}

function CtaPair({
  variant,
  labelValue,
  onLabelChange,
  hrefValue,
  onHrefChange,
}: {
  variant: 'primary' | 'secondary';
  labelValue: string;
  onLabelChange: (value: string) => void;
  hrefValue: string;
  onHrefChange: (value: string) => void;
}) {
  return (
    <div className="admin-cta-pair">
      <div className="admin-cta-pair-head">
        <span className={`swatch ${variant === 'secondary' ? 'swatch-secondary' : ''}`} />
        <span>{variant === 'primary' ? 'Primary CTA' : 'Secondary CTA'}</span>
      </div>
      <div className="admin-field-row">
        <LabeledInput
          label="Label"
          value={labelValue}
          onChange={onLabelChange}
          placeholder={variant === 'primary' ? 'Plan een gesprek' : 'Bekijk projecten'}
        />
        <LabeledInput
          label="Href"
          value={hrefValue}
          onChange={onHrefChange}
          placeholder="/contact"
          style={{ fontFamily: 'var(--adm-mono)', fontSize: 12.5 }}
        />
      </div>
    </div>
  );
}

function Dropzone({
  value,
  onChange,
  onPickAsset,
}: {
  value: string;
  onChange: (value: string) => void;
  onPickAsset: () => void;
}) {
  const fileName = value ? value.split('/').pop() ?? value : '';
  return (
    <div className="admin-dropzone">
      <div
        className={`admin-dropzone-preview ${value ? '' : 'admin-dropzone-preview-empty'}`}
        style={value ? { backgroundImage: `url("${value}")` } : undefined}
        aria-hidden="true"
      />
      <div className="admin-dropzone-body">
        <span className="admin-dropzone-title">Hero afbeelding</span>
        <span className="admin-dropzone-file">{fileName || 'Geen afbeelding gekozen'}</span>
        <div className="admin-dropzone-actions">
          <button type="button" className="admin-link-btn" onClick={onPickAsset}>
            {value ? 'Vervang' : 'Kies uit beeldbank'}
          </button>
          {value ? (
            <button
              type="button"
              className="admin-link-btn admin-link-btn-danger"
              onClick={() => onChange('')}
            >
              Verwijderen
            </button>
          ) : null}
        </div>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="admin-input"
          placeholder="of plak een URL"
          style={{ marginTop: 8, fontFamily: 'var(--adm-mono)', fontSize: 12 }}
        />
      </div>
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
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

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
    <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className={`${mobileView === 'list' ? 'grid' : 'hidden'} content-start gap-4 lg:grid`}>
        <SectionHeader title="Projecten" description="CRUD voor projecten, vertalingen en galerijen." />
        <button
          type="button"
          onClick={() => {
            const sortOrder = projects.length > 0 ? Math.max(...projects.map((project) => project.sortOrder)) + 1 : 0;
            const created = createEmptyProject(sortOrder);
            setDraft(created);
            setSelectionKey(`new:${Date.now()}`);
            setTranslationLocale('nl');
            setMobileView('detail');
          }}
          className="admin-btn-secondary"
        >
          Nieuw project
        </button>
        <div className="grid gap-2">
          {projects
            .slice()
            .sort((left, right) => left.sortOrder - right.sortOrder)
            .map((project) => (
              <button
                key={getSelectionKey(project)}
                type="button"
                onClick={() => {
                  setSelectionKey(getSelectionKey(project));
                  setMobileView('detail');
                }}
                className="admin-list-card"
                data-selected={selectionKey === getSelectionKey(project) || undefined}
              >
                <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}>
                  {project.translations.find((translation) => translation.locale === 'nl')?.title || project.slug}
                </p>
                <p
                  className="admin-eyebrow"
                  style={{ marginTop: 4 }}
                >
                  {project.category || 'Geen categorie'} · {project.sortOrder}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className={project.isPublished ? 'admin-chip-success' : 'admin-chip-neutral'}>
                    {project.isPublished ? 'Published' : 'Hidden'}
                  </span>
                  {project.featured ? <span className="admin-chip-warning">Featured</span> : null}
                  <span className="admin-chip-neutral">
                    {project.hasStoredValue ? 'Stored' : 'Default'}
                  </span>
                </div>
              </button>
            ))}
          {projects.length === 0 ? <EmptyState description="Nog geen projecten gevonden." compact /> : null}
        </div>
      </div>

      <div className={`${mobileView === 'detail' ? 'grid' : 'hidden'} min-w-0 gap-4 lg:grid`}>
        <BackToListButton onClick={() => setMobileView('list')} />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2
              className="admin-page-title break-words"
              style={{ fontSize: 18 }}
            >
              {draft ? draft.slug : 'Selecteer een project'}
            </h2>
            <p style={{ marginTop: 4, fontSize: 13, color: 'var(--adm-text-3)' }}>
              Cover, vertalingen en gallery-afbeeldingen blijven URL-based.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedProject?.id ? (
              <button
                type="button"
                onClick={() => {
                  if (selectedProject && window.confirm('Dit project verwijderen?')) {
                    void onDelete(selectedProject);
                  }
                }}
                className="admin-btn-danger admin-btn-sm"
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
              className="admin-btn-primary admin-btn-sm"
            >
              {saving ? 'Bezig…' : 'Opslaan'}
            </button>
          </div>
        </div>

        {draft ? (
          <div className="admin-card grid gap-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <LabeledInput label="Slug" value={draft.slug} onChange={(value) => setDraft((current) => current ? { ...current, slug: value } : current)} />
              <LabeledInput label="Categorie" value={draft.category} onChange={(value) => setDraft((current) => current ? { ...current, category: value } : current)} list="project-categories" />
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

            <div className="admin-card-muted">
              <p className="admin-eyebrow">Taal</p>
              <div className="admin-pill-row mt-3">
                {locales.map((entry) => (
                  <button
                    key={entry.value}
                    type="button"
                    onClick={() => setTranslationLocale(entry.value)}
                    className={`admin-pill ${translationLocale === entry.value ? 'admin-pill-active' : ''}`}
                  >
                    {entry.label}
                  </button>
                ))}
              </div>

              {activeTranslation ? (
                <div className="mt-4 grid gap-3">
                  <LabeledInput label="Titel" value={activeTranslation.title} onChange={(value) => updateTranslation('title', value)} />
                  <LabeledTextarea label="Korte beschrijving" value={activeTranslation.shortDescription ?? ''} onChange={(value) => updateTranslation('shortDescription', value)} rows={3} />
                  <LabeledTextarea label="Beschrijving" value={activeTranslation.description ?? ''} onChange={(value) => updateTranslation('description', value)} rows={5} />
                  <LabeledTextarea label="Challenge" value={activeTranslation.challengeText ?? ''} onChange={(value) => updateTranslation('challengeText', value)} rows={4} />
                  <LabeledTextarea label="Approach" value={activeTranslation.approachText ?? ''} onChange={(value) => updateTranslation('approachText', value)} rows={4} />
                  <LabeledTextarea label="Result" value={activeTranslation.resultText ?? ''} onChange={(value) => updateTranslation('resultText', value)} rows={4} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <LabeledInput label="Project type" value={activeTranslation.projectType ?? ''} onChange={(value) => updateTranslation('projectType', value)} />
                    <LabeledInput label="Duration" value={activeTranslation.duration ?? ''} onChange={(value) => updateTranslation('duration', value)} />
                    <LabeledInput label="Surface" value={activeTranslation.surface ?? ''} onChange={(value) => updateTranslation('surface', value)} />
                    <LabeledInput label="Completion date" value={activeTranslation.completionDate ?? ''} onChange={(value) => updateTranslation('completionDate', value)} />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="admin-section-title">Gallery</h3>
                <button
                  type="button"
                  onClick={() => setDraft((current) => current ? {
                    ...current,
                    images: [...current.images, { imageUrl: '', alt: '', caption: '', sortOrder: current.images.length, kind: 'gallery' }],
                  } : current)}
                  className="admin-btn-secondary admin-btn-sm"
                >
                  Afbeelding toevoegen
                </button>
              </div>
              {draft.images.map((image, index) => (
                <div key={`${image.imageUrl}-${index}`} className="admin-card-muted grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
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
                    className="admin-btn-danger admin-btn-sm justify-self-start"
                  >
                    Verwijderen
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : <EmptyState description="Selecteer of maak een project." />}
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
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionHeader title="Instellingen" description="Typed editors voor company, SEO en analytics." />
        <button
          type="button"
          disabled={saving}
          onClick={() => {
            setSaving(true);
            void onSave(drafts).finally(() => setSaving(false));
          }}
          className="admin-btn-primary admin-btn-sm"
        >
          {saving ? 'Bezig…' : 'Alles opslaan'}
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
        <div className="grid gap-3">
          <SectionHeader as="h2" title="Read-only keys" description="Onbekende setting-keys blijven read-only tot ze expliciet gemodelleerd zijn." />
          {unknown.map((setting) => (
            <details key={setting.key} className="admin-card-muted group">
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-3"
                style={{ fontSize: 13, fontWeight: 600, color: 'var(--adm-text)' }}
              >
                <span className="truncate" style={{ fontFamily: 'var(--adm-mono)', fontSize: 12.5 }}>{setting.key}</span>
                <span className="admin-eyebrow shrink-0 transition group-open:rotate-180">▾</span>
              </summary>
              <pre
                className="mt-3 max-w-full overflow-hidden whitespace-pre-wrap break-all p-4"
                style={{
                  background: 'var(--adm-text)',
                  color: 'var(--adm-surface)',
                  fontFamily: 'var(--adm-mono)',
                  fontSize: 12,
                  borderRadius: 6,
                }}
              >
                {JSON.stringify(setting.valueJson, null, 2)}
              </pre>
            </details>
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
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  const filteredAssets = useMemo(
    () => assets.filter((asset) => asset.originalName.toLowerCase().includes(search.toLowerCase())),
    [assets, search],
  );
  const activeSelectionId = selectionId ?? assets[0]?.id ?? null;
  const selectedAsset = activeSelectionId ? assets.find((asset) => asset.id === activeSelectionId) ?? null : null;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className={`${mobileView === 'list' ? 'grid' : 'hidden'} content-start gap-4 lg:grid`}>
        <SectionHeader title="Assets" description="Upload naar Supabase storage en koppel URLs in content/projecten." />
        <div className="admin-card">
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: storageEnabled ? 'var(--adm-success)' : 'var(--adm-warning)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: storageEnabled ? 'var(--adm-success)' : 'var(--adm-warning)',
              }}
            />
            {storageEnabled ? 'Supabase upload is actief.' : 'Upload is niet geconfigureerd. Je kunt wel externe URLs registreren.'}
          </p>
          {storageEnabled ? (
            <div className="mt-4 grid gap-3">
              <label className="grid gap-2" style={{ fontSize: 13, color: 'var(--adm-text-2)' }}>
                <span style={{ fontWeight: 500, color: 'var(--adm-text)' }}>Bestand</span>
                <input
                  type="file"
                  accept="image/*"
                  className="admin-file-input"
                  onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)}
                />
              </label>
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
                className="admin-btn-primary admin-btn-sm justify-self-start"
              >
                Upload asset
              </button>
            </div>
          ) : null}

          <div
            className="mt-5 pt-5 grid gap-3"
            style={{ borderTop: '1px solid var(--adm-border)' }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--adm-text)' }}>Externe URL registreren</p>
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
              className="admin-btn-secondary admin-btn-sm justify-self-start"
            >
              Registreer URL
            </button>
          </div>
        </div>

        <div className="admin-card-muted">
          <LabeledInput label="Zoeken" value={search} onChange={setSearch} />
          <div className="mt-4 grid gap-2">
            {filteredAssets.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  setSelectionId(asset.id);
                  setMobileView('detail');
                }}
                className="admin-list-card"
                data-selected={activeSelectionId === asset.id || undefined}
              >
                <p
                  className="break-words"
                  style={{ fontSize: 13, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}
                >
                  {asset.originalName}
                </p>
                <p style={{ marginTop: 4, fontSize: 12, color: 'var(--adm-text-3)' }}>
                  <span style={{ fontFamily: 'var(--adm-mono)' }}>{asset.bucket}</span> · {asset.tags.join(', ') || 'geen tags'}
                </p>
              </button>
            ))}
            {filteredAssets.length === 0 ? <EmptyState description="Geen assets gevonden." compact /> : null}
          </div>
        </div>
      </div>

      <div className={`${mobileView === 'detail' ? 'grid' : 'hidden'} min-w-0 gap-4 lg:grid`}>
        <BackToListButton onClick={() => setMobileView('list')} />
        <SectionHeader as="h2" title={selectedAsset?.originalName ?? 'Selecteer een asset'} description="Metadata aanpassen en URL kopiëren." />
        {selectedAsset ? (
          <AssetEditor
            key={selectedAsset.id}
            asset={selectedAsset}
            onSave={onSave}
            onDelete={onDelete}
          />
        ) : <EmptyState description="Selecteer een asset om metadata te beheren." />}
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
    <div className="admin-card grid gap-4">
      {draft.mimeType.startsWith('image/') ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={draft.url}
          alt={draft.alt ?? draft.originalName}
          className="h-48 w-full object-contain md:h-64"
          style={{ background: 'var(--adm-surface-2)', borderRadius: 6, border: '1px solid var(--adm-border)' }}
        />
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
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
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(draft.url);
            setCopyState(true);
            window.setTimeout(() => setCopyState(false), 1200);
          }}
          className="admin-btn-secondary admin-btn-sm"
        >
          {copyState ? 'Gekopieerd ✓' : 'Kopieer URL'}
        </button>
        <button
          type="button"
          onClick={() => {
            void onSave(draft);
          }}
          className="admin-btn-primary admin-btn-sm"
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
          className="admin-btn-danger admin-btn-sm"
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
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionHeader title="Beschikbaarheid" description="Weekrooster per dag en aparte uitzonderingen." />
        <button
          type="button"
          disabled={savingRules}
          onClick={() => {
            setSavingRules(true);
            void onSaveRules(ruleDrafts).finally(() => setSavingRules(false));
          }}
          className="admin-btn-primary admin-btn-sm"
        >
          {savingRules ? 'Bezig…' : 'Rooster opslaan'}
        </button>
      </div>

      <div className="grid gap-3">
        {ruleDrafts.map((rule) => (
          <div key={rule.dayOfWeek} className="admin-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}>{weekdays[rule.dayOfWeek]}</p>
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

      <div className="admin-card grid gap-4">
        <SectionHeader as="h2" title="Uitzonderingen" description="Blokkeer specifieke data of volledige dagen." />

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] md:items-end">
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
            className="admin-btn-primary sm:col-span-2 md:col-span-1"
          >
            Uitzondering toevoegen
          </button>
        </div>

        <div className="admin-card-muted">
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
              <div key={exception.id} className="admin-card-muted">
                <div className="grid gap-3 sm:grid-cols-2">
                  <LabeledInput label="Datum" value={source.date} onChange={(value) => setEditingException({ ...source, date: value })} type="date" />
                  <LabeledInput label="Reason" value={source.reason ?? ''} onChange={(value) => setEditingException({ ...source, reason: value })} />
                </div>
                <div
                  className="mt-4 p-4"
                  style={{
                    border: '1px solid var(--adm-border)',
                    background: 'var(--adm-surface)',
                    borderRadius: 6,
                  }}
                >
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
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      void onUpdateException(source);
                    }}
                    className="admin-btn-primary admin-btn-sm"
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
                    className="admin-btn-danger admin-btn-sm"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            );
          })}
          {exceptions.length === 0 ? <EmptyState description="Nog geen uitzonderingen ingesteld." compact /> : null}
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
  statusOptions: ReadonlyArray<string>;
  onSave: (status: string, note: string) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [internalNote, setInternalNote] = useState(note);
  const [saving, setSaving] = useState(false);

  return (
    <div className="admin-card grid gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}>{title}</p>
          <p
            className="mt-0.5 break-words"
            style={{ fontSize: 13, color: 'var(--adm-text-3)' }}
          >
            {subtitle}
          </p>
        </div>
        <StatusChip status={currentStatus} />
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,180px)_1fr]">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="admin-input">
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          value={internalNote}
          onChange={(event) => setInternalNote(event.target.value)}
          placeholder="Admin note"
          className="admin-input"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            await onSave(status, internalNote);
            setSaving(false);
          }}
          className="admin-btn-primary flex-1 sm:flex-none"
        >
          {saving ? 'Bezig…' : 'Opslaan'}
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Dit record verwijderen?')) {
              void onDelete();
            }
          }}
          className="admin-btn-danger flex-1 sm:flex-none"
        >
          Verwijderen
        </button>
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const upper = status.toUpperCase();
  const variant =
    upper === 'NEW' || upper === 'PENDING'
      ? 'admin-chip-info'
      : upper === 'CONFIRMED' || upper === 'WON' || upper === 'COMPLETED'
        ? 'admin-chip-success'
        : upper === 'RESCHEDULED' || upper === 'NEGOTIATING' || upper === 'CONTACTED' || upper === 'SITE_VISIT' || upper === 'QUOTE_SENT'
          ? 'admin-chip-warning'
          : upper === 'REJECTED' || upper === 'CANCELLED' || upper === 'LOST' || upper === 'NO_SHOW'
            ? 'admin-chip-danger'
            : 'admin-chip-neutral';
  return <span className={variant}>{status}</span>;
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
    <div className="admin-card grid gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            style={{
              fontFamily: 'var(--adm-mono)',
              fontSize: 12.5,
              fontWeight: 500,
              color: 'var(--adm-text-3)',
              letterSpacing: '-0.005em',
            }}
          >
            {appointment.referenceNumber}
          </p>
          <p
            className="mt-1 break-words"
            style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}
          >
            {appointment.fullName} · {appointment.email}
          </p>
          <p style={{ marginTop: 2, fontSize: 12.5, color: 'var(--adm-text-3)' }}>
            {formatDate(appointment.appointmentDate)} · {appointment.appointmentTime}
          </p>
        </div>
        <StatusChip status={appointment.status} />
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,180px)_1fr]">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="admin-input">
          {appointmentStatusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          value={internalNote}
          onChange={(event) => setInternalNote(event.target.value)}
          placeholder="Admin note"
          className="admin-input"
        />
      </div>
      {status === 'RESCHEDULED' ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <LabeledInput label="Voorgestelde datum" value={proposedDate} onChange={setProposedDate} type="date" />
          <LabeledInput label="Voorgestelde tijd" value={proposedTime} onChange={setProposedTime} type="time" />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
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
          className="admin-btn-primary flex-1 sm:flex-none"
        >
          {saving ? 'Bezig…' : 'Opslaan'}
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Deze afspraak verwijderen?')) {
              void onDelete();
            }
          }}
          className="admin-btn-danger flex-1 sm:flex-none"
        >
          Verwijderen
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ background: 'var(--adm-overlay)' }}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden sm:rounded-lg"
        style={{
          background: 'var(--adm-surface)',
          border: '1px solid var(--adm-border)',
          boxShadow: 'var(--adm-shadow-lg)',
          borderRadius: 8,
        }}
      >
        <div
          className="flex items-center justify-between gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--adm-border)' }}
        >
          <div className="min-w-0 flex-1">
            <p
              className="truncate"
              style={{ fontSize: 16, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.01em' }}
            >
              {title}
            </p>
            <p style={{ marginTop: 2, fontSize: 12.5, color: 'var(--adm-text-3)' }}>Kies een bestaande asset.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="admin-btn-secondary admin-btn-sm"
            aria-label="Sluiten"
          >
            Sluiten
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <LabeledInput label="Zoeken" value={search} onChange={setSearch} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => onSelect(asset)}
                className="admin-asset-tile group text-left"
              >
                {asset.mimeType.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.url}
                    alt={asset.alt ?? asset.originalName}
                    className="h-32 w-full object-cover sm:h-40"
                    style={{ background: 'var(--adm-surface-2)', borderRadius: 4 }}
                  />
                ) : null}
                <p
                  className="mt-3 truncate"
                  style={{ fontSize: 13, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}
                >
                  {asset.originalName}
                </p>
                <p
                  className="mt-1 truncate"
                  style={{ fontSize: 12, color: 'var(--adm-text-3)' }}
                >
                  {asset.tags.join(', ') || 'geen tags'}
                </p>
              </button>
            ))}
            {filtered.length === 0 ? <EmptyState description="Geen assets gevonden." compact /> : null}
          </div>
        </div>
      </div>
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
    <div className="admin-card grid gap-4">
      <div>
        <p className="admin-section-title">{title}</p>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--adm-text-3)' }}>{description}</p>
      </div>
      {children}
    </div>
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
        className="admin-btn-secondary admin-btn-sm justify-self-start"
      >
        Kies uit assets
      </button>
    </div>
  );
}

function BackToListButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="admin-btn-ghost admin-btn-sm lg:hidden"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Terug naar overzicht
    </button>
  );
}
