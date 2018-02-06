const path = require('path');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
const fs = require('fs');

/**
 * Parse the source into a Handlebars template
 * @param {String} source - path to template for rendering
 * @param {Bool} default - whether the template is hubblejs
 * @return {Function} Handlebars template fn
 * @private
 */
const loadTemplate = async function loadTemplate(source) {
  let sourcePath = path.resolve(source);
  sourcePath = path.dirname(sourcePath);

  try {
    const src = await fs.readFileSync(source, 'utf8');
    const template = ejs.compile(src, { root: sourcePath });

    return template;
  } catch (err) {
    throw err;
  }
};

/**
 * Parse, render, and write static html file to the file system
 * @param {Object} data - Data to be rendered into template
 * @param {String} source - path to template for rendering
 * @param {String} output - path to output file
 * @return {String} success message
 */
const renderTemplate = async function renderTemplate(data, source, output) {
  try {
    const template = await loadTemplate(source);
    const html = template(data);
    const dir = path.dirname(output);

    await mkdirp(dir);
    await fs.writeFileSync(output, html, 'utf8');

    return 'Success';
  } catch (err) {
    throw err;
  }
};

module.exports = renderTemplate;
