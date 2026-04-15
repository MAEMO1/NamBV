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
      <div className="grid gap-4 lg:grid-cols-2">
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
      <div className="grid gap-4 lg:grid-cols-2">
        <Card padding="none" className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4" style={{ borderBottom: '1px solid var(--adm-border)' }}>
            <div>
              <p className="admin-eyebrow">Recent</p>
              <h3 style={{ marginTop: 2, fontSize: 15, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}>Laatste offertes</h3>
            </div>
            <button
              type="button"
              onClick={() => onJumpTo('quotes')}
              className="admin-link-btn"
            >
              Alles bekijken →
            </button>
          </div>
          {recentQuotes.length === 0 ? (
            <div className="p-5">
              <EmptyState description="Nog geen offertes binnengekomen." compact />
            </div>
          ) : (
            <table className="admin-table dense">
              <thead>
                <tr>
                  <th>Klant</th>
                  <th>Referentie</th>
                  <th>Ontvangen</th>
                  <th className="num">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((quote) => (
                  <tr key={quote.id}>
                    <td style={{ fontWeight: 500, color: 'var(--adm-text)' }}>{quote.fullName}</td>
                    <td style={{ fontFamily: 'var(--adm-mono)', fontSize: 12, color: 'var(--adm-text-3)' }}>
                      {quote.referenceNumber}
                    </td>
                    <td style={{ color: 'var(--adm-text-3)' }}>{formatDate(quote.createdAt)}</td>
                    <td className="num">
                      <StatusChip kind="quote" status={quote.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4" style={{ borderBottom: '1px solid var(--adm-border)' }}>
            <div>
              <p className="admin-eyebrow">Recent</p>
              <h3 style={{ marginTop: 2, fontSize: 15, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}>Laatste afspraken</h3>
            </div>
            <button
              type="button"
              onClick={() => onJumpTo('appointments')}
              className="admin-link-btn"
            >
              Alles bekijken →
            </button>
          </div>
          {recentAppointments.length === 0 ? (
            <div className="p-5">
              <EmptyState description="Nog geen afspraken binnengekomen." compact />
            </div>
          ) : (
            <table className="admin-table dense">
              <thead>
                <tr>
                  <th>Klant</th>
                  <th>Gemeente</th>
                  <th>Datum</th>
                  <th className="num">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td style={{ fontWeight: 500, color: 'var(--adm-text)' }}>{appointment.fullName}</td>
                    <td style={{ color: 'var(--adm-text-3)' }}>{appointment.municipality}</td>
                    <td style={{ color: 'var(--adm-text-3)' }}>
                      {formatDate(appointment.appointmentDate)} · {appointment.appointmentTime}
                    </td>
                    <td className="num">
                      <StatusChip kind="appointment" status={appointment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}
