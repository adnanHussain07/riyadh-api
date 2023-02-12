const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    name : {
        type:String,
        // required:[true,'Please provide name'],
    },
    original_storenumber:{
        type:String,
        // required:[true,'Please provide store number'],
    
    },
    present_storenumber:{
        type:String,
        
    
    },
    itemid:{
        type:String,
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
        type:String,
        
    },
    rentee:{
        type:String,
    },
    SerialNo:{
        type:String,
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 300,
      },

}, {timestamps:true})

module.exports = mongoose.model('History',HistorySchema)
