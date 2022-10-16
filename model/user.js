const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
    },
    userid:{
        type:Number,
        unique:true,
        required:[true,'Please provide user id'],

    },
    department:{
        type:String,
        required:[true, 'Please provide department']
    }
   
}, {timestamps:true})

module.exports = mongoose.model('Staff',UserSchema)