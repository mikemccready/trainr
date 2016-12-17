const promise = require('bluebird');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trainr';;
const db = pgp(connectionString);

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const config = require('../secret');

function getUsers(req, res) {
  db.any('SELECT * FROM users')
    .then(data => {
      return res.status(200).json(data).end();
    })
    .catch(err => {
      console.error(err.stack)
      return res.status(500).send('Error getting users').end();
    })
}

function signupUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) return res.status(422).send({error: 'Please provide email and password'});
  // check if email already exists
  db.any(`SELECT * FROM users WHERE email = '${email}';`)
    .then(userData => {
      if (userData.length > 0) {
        return res.status(422).send({ error: 'Email already exists' });
      } else {
        // no user exists, hash the password
        hashPassword(req, res, email, password);
      }
    })
    .catch(err => {
      return res.status(500).send({ error: err }).end();
    });
}

function createUser(req, res, email, hashedPassword) {
  db.one(
    `INSERT INTO users(email, password, created_on)
     VALUES('${email}', '${hashedPassword}', now())
     RETURNING user_id, email, password;`
  ).then(user => {
      return res.status(200).json({ token: tokenForUser(user) }).end();
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({ error: err }).end();
    })
}

function authUser(payload, done) {
  db.oneOrNone(`SELECT * FROM users WHERE user_id = ${payload.sub};`)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({ error: err }).end();
    });
}

function verifyUserLocal(email, password, done) {
  db.oneOrNone(`SELECT * FROM users WHERE email = '${email}'`)
    .then(user => {
      if (user) {
        comparePassword(password, user.password, (err, isMatch) => {
          if (err) return done(err);
          if (!isMatch) return done(null, false);
          return done(null, user);
        })
      } else {
        return done(null, false);
      }
    })
}

function signinUser(req, res) {
  // user creds already verified, issue token
  return res.send({ token: tokenForUser(req.user) });
}

function deleteUser(req, res) {
  const user_id = req.params.user_id;
  db.none(`DELETE FROM users WHERE user_id=${user_id}`)
    .then(() => {
      return res.status(200).send({ message: 'user deleted'});
    })
    .catch(err => {
      console.error(err.stack)
      return res.status(500).send('Error deleting user').end();
    })
}

// helper functions
function hashPassword(req, res, email, password) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return err;
    bcrypt.hash(password, salt, null, (err, hashedPassword) => {
      if (err) return err;
      // once hashed, create the user
      createUser(req, res, email, hashedPassword);
    });
  });
}

function comparePassword(enteredPassword, savedPassword, callback) {
  bcrypt.compare(enteredPassword, savedPassword, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
}

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.user_id, iat: timestamp }, config.secret);
}

module.exports = {
  signupUser,
  getUsers,
  authUser,
  verifyUserLocal,
  signinUser,
  deleteUser
}
