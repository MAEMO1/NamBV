'use client';

import { useMemo, useState } from 'react';

type AdminSnapshot = {
  quotes: Array<Record<string, unknown>>;
  appointments: Array<Record<string, unknown>>;
  sections: Array<Record<string, unknown>>;
  projects: Array<Record<string, unknown>>;
  assets: Array<Record<string, unknown>>;
  settings: Array<Record<string, unknown>>;
  availability: {
    rules: Array<Record<string, unknown>>;
    exceptions: Array<Record<string, unknown>>;
  };
  analytics: {
    totals: {
      quotes: number;
      appointments: number;
    };
    quoteStatuses: Array<Record<string, unknown>>;
    appointmentStatuses: Array<Record<string, unknown>>;
  };
};

const modules = [
  'analytics',
  'quotes',
  'appointments',
  'availability',
  'projects',
  'content',
  'assets',
  'settings',
] as const;

const quoteStatusOptions = ['NEW', 'CONTACTED', 'SITE_VISIT', 'QUOTE_SENT', 'NEGOTIATING', 'WON', 'LOST', 'CANCELLED'];
const appointmentStatusOptions = ['PENDING', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED', 'REJECTED', 'NO_SHOW'];

type ModuleKey = (typeof modules)[number];

export default function AdminConsole({
  initialData,
  adminName,
}: {
  initialData: AdminSnapshot;
  adminName: string;
}) {
  const [activeModule, setActiveModule] = useState<ModuleKey>('analytics');
  const [data, setData] = useState(initialData);
  const [availabilityText, setAvailabilityText] = useState<string>(
    JSON.stringify(initialData.availability, null, 2),
  );
  const [projectsText, setProjectsText] = useState<string>(JSON.stringify(initialData.projects, null, 2));
  const [contentText, setContentText] = useState<string>(JSON.stringify(initialData.sections, null, 2));
  const [assetsText, setAssetsText] = useState<string>(JSON.stringify(initialData.assets, null, 2));
  const [settingsText, setSettingsText] = useState<string>(JSON.stringify(initialData.settings, null, 2));
  const [saveState, setSaveState] = useState<Record<string, string | null>>({});

  const counts = useMemo(
    () => ({
      quotes: data.quotes.length,
      appointments: data.appointments.length,
    }),
    [data],
  );

  async function saveJson(endpoint: string, rawValue: string, onSuccess: () => void) {
    setSaveState((current) => ({ ...current, [endpoint]: 'Saving...' }));
    try {
      const parsed = JSON.parse(rawValue);
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Save failed');
      }

      setSaveState((current) => ({ ...current, [endpoint]: 'Saved' }));
      onSuccess();
      setTimeout(() => {
        setSaveState((current) => ({ ...current, [endpoint]: null }));
      }, 1500);
    } catch (error) {
      setSaveState((current) => ({
        ...current,
        [endpoint]: error instanceof Error ? error.message : 'Save failed',
      }));
    }
  }

  async function refreshEndpoint(endpoint: string, key: keyof AdminSnapshot) {
    const response = await fetch(endpoint);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Refresh failed');
    }

    setData((current) => ({ ...current, [key]: result[key] }));
  }

  async function refreshAvailability() {
    const response = await fetch('/api/v2/admin/availability');
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Refresh failed');
    }
    setData((current) => ({ ...current, availability: result }));
    setAvailabilityText(JSON.stringify(result, null, 2));
  }

  async function updateQuote(quoteId: string, status: string, adminNotes: string) {
    await fetch(`/api/v2/admin/quotes/${quoteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });
    await refreshEndpoint('/api/v2/admin/quotes', 'quotes');
  }

  async function updateAppointment(appointmentId: string, status: string, adminNotes: string) {
    await fetch(`/api/v2/admin/appointments/${appointmentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });
    await refreshEndpoint('/api/v2/admin/appointments', 'appointments');
  }

  async function signOut() {
    await fetch('/api/v2/admin/session', { method: 'DELETE' });
    window.location.href = '/admin-v2/login';
  }

  return (
    <div className="min-h-screen bg-noir-50">
      <div className="border-b border-noir-200 bg-white">
        <div className="container-wide flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-noir-900">Admin v2</h1>
            <p className="text-sm text-noir-600">Ingelogd als {adminName}. Legacy blijft parallel bestaan.</p>
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
            {modules.map((moduleKey) => (
              <button
                key={moduleKey}
                type="button"
                onClick={() => setActiveModule(moduleKey)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeModule === moduleKey ? 'bg-accent-600 text-white' : 'text-noir-700 hover:bg-noir-100'
                }`}
              >
                {moduleKey}
                {moduleKey === 'quotes' ? <span className="ml-2 text-xs opacity-75">({counts.quotes})</span> : null}
                {moduleKey === 'appointments' ? <span className="ml-2 text-xs opacity-75">({counts.appointments})</span> : null}
              </button>
            ))}
          </div>
        </aside>

        <main className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft lg:p-8">
          {activeModule === 'analytics' ? (
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <StatCard label="Quotes" value={data.analytics.totals.quotes} />
                <StatCard label="Appointments" value={data.analytics.totals.appointments} />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <StatusList title="Quote statuses" items={data.analytics.quoteStatuses} />
                <StatusList title="Appointment statuses" items={data.analytics.appointmentStatuses} />
              </div>
            </div>
          ) : null}

          {activeModule === 'quotes' ? (
            <div className="grid gap-4">
              {data.quotes.map((quote) => (
                <RecordCard
                  key={String(quote.id)}
                  title={String(quote.referenceNumber)}
                  subtitle={`${quote.fullName ?? ''} · ${quote.email ?? ''}`}
                  currentStatus={String(quote.status)}
                  note={String(quote.adminNotes ?? '')}
                  options={quoteStatusOptions}
                  onSave={(status, note) => updateQuote(String(quote.id), status, note)}
                />
              ))}
            </div>
          ) : null}

          {activeModule === 'appointments' ? (
            <div className="grid gap-4">
              {data.appointments.map((appointment) => (
                <RecordCard
                  key={String(appointment.id)}
                  title={String(appointment.referenceNumber)}
                  subtitle={`${appointment.fullName ?? ''} · ${appointment.appointmentDate ? new Date(String(appointment.appointmentDate)).toLocaleDateString() : ''}`}
                  currentStatus={String(appointment.status)}
                  note={String(appointment.adminNotes ?? '')}
                  options={appointmentStatusOptions}
                  onSave={(status, note) => updateAppointment(String(appointment.id), status, note)}
                />
              ))}
            </div>
          ) : null}

          {activeModule === 'availability' ? (
            <JsonEditor
              title="Beschikbaarheid"
              value={availabilityText || JSON.stringify({ rules: [], exceptions: [] }, null, 2)}
              onChange={setAvailabilityText}
              status={saveState['/api/v2/admin/availability'] ?? null}
              onRefresh={async () => {
                await refreshAvailability();
              }}
              onSave={async () => {
                await saveJson('/api/v2/admin/availability', availabilityText || JSON.stringify({ rules: [], exceptions: [] }), refreshAvailability);
              }}
            />
          ) : null}

          {activeModule === 'projects' ? (
            <JsonEditor
              title="Projecten"
              value={projectsText}
              onChange={setProjectsText}
              status={saveState['/api/v2/admin/projects'] ?? null}
              onRefresh={async () => {
                const response = await fetch('/api/v2/admin/projects');
                const result = await response.json();
                setProjectsText(JSON.stringify(result.projects, null, 2));
                setData((current) => ({ ...current, projects: result.projects }));
              }}
              onSave={async () => {
                await saveJson('/api/v2/admin/projects', projectsText, async () => {
                  const response = await fetch('/api/v2/admin/projects');
                  const result = await response.json();
                  setProjectsText(JSON.stringify(result.projects, null, 2));
                  setData((current) => ({ ...current, projects: result.projects }));
                });
              }}
            />
          ) : null}

          {activeModule === 'content' ? (
            <JsonEditor
              title="Page sections"
              value={contentText}
              onChange={setContentText}
              status={saveState['/api/v2/admin/content'] ?? null}
              onRefresh={async () => {
                const response = await fetch('/api/v2/admin/content');
                const result = await response.json();
                setContentText(JSON.stringify(result.sections, null, 2));
                setData((current) => ({ ...current, sections: result.sections }));
              }}
              onSave={async () => {
                await saveJson('/api/v2/admin/content', contentText, async () => {
                  const response = await fetch('/api/v2/admin/content');
                  const result = await response.json();
                  setContentText(JSON.stringify(result.sections, null, 2));
                  setData((current) => ({ ...current, sections: result.sections }));
                });
              }}
            />
          ) : null}

          {activeModule === 'assets' ? (
            <JsonEditor
              title="Assets"
              value={assetsText}
              onChange={setAssetsText}
              status={saveState['/api/v2/admin/assets'] ?? null}
              onRefresh={async () => {
                const response = await fetch('/api/v2/admin/assets');
                const result = await response.json();
                setAssetsText(JSON.stringify(result.assets, null, 2));
                setData((current) => ({ ...current, assets: result.assets }));
              }}
              onSave={async () => {
                await saveJson('/api/v2/admin/assets', assetsText, async () => {
                  const response = await fetch('/api/v2/admin/assets');
                  const result = await response.json();
                  setAssetsText(JSON.stringify(result.assets, null, 2));
                  setData((current) => ({ ...current, assets: result.assets }));
                });
              }}
            />
          ) : null}

          {activeModule === 'settings' ? (
            <JsonEditor
              title="Settings"
              value={settingsText}
              onChange={setSettingsText}
              status={saveState['/api/v2/admin/settings'] ?? null}
              onRefresh={async () => {
                const response = await fetch('/api/v2/admin/settings');
                const result = await response.json();
                setSettingsText(JSON.stringify(result.settings, null, 2));
                setData((current) => ({ ...current, settings: result.settings }));
              }}
              onSave={async () => {
                await saveJson('/api/v2/admin/settings', settingsText, async () => {
                  const response = await fetch('/api/v2/admin/settings');
                  const result = await response.json();
                  setSettingsText(JSON.stringify(result.settings, null, 2));
                  setData((current) => ({ ...current, settings: result.settings }));
                });
              }}
            />
          ) : null}
        </main>
      </div>
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

function StatusList({ title, items }: { title: string; items: Array<Record<string, unknown>> }) {
  return (
    <div className="rounded-3xl border border-noir-200 p-5">
      <p className="text-sm font-semibold text-noir-900">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="flex items-center justify-between rounded-2xl bg-noir-50 px-4 py-3 text-sm text-noir-700">
            <span>{String(item.status ?? 'unknown')}</span>
            <span className="font-semibold">{Number(item._count ?? 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecordCard({
  title,
  subtitle,
  currentStatus,
  note,
  options,
  onSave,
}: {
  title: string;
  subtitle: string;
  currentStatus: string;
  note: string;
  options: string[];
  onSave: (status: string, note: string) => Promise<void>;
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
      <div className="grid gap-4 md:grid-cols-[200px_1fr_auto]">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className={inputClassName}>
          {options.map((option) => (
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
      </div>
    </div>
  );
}

function JsonEditor({
  title,
  value,
  onChange,
  onSave,
  onRefresh,
  status,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => Promise<void>;
  onRefresh: () => Promise<void>;
  status: string | null;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-display font-bold text-noir-900">{title}</h2>
        <div className="flex gap-3">
          <button type="button" onClick={onRefresh} className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300">
            Refresh
          </button>
          <button type="button" onClick={onSave} className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700">
            Save JSON
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[520px] w-full rounded-3xl border border-noir-200 bg-noir-950 p-4 font-mono text-sm text-white outline-none"
      />
      {status ? <p className="text-sm text-noir-500">{status}</p> : null}
    </div>
  );
}

const inputClassName =
  'w-full rounded-2xl border border-noir-200 bg-white px-4 py-3 text-sm text-noir-900 outline-none transition focus:border-accent-500';
