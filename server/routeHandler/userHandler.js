const express = require('express')
const router = express.Router()
const { default: mongoose } = require('mongoose');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User",userSchema)


// get all the users

router.get('/',async(req,res)=>{

})


// get a user by email

router.get('/:email',async(req,res)=>{
    
})


// Post a user

router.post('/',async(req,res)=>{
    const user = req.body
    const query1 = {Email:user.Email}
    const query2 = {Nationalid: user.Nationalid}
    const existingUser = await User.findOne(query1)
    const existingNid= await User.findOne(query2)
    console.log(existingUser,existingNid)
    if(existingUser){
        
        return res.send({message: 'User Already Exist'})
    }
    else if(existingNid){
        return res.send({message: 'National Id Already Exist'})
    }
    else{
        const newUser = new User(req.body)
        const result =  await newUser.save()
        res.send(result)
    }
})

// Update a user

router.put('/',async(req,res)=>{
    
})

// Detele a user

router.delete('/:email',async(req,res)=>{
    
})

module.exports =router;