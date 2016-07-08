process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();
   
app.listen(process.env.PORT, process.env.IP);
console.log('Server running at http://localhost:3000/');
module.exports = app;