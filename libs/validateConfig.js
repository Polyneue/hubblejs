/**
 * Check config for validation
 * @param {Object} config - config to validate
 * @return {Promise} valid config or error
 * @private
 * @TODO: Write the other test cases to check for strings
 * @TODO: Write unit test
 */
const validateConfig = function validateConfig(config) {
  return new Promise(function promise(resolve, reject) {
    switch (true) {
      case !config.github.username:
        reject('Failed to validate config - Github username required in Hubble config.');
        break;
      case !config.github.token:
        reject('Failed to validate config - Github auth token required in Hubble config.');
        break;
      default:
        resolve(true);
    }
  });
};

module.exports = validateConfig;
