var validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose')
module.exports = function () {
    
    
    

    var PetSchema = new mongoose.Schema({
        name: { type: String, required:[true,"Name Is Required"], minlength:[3,"Minimum Length 3"],unique:true  },
        type: { type: String, required:[true,"Type Is Required"], minlength:[3,"Minimum Length 3"] },
        description: { type: String, required:[true,"Description Is Required"], minlength:[3,"Minimum Length 3"] },
        skill1: { type: String},
        skill2: { type: String},
        skill3: { type: String},
        likes:{type:Number}

    })
    // PetSchema.plugin(uniqueValidator);
    PetSchema.plugin(uniqueValidator, { message: 'Pet Name must be unique' });
    mongoose.model('Pet', PetSchema);


    
}