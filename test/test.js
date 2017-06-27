// Dependencies
const expect = require('chai').expect;
const assert = require('chai').assert;
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
    it('should not throw an error', (done) => {
      expect(() => {
        utils.validateConfig({
          github: { username: 'test-name', token: 'test-token' }
        });
      }).to.not.throw();
      done();
    });
    it('should throw an error', () => {
      expect(() => {
        utils.validateConfig({});
      }).to.throw(Error);
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
