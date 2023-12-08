require('dotenv').config()
const moment = require('moment');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('mongodb');
const port = process.env.PORT || 5000 ;
const app = express()
const cors = require('cors')
const userHandler = require('./routeHandler/userHandler')
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
  }
  
  app.use(cors(corsOptions))
  app.use(express.json())


// Database Connection  With Mongoose
mongoose.connect('mongodb+srv://shakileeecuet:Klz30X75ggYeAd0e@cluster0.df1ioxo.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Connected'))
.catch(err=> console.log(err))

// application routes
app.use('/user',userHandler)


app.get('/',(req,res)=>{
    res.send('Somiti Server Running')
})
app.listen(port)