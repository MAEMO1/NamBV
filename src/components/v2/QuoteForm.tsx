'use client';

import { useMemo, useState } from 'react';
import { trackV2Conversion } from './MarketingAnalytics';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';

type FormOption = { id: string; name: string; slug: string; icon?: string | null };

export default function V2QuoteForm({
  locale,
  serviceTypes,
  propertyTypes,
}: {
  locale: V2Locale;
  serviceTypes: FormOption[];
  propertyTypes: FormOption[];
}) {
  const copy = getV2UiCopy(locale);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    postalCode: '',
    city: '',
    propertyTypeId: propertyTypes[0]?.id ?? '',
    serviceTypeIds: [] as string[],
    description: '',
    preferredStart: '',
    budgetRange: '',
    gdprConsent: false,
  });
  const [state, setState] = useState<{ loading: boolean; success: string | null; error: string | null }>({
    loading: false,
    success: null,
    error: null,
  });

  const budgetOptions = useMemo(
    () => [
      { value: 'UNDER_10K', label: '< €10.000' },
      { value: 'RANGE_10K_25K', label: '€10.000 - €25.000' },
      { value: 'RANGE_25K_50K', label: '€25.000 - €50.000' },
      { value: 'RANGE_50K_100K', label: '€50.000 - €100.000' },
      { value: 'OVER_100K', label: '> €100.000' },
      { value: 'UNKNOWN', label: locale === 'fr' ? 'Pas encore défini' : locale === 'en' ? 'Not sure yet' : 'Nog niet bepaald' },
    ],
    [locale],
  );

  const updateField = (key: keyof typeof formData, value: string | boolean | string[]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const toggleService = (serviceId: string) => {
    setFormData((current) => ({
      ...current,
      serviceTypeIds: current.serviceTypeIds.includes(serviceId)
        ? current.serviceTypeIds.filter((id) => id !== serviceId)
        : [...current.serviceTypeIds, serviceId],
    }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState({ loading: true, success: null, error: null });

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          budgetRange: formData.budgetRange || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Quote submission failed');
      }

      trackV2Conversion('generate_lead', {
        lead_type: 'quote',
        reference_number: data.referenceNumber,
      });

      setState({ loading: false, success: copy.quote.success, error: null });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        postalCode: '',
        city: '',
        propertyTypeId: propertyTypes[0]?.id ?? '',
        serviceTypeIds: [],
        description: '',
        preferredStart: '',
        budgetRange: '',
        gdprConsent: false,
      });
    } catch (error) {
      setState({
        loading: false,
        success: null,
        error: error instanceof Error ? error.message : 'Unexpected error',
      });
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-6 rounded-3xl border border-noir-200 bg-white p-6 shadow-soft lg:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={copy.quote.fields.fullName}>
          <input value={formData.fullName} onChange={(event) => updateField('fullName', event.target.value)} required className={inputClassName} />
        </Field>
        <Field label={copy.quote.fields.email}>
          <input type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} required className={inputClassName} />
        </Field>
        <Field label={copy.quote.fields.phone}>
          <input value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} required className={inputClassName} />
        </Field>
        <Field label={copy.quote.fields.postalCode}>
          <input value={formData.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} required className={inputClassName} />
        </Field>
        <Field label={copy.quote.fields.city}>
          <input value={formData.city} onChange={(event) => updateField('city', event.target.value)} className={inputClassName} />
        </Field>
        <Field label={copy.quote.fields.propertyTypeId}>
          <select value={formData.propertyTypeId} onChange={(event) => updateField('propertyTypeId', event.target.value)} className={inputClassName}>
            {propertyTypes.map((propertyType) => (
              <option key={propertyType.id} value={propertyType.id}>
                {propertyType.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-noir-700">{copy.quote.fields.serviceTypeIds}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceTypes.map((service) => {
            const active = formData.serviceTypeIds.includes(service.id);
            return (
              <button
                type="button"
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  active ? 'border-accent-600 bg-accent-50 text-accent-800' : 'border-noir-200 text-noir-700 hover:border-noir-300'
                }`}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </div>

      <Field label={copy.quote.fields.description}>
        <textarea
          value={formData.description}
          onChange={(event) => updateField('description', event.target.value)}
          required
          rows={5}
          className={`${inputClassName} min-h-36`}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={copy.quote.fields.preferredStart}>
          <input value={formData.preferredStart} onChange={(event) => updateField('preferredStart', event.target.value)} className={inputClassName} />
        </Field>
        <Field label={copy.quote.fields.budgetRange}>
          <select value={formData.budgetRange} onChange={(event) => updateField('budgetRange', event.target.value)} className={inputClassName}>
            <option value="">-</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-noir-200 bg-noir-50 px-4 py-3 text-sm text-noir-700">
        <input
          type="checkbox"
          checked={formData.gdprConsent}
          onChange={(event) => updateField('gdprConsent', event.target.checked)}
          required
          className="mt-1"
        />
        <span>{copy.quote.fields.gdprConsent}</span>
      </label>

      {state.error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p> : null}
      {state.success ? <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">{state.success}</p> : null}

      <button
        type="submit"
        disabled={state.loading}
        className="rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.loading ? copy.common.loading : copy.quote.submit}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-noir-700">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  'w-full rounded-2xl border border-noir-200 bg-white px-4 py-3 text-sm text-noir-900 outline-none transition focus:border-accent-500';
