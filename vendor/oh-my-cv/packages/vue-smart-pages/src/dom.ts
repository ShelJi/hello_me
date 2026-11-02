import type { PageSize, PageMargins } from "./types";

const NEW_PAGE_CLASS = "md-it-newpage";

const _elementHeight = (element: Element) => {
  const style = window.getComputedStyle(element);

  const marginTop = parseFloat(style.marginTop) || 0;
  const marginBottom = parseFloat(style.marginBottom) || 0;

  return element.offsetHeight + marginTop + marginBottom;
};

const _createPage = (size: PageSize, margins: Required<PageMargins>) => {
  const page = document.createElement("div");

  page.dataset.scope = "vue-smart-pages";
  page.dataset.part = "page";

  page.style.minHeight = `${size.height}px`;
  page.style.display = "flow-root";
  setWidthAndMargins(page, size, margins);

  return page;
};

export const setWidthAndMargins = (
  element: HTMLElement,
  size: PageSize,
  margins: Required<PageMargins>
) => {
  element.style.boxSizing = "border-box";
  element.style.width = `${size.width}mm`;
  element.style.padding = `${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px`;
};

export const breakPage = (
  target: HTMLElement,
  size: PageSize,
  margins: Required<PageMargins>
) => {
  const maxHeight = size.height - margins.top - margins.bottom;
  const pages = document.createElement("div");

  let accHeight = 0;
  let page = _createPage(size, margins);

  Array.from(target.children).forEach((child) => {
    if (child.classList.contains(NEW_PAGE_CLASS)) {
      if (page.childElementCount) {
        pages.appendChild(page);
        page = _createPage(size, margins);
        accHeight = 0;
      }
      return;
    }
    const childHeight = _elementHeight(child);
    if (childHeight === 0 && !child.textContent?.trim()) return;

    if (page.childElementCount && accHeight + childHeight > maxHeight) {
      pages.appendChild(page);

      accHeight = 0;
      page = _createPage(size, margins);
    }

    page.appendChild(child);
    accHeight += childHeight;
  });

  if (page.childElementCount || !pages.childElementCount) pages.appendChild(page);
  target.innerHTML = pages.innerHTML;
};
