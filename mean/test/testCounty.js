var should = require('should'),
	request = require('supertest'),
	app = require('../server').app;
	//agent = request.agent(app);


/**
 * County routes tests
 */
describe('County Test', function() {
	/*beforeEach(function(done) {
			done();
	});*/


	
	it('should be able to search country and return results for each domain and overall ', function(done) {
		request(app).get('/api/search?q=Fairfax County,VA')
			.end(function(req, res) {
				// Call the assertion callback
				//res.body.should.be.an.Array.with.lengthOf(5);
				var county = res.body;				
				county.state.should.match("VA");
				done();
			});
	});

	/*afterEach(function(done) {
		done();
	});*/
});





