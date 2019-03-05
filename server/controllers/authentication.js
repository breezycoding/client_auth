const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
    //user has already had their email and password authe'd
    //we just need to give them a token
    res.send({token: tokenForUser(req.user)});
}

exports.signup  = function(req, res, next){
    //res.send({success: "true"});

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error:"you must provide email and password"});
    }

    //see if a user with the given email exist
    User.findOne({ email: email}, (err, existingUser   ) => {
        if(err){
            return next(err);
        }

        //if a user with email does exist, throw an error
        if(existingUser){
            res.status(422).send({error: "Email is in use"});
        }

        //if a user with email does not exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save((err) => {
            if(err){
                return next(err);
            }

            //respond to request indicating the user was created
            res.json({token: tokenForUser(user)});
        });
    })
}
