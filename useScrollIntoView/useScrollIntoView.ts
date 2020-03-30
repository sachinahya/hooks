import React from 'react';
// import scrollIntoViewIfNeeded from 'smooth-scroll-into-view-if-needed';

export const useScrollIntoView = <T extends Element>(ref: React.RefObject<T>): (() => void) => {
  return () => {
    if (ref.current) {
      // scrollIntoViewIfNeeded(ref.current, {
      //   scrollMode: 'always',
      // });
    }
  };
};
