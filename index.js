// Deps
const async = require('async');
const Github = require('github');
const chalk = require('chalk'); // DEBUG

// Libs
const utils = require('./libs/utilities.js');

const log = console.log; // eslint-disable-line

const gh = new Github({
  // debug: true,
  header: {
    'user-agent': 'Pages-Test'
  },
  followRedirects: false,
  timeout: 5000
});

/**
 * Construct Hubble - validate and assign
 * @param {Object} config - configuration object for Hubble
 */
const Hubble = function hubble(config) {
  // Validate the config
  utils.validateConfig(config);

  // If the config is valid add it to Hubble
  this.config = Object.freeze(config);

  gh.authenticate({
    type: 'token',
    token: this.config.github.token
  });

  log(chalk.yellow('======== INITIALIZE CONFIG ======== \n'), this.config); // DEBUG
};

/**
 * Generates and renders the Hubble site with Github data.
 * @public
 */
Hubble.prototype.generateSite = function generateSite() {
  const self = this;

  async.series({
    userData(cb) {
      utils.getUserData(gh, self, data => cb(null, data));
    },
    projectData(cb) {
      utils.getProjectData(gh, self, data => cb(null, data));
    }
  }, function complete(err, res) {
    if (err) throw Error(err);
    self.templateData = res;
    log(chalk.yellow('======== TEMPLATE DATA ======== \n'), self.templateData); // DEBUG
  });
  
  // Run Templating Engine
  // Done!
};

module.exports = Hubble;
