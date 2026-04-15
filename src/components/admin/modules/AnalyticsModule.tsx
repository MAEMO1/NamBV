'use client';

import { useMemo } from 'react';

import { DonutChart } from '../charts/DonutChart';
import { formatDate } from '../lib';
import { SectionHeader } from '../ui/SectionHeader';
import { Stat } from '../ui/Stat';
import { Card, CardHeader } from '../ui/Card';
import { StatusChip } from '../ui/Chip';
import { EmptyState } from '../ui/EmptyState';
import type {
  AnalyticsOverview,
  AppointmentRecord,
  QuoteRecord,
} from '../types';

type AnalyticsModuleProps = {
  analytics: AnalyticsOverview;
  quotes: QuoteRecord[];
  appointments: AppointmentRecord[];
  onJumpTo: (target: 'quotes' | 'appointments') => void;
};

export function AnalyticsModule({
  analytics,
  quotes,
  appointments,
  onJumpTo,
}: AnalyticsModuleProps) {
  const recentQuotes = useMemo(() => {
    return [...quotes]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [quotes]);

  const recentAppointments = useMemo(() => {
    return [...appointments]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [appointments]);

  const openQuoteCount = useMemo(() => {
    return quotes.filter(
      (quote) => !['WON', 'LOST', 'CANCELLED'].includes(quote.status),
    ).length;
  }, [quotes]);

  const wonQuoteCount = useMemo(() => {
    return quotes.filter((quote) => quote.status === 'WON').length;
  }, [quotes]);

  const pendingAppointmentCount = useMemo(() => {
    return appointments.filter((appointment) =>
      ['PENDING', 'RESCHEDULED'].includes(appointment.status),
    ).length;
  }, [appointments]);

  const confirmedAppointmentCount = useMemo(() => {
    return appointments.filter((appointment) => appointment.status === 'CONFIRMED').length;
  }, [appointments]);

  return (
    <div className="grid gap-6">
      <SectionHeader
        title="Overzicht"
        description="Totalen, statusverdeling en recente binnenkomsten."
      />

      {/* 4-up utility stat row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Offertes" value={analytics.totals.quotes} meta={`${openQuoteCount} open`} />
        <Stat label="Gewonnen" value={wonQuoteCount} meta="Geconverteerde offertes" />
        <Stat
          label="Afspraken"
          value={analytics.totals.appointments}
          meta={`${pendingAppointmentCount} in afwachting`}
        />
        <Stat
          label="Bevestigd"
          value={confirmedAppointmentCount}
          meta="Klaar voor plaatsbezoek"
        />
      </div>

      {/* Donut distributions */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card padding="lg">
          <CardHeader
            eyebrow="Offertes"
            title="Statusverdeling"
            description="Verhouding tussen leads, lopende trajecten en afgeronde dossiers."
          />
          <div className="mt-4">
            <DonutChart kind="quote" items={analytics.quoteStatuses} />
          </div>
        </Card>
        <Card padding="lg">
          <CardHeader
            eyebrow="Afspraken"
            title="Statusverdeling"
            description="Stand van zaken rond plaatsbezoeken en ingeplande afspraken."
          />
          <div className="mt-4">
            <DonutChart kind="appointment" items={analytics.appointmentStatuses} />
          </div>
        </Card>
      </div>

      {/* Recent items */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card padding="lg">
          <CardHeader
            eyebrow="Recent"
            title="Laatste offertes"
            action={
              <button
                type="button"
                onClick={() => onJumpTo('quotes')}
                className="text-xs font-medium text-slate-600 transition hover:text-slate-900"
              >
                Alles bekijken →
              </button>
            }
          />
          <div className="mt-3">
            {recentQuotes.length === 0 ? (
              <EmptyState description="Nog geen offertes binnengekomen." compact />
            ) : (
              <ul className="divide-y divide-slate-200">
                {recentQuotes.map((quote) => (
                  <li
                    key={quote.id}
                    className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {quote.fullName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {quote.referenceNumber} · {formatDate(quote.createdAt)}
                      </p>
                    </div>
                    <StatusChip kind="quote" status={quote.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <Card padding="lg">
          <CardHeader
            eyebrow="Recent"
            title="Laatste afspraken"
            action={
              <button
                type="button"
                onClick={() => onJumpTo('appointments')}
                className="text-xs font-medium text-slate-600 transition hover:text-slate-900"
              >
                Alles bekijken →
              </button>
            }
          />
          <div className="mt-3">
            {recentAppointments.length === 0 ? (
              <EmptyState description="Nog geen afspraken binnengekomen." compact />
            ) : (
              <ul className="divide-y divide-slate-200">
                {recentAppointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {appointment.fullName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {appointment.municipality} ·{' '}
                        {formatDate(appointment.appointmentDate)} · {appointment.appointmentTime}
                      </p>
                    </div>
                    <StatusChip kind="appointment" status={appointment.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
