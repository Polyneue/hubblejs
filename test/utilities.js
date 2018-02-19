const { expect } = require('chai');
const getenv = require('getenv');

const config = {
  username: getenv('GH_USER_NAME'),
  token: getenv('GH_ACCESS_TOKEN'),
  repositories: [],
  theme: {},
  output: './test/fixtures/dist/index.html'
};

// Simple error handler for callbacks
function errHandler(err) {
  if (err) throw err;
}

module.exports = {
  expect,
  config,
  errHandler
};
