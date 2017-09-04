/**
 * Check config for validation
 * @param {Object} config - config to validate
 * @return {Promise} valid config or error
 * @private
 */
const validateConfig = async function validateConfig(config) {
  switch (true) {
    case !config.github.username:
      throw new Error('Failed to validate config - Github username required in Hubble config.');
    case !config.github.token:
      throw new Error('Failed to validate config - Github auth token required in Hubble config.');
    default:
      return true;
  }
};

module.exports = validateConfig;
