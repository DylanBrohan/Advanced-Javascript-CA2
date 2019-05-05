const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("user");
const keys = require("../config/keys");

// ---File used to extract the json token from the bearer---
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// Keys file secret
opts.secretOrKey = keys.secretOrKey;

// Passing in parameter passport
module.exports = passport => {
  passport.use(
    // Callback includes user data
    new JwtStrategy(opts, (jwt_payload, done) => {
      // finds user by its id & Validates
      // jwt_payload is an object that has the user id
      User.findById(jwt_payload.id)
        // get user
        .then(user => {
          // if user is found return done, no error & user
          if (user) {
            return done(null, user);
          }
          // if user is not found return done, error & no user
          return done(null, false);
          console.log(jwt_payload);
        })
        // Catch error
        .catch(err => console.log(err));
    })
  );
};
