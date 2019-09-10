//requring the mongoose 
var mongoose = require("mongoose");

//extracting the schema from mongoose
var schema = mongoose.Schema;

//requring the bcrypt package
var bcrypt = require("bcrypt");

//making the schema for the users
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
//hashing the password before saving into db
userSchema.pre("save", function(next) {
    if(this.password) {
        this.password = bcrypt.hashSync(this.password,10);
        next();
    }
});
//comparing the plane password with hash password at login time
userSchema.methods.confirmPassword = function(password) {
     return bcrypt.compareSync(password,this.password);
}

//making the model of userSchema
var User = mongoose.model("User",userSchema);

//exporting the model userSchema
module.exports = User;
