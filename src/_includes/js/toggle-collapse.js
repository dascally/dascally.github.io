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
    toggleElt.addEventListener('click', (evt) => {
      const targetID = toggleElt.getAttribute('aria-controls');
      const collapseContainerElt = document.querySelector(`#${targetID}`);

      const collapsed = collapseContainerElt.classList.toggle(
        'collapseContainer--collapsed'
      );
      toggleElt.setAttribute('aria-expanded', `${!collapsed}`);
    });
  });
});
