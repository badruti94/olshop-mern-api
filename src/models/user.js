const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: String,
  email: String,
  nama: String,
  password: String,
  role: String,
  alamat: String,
});

module.exports = mongoose.model('user', User);
