var coun = require('../models/county')
    eqiRes = require('../models/eqiResult')
    eqiDet = require('../models/eqiDetail')
    calcService = require('./calculationService');


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

module.exports.autoComplete = function(req, res) {
      var stateCounty = req.query.q;
      var regex = new RegExp(stateCounty);
      console.log('stateCounty is :' + stateCounty);
      
         eqiRes.aggregate({$match: { countyDescription: regex }}, function (err, results){

            if (err) throw err;

            var counties = [];

            for (var countyDescription in results) {

                counties.push(results[countyDescription].countyDescription+','+results[countyDescription].stateCode);

            }

            var result = { results: counties }

            res.json(result);

          });
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
                  var maxNitro,maxSulfur,maxCarbon,maxDrought,maxMercury,maxArsenic,maxHighway,maxStreets,maxFatalities,maxIncome,maxUnemployed,maxCrime;
                  eqiDet.find({ variableCode: 'a_no2_mean_ln'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxNitro = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'a_so2_mean_ln'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxSulfur = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'a_co_mean_ln'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxCarbon = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'avgofd3_ave'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxDrought = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'w_hg_ln'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxMercury = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'w_as_ln'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxArsenic = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'hwyprop'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxHighway = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'ryprop'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxStreets = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'fatal_rate_log'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxFatalities = calcService.maximumValue(varCodes);     
                        // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'med_hh_inc'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxIncome = calcService.maximumValue(varCodes);     
                        //console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'pct_unemp'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxUnemployed = calcService.maximumValue(varCodes);     
                       // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
                  eqiDet.find({ variableCode: 'violent_rate_log'}, function(err, results) {
                        var varCodes = [];
                        for (var varCodess in results) {
                            varCodes.push(results[varCodess].variableValue);
                        }
                        
                        maxCrime = calcService.maximumValue(varCodes);     
                       // console.log('maxNitro::'+maxNitro); 
                       setVarVals();                  
                  });
            // set results
            setVarVals = function()
            {
                 if(maxNitro != undefined && maxSulfur != undefined && maxCarbon != undefined && maxDrought != undefined
                        && maxMercury != undefined && maxArsenic != undefined && maxHighway != undefined && maxStreets != undefined && maxFatalities != undefined 
                        && maxIncome != undefined && maxUnemployed != undefined && maxCrime != undefined)
                 {
                        for (var i = 0;i<results.length;i++){                 
                  
                  if(results[i].variableCode.toLowerCase() == 'a_no2_mean_ln' && results[i].domain.toLowerCase() == 'air'){ 
                        data.detail.air.nitro = results[i].variableValue;
                        data.detail.air.nitro_perc = calcService.calculateOtherPercentage(maxNitro,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'a_so2_mean_ln'  && results[i].domain.toLowerCase() == 'air'){
                        data.detail.air.sulfur = results[i].variableValue;
                        data.detail.air.sulfur_perc = calcService.calculateOtherPercentage(maxSulfur,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'a_co_mean_ln'  && results[i].domain.toLowerCase() == 'air'){
                        data.detail.air.carbon = results[i].variableValue;
                        data.detail.air.carbon_perc = calcService.calculateOtherPercentage(maxCarbon,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'avgofd3_ave'  && results[i].domain.toLowerCase() == 'water'){
                        data.detail.water.drought = results[i].variableValue;
                        data.detail.water.drought_perc = calcService.calculateOtherPercentage(maxDrought,results[i].variableValue);
                  }                 
                      else if(results[i].variableCode.toLowerCase() == 'w_hg_ln'  && results[i].domain.toLowerCase() == 'water'){
                        data.detail.water.mercury = results[i].variableValue;
                        data.detail.water.mercury_perc = calcService.calculateOtherPercentage(maxMercury,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'w_as_ln'  && results[i].domain.toLowerCase() == 'water'){
                        data.detail.water.arsenic = results[i].variableValue;
                        data.detail.water.arsenic_perc = calcService.calculateOtherPercentage(maxArsenic,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'hwyprop'  && results[i].domain.toLowerCase() == 'built'){
                        data.detail.infra.highway = results[i].variableValue;
                        data.detail.infra.highway_perc = calcService.calculateOtherPercentage(maxHighway,results[i].variableValue);
                  }     
                  else if(results[i].variableCode.toLowerCase() == 'ryprop'  && results[i].domain.toLowerCase() == 'built'){
                        data.detail.infra.streets = results[i].variableValue;
                        data.detail.infra.streets_perc = calcService.calculateOtherPercentage(maxStreets,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'fatal_rate_log'  && results[i].domain.toLowerCase() == 'built'){
                        data.detail.infra.fatalities = results[i].variableValue;
                        data.detail.infra.fatalities_perc = calcService.calculateOtherPercentage(maxFatalities,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'med_hh_inc'  && results[i].domain.toLowerCase() == 'sociodemographic'){
                        data.detail.socio.income = results[i].variableValue;
                        data.detail.socio.income_perc = calcService.calculateOtherPercentage(maxIncome,results[i].variableValue);
                  }     
                  else if(results[i].variableCode.toLowerCase() == 'pct_unemp'  && results[i].domain.toLowerCase() == 'sociodemographic'){
                        data.detail.socio.unemployed = results[i].variableValue;
                        data.detail.socio.unemployed_perc = calcService.calculateOtherPercentage(maxUnemployed,results[i].variableValue);
                  }
                  else if(results[i].variableCode.toLowerCase() == 'violent_rate_log'  && results[i].domain.toLowerCase() == 'sociodemographic'){
                        data.detail.socio.crimes = results[i].variableValue;
                        data.detail.socio.crimes_perc = calcService.calculateOtherPercentage(maxCrime,results[i].variableValue);
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

                  var maxAir, minAir, maxWater, minWater, maxBuilt, minBuilt, maxSocio, minSocio, maxOverall, minOverall;
                  eqiRes.find({ domain: 'Air'}, function(err, results) {
                        var eqis = [];
                        for (var eqiRess in results) {
                            eqis.push(results[eqiRess].eqi);
                        }
                        minAir = calcService.minimumValue(eqis);
                        maxAir = calcService.maximumValue(eqis);      
                        setEqi();                  
                  });

                  eqiRes.find({ domain: 'Water'}, function(err, results) {
                        var eqis = [];
                        for (var eqiRess in results) {
                            eqis.push(results[eqiRess].eqi);
                        }
                        minWater = calcService.minimumValue(eqis);
                        maxWater = calcService.maximumValue(eqis);         
                        setEqi();               
                  });

                  eqiRes.find({ domain: 'Built'}, function(err, results) {
                        var eqis = [];
                        for (var eqiRess in results) {
                            eqis.push(results[eqiRess].eqi);
                        }
                        minBuilt = calcService.minimumValue(eqis);
                        maxBuilt = calcService.maximumValue(eqis);     
                        setEqi();                   
                  });

                  eqiRes.find({ domain: 'Sociodemographic'}, function(err, results) {
                        var eqis = [];
                        for (var eqiRess in results) {
                            eqis.push(results[eqiRess].eqi);
                        }
                        minSocio = calcService.minimumValue(eqis);
                        maxSocio = calcService.maximumValue(eqis);       
                        setEqi();                 
                  });

                  eqiRes.find({ domain: 'Overall'}, function(err, results) {
                        var eqis = [];
                        for (var eqiRess in results) {
                            eqis.push(results[eqiRess].eqi);
                        }
                        minOverall = calcService.minimumValue(eqis);
                        maxOverall = calcService.maximumValue(eqis);       
                        setEqi();                 
                  });
                  

                  // eqiRes.findOne({countyDescription: county, stateCode: stateCd, domain: 'Air'}).sort('eqi', -1).run( function(err, doc) {
                  //       maxAir = doc.eqi;
                       
                  // });
                  // eqiRes.findOne({countyDescription: county, stateCode: stateCd, domain: 'Air'}).sort('eqi', 1).run( function(error, docs) {
                  //        minAir = docs.eqi;
                  // });                  
                  

                  // set results
                  data.county_name = results[0].countyDescription;
                  data.state = results[0].stateCode;
                  data.stfips = results[0].countyCode;

                  console.log('County '+results[0].countyDescription);

                  setEqi = function(){
                        if(minOverall != undefined && maxOverall != undefined
                              && minAir != undefined && maxAir != undefined
                              && minBuilt != undefined && maxBuilt != undefined
                              && minWater != undefined && maxWater != undefined
                              && minSocio != undefined && maxSocio != undefined)
                        {
                              console.log('minOverall::'+minOverall);
                              console.log('maxOverall::'+maxOverall);


                              for (var i = 0;i<results.length;i++){                 
                                    //data.overall_result = results[0].
                                    if(results[i].domain.toLowerCase() == 'overall'){
                                          data.overall_result = results[i].eqi;
                                          data.overall_result_perc = calcService.calculateEqiPercentage(minOverall,maxOverall,results[i].eqi,true);
                                          //console.log('Overall '+results[i].eqi);
                                          //console.log('Overall Percentage '+calcService.calculateEqiPercentage(minOverall,maxOverall,results[i].eqi,true)); 
                                    }
                                    else if(results[i].domain.toLowerCase() == 'air'){          
                                          
                                          data.detail.air.overall = results[i].eqi;
                                          data.detail.air.overall_perc = calcService.calculateEqiPercentage(minAir,maxAir,results[i].eqi,true);

                                    }
                                    else if(results[i].domain.toLowerCase() == 'water'){                    
                                          
                                          data.detail.water.overall = results[i].eqi;
                                          data.detail.water.overall_perc = calcService.calculateEqiPercentage(minWater,maxWater,results[i].eqi,true);

                                    }
                                    else if(results[i].domain.toLowerCase() == 'built'){                    
                                          
                                          data.detail.infra.overall = results[i].eqi;
                                          data.detail.infra.overall_perc = calcService.calculateEqiPercentage(minBuilt,maxBuilt,results[i].eqi,true);

                                    }
                                    else if(results[i].domain.toLowerCase() == 'sociodemographic'){                     
                                          
                                          data.detail.socio.overall = results[i].eqi;
                                          data.detail.socio.overall_perc = calcService.calculateEqiPercentage(minSocio,maxSocio,results[i].eqi,true);
                                    }                 
                                      
                              } 
                              //console.log( data);
                              res.json(data);
                        }
                            
                  }           
                  
                                          
                        
                  });
                 }
                  
            }
            
					
			
	     });

	

}


