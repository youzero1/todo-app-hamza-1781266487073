import { useState } from 'react';
import { Plus } from 'lucide-react';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition placeholder-gray-400 text-gray-900"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="inline-flex items-center gap-1 px-4 py-3 rounded-xl bg-brand text-white font-medium hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
