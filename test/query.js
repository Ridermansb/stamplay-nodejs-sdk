var stamplayQuery = require('../lib/query')
var assert = require('assert')

assert.throws(function(){
	var query = stamplayQuery({apiKey:'apiKey',appId:'appId', version:'v1'})()
})
assert.throws(function(){
	var query = stamplayQuery({apiKey:'apiKey',appId:'appId', version:'v1'})('pippo')
})
var query = stamplayQuery({apiKey:'apiKey',appId:'appId', version:'v1'})('user','instance')
assert.equal(typeof query.base, 'undefined')
assert.equal(typeof query.model, 'string')
assert.equal(query.model, 'user')
assert.equal(typeof query.instance, 'string')
assert.equal(query.instance, 'instance')
assert.equal(typeof query.paginationQuery, 'string')
assert.equal(query.paginationQuery, '')
assert.equal(typeof query.currentQuery, 'object')
assert.equal(query.currentQuery.length, 0)
assert.equal(typeof query.executable, 'string')
assert.equal(query.executable, '')
assert.equal(typeof query.or, 'function')
assert.equal(typeof query.pagination, 'function')
assert.equal(typeof query.greaterThan, 'function')
assert.equal(typeof query.greaterThanOrEqual, 'function')
assert.equal(typeof query.lessThanOrEqual, 'function')
assert.equal(typeof query.equalTo, 'function')
assert.equal(typeof query.sortAscending, 'function')
assert.equal(typeof query.sortDescending, 'function')
assert.equal(typeof query.exists, 'function')
assert.equal(typeof query.notExists, 'function')
assert.equal(typeof query.exec, 'function')
query.pagination(1, 2)
assert.equal(query.paginationQuery, '&page=1&per_page=2')
query.pagination(2, 3)
assert.equal(query.paginationQuery, '&page=2&per_page=3')
query.between('value', 1, 2)
assert.equal(query.currentQuery[0].value.$gte, 1)
assert.equal(query.currentQuery[0].value.$lte, 2)
query.greaterThan('value',1)
assert.equal(query.currentQuery[1].value.$gt, 1)
query.greaterThanOrEqual('value',3)
assert.equal(query.currentQuery[2].value.$gte, 3)
query.lessThan('value',4)
assert.equal(query.currentQuery[3].value.$lt, 4)
query.lessThanOrEqual('value',5)
assert.equal(query.currentQuery[4].value.$lte, 5)
query.equalTo('value','foo')
assert.equal(query.currentQuery[5].value, 'foo')
query.sortAscending('value')
assert.equal(query.currentQuery[6].$sort.value, 1)
query.sortDescending('value')
assert.equal(query.currentQuery[7].$sort.value, -1)
query.exists('value')
assert.equal(query.currentQuery[8].value.$exists, true)
query.notExists('value')
assert.equal(query.currentQuery[9].value.$exists, false)
assert.throws(function(){ query.or({}) })
assert.throws(function(){ query.or({currentQuery:''},{}) })
var q1 = stamplayQuery({apiKey:'apiKey',appId:'appId', version:'v1'})('object','instance').equalTo('value','foo')
var q2 = stamplayQuery({apiKey:'apiKey',appId:'appId', version:'v1'})('object','instance').exists('value')
query.or(q1,q2)
assert.equal(query.currentQuery[10].$or[0].value, 'foo')
assert.equal(query.currentQuery[10].$or[1].value.$exists, true)
// exec