var request = require('./request')

var  User = function(auth){
	var base = '/api/user/' + auth.version + '/users'
	return {
		get: function(data, callback){
			var path = request.buildPath(base, false, false)
			var options = request.buildEndpoint(auth, 'GET', path, data)
			request.make(options, callback)
		},
		save : function (data, callback) {
			var path = request.buildPath(base,  false, false)
			var options = request.buildEndpoint(auth, 'POST', path, data)
			request.make(options, callback)
		},
		update: function(id, data,  callback){
			var path = request.buildPath(base, id, false)
			request.removeAttributes('user', data);
			var options = request.buildEndpoint(auth, 'PUT', path, data)
			request.make(options, callback)
		},
		remove: function(id, callback){
			var path = request.buildPath(base, id, false)
			var options = request.buildEndpoint(auth, 'DELETE', path, false)
			request.make(options, callback)
		}
	}
}
module.exports = User