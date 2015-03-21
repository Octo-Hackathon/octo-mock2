var coun = require('../models/county');



module.exports.searchlist = function(req, res) {
	var stateCounty = req.query.q;
	//split county and code
	var res = stateCounty.split(",");
	console.log('stateCounty is :' + stateCounty);
	var county = res[0];
	var stateCd = res[1];
	
	console.log('County is :' + county);
	console.log('State is :' + stateCd),
	coun.find({county_name: county, state: stateCd}, function(err, results) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		console.log('results is :' + results);
            if (err)
                res.send(err)
            // set results
			res.json(results);
		});
}


module.exports.test = function(req, res) {
	var stateCounty = req.query.q;
	console.log('stateCounty is :' + stateCounty);
	res.json({city: 'NEW  YORK', state: 'NY'});
}


