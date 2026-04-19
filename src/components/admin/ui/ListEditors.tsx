'use client';

import { Plus, Trash2 } from 'lucide-react';

import { ensureString, ensureStringArray } from '../lib';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { LabeledInput, LabeledTextarea, inputClassName } from './Input';

export function ItemListEditor({
  label,
  items,
  onChange,
  fields,
}: {
  label: string;
  items: Array<Record<string, unknown>>;
  onChange: (items: Array<Record<string, unknown>>) => void;
  fields: Array<{ key: string; label: string; multiline?: boolean; isStringList?: boolean }>;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}>{label}</p>
        <Button
          variant="secondary"
          size="sm"
          icon={<Plus size={14} strokeWidth={2} />}
          onClick={() => onChange([...items, {}])}
        >
          Item toevoegen
        </Button>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-md border p-4"
          style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-surface-2)' }}
        >
          <div className="grid gap-4">
            {fields.map((field) =>
              field.multiline ? (
                <LabeledTextarea
                  key={field.key}
                  label={field.label}
                  value={
                    field.isStringList
                      ? ensureStringArray(item[field.key]).join('\n')
                      : ensureString(item[field.key])
                  }
                  onChange={(value) =>
                    onChange(
                      items.map((entry, entryIndex) =>
                        entryIndex === index
                          ? {
                              ...entry,
                              [field.key]: field.isStringList
                                ? value
                                    .split('\n')
                                    .map((row) => row.trim())
                                    .filter(Boolean)
                                : value,
                            }
                          : entry,
                      ),
                    )
                  }
                  rows={field.isStringList ? 4 : 5}
                />
              ) : (
                <LabeledInput
                  key={field.key}
                  label={field.label}
                  value={ensureString(item[field.key])}
                  onChange={(value) =>
                    onChange(
                      items.map((entry, entryIndex) =>
                        entryIndex === index ? { ...entry, [field.key]: value } : entry,
                      ),
                    )
                  }
                />
              ),
            )}
          </div>
          <Button
            variant="danger"
            size="sm"
            className="mt-3"
            icon={<Trash2 size={14} strokeWidth={2} />}
            onClick={() => onChange(items.filter((_, entryIndex) => entryIndex !== index))}
          >
            Verwijderen
          </Button>
        </div>
      ))}
      {items.length === 0 ? (
        <EmptyState description="Nog geen items toegevoegd." compact />
      ) : null}
    </div>
  );
}

export function TextListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-text)', letterSpacing: '-0.005em' }}>{label}</p>
        <Button
          variant="secondary"
          size="sm"
          icon={<Plus size={14} strokeWidth={2} />}
          onClick={() => onChange([...items, ''])}
        >
          Regel toevoegen
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={item}
            onChange={(event) =>
              onChange(
                items.map((entry, entryIndex) =>
                  entryIndex === index ? event.target.value : entry,
                ),
              )
            }
            className={inputClassName}
          />
          <button
            type="button"
            onClick={() =>
              onChange(items.filter((_, entryIndex) => entryIndex !== index))
            }
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition"
            style={{
              borderColor: 'var(--adm-border)',
              background: 'var(--adm-surface)',
              color: 'var(--adm-danger)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--adm-danger-soft)';
              e.currentTarget.style.borderColor = 'var(--adm-danger)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--adm-surface)';
              e.currentTarget.style.borderColor = 'var(--adm-border)';
            }}
            aria-label="Verwijderen"
          >
            <Trash2 size={15} strokeWidth={1.75} />
          </button>
        </div>
      ))}
      {items.length === 0 ? (
        <EmptyState description="Nog geen regels toegevoegd." compact />
      ) : null}
    </div>
  );
}

export function TimeSlotEditor({
  slots,
  onChange,
}: {
  slots: string[];
  onChange: (slots: string[]) => void;
}) {
  return (
    <div className="mt-4 grid gap-2">
      {slots.map((slot, index) => (
        <div key={`${slot}-${index}`} className="flex items-center gap-2">
          <input
            type="time"
            value={slot}
            onChange={(event) =>
              onChange(
                slots.map((entry, entryIndex) =>
                  entryIndex === index ? event.target.value : entry,
                ),
              )
            }
            className={inputClassName}
          />
          <button
            type="button"
            onClick={() =>
              onChange(slots.filter((_, entryIndex) => entryIndex !== index))
            }
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition"
            style={{
              borderColor: 'var(--adm-border)',
              background: 'var(--adm-surface)',
              color: 'var(--adm-danger)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--adm-danger-soft)';
              e.currentTarget.style.borderColor = 'var(--adm-danger)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--adm-surface)';
              e.currentTarget.style.borderColor = 'var(--adm-border)';
            }}
            aria-label="Verwijderen"
          >
            <Trash2 size={15} strokeWidth={1.75} />
          </button>
        </div>
      ))}
      <Button
        variant="secondary"
        size="sm"
        icon={<Plus size={14} strokeWidth={2} />}
        onClick={() => onChange([...slots, '09:00'])}
        className="justify-self-start"
      >
        Tijdslot toevoegen
      </Button>
    </div>
  );
}
