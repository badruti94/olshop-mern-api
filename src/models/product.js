const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  nama: String,
  deskripsi: String,
  foto: String,
  harga: Number,
});

module.exports = mongoose.model('product', ProductSchema);
