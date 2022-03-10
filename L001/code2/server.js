const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

const logger = (req, res, next) => {
  console.log(`${new Date().toString()} - ${req.method} ${req.path} ${req.originalUrl}`);
  next();
}

app.use(logger);
app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

const users = [
  { name: "John", age: 20 },
  { name: "Bob", age: 30 },
  { name: "Alice", age: 25 }
];

/* app.get('/:id', (req, res) => {
  const user = users[req.params.id];
  res.json({ user });
}); */

app.post('/', (req, res) => {
  console.log(req.body.age);
  users.push(req.body);
  res.send('Hello World! [POST]');
});

app.get('/render', (req, res) => {
  res.render('index', { test: 'Hello World!' });
})

app.use('/users', usersRouter);

app.listen(3000);