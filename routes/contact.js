const express=require('express');
const router =express.Router();
const auth=require('../Middleware/auth');
const {check,validationResult}=require('express-validator/check');
const User=require('../models/user');
const Contact=require('../models/Contact');
//@route    Get api/contact
//@desc     to get contacts
//access    private
router.get('/',auth,async (req,res)=>{
    try {
    const contact=await Contact.find({user:req.user.id}).sort({date:-1});
    res.json(contact);    
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    });

//@route    POST api/contact
//@desc     to enter contacts
//access    private
router.post('/',[auth,[
    check('name','Please enter Name').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return  res.status(400).json({errors:errors.array()});
    }
    const {name,email,phone,type}=req.body;
    try {
        const newContact=new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        });
        const contact=await newContact.save();
        res.json(contact);   
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route    PUT api/contact
//@desc     to update contacts
//access    private
router.put('/:id',auth,async (req,res)=>{
    const {name,email,type,phone }=req.body;
    const contactFeild ={};
    if(name)contactFeild.name=name;
    if(email)contactFeild.email=email;
    if(phone)contactFeild.phone=phone;
    if(type)contactFeild.type=type;

    try {
        let contact=await Contact.findById(req.params.id);
        if(!contact)res.status(404).json({msg:"user not found"});

        //Make sure same user contacts are modified

        if(contact.user.toString()!==req.user.id)
        res.status(401).send("user not authorized");

        contact=await Contact.findByIdAndUpdate(req.params.id,{
            $set:contactFeild
        },
        {
            new:true
        });
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    });

//@route    DELETE api/contact
//@desc     to delete contacts
//access    private
router.delete('/:id',auth,async (req,res)=>{
    try {
        let contact=await Contact.findById(req.params.id);
        if(!contact)res.status(404).json({msg:"user not found"});

        //Make sure same user contacts are modified

        if(contact.user.toString()!==req.user.id)
        res.status(401).send("user not authorized");

        await Contact.findByIdAndRemove(req.params.id);
        res.json({"msg":"contact Removed"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports=router;