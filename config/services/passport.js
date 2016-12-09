const passport = require('passport');
const config = require('../secret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userController = require('../controllers/user_controller');
const LocalStrategy = require('passport-local');

// Setup options for local sign-in strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, userController.verifyUserLocal);

// Setup options for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, userController.authUser);

passport.use(jwtLogin);
passport.use(localLogin);
