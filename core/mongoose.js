module.exports = function(mongoose) {

  global.db = {};

  db.message = mongoose.model('Mensaje', {
    text: String,
    fecha: {
      type: Date,
      default: Date.now
    }
  });

};
