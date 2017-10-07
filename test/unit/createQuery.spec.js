const { expect, config } = require('../utilities.js');
const createQuery = require('../../libs/createQuery.js');

// Create Query
describe('createQuery()', function () {
  it('returns a formatted query for GraphQL', function (done) {
    const gh = config.github;
    const { query } = createQuery(gh);
    expect(query).to.contain(gh.username);
    done();
  });
});
