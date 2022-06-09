module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/scripts');

  return {
    dir: {
      input: 'src',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
