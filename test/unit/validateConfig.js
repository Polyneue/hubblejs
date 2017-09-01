const { expect, config } = require('../common.js');
const validateConfig = require('../../libs/validateConfig.js');

// Validate Config
describe('validateConfig()', function () {
  it('should pass validation', function (done) {
    validateConfig(config).then(function (valid) {
      expect(valid).to.be.true;
      done();
    });
  });

  it('should fail validation due to missing username', function (done) {
    const testConfig = JSON.parse(JSON.stringify(config));
    testConfig.github.username = false;
    validateConfig(testConfig).catch(function (err) {
      expect(err).to.contain('Github username required in Hubble config.');
      done();
    });
  });

  it('should fail validation due to missing token', function (done) {
    const testConfig = JSON.parse(JSON.stringify(config));
    testConfig.github.token = false;
    validateConfig(testConfig).catch(function (err) {
      expect(err).to.contain('Github auth token required in Hubble config.');
      done();
    });
  });
});
