const utils = require('./libs/utilities.js');
const async = require('async');
const Github = require('github');
// const jsonfile = require('jsonfile');

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
  // TODO: Move this into it's own function for validating.
  const errors = utils.validateConfig(config);
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      log(utils.reportError('Config', `${errors[i].path} is invalid`));
    }
    throw Error('Config Error, See above.');
  } else {
    this.config = Object.freeze(config);
  }

  gh.authenticate({
    type: 'token',
    token: this.config.github.token
  });

  // DEBUG
  console.log('============ Initialize Config ============');
  console.dir(this.config);
};


// TODO Break this down into two smaller functions 
// that handle userdata and projectData separately and
// return a callback with that data to be parsed by something else.
Hubble.prototype.getData = function getData(callback) {
  const self = this;
  async.parallel({
    // Get User Data
    getUserData(cb) {
      gh.users.get({}, function getUserDataCallback(err, res) {
        if (err) throw Error(err);
        const user = self.config.github.user;
        const userData = {};

        // Required Data
        userData.name = res.data.name;
        userData.html_url = res.data.html_url;

        // Optional Vaues
        if (user !== undefined) {
          const userAttr = Object.keys(user);
          for (let i = 0; i < userAttr.length; i++) {
            if (Object.prototype.hasOwnProperty.call(user, userAttr[i]) && user[userAttr[i]] !== false) {
              userData[userAttr[i]] = res.data[userAttr[i]];
            }
          }
        }

        cb(null, userData);
      });
    },
    // Get Project Data
    getProjectData(cb) {
      gh.repos.getAll({}, function getProjectDataCallback(err, res) {
        if (err) throw Error(err);
        const projects = self.config.github.projects;
        const projectData = [];

        // loop and compare project data
        for (let i = 0; i < res.data.length; i++) {
          const project = res.data[i];
          for (let v = 0; v < projects.length; v++) {
            if (project.name === projects[v].name) {
              projectData.push({
                name: project.name,
                id: project.id,
                html_url: projects[v].url || project.html_url,
                description: project.description,
                language: project.language
              });
            }
          }
        }
        cb(null, projectData);
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
    console.log(res);
    console.dir(self);
  });
  // Get Github Data
  // async.series({
  //   getGithubData(callback) {
  //     console.log('\n', '=============== Get Data ===============');
  //     callback(null, );
  //   }
  // }, function done(err, res) {
  //   if (err) throw Error(err);
  //   console.log('Template Data', res);
  //   console.log('Done!');
  // });
  
  // Create Project Directories
  // this.createDirectories();
  
  // Run Templating Engine
  // Done!
};

module.exports = Hubble;
