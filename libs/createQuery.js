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

module.exports = createQuery;
