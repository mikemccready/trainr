const promise = require('bluebird');
const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trainr';;
const db = pgp(connectionString);

function signupUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  // check if email already exists
  db.any(`SELECT * FROM users WHERE email = '${email}';`)
    .then(userData => {
      if (userData.length > 0) {
        return res.status(422).send({ error: 'Email already exists' });
      }
      // no user exists, create new user
      createUser(req, res, email, password);
    })
    .catch(err => {
      return res.status(500).send({ error: err }).end();
    });
}

function createUser(req, res, email, password) {
  db.none(
    `INSERT INTO users(email, password, created_on)
     VALUES('${email}', '${password}', now())`
  ).then(data => {
      res.status(200).json({ status: 'success', message: 'User created'});
      return res.end();
    })
    .catch(err => {
      return res.status(500).send({ error: err }).end();
    })
}

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

module.exports = {
  signupUser,
  getUsers
}
