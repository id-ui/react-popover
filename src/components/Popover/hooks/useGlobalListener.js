import { useEffect, useMemo } from 'react';
import _ from 'lodash';

export default (name, listener, condition, timeout = 100) => {
  const debouncedListener = useMemo(() => _.debounce(listener, timeout), [
    listener,
    timeout,
  ]);

  useEffect(() => {
    if (condition) {
      window.addEventListener(name, debouncedListener);
      return () => {
        window.removeEventListener(name, debouncedListener);
      };
    }
  }, [name, debouncedListener, condition]);
};
