const { minify } = require('terser');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/img');

  eleventyConfig.addNunjucksAsyncFilter('jsmin', async (code, cb) => {
    try {
      const result = await minify(code);
      cb(null, result.code);
    } catch (err) {
      console.error('Terser error:', err);
      cb(null, code);
    }
  });

  eleventyConfig.addPairedShortcode(
    'accordionSection',
    (content, heading, id, headingLevel = 3) => {
      return `<h${headingLevel} class="accordion__heading">
                <button
                  type="button"
                  class="js-collapse-toggle"
                  aria-controls="${id}"
                  aria-expanded="false"
                >
                  <span>${heading}</span>
                  <span class="accordion__icon fa-solid fa-chevron-down"></span>
                </button>
              </h${headingLevel}>
              <div
                id="${id}"
                class="
                  collapseContainer
                  collapseContainer--collapsed
                  collapseContainer--expandFallback
                "
              >
                <div class="accordion__panel">${content}</div>
              </div>`;
    }
  );

  return {
    dir: {
      input: 'src',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
