const fs = require('fs');
const path = require('path');
const { expect, templateData } = require('../common.js');
const renderTemplate = require('../../libs/renderTemplate.js');

describe('renderTemplate()', function () {
  const absPath = __dirname.split('test')[0];
  const output = path.join(absPath, 'test/fixtures/index.test.html');

  it('should successfully render a template', function (done) {
    const template = path.join(absPath, 'test/fixtures/template.test.html');
    renderTemplate(templateData, template, output)
      .then(function () {
        expect(fs.existsSync(output)).to.be.true;
        done();
      });
  });

  it('should fail to load a template', function (done) {
    const template = path.join(absPath, 'test/fixtures/template.not.html');
    renderTemplate(templateData, template, output)
      .catch(function (err) {
        expect(err).to.exist;
        expect(err).to.be.an.instanceof(Error);
        done();
      });
  });

  it('should fail to parse a template', function (done) {
    const template = path.join(absPath, 'test/fixtures/template.fail.test.html');
    renderTemplate(templateData, template, output)
      .catch(function (err) {
        expect(err).to.exist;
        expect(err).to.be.an.instanceof(Error);
        done();
      });
  });

  after(function (done) {
    fs.unlink(output, function (err) {
      if (err) throw err;
      done();
    });
  });
});
