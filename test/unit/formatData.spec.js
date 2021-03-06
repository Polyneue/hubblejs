const fs = require('fs');
const { expect, config } = require('../utilities');
const formatData = require('../../libs/formatData');

// Query Github
describe('# formatData()', function () {
  const { username, repositories, theme } = config;
  let data;
  let _data;
  let result;

  // Load in fixture data
  before(function () {
    const fixture = fs.readFileSync('./test/fixtures/githubData.json', { encoding: 'utf8' });
    data = JSON.parse(fixture);
    _data = JSON.parse(fixture);
    result = formatData(data, { username, repositories, theme });
  });

  it('adds username to the user object', function () {
    expect(result.user).to.have.property('username');
    expect(result.user.username).to.equal(username);
  });

  it('formats repositories for better use', function () {
    expect(result).to.have.property('repositories');
    expect(result.user.repositories).to.not.have.property('edges');
  });

  it('formats gists for better use', function () {
    expect(result).to.have.property('gists');
    expect(result.user.gists).to.not.have.property('edges');
  });

  it('filters repositories based on config', function () {
    const count = 3;
    const _repositories = _data.user.repositories.edges
      .map((repo) => repo.node.name)
      .splice(0, count);

    const _result = formatData(_data, { username, repositories: _repositories, theme });

    expect(_result.repositories).to.have.lengthOf(count);
  });
});
