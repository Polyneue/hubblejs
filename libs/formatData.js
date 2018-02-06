/**
 * Transform the data into a more intuitive format
 * @param {Object} data - data from Github and config
 */
const formatData = function formatData(data, config, enrichment) {
  // Break down data for transformation
  const { user } = data;
  const { meta, theme, github } = config;

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
  if (github.repositories && github.repositories.length > 0) {
    repositories = repositories.filter(function filter(repository) {
      return github.repositories.indexOf(repository.name) >= 0;
    });
  }

  // Handle Data Enrichment
  let enrichedData = {
    user,
    repositories,
    gists,
    meta,
    theme,
    github
  };

  if (enrichment && typeof enrichment === 'function') {
    enrichedData = enrichment(enrichedData);
  }

  return enrichedData;
};

module.exports = formatData;
