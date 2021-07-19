const http = require('http'); // creating a http server

const routes = require('./route'); //checking for route.js file in os

const server = http.createServer(routes); //directing to route file

//server.listen(3000);  //this server will listen in 3000 port