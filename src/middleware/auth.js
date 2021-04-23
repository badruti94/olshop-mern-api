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

const adminAuth = async (req, res, next) => {
  const token = req.header('jwt-token');

  try {
    const {
      role,
    } = await jwt.verify(token, 'secret_key');

    if (role !== 'admin') {
      res.status(401).json({
        status: 'fail',
        message: 'Forbidden',
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Forbidden',
    });
    res.end();
  }
};

module.exports = {
  userAuth,
  adminAuth,
};
