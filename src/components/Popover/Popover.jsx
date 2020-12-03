import React, {
  useCallback,
  useMemo,
  useRef,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AnimatePresence } from 'framer-motion';
import {
  useOpen,
  usePosition,
  useHandlers,
  useNodeDimensions,
  useElementMotion,
} from './hooks';
import { CheckContentDimensionsHelper, Container, Inner } from './styled';
import popoverPropsGetters from './placementsConfig';
import { POPOVER_TRIGGER_TYPES } from './constants';
import useResizeListener from './hooks/useResizeListener';

function Popover(
  {
    children,
    content,
    placement,
    trigger,
    withArrow,
    onClose,
    offset,
    getContainer,
    isOpen: providedIsOpen,
    isOpenControlled,
    onChangeOpen,
    className,
    considerTriggerMotion,
    closeOnEscape,
    closeOnEnter,
    closeOnRemoteClick: providedCloseOnRemoteClick,
    guessBetterPosition,
    onFocus,
    mouseEnterDelay,
    mouseLeaveDelay,
    triggerContainerDisplay,
    triggerContainerTag,
    maxHeight,
    maxWidth,
    animation,
    animationTranslateDistance,
    spaceBetweenPopoverAndTarget,
    zIndex,
    arrowSize,
    arrowOffset,
    arrowPlacement,
    useTriggerWidth,
    useTriggerHeight,
    width,
    height,
    ...wrapperProps
  },
  ref
) {
  const showTimer = useRef();
  useEffect(() => {
    return () => {
      clearTimeout(showTimer.current);
    };
  }, []);

  const handleClose = useCallback(() => {
    clearTimeout(showTimer.current);
    onClose();
  }, [onClose]);

  const { addTarget, isOpen, setOpen, open, close, toggle } = useOpen({
    onClose: handleClose,
    closeOnRemoteClick:
      providedCloseOnRemoteClick || trigger !== POPOVER_TRIGGER_TYPES.hover,
    closeOnEscape,
    closeOnEnter,
    isOpen: providedIsOpen,
    isOpenControlled,
    onChangeOpen,
  });

  const setContentRef = useCallback(
    (node) => {
      addTarget('content', node);
    },
    [addTarget]
  );

  const triggerElementRef = useRef();
  const [triggerDimensions, setTriggerDimensions] = useState({});

  const [
    contentDimensions,
    checkContentDimensions,
    isCheckingContentDimensions,
    setCheckingContentDimensions,
  ] = useNodeDimensions(providedIsOpen);

  const [containerProps, updatePosition] = usePosition({
    contentDimensions,
    triggerElementRef,
    placement,
    offset,
    withArrow,
    guessBetterPosition,
    animation,
    animationTranslateDistance,
    spaceBetweenPopoverAndTarget,
    getContainer,
    arrowSize,
    arrowOffset,
    arrowPlacement,
  });

  const updatePositionIfOpen = useCallback(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  const setupElementMotionObserver = useElementMotion(updatePosition);

  useResizeListener(updatePositionIfOpen);

  const showContent = useCallback(
    (force, customSetOpen) => {
      const show = () => {
        updatePosition();
        (customSetOpen || setOpen)(!isOpen, force);
      };

      if (!contentDimensions.current) {
        setCheckingContentDimensions(true);
        showTimer.current = setTimeout(show, 100);
      } else {
        show();
      }
    },
    [
      contentDimensions,
      updatePosition,
      setOpen,
      isOpen,
      setCheckingContentDimensions,
    ]
  );

  useEffect(() => {
    if (isOpenControlled && isOpen !== providedIsOpen) {
      if (providedIsOpen) {
        showContent(true);
      } else {
        setOpen(providedIsOpen, true);
      }
    }
  }, [isOpen, isOpenControlled, providedIsOpen, setOpen, showContent]);

  useEffect(() => {
    // open on mount
    if (!isOpenControlled && providedIsOpen) {
      showTimer.current = setTimeout(() => {
        updatePosition();
        setOpen(true, true);
      }, 100);
    }
    // eslint-disable-next-line
  }, []);

  const {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
  } = useHandlers({
    isOpen,
    open,
    close,
    mouseEnterDelay,
    mouseLeaveDelay,
    showContent,
    setOpen,
    onFocus,
    showTimer,
  });

  const setContainerRef = useCallback(
    (node) => {
      if (node && node.children.length) {
        const child = node.children[0];
        if (considerTriggerMotion) {
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
    ]
  );

  const transformedContent = useMemo(
    () => (_.isFunction(content) ? content({ close }) : content),
    [close, content]
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

  const TriggerContainer = triggerContainerTag;

  const container = getContainer();

  return (
    <Fragment>
      {isCheckingContentDimensions && (
        <CheckContentDimensionsHelper
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          width={useTriggerWidth ? `${triggerDimensions.width}px` : width}
          height={useTriggerHeight ? `${triggerDimensions.height}px` : height}
          ref={checkContentDimensions}
        >
          {transformedContent}
        </CheckContentDimensionsHelper>
      )}
      {container &&
        createPortal(
          <AnimatePresence initial={null}>
            {isOpen && containerProps.style && (
              <Container
                ref={setContentRef}
                withArrow={withArrow}
                positionStyles={containerProps.style}
                initial={containerProps.initial}
                animate={containerProps.animate}
                exit={containerProps.exit}
                onMouseEnter={triggerProps.onMouseEnter}
                onMouseLeave={triggerProps.onMouseLeave}
                className={className}
                zIndex={zIndex}
                arrowSize={arrowSize}
                width={useTriggerWidth ? `${triggerDimensions.width}px` : width}
                height={
                  useTriggerHeight ? `${triggerDimensions.height}px` : height
                }
              >
                <Inner maxHeight={maxHeight} maxWidth={maxWidth}>
                  {transformedContent}
                </Inner>
              </Container>
            )}
          </AnimatePresence>,
          container
        )}
      {trigger === POPOVER_TRIGGER_TYPES.focus ? (
        React.cloneElement(
          React.Children.only(
            _.isFunction(children)
              ? children({ isOpen, open, close, toggle })
              : children
          ),
          {
            onFocus: handleFocus,
            ref: setContainerRef,
            ...wrapperProps,
          }
        )
      ) : (
        <TriggerContainer
          {...triggerProps}
          ref={setContainerRef}
          {...wrapperProps}
        >
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
  placement: PropTypes.oneOf(Object.keys(popoverPropsGetters)),
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
   * Function, triggered when popover closed
   * @default _.noop
   */
  onClose: PropTypes.func,
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
   * If isOpenControlled then it defines popover visibility else it defines initial popover visibility
   * @default undefined
   */
  isOpen: PropTypes.bool,
  /**
   * Whether popover visibility controlled or not, use if you want control visibility from external component
   * @default false
   */
  isOpenControlled: PropTypes.bool,
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
   * Whether close on remote click or not
   * @default trigger !== 'hover'
   */
  closeOnRemoteClick: PropTypes.bool,
  /**
   * Whether popover should change position if there is no room
   * @default true
   */
  guessBetterPosition: PropTypes.bool,
  /**
   * Delay in ms before opening popover on mouseEnter
   * @default 100
   */
  mouseEnterDelay: PropTypes.number,
  /**
   * Delay in ms before closing popover on mouseLeave
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
  animationTranslateDistance: PropTypes.number,
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
   * @default available space - 25
   */
  maxWidth: PropTypes.string,
  /**
   * max content height
   * @default available space - 25
   */
  maxHeight: PropTypes.string,
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
};

PopoverWithRef.defaultProps = {
  placement: 'top',
  trigger: POPOVER_TRIGGER_TYPES.hover,
  withArrow: true,
  onClose: _.noop,
  offset: [0, 0],
  isOpen: false,
  onChangeOpen: _.noop,
  considerTriggerMotion: false,
  closeOnEscape: true,
  closeOnEnter: false,
  getContainer: () => document.body,
  guessBetterPosition: true,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 300,
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
      transition: { duration: 0.2 },
    },
  },
  animationTranslateDistance: 30,
  spaceBetweenPopoverAndTarget: 3,
  arrowSize: 8,
  arrowOffset: 10,
  useTriggerWidth: false,
  useTriggerHeight: false,
  width: 'unset',
  height: 'unset',
};

export default PopoverWithRef;
