const passport = require('passport');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../Models/User');

const localStrategy = new LocalStrategy(
  { usernameField: 'email' }, // specify the email field as the username field
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email }).exec();

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub).exec();
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = (passport) => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);

  // Add the serializeUser and deserializeUser functions to the passport instance
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};