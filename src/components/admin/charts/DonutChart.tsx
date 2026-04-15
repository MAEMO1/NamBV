'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { getStatusMeta, variantDotColor } from '../statusMeta';
import { getStatusCountValue } from '../lib';

type DonutKind = 'quote' | 'appointment';

type DonutChartProps = {
  kind: DonutKind;
  items: Array<{ status: string; _count: number | { _all?: number } }>;
};

export function DonutChart({ kind, items }: DonutChartProps) {
  const data = items
    .map((item) => {
      const meta = getStatusMeta(kind, item.status);
      return {
        name: meta.label,
        status: item.status,
        value: getStatusCountValue(item._count),
        color: variantDotColor[meta.variant],
      };
    })
    .filter((entry) => entry.value > 0);

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  if (total === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center text-sm text-noir-500">
        Nog geen data.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_minmax(0,1fr)] items-center gap-4">
      <div className="relative h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={58}
              outerRadius={84}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              animationDuration={600}
            >
              {data.map((entry) => (
                <Cell key={entry.status} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="admin-display admin-numeric text-3xl font-medium text-noir-900">
            {total}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-noir-500">
            Totaal
          </span>
        </div>
      </div>

      <ul className="grid gap-2 text-sm">
        {data.map((entry) => {
          const percentage = total > 0 ? Math.round((entry.value / total) * 100) : 0;
          return (
            <li key={entry.status} className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-noir-700">{entry.name}</span>
              <span className="admin-numeric font-semibold text-noir-900">{entry.value}</span>
              <span className="admin-numeric w-10 text-right text-xs text-noir-500">
                {percentage}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
