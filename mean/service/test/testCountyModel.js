'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../server'),
	mongoose = require('mongoose'),
	County = mongoose.model('county'),
	agent = request.agent(app);

/**
 * Globals
 */
var county;

/**
 * Opportunity routes tests
 */
describe('County Search test', function() {
	beforeEach(function(done) {
			done();
	});

	it('should not be able to search country and return overall result', function(done) {
		agent.get('/api/search?q=Fairfax County,VA')
			.end(function(req, res) {
				// Call the assertion callback
				res.body.should.be.an.Object.with.property('state', 'VA');
				done();
			});
	});

	afterEach(function(done) {
		done();
	});
});