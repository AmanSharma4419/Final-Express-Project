//Requring the mongoose 
var mongoose = require("mongoose");

//Extracting the schema from mongoose
var schema = mongoose.Schema;

//Requring the bcrypt package
var bcrypt = require("bcrypt");

//Making the schema for the users
var userSchema = new schema ({
    name : String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type : String,
        required : true,
    }
},{timestamps : true})
//Hashing the password before saving into db
userSchema.pre("save", function(next) {
    if(this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    }
});
//Comparing the plane password with hash password at login time from datatbase
userSchema.methods.confirmPassword = function(password) {
     return bcrypt.compareSync(password,this.password);
}

//Making the model of userSchema
var User = mongoose.model("User",userSchema);

//Exporting the model userSchema
module.exports = User;
