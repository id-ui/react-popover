import { useEffect } from 'react';
import debounce from 'debounce';

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
        debouncedListener.clear();
      };
    }
  }, [name, condition, listener, timeout]);
};
