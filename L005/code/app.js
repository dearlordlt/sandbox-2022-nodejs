require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/users');

const mongoUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;
const port = process.env.PORT;

mongoose.connect(mongoUrl);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put('/users', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.status(204).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});