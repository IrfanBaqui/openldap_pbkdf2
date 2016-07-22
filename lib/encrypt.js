/* global require console Buffer*/

var crypto = require('crypto');
var util = require('util');
var _ = require('lodash');

function encrypt(password, options, next) {
  function doEncrypt (password, options, next ){
    var salt       = options.salt;
    var iterations = options.iterations || 1000;
    var keySize    = options.keySize || 32;

    var encryptedPass = crypto.pbkdf2Sync(password, salt, iterations, keySize, 'sha1');

    var ldap_pbkdf2 = util.format('{PBKDF2}%s$%s$%s', iterations, new Buffer(salt).toString('base64'), encryptedPass.toString('base64'));
    return next(null, ldap_pbkdf2);
  }
  if (next === undefined) {
      next = options;
      options = null;
  }
  if (!options || !options.salt) {
    crypto.randomBytes(32, function(err, buf) {
      if (err) return next(err);

      var options = _.defaults(options || {}, {
        salt: buf.toString('ascii')
      });
      doEncrypt(password, options, next);

      return null;
    });
  } else {
    doEncrypt(password, options, next);
    return null;
  }
}

exports.encrypt = encrypt;
