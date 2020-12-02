import { useCallback, useRef, useState } from 'react';

export default (initialIsChecking) => {
  const [isChecking, setChecking] = useState(initialIsChecking || false);
  const dimensions = useRef();

  const checkDimensions = useCallback((node) => {
    if (node) {
      const { height, width } = node.getBoundingClientRect();
      dimensions.current = { height, width };
      setChecking(false);
    }
  }, []);

  return [dimensions, checkDimensions, isChecking, setChecking];
};
