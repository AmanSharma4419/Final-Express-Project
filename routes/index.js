var express = require('express');
var router = express.Router();
//requring the schema
var User = require("../model/users")

//route for rendring the form 
router.get("/",(req,res) => {
  res.render("index")
})

//saving data into db
router.post("/",(req,res,next) => {
  User.create(req.body,(err,userRegistred) => {
    if(err) return next();
    console.log(userRegistred)
  })
})

module.exports = router;
