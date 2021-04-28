const mongoose = require('mongoose');

const { Schema } = mongoose;

const Invoice = new Schema({
  tanggal: String,
  nama_pemesan: String,
  total_harga: Number,
  alamat: String,
  status: String,
  products: Array,
});

module.exports = mongoose.model('invoice', Invoice);
