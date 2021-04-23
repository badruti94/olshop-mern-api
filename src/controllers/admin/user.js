const User = require('../../models/user');

exports.getAllUser = (req, res) => {
  User.find({}).then((data) => {
    res.status(200).json({
      data,
    });
  });
};
