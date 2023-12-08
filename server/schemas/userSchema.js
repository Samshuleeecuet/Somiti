const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Name : {
        type : String,
        require:true
    },
    Image :{
        type : String,
        require:true
    },
    Phonenumber :{
        type : String,
        require:true
    },
    Nationalid :{
        type : String,
        require:true
    },
    Email :{
        type : String,
        require:true
    },
    Password :{
        type : String,
        require:true
    },
    Role :{
        type : String,
        require:true
    },
    Approved :{
        type : String,
        require:true
    },
    date:{
        type : Date,
        default:Date.now
    }
})


module.exports = userSchema