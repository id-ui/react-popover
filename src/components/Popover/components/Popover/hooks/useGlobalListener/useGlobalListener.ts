import { useEffect } from 'react';
import { debounce } from 'lodash-es';

export const useGlobalListener = (
  name: keyof WindowEventMap,
  listener: EventListener,
  condition: boolean,
  timeout = 100
) => {
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
