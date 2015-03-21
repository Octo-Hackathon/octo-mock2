var mongoose = require('mongoose');

module.exports = mongoose.model('Opportunity',{
<<<<<<< HEAD
=======
                                opNumber : {type: String, unique: true},
>>>>>>> 1cbc578cce3b7efc753e80248d29dbf578ebf4ad
                                opTitle : String,
                                opType : String,
                                opDesc : String, 
                                setAside : String,
                                opStatus : String,
<<<<<<< HEAD
                                buyerName : String,
=======
>>>>>>> 1cbc578cce3b7efc753e80248d29dbf578ebf4ad
                                publishedDt : Date,
                                respDueDt : Date,
                                createdBy : String,
                                createdDt : {type: Date, default: Date.now},
                                modifiedBy : String,
                                modifiedDt : Date,
                                perfPlace : String,
                                primaryContact : String
                });
