// Wait for load event so that height calculations reflect styles
window.addEventListener('load', (evt) => {
  const collapseElts = document.querySelectorAll('.collapseContainer');

  collapseElts.forEach((collapseElt) => {
    let contentsHeight = Array.prototype.reduce.call(
      collapseElt.children,
      (sum, elt) => sum + elt.offsetHeight,
      0
    );
    contentsHeight += getComputedStyle(collapseElt.lastElementChild)[
      'margin-block-end'
    ];

    collapseElt.style['max-height'] = `${contentsHeight}px`;
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
    toggleElt.addEventListener('click', (evt) => {
      const collapsed = collapseContainerElt.classList.toggle(
        'collapseContainer--collapsed'
      );
      toggleElt.setAttribute('aria-expanded', `${!collapsed}`);
    });
  });
});
