require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('./database');
const { jwtCallback } = require('./passport');
const { adminGuard } = require('./guards');

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', { session: false });

app.post('/login', (req, res) => {
  const user = db.loginUser(req.body.email, req.body.password);

  if (user) {

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  db.registerUser({ email, password, role });

  res.json(db.users);
});

app.get('/users', auth, adminGuard, (req, res) => {
  res.json(db.users);
})

app.get('/posts', auth, (req, res) => {
  res.json(db.users);
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
})