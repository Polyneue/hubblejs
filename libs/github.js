/**
 * Retrieve user data from the Github API
 * @param {Object} gh - Github instance
 * @param {Object} hub - Hubble instance
 * @param {Function} cb - Callback function
 * @return {Function} callback containing user data
 * @private
 */
// TODO: Write unit test
function getUserData(gh, hub, cb) {
  gh.users.get({}, (err, res) => {
    if (err) throw Error(err);
    const user = hub.config.github.user;
    const userData = {};

    // Required Data
    userData.name = res.data.name;
    userData.html_url = res.data.html_url;

    // Optional Values
    if (user !== undefined) {
      const userAttr = Object.keys(user);
      for (let i = 0; i < userAttr.length; i++) {
        if (user[userAttr[i]] !== false) {
          userData[userAttr[i]] = res.data[userAttr[i]];
        }
      }
    }

    return cb(userData);
  });
}

/**
 * Retrieve project data from Github API 
 * @param {Object} gh - Github instance
 * @param {Object} hub - Hubble Instance
 * @param {Function} cb - Callback function
 * @return {Function} callback containing project data
 * @private
 */
// TODO: Write unit test
function getProjectData(gh, hub, cb) {
  gh.repos.getAll({}, (err, res) => {
    if (err) throw Error(err);
    const projects = hub.config.github.projects;

    const projectData = res.data.map((project) => {
      for (let i = 0; i < projects.length; i++) {
        if (project.name === projects[i].name) {
          return {
            name: project.name,
            id: project.id,
            html_url: projects[i].url || project.html_url,
            description: project.description,
            language: project.language
          };
        }
      }
      return null;
    }).filter(Boolean);

    cb(projectData);
  });
}


module.exports = {
  getUserData,
  getProjectData
};
