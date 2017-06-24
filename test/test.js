// Dependencies
const expect = require('chai').expect;
const utils = require('../libs/utilities.js');
// const Hubble = require('../index.js');

describe('Hubble.js', () => {
  describe('utils.reportError()', () => {
    it('return error message', (done) => {
      const message = utils.reportError('Label', 'Test Message');
      expect(message).to.contain('Label');
      expect(message).to.contain('Test Message');
      done();
    });
  });

  describe('utils.validateConfig()', () => {
    it('return no errors', (done) => {
      const errors = utils.validateConfig({
        github: {
          username: 'Polyneue',
          token: 'testvalue'
        }
      });
      expect(errors).to.be.empty; // eslint-disable-line
      done();
    });
    it('return errors', (done) => {
      const errors = utils.validateConfig({});
      expect(errors).to.not.be.empty; //eslint-disable-line
      done();
    });
  });
});

