const { expect, config } = require('../common.js');
const createQuery = require('../../libs/createQuery.js');

// Create Query
describe('createQuery()', function () {
  it('should return a formatted query for GraphQL', function (done) {
    const gh = config.github;
    const { query } = createQuery(gh);
    expect(query).to.contain(gh.username);
    done();
  });
});
