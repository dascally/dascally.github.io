const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = class {
  data() {
    const cssPath = path.join(__dirname, './css/main.css');
    const rawCSS = fs.readFileSync(cssPath);

    return {
      permalink: 'styles.css',
      cssPath,
      rawCSS,
    };
  }

  render({ cssPath, rawCSS }) {
    return postcss([require('postcss-import'), require('cssnano')])
      .process(rawCSS, { from: cssPath, to: cssPath })
      .then((result) => result.css);
  }
};
