const request = require('request');

/**
 * Return the constructed Github GraphQL query
 * @param {Object} user - user data for github
 * @return {Object} formatted GraphQL query
 * @private
 */
const createQuery = function (username) {
  return {
    query: `{
      user(login: "${username}") {
        name
        avatarUrl(size:256)
        url
        bio
        company
        location
        websiteUrl
        followers { totalCount }
        gists(first:8 privacy:PUBLIC orderBy: { field:CREATED_AT, direction:DESC}) {
          totalCount
          edges {
            node {
              name
              description
              pushedAt
            }
          }
        }
        repositories(first: 12 privacy: PUBLIC orderBy: { field: UPDATED_AT, direction: DESC }) {
          totalCount
          edges {
            node {
              owner { id }
              name
              description
              url
              homepageUrl
              id
              primaryLanguage {
                name
                color
              }
              pushedAt
            }
          }
        }
      }
    }`
  };
};

/**
 * Make request to the Github API
 * @param {Object} username - Github username
 * @param {Object} token - Github personal access token
 * @return {Promise} response from Github API
 */
const queryGithub = function queryGithub(username, token) {
  const query = createQuery(username);

  return new Promise(function promise(resolve, reject) {
    request({
      method: 'POST',
      url: 'https://api.github.com/graphql',
      headers: {
        'User-Agent': 'hubblejs',
        Authorization: `bearer ${token}`
      },
      body: query,
      json: true
    }, function callback(err, res, body) {
      if (err) reject(new Error(`Failed to retrieve data from Github - ${JSON.stringify(err)}`));
      resolve(body);
    });
  });
};

module.exports = queryGithub;
