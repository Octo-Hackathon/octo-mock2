var Client = require('node-rest-client').Client;

module.exports.getHousingInfo = function(req, res) {
    client = new Client();
    var fips = req.query.q;

    client.get("http://ec2-54-174-149-43.compute-1.amazonaws.com/admin/getHousingInfo/"+fips, function(data, response){
                                                            
            var results= data;
            console.log(results);                                                
            res.send(results);
           
        });

}

module.exports.getPopulationInfo = function(req, res) {

   client = new Client();
    var fips = req.query.q;

    client.get("http://ec2-54-174-149-43.compute-1.amazonaws.com/admin/getPopulationInfo/"+fips, function(data, response){
                                                            
            var results= data;
            console.log(results);                                                
            res.send(results);
           
        });
  
}