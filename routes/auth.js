const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../Middleware/auth');
const {check,validationResult}=require('express-validator/check');

//@route    Get api/auth
//@desc     to access auth
//@access   private
router.get('/',auth,async (req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error");
    }
    res.send('get logged in user ')}); 

//@route    Post api/auth
//@desc     to create auth
//@access   public 
router.post('/',[
    check('email','Please enter valid Email').isEmail(),
    check('password','Please enter valid Password ').exists(),
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return  res.status(400).json({errors:errors.array()});
        }
        const {email,password}=req.body;
        try {
            let user= await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:"Invalid Credentials"});
            }
            const isMatch= await bcrypt.compare(password,user.password);
            if(!isMatch)
            return res.status(400).send("Invalid Credentials");
            
            const payload={
                user:{
                    id:user.id
                }
            };
            jwt.sign(payload,config.get('jwtSecret'),{
                expiresIn:360000
            },(err,token)=>{
                if(err)throw err;
                res.json({token:token});
            })
          }
          catch(err){
            console.error(err.message);
            res.send("Server Error")
          } 
    } 
);  

module.exports=router;