var mongoose = require('mongoose');

module.exports = mongoose.model('county',{
                                stfips : Number,
                                county_name : String,
                                state : String,
                                overall_result : Number
                });
