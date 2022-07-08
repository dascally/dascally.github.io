// Wait for load event so that height calculations reflect styles
window.addEventListener('load', (evt) => {
  const collapseElts = document.querySelectorAll('.collapseContainer');

  collapseElts.forEach((collapseElt) => {
    let contentsHeight = Array.prototype.reduce.call(
      collapseElt.children,
      (sum, elt) => sum + elt.offsetHeight,
      0
    );
    contentsHeight += Number.parseInt(
      getComputedStyle(collapseElt.lastElementChild)['margin-block-end']
    );

    collapseElt.style['max-height'] = `${contentsHeight}px`;

    if (collapseElt.classList.contains('collapseContainer--collapsed'))
      collapseElt.hidden = true;
  });

  const toggleElts = document.querySelectorAll('.js-collapse-toggle');

  toggleElts.forEach((toggleElt) => {
    const targetID = toggleElt.getAttribute('aria-controls');
    const collapseContainerElt = document.querySelector(`#${targetID}`);

    // Initialize aria-expanded
    const initExpanded =
      getComputedStyle(collapseContainerElt)['max-height'] === '0px'
        ? false
        : true;
    toggleElt.setAttribute('aria-expanded', `${initExpanded}`);

    // Add click handlers to toggle collapse/expand
    let timerID = null;
    toggleElt.addEventListener('click', (evt) => {
      const collapsed = collapseContainerElt.classList.toggle(
        'collapseContainer--collapsed'
      );
      clearTimeout(timerID);
      if (collapsed) {
        timerID = setTimeout(() => {
          collapseContainerElt.hidden = true;
        }, 750);
      } else {
        collapseContainerElt.hidden = false;
      }
      toggleElt.setAttribute('aria-expanded', `${!collapsed}`);
    });
  });
});
