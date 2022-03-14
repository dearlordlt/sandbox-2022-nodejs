const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 120,
    required: true,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (prop) => `Age (${prop.value}) must be even`,
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
  bestFriend: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  role: {
    type: mongoose.ObjectId,
    ref: 'Role',
  },
  edited: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

userSchema.methods.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
}

userSchema.statics.findByEmail = function (email) {
  return this.where({ email: new RegExp(email, 'i') }).exec();
}

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
}

userSchema.virtual('namedEmail')
  .get(function () {
    return `${this.name} <${this.email}>`;
  });

userSchema.pre('save', function (next) {
  this.edited++;
  next();
})

userSchema.post('save', function (doc) {
  console.log(`${doc.name} has been saved`);
});

module.exports = mongoose.model('User', userSchema);