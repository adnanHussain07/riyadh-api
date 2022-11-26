const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
    },
    original_storenumber:{
        type:Number,
        required:[true,'Please provide store number'],
    
    },
    present_storenumber:{
        type:Number,
        
    
    },
    itemid:{
        type:Number,
        unique:true,
        required:[true,'Please provide item id'],

    },
    SerialNo:{
        type:Number,
        unique:true,
        required:[true,'Please provide serial no'],

    },
    status:{
        type:String,
        enum:['rented', 'available','maintenance'],
        default:'available',
    },
    rentee:{
        type:String,
        default:'none',
    },
    rentee_id:{
        type:String,
        default:'none',
    },

}, {timestamps:true})

module.exports = mongoose.model('Store',StoreSchema)