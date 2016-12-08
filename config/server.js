//server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'));

app.use('/', routes);

app.listen(port, (err) => {
  if (err) return console.log('Error: ', err);
  console.log('app is listening port', port);
});
