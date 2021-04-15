const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = (req, res) => {
  const user = new User({
    ...req.body,
    role: 'user',
  });

  user.save().then((data) => {
    res.status(201).json({
      status: 'success',
      message: 'Pengguna berhasil didaftarkan',
      data: {
        user: data,
      },
    });
  });
};

exports.login = (req, res) => {
  const {
    username,
    password,
  } = req.body;

  User.find({
    username,
    password,
  }).then((user) => {
    const token = jwt.sign({
      role: user.role,
    }, 'secret_key');
    console.log(token);
    res.status(200).json({
      data: user,
      token,
    });
  });
};
