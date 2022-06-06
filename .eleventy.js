module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('css');

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
