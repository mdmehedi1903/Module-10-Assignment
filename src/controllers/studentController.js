const jwt = require('jsonwebtoken'); 
const StudentsModel = require('../models/StudentsModel');
const OTPModel = require('../models/OTPModel');
const SendEmailUtility = require("../utility/SendEmailUtility");


exports.createStudent = async (req,res)=>{
    try{
        let reqBody = req.body;
        const result = await StudentsModel.create(reqBody);
        res.status(201).json({status: "Success!", data: result})
    }catch(e){
        res.status(400).json({status: "Failed!", data:e.message})
    }
}

exports.studentLogin = async (req,res)=>{
    try{
        let email = req.body['email'];
        let password = req.body['password'];
        let Query = {email: email, password: password}
        const result = await StudentsModel.find(Query);

        if (result.length > 0) {

            let PayLoad = {
                exp: Math.floor(Date.now()/1000)+(60*60*24),
                data: result[0]
            }
            
            let token = jwt.sign(PayLoad, process.env.SECRETKEY)
            res.status(201).json({status: "Success!", data: token})
        }else{
            res.status(400).json({ status: "Failed", data: "No User Found!" });
        }
        
    }catch(error){
        res.status(400).json({status: "Failed!", data:error})
    }
}

exports.readStudent = async (req, res) => {
    try {
      let email = req.headers['email'];
      let query = {email: email};
      let projection = {_id: 0, password: 0};
      // let projection = "firstName lastName emailAddress mobileNumber city userName";
  
      const data = await StudentsModel.find(query, projection);
  
      res.status(201).json({ status: "Success", data: data });
    } catch (err) {
      res.status(400).json({ status: "Failed", data: err });
    }
  }

  exports.updateStudent = async (req, res) => {
    try {
    let reqBody = req.body;
    let email = req.headers['email'];
    let query = {email: email};
  
    const data = await StudentsModel.updateOne(query, reqBody);
  
        res.status(201).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
  }

  exports.deleteStudent = async (req, res) => {
    try {
    let email = req.headers['email'];
    let query = {email: email};
  
    const data = await StudentsModel.deleteOne(query);
  
        res.status(201).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
  }

  exports.sendOTP = async (req, res) => {
    let email = req.body['email'];
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let query = {email: email};

  
    let result= await StudentsModel.find(query).count();
    if(result===1){
 
        let EmailText="Your Verification Code is = "+OTPCode;
        let EmailSubject="Task Manager Verification Code";

       await OTPModel.create({email:email,otp:OTPCode})

       await SendEmailUtility(email,EmailText,EmailSubject);
       res.status(200).json({status:"success",data:"6 Digit Verification Code has been sent"})

    }
    else{
        res.status(200).json({status:"fail",data:"No User Found"})
    }
}

exports.verifyOTP=async (req,res)=>{
    let email = req.body['email'];
    let OTPCode = req.body['otp'];
    let status=0;
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
    if(result===1){
        await OTPModel.updateOne({email:email,otp:OTPCode,status:status}, {status:statusUpdate})
        res.status(200).json({status:"success",data:"Verification Completed"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }

}

exports.resetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['otp'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result===1){
        let result=await StudentsModel.updateOne({email: email}, {password:NewPass})
        res.status(200).json({status:"success",status:"Password Reset Success",data:result})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }
}

