const Invoice = require('../../models/invoice');

exports.getAll = (req, res) => {
  Invoice.find({
    status: 'Sudah Dibayar',
  }).then((pesanan) => {
    res.status(200).json({
      status: 'success',
      data: {
        pesanan,
      },
    });
  });
};

exports.kirim = (req, res) => {
  const {
    id,
  } = req.params;
  Invoice.findByIdAndUpdate(id, {
    status: 'Dikirim',
  })
    .then((data) => {
      res.status(200).json({
        status: 'success',
        message: 'Berhasil Dikirim',
      });
    });
};
