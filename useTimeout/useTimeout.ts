import { useEffect, useRef, useState } from 'react';

export const useTimeout = <T extends Function>(cb: T, delay: number): (() => void) => {
  const [isActive, setIsActive] = useState(false);
  const savedCallback = useRef<T>();

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    if (isActive && savedCallback.current) {
      const timeout = window.setTimeout(savedCallback.current, delay);
      setIsActive(false);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [delay, isActive]);

  return () => setIsActive(true);
};
