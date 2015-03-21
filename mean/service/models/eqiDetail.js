var mongoose = require('mongoose');

module.exports = mongoose.model('EqiRDetail',{
                                stateCode : String,
                                stateDescription : String,
                                countyCode : String,
                                countyDescription : String,
                                variableCode : String,
                                variableDescription : String,
                                variableValue : Number,
                                domain : String
                });
