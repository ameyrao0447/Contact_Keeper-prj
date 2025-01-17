const jwt=require('jsonwebtoken');
const config=require('config');
module.exports=function(req,res,next){
 //Get token from header
 const token=req.header('x-auth-token');
 
 //check if token exits
 if(!token)
 return res.status(401).json({msg:"No Token,Access denied"});

 try{
     const decoded =jwt.verify(token,config.get('jwtSecret'));
     req.user=decoded.user;
     next();
 }
 catch(err)
 {
     res.status(401).json({msg:"token not valid"});
 }
}