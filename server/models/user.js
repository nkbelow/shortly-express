var db = require('../db');
var utils = require('../lib/utility');
var crypto = require('crypto');
var Promise = require('bluebird');

// Write you user database model methods here
var addUser = function(user) {
  var queryString = 'INSERT INTO users SET ?';
  console.log(user);
  var shasum = crypto.createHash('sha1');
  shasum.update(user.password);
  user.password = shasum.digest('hex').slice(0, 5);

  return db.queryAsync(queryString, {username: user.username, password: user.password});
};

var existingUser = function(user) {
  var queryString = 'SELECT * FROM users where username = ? AND password = ?';
  var shasum = crypto.createHash('sha1');
  shasum.update(user.password);
  user.password = shasum.digest('hex').slice(0, 5);
  console.log(user.password);
  return db.queryAsync(queryString, [user.username, user.password]);
};

module.exports = {
  addUser: addUser,
  existingUser: existingUser
};
