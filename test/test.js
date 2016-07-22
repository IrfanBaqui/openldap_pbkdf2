var should = require('should')
var openldap_pbkdf2 = require('../index.js')
var crypto = require('crypto')

describe('known password and salt', function (done) {
  // Comparing with output from Neurotechnics pbkdf2 generator found at http://www.neurotechnics.com/tools/pbkdf2
  it('should equal the value from Neurotechnics code', function (done) {
    var options = {
      salt: 'salt',
      iterations: 1000
    };

    openldap_pbkdf2.encrypt('password', options, function (err, hash) {
      should.not.exist(err);
      should.exist(hash);

      console.log(hash);
      var comps = hash.split('$');
      var prefix = comps[0].substring(0, 8);
      var iterations = comps[0].substring(8);
      var salt = comps[1];
      var password = new Buffer(comps[2], 'base64').toString('hex');

      prefix.should.equal('{PBKDF2}');
      iterations.should.equal('1000');
      salt.should.equal(new Buffer('salt').toString('base64'));
      password.should.equal('6e88be8bad7eae9d9e10aa061224034fed48d03fcbad968b56006784539d5214');
      done();
    })
  })
});