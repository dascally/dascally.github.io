const toggleCollapseElts = document.querySelectorAll('.js-toggle-collapse');
toggleCollapseElts.forEach((elt) => {
  elt.addEventListener('click', (evt) => {
    const targetElt = document.querySelector(elt.dataset.target);
    targetElt.classList.toggle('show');
  });
});
