const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

const {check,validationResult}=require('express-validator/check');
const e = require('express');
// @route   POST api/users
// @desc    Register User
//@access   public 
router.post('/',[
    check('name','Please enter Name').not().isEmpty(),
    check('email','Please enter valid Email').isEmail(),
    check('password','Please enter Password of atleast 6 characters').isLength({min:6}),
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return  res.status(400).json({errors:errors.array()});
        }
        const {name,email,password}=req.body;
        try {
          let user= await User.findOne({email});
          if(user){
              return res.status(400).json({msg:"User already exits"});
          }  
          user=new User(
            {
               name,
               email,
               password 
            }
          );
          const salt=await bcrypt.genSalt(10);
          user.password=await bcrypt.hash(password,salt);
          
          await user.save();
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
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports=router;
