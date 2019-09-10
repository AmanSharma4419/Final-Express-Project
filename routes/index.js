var express = require('express');
var router = express.Router();
//requring the schema
var User = require("../model/users");

// router.get('/', (req, res) => {
//   res.send('welcome to Nodejs');
// })
//route for rendring the form 
router.get("/register",(req,res) => {
  res.render("index");
})

//saving data into db
router.post("/register", (req, res, next) => {
  User.create(req.body,(err,userRegistred) => {
    if(err) return next(err);
    res.render("login")
  })
})
//handling the data while user login
router.post("/login",(req,res,next) => {
var pass = req.body.password;
User.findOne({email:req.body.email},(err,user) => {
  if(err) return next(err);
  if(!user) res.json({user:UsernotPresented});
  if(!user.confirmPassword(pass)) res.json({pasword:IncorrectPasword});
  res.send("you are login sucessfully");
})
})

//exports the router
module.exports = router;
