const Invoice = require('../../models/invoice');
const Product = require('../../models/product');
const User = require('../../models/user');

exports.beli = async (req, res) => {
  const {
    user_id,
    products: productsReq,
  } = req.body;

  const tanggal = new Date().toTimeString();

  const user = await User.findById(user_id).exec();
  const {
    nama: nama_pemesan,
    alamat,
  } = user;

  const product_id = productsReq.map((pr) => pr.id);
  let products = await Product.find({
    _id: product_id,
  }).exec();
  products = products.map((pr) => ({
    nama: pr.nama,
    foto: pr.foto,
    harga: pr.harga,
  }));
  let i = 0;
  products = products.map((pr) => ({
    ...pr,
    jumlah: productsReq[i++].qty,
  }));
  let total_harga = 0;
  products.map((pr) => total_harga += pr.harga * pr.jumlah);

  console.log();
  const inv = new Invoice({
    tanggal,
    nama_pemesan,
    alamat,
    status: 'Belum Dibayar',
    products,
  });
  inv.save().then((data) => {
    res.status(200).json({
      status: 'success',
      message: 'Berhasil dibeli',
    });
  });
  /* const product = await Product.findById(product_id).exec(); */
};

exports.bayar = (req, res) => {
  const { id } = req.params;

  console.log(id);
  Invoice.findByIdAndUpdate(id, {
    status: 'Sudah Dibayar',
  }).then((data) => {
    res.status(200).json({
      status: 'success',
      message: 'Berhasil Dibayar',
      data,
    });
  });
};

exports.terima = (req, res) => {
  const { id } = req.params;

  Invoice.findByIdAndUpdate(id, { status: 'Diterima' }).then((data) => {
    res.status(200).json({
      status: 'success',
      message: 'Barang Diterima',
    });
  });
};
