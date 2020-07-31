const express=require('express');
const connectDB=require('./config/db');
const app=express();

//Connect DB
connectDB();

//Middle ware
app.use(express.json({extends:true}));
app.get('/',(req,res)=>res.json({msg:'Welcome to contact keeper'}));

//Defining Routes
app.use('/api/users',require('./routes/user.js'));
app.use('/api/contact',require('./routes/contact.js'));
app.use('/api/auth',require('./routes/auth.js'));

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{console.log(`server started on port ${PORT}`)});