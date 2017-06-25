// Dependencies
const expect = require('chai').expect;
const utils = require('../libs/utilities.js');
const Hubble = require('../index.js');

describe('Hubble.js', () => {
  // Error Reporting
  describe('utils.reportError()', () => {
    it('should return an error message', (done) => {
      const message = utils.reportError('Label', 'Test Message');
      expect(message).to.contain('Label');
      expect(message).to.contain('Test Message');
      done();
    });
  });

  // Config Validation
  describe('utils.validateConfig()', () => {
    it('should return an empty error array', (done) => {
      const errors = utils.validateConfig({
        github: { username: 'Polyneue', token: 'testvalue' }
      });
      expect(errors).to.be.empty; // eslint-disable-line
      done();
    });
    it('should return an error array', (done) => {
      const errors = utils.validateConfig({});
      expect(errors).to.not.be.empty; //eslint-disable-line
      done();
    });
  });

  // Instantiate Hubble
  describe('new Hubble()', () => {
    let hubble;
    before(function beforeHubble() {
      hubble = new Hubble({
        github: { username: 'Name', token: 'token' }
      });
    });
    it('should add config to hubble instance', (done) => {
      expect(hubble.config).to.be.an('object');
      done();
    });
  });
});
