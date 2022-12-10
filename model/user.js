const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'Please provide name'],
    },
    userid:{
        type:String,
        unique:true,
        required:[true,'Please provide user id'],

    },
    department:{
        type:String,
        required:[true, 'Please provide department']
    },
    collegeid:{
        type:String,
        
    }
   
}, {timestamps:true})

module.exports = mongoose.model('Staff',UserSchema)