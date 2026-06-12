import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      // ignore
    }
  }, [key, stored]);

  const setValue = (value: T | ((prev: T) => T)) => {
    setStored((prev) => (typeof value === 'function' ? (value as (p: T) => T)(prev) : value));
  };

  return [stored, setValue];
}
