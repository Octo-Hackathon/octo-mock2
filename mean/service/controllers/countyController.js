// Controller to bring County data
// Initialize required files
var coun = require('../models/county')
eqiRes = require('../models/eqiResult')
eqiDet = require('../models/eqiDetail')
calcService = require('./calculationService')
Q = require("q");

// Stub data to test
module.exports.searchlist = function(req, res) {
    var stateCounty = req.query.q;
    //split county and code

    var str = stateCounty.split(",");
    console.log('stateCounty is :' + stateCounty);
    var county = str[0];
    var stateCd = str[1];

    console.log('County is :' + county);
    console.log('State is :' + stateCd),
        coun.findOne({
            county_name: county,
            state: stateCd
        }, function(err, results) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            console.log('results is :' + results);
            console.log(err);
            //  if (err)
            //res.send(err)
            // set results
            var data = results.toJSON();
            data.detail = {
                "air": {
                    "nitro": "0.3",
                    "sulfur": "0.5",
                    "carbon": "0.4"
                },
                "water": {
                    "drought": "0.3",
                    "mecury": "0.5",
                    "arsenic": "0.4"
                },
                "infra": {
                    "highway": "0.3",
                    "streets": "0.5",
                    "fatalities": "0.4"
                },
                "socio": {
                    "income": "0.3",
                    "unemployed": "0.5",
                    "crimes": "0.4"
                }
            };
            console.log('results is :' + data);
            res.json(data);

            //console.log(res);
        });
}


module.exports.test = function(req, res) {
    // var stateCounty = req.query.q;
    // console.log('stateCounty is :' + stateCounty);
    // res.json({  stfips: 51059,  county_name: 'Fairfax County',  state: 'VA',  overall_result: 2.196357 });

    // eqiDet.aggregate({$match: { variableCode: 'a_no2_mean_ln' }}).group({ maxNitro: { $max: '$variableValue' } }).exec(function (err, res) {

    eqiDet.aggregate([
        // { $match: {
        //     variableCode: 'a_no2_mean_ln'
        // }},

        {
            $group: {
                _id: "$variableCode",
                maxNitro: {
                    $max: '$variableValue'
                }
            }
        }
    ], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        //res.json(result);
    });

    eqiDet.aggregate([
        // { $match: {
        //     variableCode: 'a_no2_mean_ln'
        // }},

        {
            $group: {
                _id: "$variableCode",
                minNitro: {
                    $min: '$variableValue'
                }
            }
        }
    ], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.json(result);

    });
    // console.log("Max nitro :: "+results.maxNitro);



}

module.exports.autoComplete = function(req, res) {
    var stateCounty = req.query.q;
    var regex = new RegExp(stateCounty, 'i');
    console.log('stateCounty is :' + stateCounty);

    eqiRes.aggregate({
        $match: {
            countyDescription: regex
        }
    }, function(err, results) {

        if (err) throw err;

        var counties = [];

        for (var countyDescription in results) {

            counties.push(results[countyDescription].countyDescription + ',' + results[countyDescription].stateCode);

        }

        var result = {
            results: counties
        }

        res.json(result);

    });
}

module.exports.searchByCountyState = function(req, res) {
    var stateCounty = req.query.q;
    //split county and code
    console.log('index : ' + stateCounty.indexOf(','));
    if (stateCounty.indexOf(',') == -1) {
        console.log('inside');
        res.status(400).send({
            'error': 'Invalid Search'
        });
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



    eqiDet.find({
        countyDescription: county,
        stateCode: stateCd
    }, function(err, results) {
        //console.log('Results detail '+results);
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute    
        if (err)
            res.send(err)
        if (results.length == 0) {
            res.status(400).send({
                'error': 'No Results in Details'
            });
            return false;
        }

        var minVarArray, maxVarArray;

        setMinVariables = function() {
            var deferred = Q.defer();
            calcService.minimumVariables(deferred);
            return deferred.promise;
        }

        setMaxVariables = function() {
            var deferred = Q.defer();
            calcService.maximumVariables(deferred);
            return deferred.promise;
        }


        setMinVariables()
            .then(function(success) {
                minVarArray = success;
                setVarVals();
            });

        setMaxVariables()
            .then(function(success) {
                maxVarArray = success;
                setVarVals();
            });


        // set results
        setVarVals = function() {

            if (minVarArray == undefined && maxVarArray == undefined) return false;
            for (var i = 0; i < results.length; i++) {

                if (results[i].variableCode.toLowerCase() == 'a_no2_mean_ln' && results[i].domain.toLowerCase() == 'air') {
                    data.detail.air.nitro = results[i].variableValue;
                    data.detail.air.nitro_perc = calcService.calculateOtherPercentage(minVarArray.minNitro, maxVarArray.maxNitro, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'a_so2_mean_ln' && results[i].domain.toLowerCase() == 'air') {
                    data.detail.air.sulfur = results[i].variableValue;
                    data.detail.air.sulfur_perc = calcService.calculateOtherPercentage(minVarArray.minSulfur, maxVarArray.maxSulfur, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'a_co_mean_ln' && results[i].domain.toLowerCase() == 'air') {
                    data.detail.air.carbon = results[i].variableValue;
                    data.detail.air.carbon_perc = calcService.calculateOtherPercentage(minVarArray.minCarbon, maxVarArray.maxCarbon, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'avgofd3_ave' && results[i].domain.toLowerCase() == 'water') {
                    data.detail.water.drought = results[i].variableValue;
                    data.detail.water.drought_perc = calcService.calculateOtherPercentage(minVarArray.minDrought, maxVarArray.maxDrought, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'w_hg_ln' && results[i].domain.toLowerCase() == 'water') {
                    data.detail.water.mercury = results[i].variableValue;
                    data.detail.water.mercury_perc = calcService.calculateOtherPercentage(minVarArray.minMercury, maxVarArray.maxMercury, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'w_as_ln' && results[i].domain.toLowerCase() == 'water') {
                    data.detail.water.arsenic = results[i].variableValue;
                    data.detail.water.arsenic_perc = calcService.calculateOtherPercentage(minVarArray.minArsenic, maxVarArray.maxArsenic, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'hwyprop' && results[i].domain.toLowerCase() == 'built') {
                    data.detail.infra.highway = results[i].variableValue;
                    data.detail.infra.highway_perc = calcService.calculateOtherPercentage(minVarArray.minHighway, maxVarArray.maxHighway, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'ryprop' && results[i].domain.toLowerCase() == 'built') {
                    data.detail.infra.streets = results[i].variableValue;
                    data.detail.infra.streets_perc = calcService.calculateOtherPercentage(minVarArray.minStreets, maxVarArray.maxStreets, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'fatal_rate_log' && results[i].domain.toLowerCase() == 'built') {
                    data.detail.infra.fatalities = results[i].variableValue;
                    data.detail.infra.fatalities_perc = calcService.calculateOtherPercentage(minVarArray.minFatalities, maxVarArray.maxFatalities, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'med_hh_inc' && results[i].domain.toLowerCase() == 'sociodemographic') {
                    data.detail.socio.income = results[i].variableValue;
                    data.detail.socio.income_perc = calcService.calculateOtherPercentage(minVarArray.minIncome, maxVarArray.maxIncome, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'pct_unemp' && results[i].domain.toLowerCase() == 'sociodemographic') {
                    data.detail.socio.unemployed = results[i].variableValue;
                    data.detail.socio.unemployed_perc = calcService.calculateUnemploymentPercentage(minVarArray.minUnemployed, maxVarArray.maxUnemployed, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() == 'violent_rate_log' && results[i].domain.toLowerCase() == 'sociodemographic') {
                    data.detail.socio.crimes = results[i].variableValue;
                    data.detail.socio.crimes_perc = calcService.calculateOtherPercentage(minVarArray.minCrime, maxVarArray.maxCrime, results[i].variableValue);
                }

            }


            eqiRes.find({
                countyDescription: county,
                stateCode: stateCd
            }, function(err, results) {
                //console.log('Results result '+results);
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute          
                if (err)
                    res.send(err)

                if (results.length == 0) {
                    res.status(400).send({
                        'error': 'No Results in Results'
                    });
                    return false;
                }

                var minEqiArray, maxEqiArray;

                setMinEqis = function() {
                    var deferred = Q.defer();
                    calcService.minimumEqi(deferred);
                    return deferred.promise;
                }

                setMaxEqis = function() {
                    var deferred = Q.defer();
                    calcService.maximumEqi(deferred);
                    return deferred.promise;
                }


                setMinEqis()
                    .then(function(success) {
                        minEqiArray = success;
                        setEqiVals();
                    });

                setMaxEqis()
                    .then(function(success) {
                        maxEqiArray = success;
                        setEqiVals();
                    });



                // set results
                data.county_name = results[0].countyDescription;
                data.state = results[0].stateCode;
                data.stfips = results[0].countyCode;

                console.log('County ' + results[0].countyDescription);

                setEqiVals = function() {

                    if (minEqiArray == undefined && maxEqiArray == undefined) return false;

                    for (var i = 0; i < results.length; i++) {
                        var percent = 0;
                        var rate;
                        if (results[i].domain.toLowerCase() == 'overall') {
                            data.overall_result = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minOverall, maxEqiArray.maxOverall, results[i].eqi, true);
                            data.overall_result_perc = percent;
                            data.overall_result_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() == 'air') {

                            data.detail.air.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minAir, maxEqiArray.maxAir, results[i].eqi, true);
                            data.detail.air.overall_perc = percent;
                            data.detail.air.overall_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() == 'water') {

                            data.detail.water.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minWater, maxEqiArray.maxWater, results[i].eqi, true);
                            data.detail.water.overall_perc = percent;
                            data.detail.water.overall_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() == 'built') {

                            data.detail.infra.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minBuilt, maxEqiArray.maxBuilt, results[i].eqi, true);
                            data.detail.infra.overall_perc = percent;
                            data.detail.infra.overall_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() == 'sociodemographic') {

                            data.detail.socio.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minSocio, maxEqiArray.maxSocio, results[i].eqi, true);
                            data.detail.socio.overall_perc = percent;
                            data.detail.socio.overall_rate = calcService.rating(percent);
                        }

                    }
                    //console.log( data);
                    res.json(data);


                }


            });


        }



    });



}