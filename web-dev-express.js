const express = require ("express");
var app = express();
app.get("/contact" , function (req, res){
    res.send("contact :s161406@rguktsklm.ac.in ");
});
app.get("/about" ,function (req,res){
    res.send("Name :nagalakshmi college :iiitsklm");
});
app.listen (3000, function (){
    console.log("server started");
});

