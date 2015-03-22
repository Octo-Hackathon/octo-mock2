var should = require('should'),
	request = require('supertest'),
	app = require('../server').app;
	//agent = request.agent(app);


/**
 * County routes tests
 */
describe('County Search Test', function() {
	/*beforeEach(function(done) {
			done();
	});*/


	
	it('should be able to search country and return results for each domain and overall', function(done) {
		request(app).get('/api/search?q=Fairfax County,VA')
			.end(function(req, res) {
				// Call the assertion callback
				//res.body.should.be.an.Array.with.lengthOf(5);
				var county = res.body;				
				county.state.should.match("VA");
				done();
			});
	});

	it('should return list of counties', function(done) {
		request(app).get('/api/autoComplete?q=Fair')
			.end(function(req, res) {
				// Call the assertion callback
				var results = res.body.results;
				results.should.be.an.instanceOf(Array);
				results.should.not.be.empty;

				done();
			});
	});	

	/*afterEach(function(done) {
		done();
	});*/
});





