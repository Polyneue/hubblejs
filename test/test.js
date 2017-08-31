const expect = require('chai').expect;
const validateConfig = require('../libs/validateConfig.js');

describe('validateConfig()', function () {
  let config;
  beforeEach(function () {
    config = {
      github: {
        username: 'User',
        token: 'token'
      }
    };
  });

  it('should pass validation', function (done) {
    validateConfig(config).then(function (valid) {
      expect(valid).to.be.true;
      done();
    });
  });

  it('should fail validation due to missing username', function (done) {
    const newConfig = config;
    newConfig.github.username = false;
    validateConfig(newConfig).catch(function (err) {
      expect(err).to.contain('Github username required in Hubble config.');
      done();
    });
  });

  it('should fail validation due to missing token', function (done) {
    const otherConfig = config;
    otherConfig.github.token = false;
    validateConfig(otherConfig).catch(function (err) {
      expect(err).to.contain('Github auth token required in Hubble config.');
      done();
    });
  });
});
