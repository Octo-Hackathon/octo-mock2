var mongoose = require('mongoose');

module.exports = mongoose.model('eqiresult',{
                                stateCode : String,
                                stateDescription : String,
                                countyCode : String,
                                countyDescription : String,
                                domain : String,
                                eqi : Number
                });
