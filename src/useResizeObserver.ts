import { MutableRefObject, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';

const useResizeObserver = (
  cb: (width: number, height: number) => void,
  ref: MutableRefObject<HTMLElement | undefined>
) => {
  const debounced = useMemo(() => throttle(cb, 200), [cb]);

  const observer = useMemo(
    () =>
      process.browser
        ? new ResizeObserver(([entry]) => {
            debounced(entry.contentRect.width, entry.contentRect.height);
          })
        : undefined,
    [debounced]
  );

  useEffect(() => {
    if (observer) {
      observer.observe(ref?.current!);
      return () => observer.disconnect();
    }
  }, [observer, ref]);
};

export default useResizeObserver;
