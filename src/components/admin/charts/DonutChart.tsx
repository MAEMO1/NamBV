'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { getStatusMeta } from '../statusMeta';
import { getStatusCountValue } from '../lib';

type DonutKind = 'quote' | 'appointment';

type DonutChartProps = {
  kind: DonutKind;
  items: Array<{ status: string; _count: number | { _all?: number } }>;
};

// Forest-green ramp — 5 steps from primary to neutral background.
const greenRamp = ['#2d4a47', '#3d5c56', '#5a7a6b', '#8fada8', '#b9cbc8'];

export function DonutChart({ kind, items }: DonutChartProps) {
  const ranked = items
    .map((item) => ({
      status: item.status,
      meta: getStatusMeta(kind, item.status),
      value: getStatusCountValue(item._count),
    }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value);

  const data = ranked.map((entry, index) => ({
    name: entry.meta.label,
    status: entry.status,
    value: entry.value,
    color: greenRamp[Math.min(index, greenRamp.length - 1)],
  }));

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  if (total === 0) {
    return (
      <div
        className="flex h-[220px] items-center justify-center"
        style={{ fontSize: 13, color: 'var(--adm-text-3)' }}
      >
        Nog geen data.
      </div>
    );
  }

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_minmax(0,1fr)]">
      <div className="relative mx-auto h-[200px] w-full max-w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={56}
              outerRadius={80}
              paddingAngle={1.5}
              dataKey="value"
              stroke="var(--adm-surface)"
              strokeWidth={2}
              animationDuration={600}
            >
              {data.map((entry) => (
                <Cell key={entry.status} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="admin-numeric"
            style={{
              fontFamily: 'var(--adm-sans)',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--adm-text)',
              lineHeight: 1,
            }}
          >
            {total}
          </span>
          <span
            style={{
              fontFamily: 'var(--adm-sans)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--adm-text-3)',
              marginTop: 4,
            }}
          >
            Totaal
          </span>
        </div>
      </div>

      <ul className="grid gap-2">
        {data.map((entry) => {
          const percentage = total > 0 ? Math.round((entry.value / total) * 100) : 0;
          return (
            <li
              key={entry.status}
              className="flex items-center gap-2.5"
              style={{ fontSize: 13 }}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              <span
                className="min-w-0 flex-1 truncate"
                style={{ color: 'var(--adm-text-2)' }}
              >
                {entry.name}
              </span>
              <span
                className="admin-numeric"
                style={{ fontWeight: 600, color: 'var(--adm-text)' }}
              >
                {entry.value}
              </span>
              <span
                className="admin-numeric w-10 text-right"
                style={{ fontSize: 12, color: 'var(--adm-text-3)' }}
              >
                {percentage}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
