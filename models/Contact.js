const mongoose=require('mongoose');

const ContactSchema=mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
},
name:{
    type:String,
    require:true
},
type:{
    type:String,
    default:'Personal'
},
phone:{
    type:String
},
email:{
    type:String,
    require:true,
},
date:{
    type:Date,
    default:Date.now 
}
});
module.exports=mongoose.model('contact',ContactSchema);