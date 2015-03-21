var coun = require('../models/county');



module.exports.searchlist = function(req, res) {
	var stateCounty = req.query.q;
	//split county and code
	var splitTxt = stateCounty.split(",");
	console.log('stateCounty is :' + stateCounty);
	var county = splitTxt[0];
	var stateCd = splitTxt[1];
	
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
	res.json({  stfips: 51059,  county_name: 'Fairfax County',  state: 'VA',  overall_result: 2.196357 });
}


