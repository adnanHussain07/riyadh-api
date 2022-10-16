const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
    },
    storenumber:{
        type:Number,
        required:[true,'Please provide store number'],
    
    },
    itemid:{
        type:Number,
        unique:true,
        required:[true,'Please provide store number'],

    },
    status:{
        type:String,
        enum:['rented', 'not_rented'],
        default:'not_rented',
    },
    rentee:{
        type:String,
        default:'none',
    },

}, {timestamps:true})

module.exports = mongoose.model('Store',StoreSchema)