const path = require('path');
const mkdirp = require('mkdirp-promise');
const fs = require('fs');
const hubbleJsTheme = require('hubblejs-default-theme');
const { minify } = require('html-minifier');

/**
 * Parse, render, and write static html file to the file system
 * @param {Object} data - data to be rendered into template
 * @param {Function} template - template function
 * @param {String} output - path to output file
 * @return {Promise} resolve/rejected
 */
const renderTemplate = async function (data, template, output) {
  const render = template || hubbleJsTheme;
  const dir = path.dirname(output);

  // Validate Template by checking if it's not a function
  if (typeof render !== 'function') {
    throw new Error('Template must be a function.');
  }

  try {
    let html = await render(data);

    // Minify HTML
    html = minify(html, {
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true
    });

    // Write HTML
    await mkdirp(dir);
    await fs.writeFileSync(output, html, 'utf8');

    return;
  } catch (err) {
    throw err;
  }
};

module.exports = renderTemplate;
