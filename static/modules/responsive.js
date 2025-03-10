/**
 * @returns {function} matchHeightsOnResize force a resize handler e.g. after showing/hiding an element or relevant content within
 * @param {Elements[]} elements - Array of elements to match heights of
 * @param {number} minWidth - Minimum widths to match heighs
 */
export function matchHeights(elements, minWidth) {
  if (!elements.slice) elements = [].slice.call(elements);
  const minWidthQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
  const tallestElement = elements.slice(1).reduce((tallest, next) => {
    return tallest.textContent.replace(/\s/g, '').length > next.textContent.replace(/\s/g, '').length ? tallest : next;
  }, elements[0]);
  const shorterElements = elements.filter(element => element != tallestElement);
  function matchHeightsOnResize() {
    if (minWidthQuery.matches) {
      shorterElements.forEach(element => element.style.height = window.getComputedStyle(tallestElement).height);
    } else {
      shorterElements.forEach(element => element.style.height = "auto");
    }
  }
  window.addEventListener("resize", matchHeightsOnResize);
  matchHeightsOnResize();
  return matchHeightsOnResize;
}