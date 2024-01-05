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
    amount:{
        type : String,
        require:true
    },
    filename:{
        type : String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    path: {
        type : String,
        require:true
    },
    updateHistory:{
        type: Array,
        default: []
    },
    status: {
        type : String,
        require:true
    },
    comment: {
        type : String
    },
    date:{
        type : Date,
        default:Date.now
    }
})

module.exports = fileSchema