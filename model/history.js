const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    name : {
        type:String,
        // required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
    },
    original_storenumber:{
        type:Number,
        // required:[true,'Please provide store number'],
    
    },
    present_storenumber:{
        type:Number,
        
    
    },
    itemid:{
        type:Number,
        // unique:false,
        // required:[true,'Please provide item id'],

    },
    rented_at:{
        type:Date,
        //enum:['rented', 'not_rented','maintenance'],
        
    },
    return_at:{
        type:Date,
        default: '',
        //enum:['rented', 'not_rented','maintenance'],
        
    },
    rentee_id:{
        type:Number,
        
    },
    rentee:{
        type:String,
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 100,
      },

}, {timestamps:true})

module.exports = mongoose.model('History',HistorySchema)