import React, {
  ForwardRefRenderFunction,
  Fragment,
  ReactChild,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { isBoolean, isFunction, isNumber, isString } from '../../helpers';
import { PopoverTriggerType } from '../../enums';
import { PopoverProps } from '../../types';
import {
  useArrow,
  useGlobalListener,
  useOpen,
  usePosition,
  useTrigger,
} from './hooks';

import './styles.css';

const Popover: ForwardRefRenderFunction<HTMLElement, PopoverProps> = (
  {
    children,
    content,
    placement,
    trigger,
    withArrow,
    offset,
    getContainer,
    isOpen,
    onChangeOpen,
    className,
    considerTriggerMotion,
    considerContentResizing,
    closeOnEscape,
    closeOnEnter,
    closeOnTab,
    closeOnScroll,
    scrollHandlerMinDistance,
    closeOnRemoteClick: providedCloseOnRemoteClick,
    guessBetterPosition,
    onFocus,
    mouseEnterDelay,
    mouseLeaveDelay,
    triggerContainerDisplay,
    triggerContainerTag,
    maxHeight,
    maxWidth,
    minSpaceBetweenPopoverAndContainer,
    avoidOverflowBounds,
    fitMaxHeightToBounds,
    fitMaxWidthToBounds,
    animation,
    openingAnimationTranslateDistance,
    closingAnimationTranslateDistance,
    spaceBetweenPopoverAndTarget,
    zIndex,
    arrowSize,
    arrowOffset,
    arrowColor,
    arrowPlacement,
    useTriggerWidth,
    useTriggerHeight,
    width,
    height,
    usePortal,
    ...props
  },
  ref
) => {
  const [betterPlacement, setBetterPlacement] = useState(placement);

  const { addTarget, open, close, toggle } = useOpen({
    closeOnRemoteClick: isBoolean(providedCloseOnRemoteClick)
      ? providedCloseOnRemoteClick
      : trigger !== PopoverTriggerType.hover,
    closeOnEscape,
    closeOnEnter,
    closeOnTab,
    isOpen,
    onChangeOpen,
  });

  const triggerElementRef = useRef();

  const {
    popoverPlacementProps: { containerStyle, contentStyle, motionProps },
    updatePosition,
    contentRef,
    setContentDimensions,
    shouldCheckContentDimensions,
  } = usePosition({
    triggerElementRef,
    placement,
    offset,
    withArrow,
    guessBetterPosition,
    animation,
    openingAnimationTranslateDistance,
    closingAnimationTranslateDistance,
    spaceBetweenPopoverAndTarget,
    getContainer,
    arrowSize,
    setBetterPlacement,
    canUpdate: usePortal,
    minSpaceBetweenPopoverAndContainer,
    avoidOverflowBounds,
    fitMaxHeightToBounds,
    fitMaxWidthToBounds,
    maxHeight,
    maxWidth,
    isOpen,
    considerContentResizing,
  });

  const setContentRef = useCallback(
    (node) => {
      contentRef.current = node;
      addTarget('content', node);
    },
    [addTarget, contentRef]
  );

  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, isOpen]);

  const { triggerDimensions, setTriggerRef, triggerHandlers } = useTrigger({
    ref,
    isOpen,
    mouseEnterDelay,
    mouseLeaveDelay,
    trigger,
    closeOnScroll,
    scrollHandlerMinDistance,
    considerTriggerMotion,
    triggerContainerDisplay,
    usePortal,
    triggerElementRef,
    updatePosition,
    addTarget,
    toggle,
    open,
    close,
  });

  useGlobalListener('resize', updatePosition, isOpen);

  const arrowStyles = useArrow({
    placement: betterPlacement,
    arrowSize,
    arrowPlacement,
    arrowOffset,
  });

  const TriggerContainer = triggerContainerTag;

  const container = getContainer();

  const animationProps = usePortal ? motionProps : animation;

  const transformedContent = isFunction(content) ? content({ close }) : content;

  const popoverContentAnimated = (
    <AnimatePresence initial={null}>
      {isOpen && (!usePortal || containerStyle) && (
        <motion.div
          ref={setContentRef}
          initial={animationProps.initial}
          animate={animationProps.animate}
          exit={animationProps.exit}
          onMouseEnter={triggerHandlers.onMouseEnter}
          onMouseLeave={triggerHandlers.onMouseLeave}
          className={`idui-popover ${className}`}
          style={{
            zIndex,
            width: useTriggerWidth ? triggerDimensions.width : width,
            height: useTriggerHeight ? triggerDimensions.height : height,
            ...containerStyle,
          }}
          {...props}
        >
          {withArrow && (
            <span
              className="idui-popover__arrow"
              style={{
                ...arrowStyles,
                border: `${arrowSize / 2}px solid ${arrowColor}`,
              }}
            />
          )}
          <div
            className="idui-popover__content"
            style={{ maxHeight, maxWidth, ...contentStyle }}
          >
            {transformedContent}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  let triggerElement: ReactElement = null;

  if (trigger === PopoverTriggerType.focus) {
    let childElement: ReactChild = (isFunction(children)
      ? children({ isOpen, open, close, toggle })
      : children) as ReactChild;

    if (isString(childElement) || isNumber(childElement)) {
      childElement = <span>{childElement}</span>;
    }

    triggerElement = React.cloneElement(childElement, {
      onFocus: (e: SyntheticEvent<HTMLElement, FocusEvent>) => {
        open();
        onFocus(e);
      },
      ref: setTriggerRef,
    });
  } else {
    triggerElement = (
      <TriggerContainer {...triggerHandlers} ref={setTriggerRef}>
        {isFunction(children)
          ? children({ isOpen, open, close, toggle })
          : children}
      </TriggerContainer>
    );
  }

  return (
    <Fragment>
      {shouldCheckContentDimensions &&
        Boolean(container) &&
        createPortal(
          <div
            ref={setContentDimensions}
            className={`idui-popover ${className}`}
            style={{
              width: useTriggerWidth ? triggerDimensions.width : width,
              height: useTriggerHeight ? triggerDimensions.height : height,
              left: '-999px',
              top: '-999px',
            }}
            {...props}
          >
            <div
              className="idui-popover__content"
              style={{ maxHeight, maxWidth }}
            >
              {transformedContent}
            </div>
          </div>,
          container
        )}

      {usePortal
        ? Boolean(container) && createPortal(popoverContentAnimated, container)
        : popoverContentAnimated}

      {triggerElement}
    </Fragment>
  );
};

const PopoverWithRef = React.forwardRef<HTMLElement, PopoverProps>(Popover);

export default PopoverWithRef;
