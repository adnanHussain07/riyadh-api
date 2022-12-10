const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    name : {
        type:String,
        // required:[true,'Please provide name'],
        minlength:3,
        maxlength:300,
    },
    original_storenumber:{
        type:String,
        // required:[true,'Please provide store number'],
    
    },
    present_storenumber:{
        type:String,
        
    
    },
     item_id:{
    type:Number,
    //     // unique:false,
    //     // required:[true,'Please provide item id'],

     },
    status:{
        type:String,
        enum:['rented', 'not_rented','maintenance'],
        
    },
    rentee_id:{
        type:String,
        
    },
    rentee:{
        type:String,
    }

}, {timestamps:true})

module.exports = mongoose.model('Logs',LogSchema)