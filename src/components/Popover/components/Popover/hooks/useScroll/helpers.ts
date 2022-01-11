export const findScrollContainer = (
  node: HTMLElement
): HTMLElement | Window => {
  if (!node) {
    return window;
  }

  return node.scrollHeight > node.clientHeight
    ? node
    : findScrollContainer(node.parentElement);
};
