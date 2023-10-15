const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    let token = req.headers['token'];
    jwt.verify(token, process.env.SECRETKEY, (err, decoded)=>{
        if(err){
            res.status(401).json({status:"Unauthorized!"})
        }else{
            let email = decoded['data']['email'];
            console.log(email);
            req.headers.email = email;
            next();
        }
    })
} 