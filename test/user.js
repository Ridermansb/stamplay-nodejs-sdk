var stamplayUser = require('../lib/user')
var assert = require('assert')

var User = stamplayUser({apiKey:'apiKey',appId:'appId', version:'v1'})
assert.equal(typeof User.base, 'undefined')
assert.equal(typeof User.get, 'function')
assert.equal(typeof User.save, 'function')
assert.equal(typeof User.update, 'function')
assert.equal(typeof User.remove, 'function')