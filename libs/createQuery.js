/**
 * Return the constructed Github GraphQL query
 * @param {Object} user - user data for github
 * @return {Object} formatted GraphQL query
 * @private
 * @TODO: write unit test
 */
const createQuery = function createQuery(user) {
  return new Promise(function promise(resolve) {
    const { username } = user;
    resolve({
      query: `{
        user(login: "${username}") {
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
    });
  });
};

module.exports = createQuery;
