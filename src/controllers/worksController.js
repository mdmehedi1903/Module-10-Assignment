const WorkModel = require('../models/WorksModel');

exports.createWork= async (req,res)=>{
    try{
        let reqBody = req.body;
        let email = req.headers['email'];
        let title = reqBody['title'];
        let classNote = reqBody['classNote'];
        let description = req.headers['description'];
        let status = "New";

        let postBody = {
            title: title,
            classNote: classNote,
            description: description,
            status: status,
            email: email
        }
        const data = await WorkModel.create(postBody);

        res.status(201).json({ status: "Success", data:data });

    }catch(error){
        res.status(400).json({ status: "Failed", data: error });
    }
}


exports.readWork = async (req,res)=>{
    try{
    let email = req.headers['email'];
    let query = {email: email};
    const data = await WorkModel.find(query);
    res.status(201).json({ status: "Success", data:data });

    }catch(error){
        res.status(400).json({ status: "Failed", data: error });
    }
}

exports.updateWork = async (req,res)=>{
    try{
        let reqBody = req.body;
        let id = req.params.id;
        let title = reqBody['title'];
        let classNote = reqBody['classNote'];
        let description = req.headers['description'];

        let postBody = {
            title: title,
            classNote: classNote,
            description: description
        }
        const data = await WorkModel.updateOne({_id:id}, {$set:postBody}, {upsert: true});
        res.status(201).json({ status: "Success", data:data });

    }catch(error){
        res.status(400).json({ status: "Failed", data: error });
    }
}


exports.deleteWork = async (req,res)=>{
    try{
        let reqBody = req.body;
        let id = req.params.id;

        const data = await WorkModel.deleteOne({_id:id});
        res.status(201).json({ status: "Success", data:data });

    }catch(error){
        res.status(400).json({ status: "Failed", data: error });
    }
}
