/**
 * Check config for validation
 * @param {Object} config - config to validate
 * @return {Bool} valid config
 * @private
 * @TODO: Write the other test cases to check for strings
 * @TODO: Write unit test
 */
const validateConfig = function validateConfig(config) {
  switch (true) {
    case !config.github.username:
    case !config.github.token:
      throw Error('Github username/token required in Hubble config');
    default:
      return true;
  }
};

module.exports = validateConfig;
