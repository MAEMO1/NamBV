'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Loader2 } from 'lucide-react';
import { trackV2Conversion } from './MarketingAnalytics';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';
import { getTopServiceIdForQuoteServiceSlug, type TopServiceId } from '@/lib/v2/services';

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
  const qc = copy.quote;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    website: '',
    postalCode: '',
    city: '',
    propertyTypeId: propertyTypes[0]?.id ?? '',
    serviceTypeIds: [] as string[],
    description: '',
    preferredStart: '',
    budgetRange: '',
    gdprConsent: false,
  });
  const [state, setState] = useState<{ loading: boolean; success: string | null; error: string | null; referenceNumber: string | null }>({
    loading: false,
    success: null,
    error: null,
    referenceNumber: null,
  });

  const budgetOptions = useMemo(
    () => [
      { value: 'UNDER_10K', label: '< \u20AC10.000' },
      { value: 'RANGE_10K_25K', label: '\u20AC10.000 \u2013 \u20AC25.000' },
      { value: 'RANGE_25K_50K', label: '\u20AC25.000 \u2013 \u20AC50.000' },
      { value: 'RANGE_50K_100K', label: '\u20AC50.000 \u2013 \u20AC100.000' },
      { value: 'OVER_100K', label: '> \u20AC100.000' },
      { value: 'UNKNOWN', label: locale === 'fr' ? 'Pas encore d\u00e9fini' : locale === 'en' ? 'Not sure yet' : 'Nog niet bepaald' },
    ],
    [locale],
  );

  const groupedServices = useMemo(() => {
    const groups = new Map<TopServiceId, FormOption[]>(
      qc.serviceCategories.map((category) => [category.id, []]),
    );

    for (const service of serviceTypes) {
      const categoryId = getTopServiceIdForQuoteServiceSlug(service.slug) ?? 'anders';
      const current = groups.get(categoryId) ?? [];
      current.push(service);
      groups.set(categoryId, current);
    }

    return groups;
  }, [qc.serviceCategories, serviceTypes]);

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
    setState({ loading: true, success: null, error: null, referenceNumber: null });

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

      setState({ loading: false, success: qc.success, error: null, referenceNumber: data.referenceNumber ?? null });
    } catch (error) {
      setState({
        loading: false,
        success: null,
        error: error instanceof Error ? error.message : 'Unexpected error',
        referenceNumber: null,
      });
    }
  };

  const reset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      website: '',
      postalCode: '',
      city: '',
      propertyTypeId: propertyTypes[0]?.id ?? '',
      serviceTypeIds: [],
      description: '',
      preferredStart: '',
      budgetRange: '',
      gdprConsent: false,
    });
    setState({ loading: false, success: null, error: null, referenceNumber: null });
  };

  if (state.success) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-accent-100 animate-scale-in">
          <CheckCircle2 className="h-14 w-14 text-accent-600" />
        </div>
        <h2 className="text-display-md font-display font-bold italic text-noir-900">{state.success}</h2>
        {state.referenceNumber && (
          <p className="mt-4 text-sm text-noir-500">
            Ref: <span className="font-mono font-semibold text-noir-700">{state.referenceNumber}</span>
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          className="mt-10 text-sm font-medium text-accent-600 hover:text-accent-700 hover:underline"
        >
          {qc.newQuote}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative">
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(event) => updateField('website', event.target.value)}
          />
        </label>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Section 1: Contact */}
        <SectionLabel number={1} title={qc.sectionLabels[0]} />
        <div className="mt-6 space-y-3">
          <InputField placeholder={`${qc.fields.fullName} *`} value={formData.fullName} onChange={(v) => updateField('fullName', v)} required />
          <div className="grid gap-3 sm:grid-cols-2">
            <InputField placeholder={`${qc.fields.email} *`} type="email" value={formData.email} onChange={(v) => updateField('email', v)} required />
            <InputField placeholder={`${qc.fields.phone} *`} value={formData.phone} onChange={(v) => updateField('phone', v)} required />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <InputField placeholder={`${qc.fields.postalCode} *`} value={formData.postalCode} onChange={(v) => updateField('postalCode', v)} required />
            <InputField placeholder={qc.fields.city} value={formData.city} onChange={(v) => updateField('city', v)} />
          </div>
        </div>

        {/* Section 2: Property & Services */}
        <div className="mt-14">
          <SectionLabel number={2} title={qc.sectionLabels[1]} />

          {/* Property type pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {propertyTypes.map((pt) => {
              const active = formData.propertyTypeId === pt.id;
              return (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => updateField('propertyTypeId', pt.id)}
                  className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-sm'
                      : 'border-noir-200 text-noir-500 hover:border-noir-300 hover:text-noir-700'
                  }`}
                >
                  {pt.name}
                </button>
              );
            })}
          </div>

          {/* Service type toggles — grouped by category */}
          <p className="mt-8 text-sm font-medium text-noir-500">{qc.fields.serviceTypeIds}</p>
          <div className="mt-3 space-y-5">
            {qc.serviceCategories.map((category) => {
              const categoryServices = groupedServices.get(category.id) ?? [];
              if (categoryServices.length === 0) return null;
              return (
                <div key={category.id}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-noir-300">{category.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryServices.map((service) => {
                      const active = formData.serviceTypeIds.includes(service.id);
                      return (
                        <button
                          type="button"
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                            active
                              ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-sm'
                              : 'border-noir-200 text-noir-500 hover:border-noir-300 hover:text-noir-700'
                          }`}
                        >
                          <div className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                            active ? 'border-accent-500 bg-accent-500 text-white' : 'border-noir-300'
                          }`}>
                            {active && <Check className="h-2.5 w-2.5" />}
                          </div>
                          {service.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Project details */}
        <div className="mt-14">
          <SectionLabel number={3} title={qc.sectionLabels[2]} />
          <div className="mt-6 space-y-3">
            <InputField
              placeholder={`${qc.fields.description} *`}
              value={formData.description}
              onChange={(v) => updateField('description', v)}
              multiline
              required
            />
            <InputField
              placeholder={qc.fields.preferredStart}
              value={formData.preferredStart}
              onChange={(v) => updateField('preferredStart', v)}
            />
          </div>

          {/* Budget range pills */}
          <p className="mt-8 text-sm font-medium text-noir-500">{qc.fields.budgetRange}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {budgetOptions.map((option) => {
              const active = formData.budgetRange === option.value;
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => updateField('budgetRange', active ? '' : option.value)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-sm'
                      : option.value === 'UNKNOWN'
                        ? 'border-dashed border-noir-300 text-noir-400 hover:border-noir-400 hover:text-noir-600'
                        : 'border-noir-200 text-noir-500 hover:border-noir-300 hover:text-noir-700'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Confirmation */}
        <div className="mt-14">
          <SectionLabel number={4} title={qc.sectionLabels[3]} />

          {/* GDPR consent */}
          <button
            type="button"
            onClick={() => updateField('gdprConsent', !formData.gdprConsent)}
            className="mt-6 flex w-full items-start gap-3 text-left text-sm text-noir-500 transition hover:text-noir-700"
          >
            <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
              formData.gdprConsent
                ? 'border-accent-500 bg-accent-500 text-white'
                : 'border-noir-300'
            }`}>
              {formData.gdprConsent && <Check className="h-3 w-3" />}
            </div>
            <span>{qc.fields.gdprConsent}</span>
          </button>
          {/* Hidden required checkbox for form validation */}
          <input
            type="checkbox"
            checked={formData.gdprConsent}
            onChange={() => {}}
            required
            className="sr-only"
            tabIndex={-1}
          />

          {state.error && (
            <p className="mt-6 rounded-xl bg-red-50 px-6 py-3 text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={state.loading || !formData.gdprConsent}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-accent-600/20 transition-all hover:bg-accent-700 hover:shadow-xl hover:shadow-accent-600/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {state.loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {copy.common.loading}
              </>
            ) : (
              <>
                <span>{qc.submit}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ─── Sub-components ─── */

function SectionLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-noir-100 text-xs font-bold text-noir-500">
        {number}
      </span>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-noir-500">{title}</h3>
    </div>
  );
}

function InputField({
  placeholder,
  type = 'text',
  value,
  onChange,
  multiline,
  required,
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
}) {
  const className = 'w-full border-b-2 border-l-2 border-t-0 border-r-0 border-b-noir-100 border-l-transparent bg-transparent py-4 pl-4 text-base text-noir-900 outline-none transition-all duration-300 placeholder:text-noir-300 focus:border-b-accent-500 focus:border-l-accent-500';
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
        className={`${className} min-h-32 resize-none`}
      />
    );
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={className}
    />
  );
}
