require('dotenv').config()
const moment = require('moment');
const express = require('express')
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('mongodb');
const port = process.env.PORT || 5000 ;
const app = express()
const cors = require('cors')
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
  }
  
  app.use(cors(corsOptions))
  app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Somiti Server Running')
})
app.listen(port)