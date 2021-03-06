import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AnimatePresence } from 'framer-motion';
import {
  useArrow,
  useElementMotion,
  useGlobalListener,
  useHandlers,
  useOpen,
  usePosition,
} from './hooks';
import { Container, Inner } from './styled';
import placementPropsGetters from './placementsConfig';
import { POPOVER_TRIGGER_TYPES } from './constants';
import useScroll from './hooks/useScroll';

function Popover(
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
) {
  const [betterPlacement, setBetterPlacement] = useState(placement);

  const { addTarget, open, close, toggle } = useOpen({
    closeOnRemoteClick: _.isBoolean(providedCloseOnRemoteClick)
      ? providedCloseOnRemoteClick
      : trigger !== POPOVER_TRIGGER_TYPES.hover,
    closeOnEscape,
    closeOnEnter,
    closeOnTab,
    isOpen,
    onChangeOpen,
  });

  const triggerElementRef = useRef();
  const [triggerDimensions, setTriggerDimensions] = useState({});

  const scrollListener = useCallback(() => {
    if (isOpen && closeOnScroll) {
      close();
    }
  }, [isOpen, close, closeOnScroll]);

  const setScrollContainer = useScroll({
    listener: scrollListener,
  });

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
    [addTarget]
  );

  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, isOpen]);

  const setupElementMotionObserver = useElementMotion(updatePosition);

  useGlobalListener('resize', updatePosition, isOpen);

  const {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
  } = useHandlers({
    isOpen,
    open,
    close,
    toggle,
    mouseEnterDelay,
    mouseLeaveDelay,
    onFocus,
  });

  const setTriggerRef = useCallback(
    (node) => {
      if (node && node.children.length) {
        const child = node.children[0];
        if (usePortal && considerTriggerMotion) {
          setupElementMotionObserver(child);
        }
        triggerElementRef.current = child;
        if (triggerContainerDisplay) {
          node.style.display = triggerContainerDisplay;
        } else {
          const style = window.getComputedStyle(child);
          node.style.display = style.display;
        }
      } else {
        triggerElementRef.current = node;
      }

      if (triggerElementRef.current) {
        setTriggerDimensions({
          width: triggerElementRef.current.offsetWidth,
          height: triggerElementRef.current.offsetHeight,
        });
      }

      setScrollContainer(triggerElementRef.current);

      if (ref) {
        if (_.isFunction(ref)) {
          ref(node);
        } else {
          ref.current = node;
        }
      }
      addTarget('trigger', node);
    },
    [
      ref,
      considerTriggerMotion,
      triggerContainerDisplay,
      setupElementMotionObserver,
      addTarget,
      usePortal,
      setScrollContainer,
    ]
  );

  const triggerProps = useMemo(
    () =>
      _.fromPairs(
        _.filter(
          [
            [
              'onMouseDown',
              trigger === POPOVER_TRIGGER_TYPES.click && handleClick,
            ],
            [
              'onMouseEnter',
              trigger === POPOVER_TRIGGER_TYPES.hover && handleMouseEnter,
            ],
            [
              'onMouseLeave',
              trigger === POPOVER_TRIGGER_TYPES.hover && handleMouseLeave,
            ],
            [
              'onContextMenu',
              trigger === POPOVER_TRIGGER_TYPES.contextMenu && handleClick,
            ],
          ],
          1
        )
      ),
    [handleClick, handleMouseEnter, handleMouseLeave, trigger]
  );

  const arrowStyles = useArrow({
    placement: betterPlacement,
    arrowSize,
    arrowPlacement,
    arrowOffset,
  });

  const TriggerContainer = triggerContainerTag;

  const container = getContainer();

  const animationProps = usePortal ? containerProps : animation;

  const transformedContent = useMemo(
    () => (_.isFunction(content) ? content({ close }) : content),
    [content, close]
  );

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
          onMouseEnter={triggerProps.onMouseEnter}
          onMouseLeave={triggerProps.onMouseLeave}
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

  return (
    <Fragment>
      {shouldCheckContentDimensions &&
        container &&
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
        ? container && createPortal(popoverContentAnimated, container)
        : popoverContentAnimated}
      {trigger === POPOVER_TRIGGER_TYPES.focus ? (
        React.cloneElement(
          React.Children.only(
            _.isFunction(children)
              ? children({ isOpen, open, close, toggle })
              : children
          ),
          {
            onFocus: handleFocus,
            ref: setTriggerRef,
          }
        )
      ) : (
        <TriggerContainer {...triggerProps} ref={setTriggerRef}>
          {_.isFunction(children)
            ? children({ isOpen, open, close, toggle })
            : children}
        </TriggerContainer>
      )}
    </Fragment>
  );
}

const PopoverWithRef = React.forwardRef(Popover);

PopoverWithRef.propTypes = {
  /**
   * Where popover should show it's content
   * @default _.noop
   */
  placement: PropTypes.oneOf(Object.keys(placementPropsGetters)),
  /**
   * Event name, on which popover should change visibility
   * If trigger is 'focus' and you want to listen for onFocus on child then provide popover with this listener
   * If trigger is 'focus' then root child should accept event onFocus, use forwardRef to choose another child
   * @default hover
   */
  trigger: PropTypes.oneOf(Object.keys(POPOVER_TRIGGER_TYPES)),
  /**
   * onFocus event of child component, triggered if trigger === 'focus'
   * @default _.noop
   */
  onFocus: PropTypes.func,
  /**
   * Whether show popover arrow or not
   * @default true
   */
  withArrow: PropTypes.bool,
  /**
   * Popover children
   * If it's function then it provided with {close: close popover, open: open popover, toggle: toggle popover, isOpen: is popover open}
   * @default undefined
   */
  children: PropTypes.any,
  /**
   * Popover content
   * If it's function then it provided with {close: close popover}
   * @default undefined
   */
  content: PropTypes.any.isRequired,
  /**
   * Offset from computed popover position, if offset = [x, y] then popover position would be [position.x + x, position.y + y]
   * @default [0, 0]
   */
  offset: PropTypes.arrayOf(PropTypes.number),
  /**
   * Function, that should return component inside which popover should render its content
   * @default () => document.body
   */
  getContainer: PropTypes.func,
  /**
   * controlled popover visibility
   * @default undefined
   */
  isOpen: PropTypes.bool,
  /**
   * Function triggered when popover should change visibility
   * @default _.noop
   */
  onChangeOpen: PropTypes.func,
  /**
   * Popover content className
   * @default undefined
   */
  className: PropTypes.string,
  /**
   * Whether consider trigger position and size changes and follow it or not
   * @default false
   */
  considerTriggerMotion: PropTypes.bool,
  /**
   * Whether consider content resizing or not, use if content dimensions can change, for example after loading
   * @default false
   */
  considerContentResizing: PropTypes.bool,
  /**
   * Whether close on escape button press or not
   * @default true
   */
  closeOnEscape: PropTypes.bool,
  /**
   * Whether close on enter button press or not
   * @default false
   */
  closeOnEnter: PropTypes.bool,
  /**
   * Whether close on tab button press or not
   * @default false
   */
  closeOnTab: PropTypes.bool,
  /**
   * Whether close on scroll event of scroll container or not
   * @default true
   */
  closeOnScroll: PropTypes.bool,
  /**
   * Whether close on remote click or not
   * @default trigger !== 'hover'
   */
  closeOnRemoteClick: PropTypes.bool,
  /**
   * Whether popover should change position if there is no room
   * @default false
   */
  guessBetterPosition: PropTypes.bool,
  /**
   * Delay (ms) before opening popover on mouseEnter
   * @default 100
   */
  mouseEnterDelay: PropTypes.number,
  /**
   * Delay (ms) before closing popover on mouseLeave
   * @default 300
   */
  mouseLeaveDelay: PropTypes.number,
  /**
   * display of popover trigger container
   * @default display of root child
   */
  triggerContainerDisplay: PropTypes.string,
  /**
   * tag of popover trigger container
   * @default span
   */
  triggerContainerTag: PropTypes.string,
  /**
   * framer-motion props for opening/closing content animation {initial, animate, exit}
   */
  animation: PropTypes.shape({
    initial: PropTypes.object,

    animate: PropTypes.object,

    exit: PropTypes.object,
  }),
  /**
   * distance in % that content should slide during opening
   */
  openingAnimationTranslateDistance: PropTypes.number,
  /**
   * distance in % that content should slide during closing
   */
  closingAnimationTranslateDistance: PropTypes.number,
  /**
   * popover content z-index
   */
  zIndex: PropTypes.number,
  /**
   * space (px) between popover and target
   */
  spaceBetweenPopoverAndTarget: PropTypes.number,
  /**
   * size (px) of square circumscribing popover arrow
   * @default 8
   */
  arrowSize: PropTypes.number,
  /**
   * arrow offset (px) from popover side (second placement part) if placement consists of two sides
   * @default 10
   */
  arrowOffset: PropTypes.number,
  /**
   * arrow placement (left|center|right for top|bottom and top|center|bottom for right|left)
   * @default second popover placement part if it consists of two sides else center
   */
  arrowPlacement: PropTypes.string,
  /**
   * max content width
   */
  maxWidth: PropTypes.string,
  /**
   * max content height
   */
  maxHeight: PropTypes.string,
  /**
   * min space (px) between popover and container
   * @default 10
   */
  minSpaceBetweenPopoverAndContainer: PropTypes.number,
  /**
   * make content maxWidth fit to position and bounds
   * @default !maxWidth
   */
  fitMaxWidthToBounds: PropTypes.bool,
  /**
   * make content maxHeight fit to position and bounds
   * @default !maxHeight
   */
  fitMaxHeightToBounds: PropTypes.bool,
  /**
   * should popover try to change position to not overflow bounds if !fitMaxWidthToBounds && !fitMaxHeightToBounds
   * @default true
   */
  avoidOverflowBounds: PropTypes.bool,
  /**
   * content width
   * @default unset
   */
  width: PropTypes.string,
  /**
   * content height
   * @default unset
   */
  height: PropTypes.string,
  /**
   * make popover width to equal trigger width
   * @default false
   */
  useTriggerWidth: PropTypes.bool,
  /**
   * make popover height to equal trigger height
   * @default false
   */
  useTriggerHeight: PropTypes.bool,
  /**
   * whether render popover into container = getContainer() or render where it is
   * @default true
   */
  usePortal: PropTypes.bool,
};

PopoverWithRef.defaultProps = {
  placement: 'top',
  trigger: POPOVER_TRIGGER_TYPES.hover,
  withArrow: true,
  offset: [0, 0],
  onChangeOpen: _.noop,
  considerTriggerMotion: false,
  closeOnEscape: true,
  closeOnEnter: false,
  closeOnTab: false,
  closeOnScroll: true,
  getContainer: () => document.body,
  guessBetterPosition: false,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  onFocus: _.noop,
  triggerContainerTag: 'span',
  animation: {
    initial: {
      opacity: 0,
      scale: 0.9,
    },

    animate: {
      opacity: 1,
      scale: 1,
    },

    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  },
  openingAnimationTranslateDistance: 30,
  closingAnimationTranslateDistance: 0,
  minSpaceBetweenPopoverAndContainer: 10,
  spaceBetweenPopoverAndTarget: 7,
  arrowSize: 8,
  arrowOffset: 10,
  useTriggerWidth: false,
  useTriggerHeight: false,
  width: 'unset',
  height: 'unset',
  usePortal: true,
  avoidOverflowBounds: true,
  considerContentResizing: false,
};

export default PopoverWithRef;
