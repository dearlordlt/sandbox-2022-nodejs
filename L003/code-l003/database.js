const bcrypt = require('bcrypt');

const users = [];

function registerUser(user) {
  users.push({
    id: Math.random(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  });
}

function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

function loginUser(email, password) {
  const user = getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = {
  users,
  loginUser,
  getUserByEmail,
  registerUser,
}