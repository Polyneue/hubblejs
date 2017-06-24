const schema = require('validate');

/**
 * Validate the Hubble configuration
 * @param {Object} config - configuration object for Hubble
 * @return {Array} - Array of errors if any
 * @private
 */
const validateConfig = function validateConfig(config) {
  const user = schema({
    github: {
      username: {
        type: 'string',
        required: true
      },
      token: {
        type: 'string',
        required: true
      },
      projects: {
        type: 'array'
      },
      user: {
        company: {
          type: 'bool'
        },
        blog: {
          type: 'bool'
        },
        location: {
          type: 'bool'
        },
        bio: {
          type: 'bool'
        },
        public_repos: {
          type: 'bool'
        },
        public_gists: {
          type: 'bool'
        },
        followers: {
          type: 'bool'
        }
      }
    }
  });

  return user.validate(config);
};

module.exports = validateConfig;
