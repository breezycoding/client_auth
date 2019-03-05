const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");


//Define our model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});


//onsave hook, encrypt password
//before saving a model, run this function
userSchema.pre("save", function(next){
    //get access to the user model
    const user = this;

    //generate a sale then run callback
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }

        //hash()encrypt password using salt
        bcrypt.hash(user.password, salt, null, (err, hash)=> {
            if(err){
                return next(err);
            }

            //overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err){
            return callback(err);
        }
        callback(null, isMatch);
    });
}


//Create the model class
const ModelClass = mongoose.model("user", userSchema);

//Export the model 
module.exports = ModelClass;