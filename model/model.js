const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'Please provide name'],
    },
    original_storenumber:{
        type:String,
        required:[true,'Please provide store number'],
    
    },
    present_storenumber:{
        type:String,
        
    
    },
    itemid:{
        type:String,
        unique:true,
        required:[true,'Please provide item id'],

    },
    SerialNo:{
        type:String,
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