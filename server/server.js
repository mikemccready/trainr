//server.js
const http = require('http');
const PORT = 3000;

const reqHandler = (req, res) => {
  console.log(req.url);
  response.end('node server');
}

const server = http.createServer(reqHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.log('Error: ', err);
  }
  console.log('Server listening port 3000');
});
