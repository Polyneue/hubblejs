const { expect, config } = require('../utilities.js');
const validateConfig = require('../../libs/validateConfig.js');

// Validate Config
describe('# validateConfig()', function () {
  it('passes with a valid config', function (done) {
    const result = validateConfig(config);
    expect(result).to.be.an('object');
    expect(result).to.have.property('username');
    expect(result).to.have.property('token');
    done();
  });

  // Handles invalid username
  it('fails with an invalid username', function (done) {
    try {
      validateConfig({ token: 'GH_ACCESS_TOKEN' });
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.contain('config.username required in Hubble config.');
      done();
    }
  });

  // Handles invalid token
  it('fails with an invalid token', function (done) {
    try {
      validateConfig({ username: 'GH_USER_NAME' });
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.contain('config.token required in Hubble config.');
      done();
    }
  });
});
