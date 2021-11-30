import { useEffect } from 'react';
import _ from 'lodash';

export default (name, listener, condition, timeout = 100) => {
  useEffect(() => {
    if (condition) {
      const debouncedListener = _.debounce(listener, timeout);

      window.addEventListener(name, debouncedListener);

      return () => {
        window.removeEventListener(name, debouncedListener);
        debouncedListener.cancel();
      };
    }
  }, [name, condition, listener, timeout]);
};
