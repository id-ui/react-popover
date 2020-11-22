import { useEffect } from 'react';

export default (listener) => {
  useEffect(() => {
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [listener]);
};
