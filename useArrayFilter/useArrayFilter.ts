import { useMemo } from 'react';

export const useArrayFilter = <T>(
  items: T[] | { [key: string]: T },
  filterFn?: (item: T) => boolean
): T[] => {
  return useMemo(() => {
    let values = Array.isArray(items) ? items : Object.values(items);
    if (filterFn) values = values.filter(filterFn);
    return values;
  }, [items, filterFn]);
};
