const express = require('express')
const router = express.Router()
const { default: mongoose } = require('mongoose');
const noticeSchema = require('../schemas/noticeSchema');
const Notice = new mongoose.model("Notice",noticeSchema)


// get all the users

router.get('/',async(req,res)=>{
    const result = await Notice.find()
    res.send(result)
})


module.exports = router