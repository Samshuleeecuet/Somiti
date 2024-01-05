const express = require('express')
const router = express.Router()
const { default: mongoose } = require('mongoose');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User",userSchema)


// get all the users

router.get('/',async(req,res)=>{
 const result = await User.find()
 res.send(result)
})


// get a user by email

router.get('/:email',async(req,res)=>{
    const result = await User.findOne({Email: req.params.email})
    res.send(result)
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
    else{
        const newUser = new User(req.body)
        const result =  await newUser.save()
        res.send(result)
    }
})

// Update a user

router.put('/:email',async(req,res)=>{
    const email = req.params.email;
    const data = req.body;
    console.log(email,data)
    if(data?.Role){
        const updateRole = await User.updateOne({Email : email},{$set:{Role:data.Role}})
        res.send(updateRole)
    }else{
        const updateStatus = await User.updateOne({Email : email},{$set:{Approved:data.Approved}})
        res.send(updateStatus)
    }
})

// Detele a user

router.delete('/:email',async(req,res)=>{
    
})

module.exports =router;