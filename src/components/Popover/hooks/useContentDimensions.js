import { useCallback, useRef, useState } from 'react';

export default () => {
  const [isChecking, setChecking] = useState(true);
  const dimensions = useRef();

  const checkDimensions = useCallback((node) => {
    if (node) {
      const { clientHeight, clientWidth, firstChild } = node;

      dimensions.current = {
        height: clientHeight,
        width: clientWidth,
        verticalPadding: clientHeight - firstChild.clientHeight,
        horizontalPadding: clientWidth - firstChild.clientWidth,
      };
      setChecking(false);
    }
  }, []);

  return [dimensions, checkDimensions, isChecking];
};
