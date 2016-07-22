# SSHA (salted SHA passwords)

This is a utility library to use with openldap. It hashes passwords using crypto and outputs in a format supported by ldap.

## How to use it

> openldap_pbkdf2.encrypt(stringToEncrypt, [options,] callback)

### Options

* salt (if not supplied, one will be generated randomly)
* iterations (default 1000)
* keySize (default 32 bits)

### Output Format

> {PBKDF2}[Iteration]$[Adapted Base64 Salt]$[Adapted Base64 DK]


# Tests

One fairly simple test has been added. It just verifies the encrypted password with the one from Neurotechnics (http://www.neurotechnics.com/tools/pbkdf2).

Use `npm install` followed by `npm run test`

References: 
* https://github.com/hamano/openldap-pbkdf2
* https://github.com/jmarca/openldap_ssha/

