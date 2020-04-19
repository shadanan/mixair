import { useEffect, useState } from "react";

export function useDebounce(value: any, delay: number) {
  const [debounced, setDebounced] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
