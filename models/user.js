
const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLocalMongoose); 
//Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value
// possportLocalMongoose also creates authentication, authrization methods in the schema

module.exports = mongoose.model("User", userSchema);