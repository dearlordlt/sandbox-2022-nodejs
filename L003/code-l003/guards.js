const db = require('./database');

const adminGuard = (req, res, next) => {
  const user = db.getUserByEmail(req.user.email);

  if (user && user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

module.exports = {
  adminGuard,
}
