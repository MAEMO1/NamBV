'use client';

import { useEffect, useMemo, useState } from 'react';
import { trackV2Conversion } from './MarketingAnalytics';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';

type AvailabilityMap = Record<string, { available: string[]; booked: string[]; isOpen: boolean }>;

export default function V2AppointmentForm({
  locale,
}: {
  locale: V2Locale;
}) {
  const copy = getV2UiCopy(locale);
  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gemeente: '',
    selectedTime: '',
    projectType: '',
    propertyType: '',
    propertyAge: '',
    priorities: [] as string[],
    materialPreference: '',
    budget: '',
    timing: '',
    subsidyInterest: false,
    paymentSpread: false,
    motivation: '',
    message: '',
  });
  const [state, setState] = useState<{ loading: boolean; success: string | null; error: string | null }>({
    loading: false,
    success: null,
    error: null,
  });

  useEffect(() => {
    const month = new Date().toISOString().slice(0, 7);
    void loadMonth(month);
  }, []);

  const selectedMonth = selectedDate ? selectedDate.slice(0, 7) : new Date().toISOString().slice(0, 7);

  async function loadMonth(month: string) {
    const response = await fetch(`/api/v2/public/availability?month=${month}`);
    const data = await response.json();
    if (response.ok) {
      setAvailability((current) => ({ ...current, ...data.availability }));
    }
  }

  const availableSlots = useMemo(() => availability[selectedDate]?.available ?? [], [availability, selectedDate]);

  const updateField = (key: keyof typeof formData, value: string | boolean | string[]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState({ loading: true, success: null, error: null });

    try {
      const response = await fetch('/api/v2/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedDate,
          selectedTime: formData.selectedTime,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Appointment submission failed');
      }

      trackV2Conversion('schedule_consultation', {
        lead_type: 'appointment',
        reference_number: data.referenceNumber,
      });

      setState({ loading: false, success: copy.appointment.success, error: null });
      setSelectedDate('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        gemeente: '',
        selectedTime: '',
        projectType: '',
        propertyType: '',
        propertyAge: '',
        priorities: [],
        materialPreference: '',
        budget: '',
        timing: '',
        subsidyInterest: false,
        paymentSpread: false,
        motivation: '',
        message: '',
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
        <Field label={copy.appointment.fields.name}>
          <input value={formData.name} onChange={(event) => updateField('name', event.target.value)} required className={inputClassName} />
        </Field>
        <Field label={copy.appointment.fields.email}>
          <input type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} required className={inputClassName} />
        </Field>
        <Field label={copy.appointment.fields.phone}>
          <input value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} required className={inputClassName} />
        </Field>
        <Field label={copy.appointment.fields.gemeente}>
          <input value={formData.gemeente} onChange={(event) => updateField('gemeente', event.target.value)} required className={inputClassName} />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={copy.appointment.fields.selectedDate}>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={async (event) => {
              const nextDate = event.target.value;
              setSelectedDate(nextDate);
              updateField('selectedTime', '');
              if (nextDate) {
                const nextMonth = nextDate.slice(0, 7);
                if (!availability[nextDate]) {
                  await loadMonth(nextMonth);
                } else if (nextMonth !== selectedMonth) {
                  await loadMonth(nextMonth);
                }
              }
            }}
            required
            className={inputClassName}
          />
        </Field>
        <Field label={copy.appointment.fields.selectedTime}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availableSlots.length > 0 ? availableSlots.map((slot) => {
              const active = formData.selectedTime === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => updateField('selectedTime', slot)}
                  className={`rounded-2xl border px-3 py-3 text-sm transition ${
                    active ? 'border-accent-600 bg-accent-50 text-accent-800' : 'border-noir-200 text-noir-700 hover:border-noir-300'
                  }`}
                >
                  {slot}
                </button>
              );
            }) : (
              <p className="col-span-full rounded-2xl border border-dashed border-noir-200 px-4 py-3 text-sm text-noir-500">
                {selectedDate ? 'Geen vrije slots voor deze dag.' : 'Kies eerst een datum.'}
              </p>
            )}
          </div>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={copy.appointment.fields.projectType}>
          <input value={formData.projectType} onChange={(event) => updateField('projectType', event.target.value)} className={inputClassName} />
        </Field>
        <Field label={copy.appointment.fields.propertyType}>
          <input value={formData.propertyType} onChange={(event) => updateField('propertyType', event.target.value)} className={inputClassName} />
        </Field>
        <Field label={copy.appointment.fields.budget}>
          <input value={formData.budget} onChange={(event) => updateField('budget', event.target.value)} className={inputClassName} />
        </Field>
        <Field label={copy.appointment.fields.timing}>
          <input value={formData.timing} onChange={(event) => updateField('timing', event.target.value)} className={inputClassName} />
        </Field>
      </div>

      <Field label={copy.appointment.fields.message}>
        <textarea
          value={formData.message}
          onChange={(event) => updateField('message', event.target.value)}
          rows={4}
          className={`${inputClassName} min-h-32`}
        />
      </Field>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-noir-200 bg-noir-50 px-4 py-3 text-sm text-noir-700">
          <input type="checkbox" checked={formData.subsidyInterest} onChange={(event) => updateField('subsidyInterest', event.target.checked)} />
          <span>{copy.appointment.fields.subsidyInterest}</span>
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-noir-200 bg-noir-50 px-4 py-3 text-sm text-noir-700">
          <input type="checkbox" checked={formData.paymentSpread} onChange={(event) => updateField('paymentSpread', event.target.checked)} />
          <span>{copy.appointment.fields.paymentSpread}</span>
        </label>
      </div>

      {state.error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p> : null}
      {state.success ? <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">{state.success}</p> : null}

      <button
        type="submit"
        disabled={state.loading || !selectedDate || !formData.selectedTime}
        className="rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.loading ? copy.common.loading : copy.appointment.submit}
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
