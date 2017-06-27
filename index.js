const utils = require('./libs/utilities.js');
const git = require('./libs/github.js');
const async = require('async');
const Github = require('github');
const chalk = require('chalk'); // DEBUG

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

  console.log(chalk.yellow('INITIALIZE CONFIG'), this.config); // DEBUG
};


// TODO this should not be exposed via the hubble API
// Async.parallel could handle this inside the generate site
// Function.
Hubble.prototype.getData = function getData(callback) {
  const self = this;
  async.parallel({
    // Get User Data
    getUserData(cb) {
      git.getUserData(gh, self, (data) => {
        cb(null, data);
      });
    },
    getProjectData(cb) {
      git.getProjectData(gh, self, (data) => {
        cb(null, data);
      });
    }
  }, function done(err, data) {
    // Format Data
    const formattedData = {};
    formattedData.userData = data.getUserData;
    formattedData.projectData = data.getProjectData;
    self.templateData = formattedData;
    
    return callback('getDataDone');
  });
};

// Hubble.prototype.createDirectories = function createDirectories() {
//   // Debug
//   console.log('\n');
//   console.log('============= Directories ==============');
//   console.log('Create Directorioes');
// };

// Hubble.prototype.renderTemplates = function renderTemplates() {
//   // Run Templating Engine
// };

Hubble.prototype.generateSite = function generateSite() {
  const self = this;

  async.series([
    function getGithubData(callback) {
      self.getData(function cb(msg) {
        callback(null, msg);
      });
    }
  ], function complete(err, res) {
    if (err) throw Error(err);
    console.dir(self.templateData.projectData);
    console.dir(self);
  });

  // Create Project Directories
  // this.createDirectories();
  
  // Run Templating Engine
  // Done!
};

module.exports = Hubble;
