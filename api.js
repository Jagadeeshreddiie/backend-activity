const express=require("express");
const url=require("url");
const  { registerUser,loginUser } =require( "./db");
const app=express();
const  cors =require("cors");

// CORS = Cross Origin Resourse Sharing

const corsPolicy={
    origin:'http://localhost:4200',
    methods:'GET,POST',
    credentials:true,
    optionsSuccessStatus:204
}

app.use(cors(corsPolicy));

app.get('/',function(req,res){
    res.send("Started");
})

app.get('/contactus',function(){
    //contactus 
})

app.get('/aboutus',function(){
    // aboutus
})

app.get('/registerUser',async function(req,res){
    var data=url.parse(req.url,true);
    var name=data.query.name;
    var username=data.query.username;
    var mail=data.query.mail;
    var password=data.query.password;
    var cpassword=data.query.cpassword;
    var query={
        'name':name,
        'username':username,
        'mail':mail,
        'password':password,
        'cpassword':cpassword
    }
    const result=await registerUser(query);
    res.send(result);
})

app.get('/loginUser',async function(req,res){
    //login
    var data=url.parse(req.url,true);
    var username=data.query.username;
    var password=data.query.password;
    var query={
        'username':username,
        'password':password
    }
    const result=await loginUser(query);
    res.send(result);
})

app.listen(3000,function(){
    console.log("Server Started");
})