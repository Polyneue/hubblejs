/**
 * Retrieve project data from Github API 
 * @param {Object} gh - Github instance
 * @param {Object} hub - Hubble Instance
 * @param {Function} cb - Callback function
 * @return {Function} returns callback containing project data
 * @private
 */
// TODO: Write unit test
const getProjectData = function getProjectData(gh, hub, cb) {
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

    return cb(projectData);
  });
};

module.exports = getProjectData;
