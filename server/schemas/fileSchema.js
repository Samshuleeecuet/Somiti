const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    name : {
        type : String,
        require:true
    },
    nationalid :{
        type : String,
        require:true
    },
    slipmonth:{
        type : String,
        require:true
    },
    filename:{
        type : String,
        require:true
    },
    path: {
        type : String,
        require:true
    },
    date:{
        type : Date,
        default:Date.now
    }
})

module.exports = fileSchema