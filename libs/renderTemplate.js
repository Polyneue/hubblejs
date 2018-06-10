const hubbleJsTheme = require('hubblejs-default-theme');

/**
 * Parse, render, and write static html file to the file system
 * @param {Object} data - data to be rendered into template
 * @param {Function} template - template function
 * @param {String} output - path to output file
 */
const renderTemplate = async function (data, template, output) {
  const render = template || hubbleJsTheme;

  // Validate Template by checking if it's not a function
  if (typeof render !== 'function') {
    throw new Error('Template must be a function.');
  }

  try {
    // Call the render function from the theme
    await render(data, output);
  } catch (err) {
    throw err;
  }
};

module.exports = renderTemplate;
