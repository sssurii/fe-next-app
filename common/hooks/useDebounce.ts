import {
  useState, useEffect,
} from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [delay, value]);

  return debouncedVal;
}
