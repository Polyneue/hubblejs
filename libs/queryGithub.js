const request = require('request');

/**
 * Make request to the Github API
 * @param {Object} config - Hubble config that contains auth token
 * @param {Object} query - GraphQL formatted query
 * @return {Promise} response from Github API
 * @public
 */
const queryGithub = function queryGithub(config, query) {
  return new Promise(function promise(resolve, reject) {
    request({
      method: 'POST',
      url: 'https://api.github.com/graphql',
      headers: {
        'User-Agent': 'hubblejs',
        Authorization: `bearer ${config.token}`
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
