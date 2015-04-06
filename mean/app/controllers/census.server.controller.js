'use strict';

/**
 * Module dependencies.
 */
var Client = require('node-rest-client').Client;

//Proxy API to Ruby Housing Info API
exports.getHousingInfo = function(req, res) {
    var client = new Client();
    var fips = req.query.q;

    console.log('Calling sensus getHousingInfo');

    client.get('http://ec2-54-174-149-43.compute-1.amazonaws.com/admin/getHousingInfo/'+fips, function(data, response){
                                                            
            var results= data;
            console.log(results);                                                
            res.send(results);
           
        });

};

//Proxy API to Ruby Population Info API
exports.getPopulationInfo = function(req, res) {

    var client = new Client();
    var fips = req.query.q;

    client.get('http://ec2-54-174-149-43.compute-1.amazonaws.com/admin/getPopulationInfo/'+fips, function(data, response){
                                                            
            var results= data;
            console.log(results);                                                
            res.send(results);
           
        });
  
};