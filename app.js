//  basic configuration
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./src/routes/api');
const app = new express();


// dot env configuration
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

// Body Parser Implement
app.use(bodyParser.json());

// mongoose implement
const DATABASE = process.env.DATABASE;
mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
.then(()=>console.log("DB Connected"))
.catch(err => console.log(err))

// routing
app.use("/api/v1", router)


// undefined route 
app.use('*', (req,res)=>{
    res.status(404).json({status: "Failed!", data: "404 Error! Wrong route!"});
})



module.exports = app; 