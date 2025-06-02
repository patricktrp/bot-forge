import { useRef, useEffect, useCallback } from "react";

type Timer = ReturnType<typeof setTimeout> | null;

function useDebouncedCallback<Args extends any[]>(
  callback: (...args: Args) => any,
  delay: number
): (...args: Args) => void {
  const timerRef = useRef<Timer>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Args) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
        timerRef.current = null;
      }, delay);
    },
    [callback, delay]
  );
}

export default useDebouncedCallback;
