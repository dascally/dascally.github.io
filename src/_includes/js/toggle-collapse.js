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
      collapseElt.classList.add('u-display-none');

    /* The following is a fallback class that ensures the container is expanded
    if JS fails to load or is disabled. Remove it here. */
    collapseElt.classList.remove('collapseContainer--expandFallback');
  });

  const toggleElts = document.querySelectorAll('.js-collapse-toggle');

  toggleElts.forEach((toggleElt) => {
    const targetID = toggleElt.getAttribute('aria-controls');
    const collapseElt = document.querySelector(`#${targetID}`);

    // Initialize aria-expanded
    const isExpanded = getComputedStyle(collapseElt)['max-height'] !== '0px';
    toggleElt.setAttribute('aria-expanded', `${isExpanded}`);

    // Add click handlers to toggle collapse/expand
    let timerID = null;
    toggleElt.addEventListener('click', (evt) => {
      clearTimeout(timerID);

      const isCollapsed = collapseElt.classList.contains(
        'collapseContainer--collapsed'
      );

      if (isCollapsed) {
        collapseElt.classList.remove('u-display-none');

        // Immediate timeout so that it's not hidden anymore and animation works
        setTimeout(() => {
          collapseElt.classList.remove('collapseContainer--collapsed');
        });
      } else {
        collapseElt.classList.add('collapseContainer--collapsed');

        // Wait 0.75s for animation
        timerID = setTimeout(() => {
          collapseElt.classList.add('u-display-none');
        }, 750);
      }

      toggleElt.setAttribute('aria-expanded', `${isCollapsed}`);
    });
  });
});
