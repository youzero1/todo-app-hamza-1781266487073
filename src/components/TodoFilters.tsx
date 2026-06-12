import clsx from 'clsx';
import type { Filter } from '@/types';

type TodoFiltersProps = {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 bg-gray-50/70 border-t border-gray-100 text-sm">
      <span className="text-gray-500">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex items-center gap-1 bg-white rounded-lg p-1 ring-1 ring-gray-200">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onFilterChange(f.key)}
            className={clsx(
              'px-3 py-1 rounded-md font-medium transition',
              filter === f.key
                ? 'bg-brand text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-gray-500 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Clear completed
      </button>
    </div>
  );
}
