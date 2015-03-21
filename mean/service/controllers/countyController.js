var coun = require('../models/county');



module.exports.searchlist = function(req, res) {
	var stateCounty = req.query.q;
	//split county and code

	var str = stateCounty.split(",");
	console.log('stateCounty is :' + stateCounty);
	var county = str[0];
	var stateCd = str[1];
	
	console.log('County is :' + county);
	console.log('State is :' + stateCd),
	coun.findOne({county_name: county, state: stateCd}, 'stfips county_name state overall_result',function(err, results) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		console.log('results is :' + results);
		console.log(err);
          //  if (err)
                //res.send(err)
            // set results
            var data = results.toJSON();
            data.detail = {"air":{"nitro":"0.3","sulfur":"0.5","carbon":"0.4"},"water":{"drought":"0.3","mecury":"0.5","arsenic":"0.4"},"infra":{"highway":"0.3","streets":"0.5","fatalities":"0.4"},"socio":{"income":"0.3","unemployed":"0.5","crimes":"0.4"}};
			console.log('results is :' + data);
			res.json(data);			

			//console.log(res);
		});
}


module.exports.test = function(req, res) {
	var stateCounty = req.query.q;
	console.log('stateCounty is :' + stateCounty);
	res.json({  stfips: 51059,  county_name: 'Fairfax County',  state: 'VA',  overall_result: 2.196357 });
}


