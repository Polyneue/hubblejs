const { expect, config } = require('../utilities.js');
const validateConfig = require('../../libs/validateConfig.js');

// Validate Config
describe('validateConfig()', function () {
  it('should pass validation', function () {
    return validateConfig(config).then(function (valid) {
      expect(valid).to.be.true;
    });
  });

  it('should fail validation due to missing username', function () {
    const testConfig = JSON.parse(JSON.stringify(config));
    testConfig.github.username = false;
    return validateConfig(testConfig).catch(function (err) {
      expect(err).to.exist;
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.contain('Github username required in Hubble config.');
    });
  });

  it('should fail validation due to missing token', function () {
    const testConfig = JSON.parse(JSON.stringify(config));
    testConfig.github.token = false;
    return validateConfig(testConfig).catch(function (err) {
      expect(err).to.exist;
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.contain('Github auth token required in Hubble config.');
    });
  });
});
