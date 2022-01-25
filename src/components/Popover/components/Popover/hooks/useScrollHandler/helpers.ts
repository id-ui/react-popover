export const findScrollContainer = (node: HTMLElement): HTMLElement => {
  if (!node) {
    return document.body;
  }

  return node.scrollHeight > node.clientHeight
    ? node
    : findScrollContainer(node.parentElement);
};
