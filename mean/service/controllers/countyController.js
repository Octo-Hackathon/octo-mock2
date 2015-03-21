var County = require('../models/county');



module.exports.searchlist = function(req, res) {
	var stateCounty = req.query.q;
	//split county and code
	var res = stateCounty.split(",");
	var county = stateCounty[0];
	var stateCd = stateCounty[1];
	
	console.log('County is :' + county);
	console.log('State is :' + state),
	County.find({county_name: county, state: stateCd}, function(err, results) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            // set results
			res.json(results);
		});
}


