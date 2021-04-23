const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const login = require('./src/routes/login');
const user = require('./src/routes/admin/user');
const product = require('./src/routes/admin/product');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img/product');
  },
  filename(req, file, cb) {
    cb(null, `product-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});
function fileFilter(req, file, cb) {
  console.log(file.mimetype);
  if (
    file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
app.use(multer({ storage, fileFilter }).single('foto'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log(req.header('jwt-token'));
  res.end();
});
app.use('/login', login);

// admin
app.use('/admin/user', user);
app.use('/admin/product', product);

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});

mongoose.connect(process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log('Connection success');
  });
