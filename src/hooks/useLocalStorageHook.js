import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);

      if (!stored) return initialValue;

      const parsed = JSON.parse(stored);

      // Basic safety check: fallback if null/undefined
      if (parsed === null || parsed === undefined) {
        return initialValue;
      }

      return parsed;
    } catch (err) {
      console.error('localStorage parse error:', err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('localStorage write error:', err);
    }
  }, [key, value]);

  return [value, setValue];
}
