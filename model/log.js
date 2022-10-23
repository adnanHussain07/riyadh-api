const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    name : {
        type:String,
        // required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
    },
    rented_storenumber:{
        type:Number,
        // required:[true,'Please provide store number'],
    
    },
    received_storenumber:{
        type:Number,
        
    
    },
    itemid:{
        type:Number,
        // unique:true,
        // required:[true,'Please provide item id'],

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