import { useEffect, useRef, useState } from 'react';

const useDebounce = <T>(value: T, delay: number = 500): T => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // Ref to store the timer ID for the debounce function
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set a new timer to update the debounced value after the specified delay
    // * NOTE:: Using useRef ensures that we can clear the previous timeout before starting a new one, preventing multiple timeouts at the same time.
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    // Clear the previous timer if the value or delay changes before it completes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
