const fs = require('fs');
const path = require('path');
const { expect, config } = require('../utilities.js');
const renderTemplate = require('../../libs/renderTemplate.js');

const { output } = config;

// Render Template
describe('# renderTemplate()', function () {
  let data;

  // Load in fixture data
  before(function () {
    data = fs.readFileSync('./test/fixtures/formattedData.json', { encoding: 'utf8' });
    data = JSON.parse(data);
  });

  // Handles the default template
  it('resolves when using the default template', async function () {
    await renderTemplate(data, false, output);

    // Verify output
    const result = fs.existsSync(output);
    expect(result).to.be.true;
  });

  // Handles a custom render function template
  it('resolves when using a render function', async function () {
    const test = `${path.dirname(output)}/index-2.html`;
    const template = function (dataObj) {
      return `<p>${dataObj.user.name}'s custom template fn.</p>`;
    };

    await renderTemplate(data, template, test);

    // Verify output
    const result = fs.existsSync(test);
    expect(result).to.be.true;
  });

  // Handles when a the render function is invalid
  it('rejects when the template is not a function', async function () {
    const test = `${path.dirname(output)}/index-3.html`;
    try {
      await renderTemplate(data, 'test', test);
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.contain('Template must be a function');
    }
  });
});
