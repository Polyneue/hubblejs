const fs = require('fs');
const mkdirp = require('mkdirp-promise');
const { config } = require('./utilities');
const queryGithub = require('../libs/queryGithub');
const formatData = require('../libs/formatData');

const log = console.log; // eslint-disable-line

const generateFixtures = async function () {
  const { username, token, repositories, theme } = config;

  try {
    // Create Fixture directory
    await mkdirp('./test/fixtures/dist/assets');

    // Get data from Github and save it
    const data = await queryGithub(username, token);
    fs.writeFileSync('./test/fixtures/githubData.json', JSON.stringify(data), 'utf8');

    // Create a formatted version of that data and save it
    const formattedData = formatData(data, { username, repositories, theme });
    fs.writeFileSync('./test/fixtures/formattedData.json', JSON.stringify(formattedData), 'utf8');
  } catch (err) {
    throw err;
  }
};

module.exports = generateFixtures;
