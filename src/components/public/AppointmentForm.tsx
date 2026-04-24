'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Hammer,
  HelpCircle,
  Home,
  Loader2,
  Mail,
  Paintbrush,
  Shield,
  Wrench,
  Zap,
} from 'lucide-react';
import { trackV2Conversion } from './MarketingAnalytics';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';
import type { TopServiceId } from '@/lib/v2/services';

type AvailabilityMap = Record<string, { available: string[]; booked: string[]; isOpen: boolean }>;
type TrustSignalIcon = 'Calendar' | 'Clock' | 'Shield' | 'Mail';
type TrustSignal = { icon: TrustSignalIcon; text: string };

const TRUST_ICONS: Record<TrustSignalIcon, React.ElementType> = {
  Calendar,
  Clock,
  Shield: Shield,
  Mail,
};

const PROJECT_TYPE_ICONS: Record<TopServiceId, React.ElementType> = {
  totaalrenovatie: Home,
  renovatie: Hammer,
  afwerking: Paintbrush,
  technieken: Zap,
  anders: HelpCircle,
};

const TOTAL_STEPS = 4;

export default function V2AppointmentForm({
  locale,
  trustSignals,
}: {
  locale: V2Locale;
  trustSignals?: TrustSignal[];
}) {
  const copy = getV2UiCopy(locale);
  const ac = copy.appointment;

  const [step, setStep] = useState(1);
  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    gemeente: '',
    selectedDate: '',
    selectedTime: '',
    projectTypeId: '' as TopServiceId | '',
    propertyType: '',
    budget: '',
    timing: '',
    subsidyInterest: false,
    paymentSpread: false,
    message: '',
  });

  const [state, setState] = useState<{ loading: boolean; success: string | null; error: string | null }>({
    loading: false,
    success: null,
    error: null,
  });

  const monthKey = `${calendarMonth.year}-${String(calendarMonth.month + 1).padStart(2, '0')}`;

  const loadMonth = useCallback(async (month: string) => {
    setLoadingSlots(true);
    try {
      const response = await fetch(`/api/public/availability?month=${month}`);
      const data = await response.json();
      if (response.ok) {
        setAvailability((current) => ({ ...current, ...data.availability }));
      }
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    void loadMonth(monthKey);
  }, [monthKey, loadMonth]);

  const availableSlots = useMemo(
    () => availability[formData.selectedDate]?.available ?? [],
    [availability, formData.selectedDate],
  );

  const updateField = (key: keyof typeof formData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const selectedProjectType = ac.projectTypes.find((option) => option.id === formData.projectTypeId);

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return formData.projectTypeId !== '';
      case 2:
        return formData.name.length >= 2 && formData.email.includes('@') && formData.phone.length >= 4 && formData.gemeente.length >= 2;
      case 3:
        return !!formData.selectedDate && !!formData.selectedTime;
      case 4:
        return true;
      default:
        return false;
    }
  }, [step, formData]);

  const navigateMonth = (direction: -1 | 1) => {
    setCalendarMonth((current) => {
      let newMonth = current.month + direction;
      let newYear = current.year;
      if (newMonth < 0) { newMonth = 11; newYear--; }
      if (newMonth > 11) { newMonth = 0; newYear++; }
      return { year: newYear, month: newMonth };
    });
  };

  const goToStep = (target: number) => {
    setStep(target);
  };

  const submit = async () => {
    setState({ loading: true, success: null, error: null });
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale,
          propertyAge: '',
          priorities: [],
          materialPreference: '',
          motivation: '',
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
      setState({ loading: false, success: ac.success, error: null });
    } catch (error) {
      setState({
        loading: false,
        success: null,
        error: error instanceof Error ? error.message : 'Unexpected error',
      });
    }
  };

  const reset = () => {
    setStep(1);
    setFormData({
      name: '', email: '', phone: '', website: '', gemeente: '',
      selectedDate: '', selectedTime: '', projectTypeId: '', propertyType: '',
      budget: '', timing: '', subsidyInterest: false, paymentSpread: false, message: '',
    });
    setState({ loading: false, success: null, error: null });
  };

  /* ─── Success ─── */
  if (state.success) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-accent-100 animate-scale-in">
          <CheckCircle2 className="h-14 w-14 text-accent-600" />
        </div>
        <h2 className="text-display-md font-display font-bold text-noir-900">{ac.success}</h2>
        {formData.selectedDate && formData.selectedTime && (
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50/50 px-8 py-5">
            <Calendar className="h-5 w-5 text-accent-600" />
            <span className="text-lg font-medium text-accent-800">
              {formatDateLong(formData.selectedDate, locale)} &mdash; {formData.selectedTime}
            </span>
          </div>
        )}
        {trustSignals && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-noir-500">
            {trustSignals.map((s, i) => {
              const Icon = TRUST_ICONS[s.icon];
              return (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{s.text}</span>
                </div>
              );
            })}
          </div>
        )}
        <button type="button" onClick={reset} className="mt-10 text-sm font-medium text-accent-600 hover:text-accent-700 hover:underline">
          {ac.newAppointment}
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => updateField('website', e.target.value)} /></label>
      </div>

      {/* Thin progress line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-noir-100">
        <div
          className="h-full bg-accent-600 transition-all duration-700 ease-smooth"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 py-12">
        {/* Persistent headline */}
        <div className="mb-2 text-center">
          <h1 className="text-display-lg font-display font-bold text-noir-900">
            {ac.title}
          </h1>
          <p className="mt-3 text-lg text-noir-500">
            {step === 1 && ac.steps.project.subtitle}
            {step === 2 && ac.steps.contact.subtitle}
            {step === 3 && ac.steps.dateTime.subtitle}
            {step === 4 && ac.steps.confirm.subtitle}
          </p>
        </div>

        {/* Step body */}
        <div className="mt-10 w-full max-w-2xl">

          {/* ── Step 1: Project type ── */}
          {step === 1 && (
            <div className="animate-fade-up space-y-12">
              {/* Project section */}
              <section>
                <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-noir-400">
                  {ac.sectionHeaders.project}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                  {ac.projectTypes.map((pt) => {
                    const active = formData.projectTypeId === pt.id;
                    const Icon = PROJECT_TYPE_ICONS[pt.id as TopServiceId] ?? Wrench;
                    return (
                      <button
                        type="button"
                        key={pt.id}
                        onClick={() => updateField('projectTypeId', active ? '' : pt.id)}
                        className="group flex flex-col items-center gap-3"
                      >
                        <div className={`flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 sm:h-28 sm:w-28 ${
                          active
                            ? 'bg-accent-100 shadow-lg shadow-accent-600/10 ring-2 ring-accent-500'
                            : 'bg-noir-50 group-hover:bg-noir-100 group-hover:shadow-md'
                        }`}>
                          <Icon className={`h-9 w-9 transition-colors sm:h-10 sm:w-10 ${active ? 'text-accent-600' : 'text-noir-400 group-hover:text-noir-600'}`} />
                        </div>
                        <span className={`text-sm font-medium transition-colors ${active ? 'text-accent-700' : 'text-noir-500 group-hover:text-noir-700'}`}>
                          {pt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Property section */}
              <section>
                <h3 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-noir-400">
                  {ac.sectionHeaders.property}
                  <span className="ml-2 font-normal normal-case tracking-normal text-noir-300">
                    ({ac.optionalLabel})
                  </span>
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {ac.propertyTypes.map((pt) => {
                    const active = formData.propertyType === pt.label;
                    return (
                      <button
                        type="button"
                        key={pt.id}
                        onClick={() => updateField('propertyType', active ? '' : pt.label)}
                        className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                          active
                            ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-sm'
                            : 'border-noir-200 text-noir-500 hover:border-noir-300 hover:text-noir-700'
                        }`}
                      >
                        {pt.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Budget section */}
              <section>
                <h3 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-noir-400">
                  {ac.sectionHeaders.budget}
                  <span className="ml-2 font-normal normal-case tracking-normal text-noir-300">
                    ({ac.optionalLabel})
                  </span>
                </h3>
                <p className="mx-auto mb-5 max-w-md text-center text-sm text-noir-400">
                  {ac.budgetHelper}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {ac.budgetRanges.map((br) => {
                    const active = formData.budget === br.label;
                    return (
                      <button
                        type="button"
                        key={br.id}
                        onClick={() => updateField('budget', active ? '' : br.label)}
                        className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                          active
                            ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-sm'
                            : br.id === 'unknown'
                              ? 'border-dashed border-noir-300 text-noir-400 hover:border-noir-400 hover:text-noir-600'
                              : 'border-noir-200 text-noir-500 hover:border-noir-300 hover:text-noir-700'
                        }`}
                      >
                        {br.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* ── Step 2: Contact ── */}
          {step === 2 && (
            <div className="animate-fade-up mx-auto max-w-md space-y-4">
              <InputField placeholder={`${ac.fields.name} *`} value={formData.name} onChange={(v) => updateField('name', v)} />
              <InputField placeholder={`${ac.fields.email} *`} type="email" value={formData.email} onChange={(v) => updateField('email', v)} />
              <InputField placeholder={`${ac.fields.phone} *`} value={formData.phone} onChange={(v) => updateField('phone', v)} />
              <InputField placeholder={`${ac.fields.gemeente} *`} value={formData.gemeente} onChange={(v) => updateField('gemeente', v)} />
              <InputField placeholder={ac.fields.message} value={formData.message} onChange={(v) => updateField('message', v)} multiline />

              {/* Subsidy & payment toggles */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <PillToggle
                  active={formData.subsidyInterest}
                  onClick={() => updateField('subsidyInterest', !formData.subsidyInterest)}
                  label={ac.subsidyTitle}
                />
                <PillToggle
                  active={formData.paymentSpread}
                  onClick={() => updateField('paymentSpread', !formData.paymentSpread)}
                  label={ac.paymentSpreadTitle}
                />
              </div>
            </div>
          )}

          {/* ── Step 3: Date & Time ── */}
          {step === 3 && (
            <div className="animate-fade-up">
              {/* Calendar */}
              <div className="mx-auto max-w-sm">
                <div className="mb-6 flex items-center justify-between">
                  <button type="button" onClick={() => navigateMonth(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-noir-400 transition hover:bg-noir-50 hover:text-noir-700">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h3 className="text-base font-semibold text-noir-900">
                    {ac.monthNames[calendarMonth.month]} {calendarMonth.year}
                  </h3>
                  <button type="button" onClick={() => navigateMonth(1)} className="flex h-10 w-10 items-center justify-center rounded-full text-noir-400 transition hover:bg-noir-50 hover:text-noir-700">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Weekday headers */}
                <div className="mb-2 grid grid-cols-7 text-center">
                  {ac.weekDays.map((day) => (
                    <div key={day} className="py-2 text-xs font-medium uppercase tracking-wider text-noir-300">{day}</div>
                  ))}
                </div>

                {/* Day grid */}
                {loadingSlots ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-6 w-6 animate-spin text-accent-500" />
                  </div>
                ) : (
                  <CalendarGrid
                    year={calendarMonth.year}
                    month={calendarMonth.month}
                    availability={availability}
                    selectedDate={formData.selectedDate}
                    onSelectDate={(date) => {
                      updateField('selectedDate', date);
                      updateField('selectedTime', '');
                    }}
                  />
                )}
              </div>

              {/* Time slots */}
              <div className="mt-10">
                {formData.selectedDate ? (
                  availableSlots.length > 0 ? (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {availableSlots.map((slot) => {
                        const active = formData.selectedTime === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => updateField('selectedTime', slot)}
                            className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                              active
                                ? 'border-accent-500 bg-accent-600 text-white shadow-md shadow-accent-600/20'
                                : 'border-noir-200 text-noir-500 hover:border-accent-300 hover:text-accent-600'
                            }`}
                          >
                            {active && <Clock className="mr-1.5 -ml-1 inline-block h-3.5 w-3.5" />}
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-noir-400">{ac.noSlotsAvailable}</p>
                  )
                ) : (
                  <p className="text-center text-sm text-noir-300">{ac.selectDateFirst}</p>
                )}
              </div>
            </div>
          )}

          {/* ── Step 4: Review & Submit ── */}
          {step === 4 && (
            <div className="animate-fade-up mx-auto max-w-md">
              <div className="space-y-1">
                <ReviewRow label={ac.fields.name} value={formData.name} onClick={() => goToStep(2)} />
                <ReviewRow label={ac.fields.email} value={formData.email} onClick={() => goToStep(2)} />
                <ReviewRow label={ac.fields.phone} value={formData.phone} onClick={() => goToStep(2)} />
                <ReviewRow label={ac.fields.gemeente} value={formData.gemeente} onClick={() => goToStep(2)} />
                <div className="!my-4 h-px bg-noir-100" />
                {selectedProjectType && <ReviewRow label={ac.fields.projectType} value={selectedProjectType.label} onClick={() => goToStep(1)} />}
                {formData.propertyType && <ReviewRow label={ac.fields.propertyType} value={formData.propertyType} onClick={() => goToStep(1)} />}
                {formData.budget && <ReviewRow label={ac.fields.budget} value={formData.budget} onClick={() => goToStep(1)} />}
                <div className="!my-4 h-px bg-noir-100" />
                <ReviewRow label={ac.fields.selectedDate} value={formatDateLong(formData.selectedDate, locale)} onClick={() => goToStep(3)} />
                <ReviewRow label={ac.fields.selectedTime} value={formData.selectedTime} onClick={() => goToStep(3)} />
                {formData.message && (
                  <>
                    <div className="!my-4 h-px bg-noir-100" />
                    <ReviewRow label={ac.fields.message} value={formData.message} onClick={() => goToStep(2)} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {state.error && (
          <p className="mt-6 rounded-xl bg-red-50 px-6 py-3 text-sm text-red-600">{state.error}</p>
        )}

        {/* Navigation */}
        <div className="mt-12 flex items-center gap-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-noir-200 text-noir-400 transition hover:border-noir-300 hover:text-noir-700"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed}
              className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-accent-600/20 transition-all hover:bg-accent-700 hover:shadow-xl hover:shadow-accent-600/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {ac.next}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={state.loading}
              className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-accent-600/20 transition-all hover:bg-accent-700 hover:shadow-xl hover:shadow-accent-600/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {state.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {state.loading ? copy.common.loading : ac.submit}
              {!state.loading && <ArrowRight className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Trust signals strip */}
        {trustSignals && step === 1 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-noir-500">
            {trustSignals.map((s, i) => {
              const Icon = TRUST_ICONS[s.icon];
              return (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{s.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function InputField({
  placeholder,
  type = 'text',
  value,
  onChange,
  multiline,
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className = 'w-full border-b-2 border-l-2 border-t-0 border-r-0 border-b-noir-100 border-l-transparent bg-transparent py-4 pl-4 text-base text-noir-900 outline-none transition-all duration-300 placeholder:text-noir-300 focus:border-b-accent-500 focus:border-l-accent-500';
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`${className} min-h-24 resize-none`}
      />
    );
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
}

function PillToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
        active
          ? 'border-accent-500 bg-accent-50 text-accent-700'
          : 'border-noir-200 text-noir-400 hover:border-noir-300 hover:text-noir-600'
      }`}
    >
      <div className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
        active ? 'border-accent-500 bg-accent-500 text-white' : 'border-noir-300'
      }`}>
        {active && <Check className="h-2.5 w-2.5" />}
      </div>
      {label}
    </button>
  );
}

function ReviewRow({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-lg px-2 py-3 text-left transition hover:bg-noir-50"
    >
      <span className="text-sm text-noir-500">{label}</span>
      <span className="text-sm font-medium text-noir-800 group-hover:text-accent-600">{value}</span>
    </button>
  );
}

function CalendarGrid({
  year,
  month,
  availability,
  selectedDate,
  onSelectDate,
}: {
  year: number;
  month: number;
  availability: AvailabilityMap;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const days: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, index) => {
        if (day === null) return <div key={`empty-${index}`} />;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        const isPast = date < today;
        const isSunday = dayOfWeek === 0;
        const dayData = availability[dateStr];
        const isOpen = dayData?.isOpen ?? false;
        const slotsCount = dayData?.available?.length ?? 0;
        const isDisabled = isPast || isSunday || !isOpen || slotsCount === 0;
        const isSelected = selectedDate === dateStr;
        const isToday = date.getTime() === today.getTime();

        return (
          <button
            type="button"
            key={dateStr}
            disabled={isDisabled}
            onClick={() => onSelectDate(dateStr)}
            className={`relative flex h-11 w-full items-center justify-center rounded-full text-sm transition-all duration-200 ${
              isSelected
                ? 'bg-accent-600 font-semibold text-white shadow-md shadow-accent-600/20'
                : isDisabled
                  ? 'cursor-not-allowed text-noir-200'
                  : isToday
                    ? 'font-medium text-accent-600 ring-1 ring-accent-300 hover:bg-accent-50'
                    : 'text-noir-600 hover:bg-noir-50 hover:text-noir-900'
            }`}
          >
            {day}
            {!isDisabled && !isSelected && slotsCount > 0 && (
              <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Utilities ─── */

function formatDateLong(dateStr: string, locale: V2Locale): string {
  if (!dateStr) return '';
  try {
    const localeMap: Record<V2Locale, string> = { nl: 'nl-BE', fr: 'fr-BE', en: 'en-GB' };
    return new Date(dateStr + 'T12:00:00').toLocaleDateString(localeMap[locale], {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
