import { sortByProp } from '@sachinahya/utils';
import { useMemo } from 'react';

export const useArraySort = <T>(items: T[] | { [key: string]: T }, sortProps: string[]): T[] => {
  return useMemo(() => {
    const values = Array.isArray(items) ? items : Object.values(items);
    const sorter = sortByProp(...sortProps);
    return values.sort(sorter);
  }, [items, sortProps]);
};
