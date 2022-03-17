import express from "express";
import userService from "./services/user.service.mjs";
import mongoose from "mongoose";
import todoSchema from "./models/todos.mjs";

const app = express();
app.use(express.json());

const db = mongoose.connect('mongodb://localhost:27017/test-l006');

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.post('/user', (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required!' });
  } else {
    const user = userService.addUser(username, password);
    res.status(201).json(user);
  }

});

app.get('/user/:id?', (req, res) => {
  const user = req.params.id ? userService.getUser(req.params.id) : userService.users;
  res.status(200).json(user);
});

app.post('/todo', async (req, res) => {
  const { title, completed } = req.body;
  if (!title || completed == null) {
    res.status(400).json({ message: 'Title and completed are required!' });
  } else {
    await todoSchema.create({ title, completed });
    res.status(201).json({ title, completed });
  }
})

export {
  app,
}