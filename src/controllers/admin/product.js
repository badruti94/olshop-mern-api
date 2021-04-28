const fs = require('fs');
const path = require('path');
const Product = require('../../models/product');

exports.getAll = (req, res) => {
  Product.find({}).then((products) => {
    res.status(200).json({
      status: 'success',
      data: {
        products,
      },
    });
  });
};
exports.create = (req, res) => {
  const foto = req.file.filename;

  const product = new Product({
    ...req.body,
    stok: 100,
    foto,
  });
  product.save().then((data) => {
    res.status(201).json({
      status: 'success',
      data: {
        product: data,
      },
    });
  });
};
exports.update = (req, res) => {
  const { id } = req.params;
  const foto = req.file.filename;

  Product.findByIdAndUpdate(id, { ...req.body, foto }).then((product) => {
    res.status(200).json({
      status: 'success',
      message: 'Data berhasil diupdate',
      data: {
        product,
      },
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id).then((product) => {
    fs.unlink(path.join(__dirname, `../../../public/img/product/${product.foto}`), (err) => { if (err) console.log(err); });
    res.status(200).json({
      status: 'success',
      message: 'Data berhasil dihapus',
      data: {
        product,
      },
    });
  });
};
