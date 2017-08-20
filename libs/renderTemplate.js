const Handlebars = require('handlebars');
const fs = require('fs');

/**
 * Parse the source into a Handlebars template
 * @param {String} source - path to template for rendering
 * @return {Function} Handlebars template fn
 * @TODO: write unit test
 */
const loadTemplate = async function loadTemplate(source) {
  return new Promise(async function promise(resolve, reject) {
    try {
      const src = await fs.readFileSync(source, 'utf8');
      const template = Handlebars.compile(src);
      resolve(template);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Parse, render, and write static html file to the file system
 * @param {Object} data - Data to be rendered into template
 * @param {String} source - path to template for rendering
 * @return {String} success message
 * @TODO: write unit test
 */
const renderTemplate = async function renderTemplate(data, source) {
  return new Promise(async function promise(resolve, reject) {
    try {
      const template = await loadTemplate(source);
      const html = template(data);
      
      await fs.writeFile('./index.html', html, 'utf8', function callback(err) {
        if (err) throw err;
      });

      resolve('Success!');
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = renderTemplate;
