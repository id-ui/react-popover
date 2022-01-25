import React, {
  ForwardRefRenderFunction,
  Fragment,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { isBoolean, isFunction, isNumber, isString, pick } from 'lodash';
import { AnimatePresence } from 'framer-motion';
import { PopoverTriggerType } from '../../enums';
import { PopoverProps } from '../../types';
import {
  useArrow,
  useGlobalListener,
  useOpen,
  usePosition,
  useTrigger,
} from './hooks';
import { Container, Inner } from './styled';

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
    arrowPlacement,
    useTriggerWidth,
    useTriggerHeight,
    width,
    height,
    usePortal,
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
    containerProps,
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

  const animationProps = usePortal ? containerProps : animation;

  const transformedContent = isFunction(content) ? content({ close }) : content;

  const popoverContentAnimated = (
    <AnimatePresence initial={null}>
      {isOpen && (!usePortal || containerProps.style) && (
        <Container
          ref={setContentRef}
          withArrow={withArrow}
          arrowStyles={arrowStyles}
          positionStyles={containerProps.style}
          initial={animationProps.initial}
          animate={animationProps.animate}
          exit={animationProps.exit}
          {...pick(triggerHandlers, ['onMouseEnter', 'onMouseLeave'])}
          className={className}
          zIndex={zIndex}
          arrowSize={arrowSize}
          width={useTriggerWidth ? `${triggerDimensions.width}px` : width}
          height={useTriggerHeight ? `${triggerDimensions.height}px` : height}
        >
          <Inner maxHeight={maxHeight} maxWidth={maxWidth}>
            {transformedContent}
          </Inner>
        </Container>
      )}
    </AnimatePresence>
  );

  let triggerElement: ReactElement = null;

  if (trigger === PopoverTriggerType.focus) {
    let childElement = isFunction(children)
      ? children({ isOpen, open, close, toggle })
      : children;

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
          <Container
            ref={setContentDimensions}
            isCheckingContentDimensions
            className={className}
            width={useTriggerWidth ? `${triggerDimensions.width}px` : width}
            height={useTriggerHeight ? `${triggerDimensions.height}px` : height}
          >
            <Inner maxHeight={maxHeight} maxWidth={maxWidth}>
              {transformedContent}
            </Inner>
          </Container>,
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
