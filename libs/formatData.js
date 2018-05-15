/**
 * Transform the data into a more intuitive format
 * @param {Object} data - data from Github
 * @param {Object} config - configuration object
 * @return {Object} formatted data
 */
const formatData = function (data, config) {
  // Break down data for transformation
  const { user } = data;
  const { theme, username } = config;
  const featuredRepositories = config.repositories;

  // Assign username
  user.username = username;

  // Reformat repository data
  let repositories = user.repositories.edges.map(function format(repo) {
    return repo.node;
  });
  delete user.repositories.edges;

  // Reformat contribution data
  const contributions = user.repositoriesContributedTo.nodes;

  // Reformat Gists
  const gists = user.gists.edges.map(function format(gist) {
    return gist.node;
  });
  delete user.gists.edges;

  // If repositories are specified, filter in only the required ones
  if (featuredRepositories && featuredRepositories.length > 0) {
    const repos = [];
    for (let i = 0; i < featuredRepositories.length; i++) {
      for (let j = 0; j < repositories.length; j++) {
        if (repositories[j].name === featuredRepositories[i]) {
          repos.push(repositories[j]);
          repositories.splice(j, 1);
          break;
        }
      }
    }
    repositories = repos;
  }

  // Return transformed data
  return {
    user,
    repositories,
    contributions,
    gists,
    theme
  };
};

module.exports = formatData;
