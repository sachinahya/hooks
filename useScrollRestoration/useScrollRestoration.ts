import { useEffect, useRef } from 'react';
import { useScrollState } from './useScrollState';

export const useScrollRestoration = <T extends Element = Element>(
  storageKey: string,
  locationKey: string,
  historyAction: string
) => {
  const [scrollHistory, addScrollHistory] = useScrollState(storageKey);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const { current: element } = ref;
    const action = historyAction;
    const key = locationKey || '';

    // Restore scrolling position if we arrived via back/forward
    if (action === 'POP' && element) {
      const coords = scrollHistory?.[key];
      // Ensure the scroll is adjusted once rendering is finished
      coords && window.setTimeout(() => element.scrollTo(...coords), 0);
    }

    return () => {
      if (element) {
        // Save the last scroll position
        addScrollHistory(key, element.scrollLeft, element.scrollTop);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyAction, locationKey]);

  return ref;
};
