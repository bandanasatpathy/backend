const mongoose = require('mongoose')

const {Schema, model} = mongoose;


const UserSchema = new Schema({
    userName:{
        type:String,
        //required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
    },
    address:{
        type:String
    },
    contact: {
        type: String,
    },
    role: {
        type: String, //USER, ADMIN
    },
})

const UserModal = model('user', UserSchema);

module.exports =  UserModal