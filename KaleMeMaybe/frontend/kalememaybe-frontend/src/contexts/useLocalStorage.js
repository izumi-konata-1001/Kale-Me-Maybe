import { useState, useEffect } from "react";

/**
 * A custom hook wrapping a call to useState() to provide a stateful value, along with a call to useEffect() which saves that value
 * to local storage.
 */
export function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, setValue]);

  return [value, setValue];
}
