import { useCallback, useState } from 'react';

export interface UseCounterOptions {
  initial?: number;
  min?: number;
  max?: number;
}

export const useCounter = ({
  initial = 0,
  min = -Infinity,
  max = Infinity,
}: UseCounterOptions = {}): [
  number,
  {
    increment(): void;
    decrement(): void;
    set(count: number): void;
    reset(): void;
  }
] => {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => {
    setCount(c => Math.min(c + 1, max));
  }, [max]);

  const decrement = useCallback(() => {
    setCount(c => Math.max(c - 1, min));
  }, [min]);

  const set = useCallback(
    (count: number) => {
      if (count <= max && count >= min) setCount(count);
    },
    [min, max]
  );

  const reset = useCallback(() => {
    setCount(initial);
  }, [initial]);

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
};
