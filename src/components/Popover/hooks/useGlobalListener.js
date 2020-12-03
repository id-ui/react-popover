import { useEffect, useMemo } from 'react';
import _ from 'lodash';

export default (name, listener, timeout = 100) => {
  const debouncedListener = useMemo(() => _.debounce(listener, timeout), [
    listener,
    timeout,
  ]);

  useEffect(() => {
    window.addEventListener(name, debouncedListener);
    return () => {
      window.removeEventListener(name, debouncedListener);
    };
  }, [debouncedListener, name]);
};
