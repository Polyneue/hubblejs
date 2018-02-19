const fs = require('fs');
const mkdirp = require('mkdirp');
const { config } = require('./utilities');
const queryGithub = require('../libs/queryGithub');
const formatData = require('../libs/formatData');

const log = console.log; // eslint-disable-line

const generateFixtures = async function () {
  const { username, token, repositories, theme } = config;

  return new Promise(async function (resolve, reject) {
    try {
      // Create Fixture directory
      await mkdirp('./test/fixtures');

      // Get data from Github and save it
      const res = await queryGithub(username, token);
      await fs.writeFileSync('./test/fixtures/githubData.json', JSON.stringify(res), 'utf8');

      // Create a formatted version of that data and save it
      const formattedData = formatData(res.data, { username, repositories, theme });
      await fs.writeFileSync('./test/fixtures/formattedData.json', JSON.stringify(formattedData), 'utf8');

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generateFixtures;
