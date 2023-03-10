// const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local").Strategy;
require("dotenv").config();
const userModel = require("../models/userModel");

module.exports = function (passport) {
  passport.use(
  new JWTStrategy(
      {
          secretOrKey: process.env.JWT_SECRET,
          // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
      },
      async (token, done) => {
          try {
              return done(null, token.user);
          } catch (error) {
              done(error);
          }
      }
  )
);

// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
         passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const user = await userModel.create({
          email,
          firstname,
          lastname,
          password,
        });
        return done(null, user);
      } catch (err) {
      //  done(err);
      console.log(err)
      }
    }
  )
);

// This middleware authenticates the user based on the email and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.
passport.use(
  'login',
  new localStrategy(
      {
          usernameField: 'email',
          passwordField: 'password'
      },
      async (email, password, done) => {
          try {
              const user = await userModel.findOne({ email });

              if (!user) {
                  return done(null, false, { message: 'User not found' });
              }

              const validate = await user.isValidPassword(password);

              if (!validate) {
                  return done(null, false, { message: 'Wrong Password' });
              }

              return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
              return done(error);
          }
      }
  )
);
}