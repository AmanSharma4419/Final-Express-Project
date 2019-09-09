//requring the mongoose 
var mongoose = require("mongoose");

//extracting the schema from mongoose
var schema = mongoose.Schema;

//making the schema for the users
var userSchema = new schema ({
    Name : String,
    Email: {
        type: String,
        required:true,
        unique: true,
    },
    Password: {
        type : String,
        required : true,
    }
},{timestamps : true})

//making the model of userSchema
var User = mongoose.model("User",userSchema);

//exporting the model userSchema
module.exports = User;
