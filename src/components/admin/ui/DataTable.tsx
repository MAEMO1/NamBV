import type { ReactNode } from 'react';

export type DataTableColumn<Row> = {
  key: string;
  header: ReactNode;
  /** Cell renderer. Falls back to `row[key]` when omitted. */
  render?: (row: Row, index: number) => ReactNode;
  align?: 'left' | 'right';
  width?: string | number;
  /** Right-aligned tabular numeric cell. */
  numeric?: boolean;
};

type DataTableProps<Row> = {
  columns: ReadonlyArray<DataTableColumn<Row>>;
  rows: ReadonlyArray<Row>;
  /** Stable row key extractor. Falls back to row index. */
  rowKey?: (row: Row, index: number) => string | number;
  /** Optional click handler — enables hover highlight + cursor. */
  onRowClick?: (row: Row, index: number) => void;
  /** Marks a row as selected (e.g. in a master/detail view). */
  isRowSelected?: (row: Row, index: number) => boolean;
  /** Render when `rows.length === 0`. Commonly an `<EmptyState />`. */
  empty?: ReactNode;
  dense?: boolean;
  className?: string;
  /** Sticky header for long scrollable lists. */
  sticky?: boolean;
};

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  onRowClick,
  isRowSelected,
  empty,
  dense = false,
  className = '',
  sticky = false,
}: DataTableProps<Row>) {
  if (rows.length === 0 && empty) {
    return <div className={className}>{empty}</div>;
  }

  return (
    <div className={`admin-table-card ${className}`.trim()}>
      <div
        className="overflow-x-auto"
        style={sticky ? { maxHeight: '100%', overflowY: 'auto' } : undefined}
      >
        <table className={`admin-table ${dense ? 'dense' : ''}`.trim()}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.numeric || col.align === 'right' ? 'num' : undefined}
                  style={col.width ? { width: col.width } : undefined}
                  scope="col"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const clickable = Boolean(onRowClick);
              const selected = isRowSelected ? isRowSelected(row, index) : false;
              return (
                <tr
                  key={rowKey ? rowKey(row, index) : index}
                  data-clickable={clickable || undefined}
                  data-selected={selected || undefined}
                  onClick={clickable ? () => onRowClick!(row, index) : undefined}
                >
                  {columns.map((col) => {
                    const content = col.render
                      ? col.render(row, index)
                      : ((row as unknown) as Record<string, ReactNode>)[col.key];
                    return (
                      <td
                        key={col.key}
                        className={col.numeric || col.align === 'right' ? 'num' : undefined}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
