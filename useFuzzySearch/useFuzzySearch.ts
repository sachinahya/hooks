import Fuse from 'fuse.js';
import { useEffect, useRef, useState } from 'react';

export interface UseFuzzySearchOptions<T> {
  delay?: number;
  fuseOptions?: Fuse.FuseOptions<T>;
}

export const useFuzzySearch = <T>(
  items: T[],
  query: string,
  { delay = 400, fuseOptions }: UseFuzzySearchOptions<T> = {}
) => {
  const fuse = useRef(new Fuse<T, Fuse.FuseOptions<T>>(items, fuseOptions));

  useEffect(() => {
    fuse.current.setCollection(items);
  }, [items]);

  const [filtered, setFiltered] = useState<T[]>(items);
  useEffect(() => {
    let timeout: number;
    if (query) {
      if (items.length) {
        timeout = window.setTimeout(() => {
          /**
           * FIXME: The return type of search will be different depending on the provided
           * FuseOptions.
           */
          const result = fuse.current.search<T, false, false>(query);
          setFiltered(result);
        }, delay);
      }
    } else {
      setFiltered(items);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [query, items, delay]);

  return filtered;
};
