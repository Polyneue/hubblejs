const validateConfig = require('./libs/validateConfig.js');
const queryGithub = require('./libs/queryGithub.js');
const createQuery = require('./libs/createQuery.js');
const renderTemplate = require('./libs/renderTemplate.js');
const log = require('./libs/log.js');

/**
 * Site Generation
 * @param {Object} config - hubble config
 * @param {String} theme - path to theme file
 */
const generateSite = async function generateSite(config, theme) {
  const template = theme || `${__dirname}/libs/template.html`;

  try {
    // Validate the config
    log('', 'Validating config...');
    await validateConfig(config);
    const gh = config.github;

    // Query Github
    log('', 'Fetching Github data...');
    const query = createQuery(gh);
    const res = await queryGithub(gh, query);

    // Render Template
    log('', 'Rendering data to template');
    if (config.meta) res.data.meta = config.meta;
    await renderTemplate(res.data, template);

    log('Success:', `Rendered Hubble template for ${gh.username}`, true);
  } catch (err) {
    log('Error:', err, true);
  }
};

module.exports = {
  queryGithub,
  generateSite
};
