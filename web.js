var express = require('express'),
  mongoose = require('mongoose');

//mongoose.connect('mongodb://s.vicroj.me:27017/hi');
mongoose.connect('mongodb://192.168.99.100:32768/hi');
require('./core/mongoose')(mongoose);

var app = express(),
  io_ = require('socket.io');

app.set('view engine', 'jade');



app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));
// app.get('/', function(req, res) {
//   res.render('app');
// });

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


  console.log('Example app listening at ' + JSON.stringify(server.address()));
});
