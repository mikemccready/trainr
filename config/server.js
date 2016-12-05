//server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  response.send('serving from /')
})

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error: ', err);
  }
  console.log('app is listening port 3000');
});
