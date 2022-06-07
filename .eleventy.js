module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('scripts');

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
