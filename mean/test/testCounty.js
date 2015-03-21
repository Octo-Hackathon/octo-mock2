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

	it('should  pass', function(done) {
					//throw "don't pass";
					done();
	});
	
	it('should be able to search country and return overall result', function(done) {
		request(app).get('/api/search?q=Fairfax County,VA')
			.end(function(req, res) {
				// Call the assertion callback
				//res.body.should.be.an.Array.with.lengthOf(1);
				var county = res.body;
				(county.state).should.match('VA');

				done();
			});
	});

	/*afterEach(function(done) {
		done();
	});*/
});





