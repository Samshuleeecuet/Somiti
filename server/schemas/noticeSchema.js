const mongoose = require('mongoose')

const noticeSchema = mongoose.Schema({
    Description : {
        type : String,
        require:true
    },
    Category :{
        type : String,
        require:true
    },
    Issue_by :{
        type : String,
        require:true
    },
    date:{
        type : Date,
        default:Date.now
    }
})


module.exports = noticeSchema