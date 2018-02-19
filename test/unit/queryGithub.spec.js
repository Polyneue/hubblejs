const { expect, config } = require('../utilities');
const queryGithub = require('../../libs/queryGithub');

// Query Github
describe('# queryGithub()', function () {
  const { username, token } = config;

  // Handles successful responses
  it('resolves with data from the Github API', async function () {
    const res = await queryGithub(username, token);
    expect(res).to.have.property('data');
    expect(res.data).to.have.key('user');
  });

  // Handles errors from Github
  it('rejects when the API returns a 404', async function () {
    try {
      await queryGithub('invalid', 'invalid');
    } catch (err) {
      expect(err).to.be.an('error');
      expect(err.message).to.contain('Failed to retrieve data from Github');
    }
  });
});
