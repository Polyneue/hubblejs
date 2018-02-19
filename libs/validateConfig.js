/**
 * Check config for validation
 * @param {Object} config - config to validate
 * @return {Object} configuration or error
 */
const validateConfig = function (config) {
  switch (true) {
    case !config.username:
      throw new Error('Failed to validate config - config.username required in Hubble config.');
    case !config.token:
      throw new Error('Failed to validate config - config.token required in Hubble config.');
    default:
      return config;
  }
};

module.exports = validateConfig;
