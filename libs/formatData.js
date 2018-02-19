/**
 * Transform the data into a more intuitive format
 * @param {Object} data - data from Github
 * @param {Object} config - configuration object
 * @return {Object} formatted data
 */
const formatData = function (data, config) {
  // Break down data for transformation
  const { user } = data;
  const { theme } = config;
  const featuredRepositories = config.repositories;

  // Assign username
  user.username = config.username;

  // Reformat repository data
  let repositories = user.repositories.edges.map(function format(repo) {
    return repo.node;
  });
  delete user.repositories.edges;

  // Reformat Gists
  const gists = user.gists.edges.map(function format(gist) {
    return gist.node;
  });
  delete user.gists.edges;

  // If repositories are specified, filter in only the required ones
  if (featuredRepositories && featuredRepositories.length > 0) {
    repositories = repositories.filter(function filter(repository) {
      return featuredRepositories.indexOf(repository.name) >= 0;
    });
  }

  // Return transformed data
  return {
    user,
    repositories,
    gists,
    theme
  };
};

module.exports = formatData;
