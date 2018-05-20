const axios = require('axios');

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
        avatarUrl(size:192)
        url
        bio
        company
        location
        websiteUrl
        followers { totalCount }
        gists(first: 100 privacy: PUBLIC orderBy: { field: CREATED_AT, direction: DESC }) {
          totalCount
          edges {
            node {
              name
              description
              pushedAt
            }
          }
        }
        repositories(first: 100 privacy: PUBLIC affiliations: OWNER orderBy: { field: UPDATED_AT, direction: DESC }) {
          totalCount
          edges {
            node {
              name
              description
              url
              homepageUrl
              primaryLanguage {
                name
                color
              }
              stargazers {
                totalCount
              }
            }
          }
        }
        repositoriesContributedTo(first: 100 orderBy: { field: CREATED_AT, direction: DESC } includeUserRepositories: false) {
          totalCount
          nodes {
            name
            url
            primaryLanguage {
              color
              name
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
const queryGithub = async function queryGithub(username, token) {
  const query = createQuery(username);

  try {
    const response = await axios.request({
      url: 'https://api.github.com/graphql',
      method: 'post',
      headers: {
        'User-Agent': 'hubblejs',
        Authorization: `bearer ${token}`
      },
      data: query
    });
    return response.data.data;
  } catch (err) {
    throw new Error('Failed to retrieve data from Github');
  }
};

module.exports = queryGithub;
