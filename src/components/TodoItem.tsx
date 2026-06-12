import { useEffect, useRef, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    onUpdate(todo.id, draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit();
    else if (e.key === 'Escape') cancel();
  };

  return (
    <li className="group flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-brand border-brand text-white'
            : 'border-gray-300 hover:border-brand'
        )}
      >
        {todo.completed && <Check className="w-4 h-4" />}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          onBlur={commit}
          className="flex-1 px-2 py-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-gray-900"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={clsx(
            'flex-1 text-gray-800 select-none cursor-pointer break-words',
            todo.completed && 'line-through text-gray-400'
          )}
        >
          {todo.text}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <button
            type="button"
            onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            onClick={cancel}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Cancel edit"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-brand hover:bg-indigo-50"
            aria-label="Edit todo"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
          aria-label="Delete todo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}
