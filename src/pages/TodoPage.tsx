import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { uid } from '@/lib/utils';
import type { Todo, Filter } from '@/types';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';

export default function TodoPage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: uid(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      deleteTodo(id);
      return;
    }
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="min-h-full flex items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-xl">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-8 h-8 text-brand" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Todos</h1>
          </div>
          <p className="text-gray-500">Stay focused. Stay productive.</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 ring-1 ring-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <TodoInput onAdd={addTodo} />
          </div>

          <TodoList
            todos={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />

          {todos.length > 0 && (
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Your todos are saved locally in your browser.
        </p>
      </div>
    </div>
  );
}
