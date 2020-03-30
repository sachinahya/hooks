import { useCallback } from 'react';
import useStorage from '../useStorage/useStorage';

export type ScrollState = { [path: string]: [number, number] };

export type AddScrollStateAction = (path: string, x: number, y: number) => void;

export const useScrollState = (storageKey: string): [ScrollState | null, AddScrollStateAction] => {
  const [scrollHistory, setScrollHistory] = useStorage<ScrollState>(storageKey, {
    session: true,
  });

  const addScrollHistory = useCallback<AddScrollStateAction>(
    (path, x, y) => {
      setScrollHistory(value => ({
        ...value,
        [path]: [x, y],
      }));
    },
    [setScrollHistory]
  );

  return [scrollHistory, addScrollHistory];
};
