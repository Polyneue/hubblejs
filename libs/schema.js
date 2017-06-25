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
          type: 'boolean'
        },
        blog: {
          type: 'boolean'
        },
        location: {
          type: 'boolean'
        },
        bio: {
          type: 'boolean'
        },
        public_repos: {
          type: 'boolean'
        },
        public_gists: {
          type: 'boolean'
        },
        followers: {
          type: 'boolean'
        }
      }
    }
  });

  return user.validate(config);
};

module.exports = validateConfig;
