var express = require('express'),
  mongoose = require('mongoose'),
  url = require('url'),
  _ = require('underscore');
//mongoose.connect('mongodb://s.vicroj.me:27017/hi');

var mongoUrl = (function(base) {
  if (!base) {
    console.log('No hay mongo.');
    return process.exit(1);
  }
  var mongo = url.parse(base);
  mongo.protocol = 'mongodb:';
  mongo.pathname = process.env.MONGO_DATABASE || (function() {
    if (_.isString(mongo.pathname) && mongo.pathname.length > 1) return mongo.pathname;
  })() || 'nei';


  mongo.auth = process.env.MONGO_AUTH || mongo.auth || (function(user, pass) {
    if (!user && !pass) return;
    return [user, pass].join(':');
  })(process.env.MONGO_USER, process.env.MONGO_PASS);


  if (process.env.MONGO_AUTO_SOURCE)
    mongo.search = "authSource=" + process.env.MONGO_AUTO_SOURCE;

  return url.format(mongo);
})(process.env.MONGO_URL || process.env.MONGO_PORT_27017_TCP);
mongoose.connect(mongoUrl);
console.log(mongoUrl);
require('./core/mongoose')(mongoose);

var app = express(),
  io_ = require('socket.io');

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));
app.use(function(req, res, next) {
  db.message.find({}).sort({
    fecha: -1
  }).limit(20).exec(function(err, data) {
    if (err) return next(err);
    res.render('app', {
      messages: data
    });
  });
});
var server = app.listen(3000, function() {
  global.io = io_(this);
  io.on('connection', function(socket) {
    socket.on('message', function(data) {
      db.message.create(data, function(err, data) {
        io.emit('message', data);
      });
    });
  });
  console.log('Servidor activo, server ' + JSON.stringify(server.address()));
});
