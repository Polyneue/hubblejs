const rimraf = require('rimraf');
const generateFixtures = require('./generateFixtures');
const { config, errHandler } = require('./utilities');

// Handle fixture data generation
before(async function () {
  console.log('Generate fixture data using:', config.username, config.token);
  await generateFixtures();
});

// Handle clean up
after(function () {
  console.log('Cleaning up fixture data and test results.');
  rimraf('./test/fixtures', errHandler);
});
