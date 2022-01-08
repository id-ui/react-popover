import { useEffect } from 'react';
import { debounce } from 'lodash';

export default (name, listener, condition, timeout = 100) => {
  useEffect(() => {
    if (condition) {
      const debouncedListener = debounce(listener, timeout);

      window.addEventListener(name, debouncedListener);

      return () => {
        window.removeEventListener(name, debouncedListener);
        debouncedListener.cancel();
      };
    }
  }, [name, condition, listener, timeout]);
};
