var coun = require('../models/county')
    eqiRes = require('../models/eqiResult')
    eqiDet = require('../models/eqiDetail');


module.exports.searchlist = function(req, res) {
	var stateCounty = req.query.q;
	//split county and code

	var str = stateCounty.split(",");
	console.log('stateCounty is :' + stateCounty);
	var county = str[0];
	var stateCd = str[1];
	
	console.log('County is :' + county);
	console.log('State is :' + stateCd),
	coun.findOne({county_name: county, state: stateCd}, function(err, results) {
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

module.exports.searchByCountyState = function(req, res) {
	var stateCounty = req.query.q;
	//split county and code
	console.log('index : '+stateCounty.indexOf(','));
	if(stateCounty.indexOf(',') == -1){
		console.log('inside'); 		
		res.status(400).send({'error':'Invalid Search'});
		return false;
	}
	var str = stateCounty.split(",");
	console.log('stateCounty is :' + stateCounty);
	var county = str[0];
	var stateCd = str[1];
	
	console.log('County is :' + county);
	console.log('State is :' + stateCd);
	var data = {};
	data.detail = {};
	data.detail.air = {};
	data.detail.water = {};
	data.detail.infra = {};
	data.detail.socio = {};
	

		eqiDet.find({countyDescription: county, stateCode: stateCd}, function(err, results) {
			//console.log('Results detail '+results);
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute		
           if (err)
                res.send(err)
            if(results.length == 0){
            	res.status(400).send({'error':'No Results in Details'});
				return false;
            }
            // set results
            for (var i = 0;i<results.length;i++){            	
            	
            	if(results[i].variableCode.toLowerCase() == 'a_no2_mean_ln' && results[i].domain.toLowerCase() == 'air'){ 
            		data.detail.air.nitro = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'a_so2_mean_ln'  && results[i].domain.toLowerCase() == 'air'){
            		data.detail.air.sulfur = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'a_co_mean_ln'  && results[i].domain.toLowerCase() == 'air'){
            		data.detail.air.carbon = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'avgofd3_ave'  && results[i].domain.toLowerCase() == 'water'){
            		data.detail.water.drought = results[i].variableValue;
            	}			
			    else if(results[i].variableCode.toLowerCase() == 'w_hg_ln'  && results[i].domain.toLowerCase() == 'water'){
            		data.detail.water.mercury = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'w_as_ln'  && results[i].domain.toLowerCase() == 'water'){
            		data.detail.water.arsenic = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'hwyprop'  && results[i].domain.toLowerCase() == 'built'){
            		data.detail.infra.highway = results[i].variableValue;
            	}	
            	else if(results[i].variableCode.toLowerCase() == 'ryprop'  && results[i].domain.toLowerCase() == 'built'){
            		data.detail.infra.streets = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'fatal_rate_log'  && results[i].domain.toLowerCase() == 'built'){
            		data.detail.infra.fatalities = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'med_hh_inc'  && results[i].domain.toLowerCase() == 'sociodemographic'){
            		data.detail.socio.income = results[i].variableValue;
            	}	
            	else if(results[i].variableCode.toLowerCase() == 'pct_unemp'  && results[i].domain.toLowerCase() == 'sociodemographic'){
            		data.detail.socio.unemployed = results[i].variableValue;
            	}
            	else if(results[i].variableCode.toLowerCase() == 'violent_rate_log'  && results[i].domain.toLowerCase() == 'sociodemographic'){
            		data.detail.socio.crimes = results[i].variableValue;
            	}
            		
			}			
            //data = results.toJSON();
            //data.detail = {"air":{"nitro":"0.3","sulfur":"0.5","carbon":"0.4"},"water":{"drought":"0.3","mecury":"0.5","arsenic":"0.4"},"infra":{"highway":"0.3","streets":"0.5","fatalities":"0.4"},"socio":{"income":"0.3","unemployed":"0.5","crimes":"0.4"}};
			//console.log('Data  after detail is :' + data);

			eqiRes.find({countyDescription: county, stateCode: stateCd}, function(err, results) {
		//console.log('Results result '+results);
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute		
           if (err)
                res.send(err)

            if(results.length == 0){
            	res.status(400).send({'error':'No Results in Results'});
				return false;
            }
            // set results
            data.county_name = results[0].countyDescription;
            data.state = results[0].stateCode;
            data.stfips = results[0].countyCode;

            console.log('County '+results[0].countyDescription);

            for (var i = 0;i<results.length;i++){            	
            	//data.overall_result = results[0].
            	if(results[i].domain.toLowerCase() == 'overall'){
            		data.overall_result = results[i].eqi;
            		console.log('Overall '+results[i].eqi);
            	}
            	else if(results[i].domain.toLowerCase() == 'air'){  		
            		
            		data.detail.air.overall = results[i].eqi;

            	}
            	else if(results[i].domain.toLowerCase() == 'water'){            		
            		
            		data.detail.water.overall = results[i].eqi;

            	}
            	else if(results[i].domain.toLowerCase() == 'built'){            		
            		
            		data.detail.infra.overall = results[i].eqi;

            	}
            	else if(results[i].domain.toLowerCase() == 'sociodemographic'){            		
            		
            		data.detail.socio.overall = results[i].eqi;
            	}			
			  
			}			
            
			console.log( data);
			res.json(data);			
			
		});
					
			
	});

	

}


