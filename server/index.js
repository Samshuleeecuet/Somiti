require('dotenv').config()
const moment = require('moment');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require("multer");
var path = require('path');

const port = process.env.PORT || 5000 ;
const app = express()
const cors = require('cors')
const userHandler = require('./routeHandler/userHandler')
const noticeHandler = require('./routeHandler/noticeHandler')
const fileSchema = require('./schemas/fileSchema')
const historySchema = require('./schemas/historySchema');
const { comment } = require('postcss');
const File = new mongoose.model("File",fileSchema)
const History = new mongoose.model("History",historySchema)
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
  }
  
  app.use(cors(corsOptions))
  app.use(express.json())

  
  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, Upload_folder);
    },
    filename: (req,file,cb)=>{
      const fileExt = path.extname(file.originalname)
      const fileName = file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-") + "-"+ Date.now()
      cb(null,fileName+fileExt)
    }
  })

  // file upload folder
  const Upload_folder = "../server/UploadFiles/";
  var upload = multer({
    storage : storage,
    fileFilter: (req,file,cb)=>{
      if(file.mimetype === 'application/pdf'){
        cb(null,true)
      }
    }
  })


// Database Connection  With Mongoose
mongoose.connect('mongodb+srv://shakileeecuet:Klz30X75ggYeAd0e@cluster0.df1ioxo.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Connected'))
.catch(err=> console.log(err))

// application routes
app.use('/user',userHandler)
app.use('/notice',noticeHandler)
app.post('/upload_file',upload.single('file'),async(req,res)=>{
  const {name,nationalid,slipmonth,amount,email} = req.body
  const {filename,path} = req.file
  const newFile = new File({name,nationalid,slipmonth,amount,filename,email,path,status:'pending',comment:''})
  const result = await newFile.save()
  res.send(result)
})



// File Route

// get all files
app.get('/allfiles',async(req,res)=>{
  const data =await File.find().sort({date:-1});
  res.send(data)
})

// update a files
app.put("/file/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id,body)
  const newHistory = new History({file_id:body.file_id,email:body.email,comment:body.status,admin_email:body.admin_email})
  const getFile = await File.findOne({_id:id})
  const newArray = [...getFile.updateHistory,body]
  const updateHistory = await File.updateOne({_id : id},{$set:{updateHistory:newArray}})
  const updateStatus = await File.updateOne({_id : id},{$set:{status:body.status}})
  const result = await newHistory.save()
  res.send(updateStatus)
  
})

// update a comment

app.put("/comment/:id", async (req, res) =>{
  const id = req.params.id;
  const body = req.body;
  console.log(id,body)
  const updateComment = await File.updateOne({_id:id},{$set:{comment:body.comment}})
  res.send(updateComment)
  
});

// default error handler
app.use((err,req,res,next)=>{
  if(err){
    if(err instanceof multer.MulterError){
      return res.status(500).send("There was an upload Error")
    }else{
      return res.status(500).send(err.message)
    }
  }else{
    res.send('Success')
  }
})

app.get('/',(req,res)=>{
    res.send('Somiti Server Running')
})
app.listen(port)