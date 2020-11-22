import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Popover from 'components/Popover';

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

  it('opens on click (basic case)', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover content={<span data-testid="content">Hi!</span>}>
        <button data-testid="button">Open</button>
      </Popover>
    );
    expect(queryByTestId('content')).not.toBeInTheDocument();
    user.click(getByTestId('button'));
    await waitFor(() => expect(getByTestId('content')).toBeInTheDocument());
  });

  it('opens by children function', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover content={<span data-testid="content">Hi!</span>}>
        {({ open }) => (
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
      <Popover trigger="click" content={<span data-testid="content">Hi!</span>}>
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
  });

  it('closes on escape key press', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover content={<span data-testid="content">Hi!</span>}>
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

  it('closes modal on enter key press', async () => {
    const { getByTestId, queryByTestId } = render(
      <Popover
        closeOnEnter={true}
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
});
