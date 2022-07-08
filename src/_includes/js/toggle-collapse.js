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

    if (
      collapseElt.classList.contains('collapseContainer--collapsed') &&
      !collapseElt.classList.contains('collapseContainer--expandAtMedium')
    )
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
      clearTimeout(timerID);

      const isCollapsed = collapseContainerElt.classList.contains(
        'collapseContainer--collapsed'
      );

      if (isCollapsed) {
        collapseContainerElt.hidden = false;

        // Immediate timeout so that it's not hidden anymore and animation works
        setTimeout(() => {
          collapseContainerElt.classList.remove('collapseContainer--collapsed');
        });
      } else {
        collapseContainerElt.classList.add('collapseContainer--collapsed');

        // Wait 0.75s for animation
        timerID = setTimeout(() => {
          collapseContainerElt.hidden = true;
        }, 750);
      }

      toggleElt.setAttribute('aria-expanded', `${isCollapsed}`);
    });
  });
});
