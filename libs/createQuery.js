/**
 * Return the constructed Github GraphQL query
 * @param {Object} user - user data for github
 * @return {Object} formatted GraphQL query
 * @private
 */
const createQuery = function createQuery(user) {
  return {
    query: `{
      user(login: "${user.username}") {
        name
        avatarUrl
        url
        bio
        company
        location
        followers { totalCount }
        gists { totalCount }

        repositories(first: 20 privacy: PUBLIC) {
          totalCount
          edges {
            node {
              owner { id }
              name
              description
              url
              homepageUrl
              id
              primaryLanguage { name }
              pushedAt
            }
          }
        }
      }
    }`
  };
};

module.exports = createQuery;
