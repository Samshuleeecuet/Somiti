const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    file_id :{
        type : String
    },
    email :{
        type : String
    },
    comment:{
        type:String,
    }
    ,
    date :{
        type : String
    },
    admin_email:{
        type:String
    }

})

module.exports = historySchema