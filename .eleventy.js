const { minify } = require('terser');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
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

  return {
    dir: {
      input: 'src',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
