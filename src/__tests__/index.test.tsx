import React from 'react';
import { noop } from 'lodash';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { act, renderHook } from '@testing-library/react-hooks';
import {
  ArrowPlacement,
  PopoverPlacement,
  PopoverTriggerType,
} from '../components/Popover/enums';
import { PopoverChildrenProps } from '../components/Popover/types';
import { useOpen } from '../components/Popover/components/Popover/hooks';
import { placementPropsGetters } from '../components/Popover/components/Popover/hooks/usePosition/placementsConfig';
import { fixPlacement } from '../components/Popover/components/Popover/hooks/usePosition/helpers';
import { Popover } from '..';

describe('Popover', () => {
  it('accessible', async () => {
    const { container } = render(
      <Popover content="Hi!">
        <button>Open</button>
      </Popover>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders children', () => {
    const { getByTestId } = render(
      <Popover content="Hi!">
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(getByTestId('button')).toBeInTheDocument();
  });

  it('opens and closes on click', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        placement={PopoverPlacement.bottomLeft}
        trigger={PopoverTriggerType.click}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    user.click(getByTestId('button'));
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('opens on init if isOpen = true', async () => {
    const { getByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.click}
        isOpen
        placement={PopoverPlacement.bottomRight}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );

    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('able to be controlled from outside', async () => {
    const { queryByTestId, getByTestId, rerender } = render(
      <Popover
        trigger={PopoverTriggerType.click}
        isOpen={false}
        placement={PopoverPlacement.bottom}
        lazy={false}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    user.click(getByTestId('button'));
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
    rerender(
      <Popover
        trigger={PopoverTriggerType.click}
        isOpen
        placement={PopoverPlacement.topLeft}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    rerender(
      <Popover
        trigger={PopoverTriggerType.click}
        isOpen={false}
        placement={PopoverPlacement.topRight}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('opens on hover', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.hover}
        mouseEnterDelay={0}
        placement={PopoverPlacement.rightBottom}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    fireEvent.mouseEnter(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('opens popover if usePortal is false', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.hover}
        mouseEnterDelay={0}
        usePortal={false}
        placement={PopoverPlacement.rightTop}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    fireEvent.mouseEnter(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('waits for delay before opening', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.hover}
        mouseEnterDelay={300}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    fireEvent.mouseEnter(getByTestId('button'));
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('waits for delay before closing', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.hover}
        mouseEnterDelay={0}
        mouseLeaveDelay={300}
        placement={PopoverPlacement.left}
        arrowPlacement={ArrowPlacement.bottom}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    fireEvent.mouseEnter(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.mouseLeave(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('does not close if mouse returned to trigger', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.hover}
        mouseEnterDelay={100}
        mouseLeaveDelay={2000}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();

    fireEvent.mouseEnter(getByTestId('button'));

    await waitFor(
      () => {
        expect(getByTestId('content')).toBeInTheDocument();
        fireEvent.mouseLeave(getByTestId('button'));
      },
      { timeout: 300 }
    );

    await waitFor(
      () => {
        expect(getByTestId('content')).toBeInTheDocument();
        fireEvent.mouseEnter(getByTestId('button'));
      },
      { timeout: 1000 }
    );
    // popover did not close after mouseLeaveDelay, e.g it was cancelled
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument(), {
      timeout: 2500,
    });
  });

  it('opens on focus', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.focus}
        content={<span data-testid="content">Hi!</span>}
        useTriggerWidth
        useTriggerHeight
      >
        <input type="text" data-testid="input" />
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    fireEvent.focus(getByTestId('input'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.focus(getByTestId('input'));
    expect(getByTestId('content')).toBeInTheDocument();
  });

  it('opens on focus if children is function', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.focus}
        content={() => <span data-testid="content">Hi!</span>}
        lazy={false}
        avoidOverflowBounds
        useTriggerWidth
        useTriggerHeight
      >
        {() => <input type="text" data-testid="input" />}
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    fireEvent.focus(getByTestId('input'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('opens on contextMenu', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.contextMenu}
        content={<span data-testid="content">{'Hi!'}</span>}
      >
        {() => <button data-testid="button">Open</button>}
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    fireEvent.contextMenu(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('opens by children function', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        content={<span data-testid="content">Hi!</span>}
        fitMaxHeightToBounds={false}
        fitMaxWidthToBounds={false}
      >
        {({ open }: PopoverChildrenProps) => (
          <div data-testid="rootChild">
            <button data-testid="button" onClick={open}>
              Open
            </button>
          </div>
        )}
      </Popover>
    );
    user.click(getByTestId('rootChild'));
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('closes on remote click if trigger === "click"', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        trigger={PopoverTriggerType.click}
        placement={PopoverPlacement.leftTop}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    const button = document.createElement('button');
    document.body.appendChild(button);
    fireEvent.mouseDown(button, { which: 1 });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );

    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());

    fireEvent.mouseDown(button, { which: 0 });
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('closes on escape key press', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        placement={PopoverPlacement.leftBottom}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('does not close on any button press (except for buttons in props)', async () => {
    const { getByTestId } = render(
      <Popover
        placement={PopoverPlacement.leftBottom}
        content={<span data-testid="content">Hi!</span>}
        closeOnEnter
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.keyDown(document.body, { key: 'Shift', code: 'Shift' });
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('closes on enter key press', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        closeOnEnter={true}
        guessBetterPosition={true}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('closes on tab key press', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        closeOnTab={true}
        guessBetterPosition={true}
        content={<span data-testid="content">Hi!</span>}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.keyDown(document.body, { key: 'Tab', code: 'Tab' });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('closes on scroll', async () => {
    const { getByTestId, queryByTestId } = render(
      <div>
        <Popover
          placement={PopoverPlacement.leftBottom}
          content={<span data-testid="content">Hi!</span>}
        >
          <button data-testid="button">Open</button>
        </Popover>
      </div>
    );
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('considers trigger motion', async () => {
    const { getByTestId } = render(
      <Popover
        closeOnEnter={true}
        content={<span data-testid="content">Hi!</span>}
        considerTriggerMotion
        trigger={PopoverTriggerType.click}
        // for coverage
        ref={React.createRef()}
        guessBetterPosition={false}
      >
        <button
          data-testid="button"
          style={{ position: 'absolute', left: '10px' }}
        >
          Open
        </button>
      </Popover>
    );
    const button = getByTestId('button');
    user.click(button);
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    //const initialContentLeft = getByTestId('content').getBoundingClientRect().left
    button.style.left = '100px';
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    // const currentContentLeft = getByTestId('content').getBoundingClientRect().left
    // expect(currentContentLeft).not.toBe(initialContentLeft)
  });

  it('resize listener coverage', async () => {
    const { getByTestId } = render(
      <Popover
        closeOnEnter={true}
        content={<span data-testid="content">Hi!</span>}
        trigger={PopoverTriggerType.click}
        // for coverage
        triggerContainerDisplay="inline"
        triggerContainerTag="div"
        ref={noop}
        placement={PopoverPlacement.right}
        arrowPlacement={ArrowPlacement.left}
        arrowSize={15}
        arrowOffset={15}
        guessBetterPosition={true}
        considerContentResizing
      >
        <button
          data-testid="button"
          style={{ position: 'absolute', left: '10px' }}
        >
          Open
        </button>
      </Popover>
    );
    const button = getByTestId('button');
    user.click(button);
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
    fireEvent(window, new Event('resize'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('custom container: renders content', async () => {
    const containerId = 'container';
    const { getByTestId } = render(
      <div style={{ position: 'relative' }}>
        <div id={containerId} style={{ position: 'static' }}>
          <Popover
            initialIsOpen={true}
            content={<span data-testid="content">Hi!</span>}
            getContainer={() => document.getElementById(containerId)}
          >
            <button data-testid="button">Open</button>
          </Popover>
        </div>
      </div>
    );

    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('custom relative container: renders content', async () => {
    const containerId = 'container';
    const { getByTestId } = render(
      <div id={containerId} style={{ position: 'relative' }}>
        <Popover
          initialIsOpen={true}
          content={<span data-testid="content">Hi!</span>}
          getContainer={() => document.getElementById(containerId)}
        >
          <button data-testid="button">Open</button>
        </Popover>
      </div>
    );

    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('custom container: do not render content if there is no container', async () => {
    const { queryByTestId } = render(
      <Popover
        isOpen={true}
        content={<span data-testid="content">Hi!</span>}
        getContainer={() => undefined}
      >
        <button data-testid="button">Open</button>
      </Popover>
    );

    await waitFor(() =>
      expect(queryByTestId('content')).not.toBeInTheDocument()
    );
  });

  it('do not calculate position if there is no trigger', async () => {
    const { queryByTestId } = render(
      <Popover isOpen content={<span data-testid="content">Hi!</span>} />
    );

    await waitFor(() => expect(queryByTestId('content')).toBeInTheDocument());
  });

  it('useOpen: toggle, open, close', async () => {
    const onChangeOpen = jest.fn();
    const { result } = renderHook(useOpen, {
      initialProps: {
        closeOnRemoteClick: true,
        closeOnEscape: true,
        closeOnEnter: false,
        onChangeOpen,
      },
    });
    act(() => result.current.toggle());
    act(() => result.current.open());
    act(() => result.current.close());
    expect(onChangeOpen.mock.calls).toEqual([[true], [true], [false]]);
  });

  it('useOpen: controlled visibility', async () => {
    const onChangeOpen = jest.fn();
    const { result } = renderHook(useOpen, {
      initialProps: {
        onChangeOpen,
        isOpen: false,
      },
    });
    act(() => result.current.toggle());
    expect(onChangeOpen).toBeCalledWith(true);
  });

  it('placementPropsGetters: contains all popover placements', async () => {
    expect(Object.keys(placementPropsGetters)).toStrictEqual([
      'top',
      'topRight',
      'topLeft',
      'bottom',
      'bottomRight',
      'bottomLeft',
      'left',
      'leftBottom',
      'leftTop',
      'right',
      'rightBottom',
      'rightTop',
    ]);
  });
  it('placementPropsGetters: each placement config contains style and motion props', async () => {
    Object.values(placementPropsGetters).forEach((item) => {
      expect(
        Object.keys(
          item(
            { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 },
            {
              offset: [0, 0],
              animation: { initial: {}, animate: {}, exit: {} },
              verticalPadding: 0,
              horizontalPadding: 0,
              contentHeight: 0,
              contentWidth: 0,
              containerHeight: 0,
              containerWidth: 0,
            }
          )
        )
      ).toStrictEqual(['style', 'initial', 'animate', 'exit']);
    });
  });

  it('fixPlacement: replaces position to opposite if there is no room', async () => {
    expect(
      fixPlacement(
        PopoverPlacement.topLeft,
        [PopoverPlacement.top, 200, 100],
        [PopoverPlacement.bottom, 300, 400]
      )
    ).toBe(PopoverPlacement.bottomLeft);
    expect(
      fixPlacement(
        PopoverPlacement.bottomLeft,
        [PopoverPlacement.top, 100, 200],
        [PopoverPlacement.bottom, 300, 400]
      )
    ).toBe(PopoverPlacement.topLeft);
    expect(
      fixPlacement(
        PopoverPlacement.bottomLeft,
        [PopoverPlacement.top, 200, 100],
        [PopoverPlacement.bottom, 400, 300]
      )
    ).toBe(PopoverPlacement.bottomLeft);
  });
});
