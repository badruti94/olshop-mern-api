const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');

const login = require('./src/routes/login');

const user = require('./src/routes/admin/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log(req.header('jwt-token'));
  res.end();
});
app.use('/login', login);

// admin
app.use('/admin/user', user);

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});

mongoose.connect(process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log('Connection success');
  });
