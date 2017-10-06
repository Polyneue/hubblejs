const { expect } = require('chai');
const config = require('./fixtures/config.test.json');
const templateData = require('./fixtures/data.test.json');

/**
 * Simple error handler for callbacks
 */
function errHandler(err) {
  if (err) throw err;
}

module.exports = {
  expect,
  config,
  templateData,
  errHandler
};
