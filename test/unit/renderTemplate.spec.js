const fs = require('fs');
const path = require('path');
const { expect, templateData, errHandler } = require('../utilities.js');
const renderTemplate = require('../../libs/renderTemplate.js');

// Render Template
describe('renderTemplate()', function () {
  const absPath = __dirname.split('test')[0];
  const output = path.join(absPath, 'test/fixtures/index.test.html');

  it('resolves with a successfully rendered template', function () {
    const template = path.join(absPath, 'test/fixtures/template.test.html');
    return renderTemplate(templateData, template, output).then(function () {
      expect(fs.existsSync(output)).to.be.true;
    });
  });

  it('rejects when no template is found ', function () {
    const template = path.join(absPath, 'test/fixtures/template.not.html');
    return renderTemplate(templateData, template, output).catch(function (err) {
      expect(err).to.exist;
      expect(err).to.be.an.instanceof(Error);
    });
  });

  it('rejects when an invalid template it used', function () {
    const template = path.join(absPath, 'test/fixtures/template.fail.test.html');
    return renderTemplate(templateData, template, output).catch(function (err) {
      expect(err).to.exist;
      expect(err).to.be.an.instanceof(Error);
    });
  });

  after(function () {
    fs.unlink(output, errHandler);
  });
});
