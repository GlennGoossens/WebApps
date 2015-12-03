'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Unit tests
 */
describe('Wait for database connection:', function() {

	it('should be connected', function(done) {
		User.find({}, function(err, users) {
			done();
		});
	});
});
