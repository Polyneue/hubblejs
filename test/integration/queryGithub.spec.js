const { expect, config } = require('../utilities');
const nock = require('nock');
const createQuery = require('../../libs/createQuery');
const queryGithub = require('../../libs/queryGithub');

// Query Github
describe('queryGithub()', function () {
  const query = createQuery(config.github);
  const response = {
    data: {
      user: { name: config.github.username }
    }
  };

  describe('Successfull Request', function () {
    before(function () {
      nock('https://api.github.com')
        .post('/graphql')
        .reply(200, response);
    });

    it('resolve with data from the Github API', function () {
      return queryGithub(config, query).then(function (res) {
        expect(res).to.have.property('data');
        expect(res.data.user.name).to.equal(config.github.username);
      });
    });
  });

  describe('Failed Request', function () {
    before(function () {
      nock('https://api.github.com')
        .post('/graphql')
        .reply(404, 'Error Getting Data');
    });

    it('rejects when the API throws a 404', function () {
      return queryGithub(config, query).catch(function (err) {
        expect(err).to.be.an('error');
        expect(err.message).to.contain('Failed to retrieve data from Github -');
      });
    });
  });
});
