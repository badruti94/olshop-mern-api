const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  const token = req.header('jwt-token');

  try {
    jwt.verify(token, 'secret_key');
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Forbidden',
    });
  }

  next();
};

const adminAuth = (req, res, next) => {
  const token = req.header('jwt-token');

  try {
    const {
      role,
    } = jwt.verify(token, 'secret_key');
    if (role !== 'admin') {
      res.status(401).json({
        status: 'fail',
        message: 'Forbidden',
      });
    }
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Forbidden',
    });
  }

  next();
};

module.exports = {
  userAuth,
  adminAuth,
};
