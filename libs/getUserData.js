/**
 * Retrieve user data from the Github API
 * @param {Object} gh - Github instance
 * @param {Object} hub - Hubble instance
 * @param {Function} cb - Callback function
 * @return {Function} return scallback containing user data
 * @private
 */
// TODO: Write unit test
const getUserData = function getUserData(gh, hub, cb) {
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
};

module.exports = getUserData;
