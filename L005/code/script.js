require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/users');

const dbURL = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

mongoose.connect(
  dbURL,
  () => {
    console.log('Connected to database');
  },
  (err) => {
    console.log(err);
  }
);

/* async function run() {
  const user = new User({ name: 'John', age: 20 });
  await user.save();
  console.log(user);
}
run(); */

/* async function run() {
  const user = await User.create({ name: 'Bob', age: 20 });
  user.age = 21;
  await user.save();
  console.log(user);
}
run(); */

/* async function run() {
  try {
    const user = await User.create({
      name: 'John',
      age: 20,
      email: 'john@asdxz.com',
      hobbies: ['sport', 'cooking'],
      address: {
        street: 'asdz',
        city: 'asdz',
      },
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
} */

async function run() {
  // const user = await User.findOne({ name: 'John' });
  // const user = await User.findById('622f0f3004e667079cf3515c');
  // const user = await User.find({ age: 40 });

  // const exists = await User.exists({ name: 'John' });
  // const user = await User.findById(exists._id);

  /* const user = await User.create({
    name: 'Ted',
    age: 44,
    email: 'ted@gmail.com',
    hobbies: ['sport', 'cooking'],
    bestFriend: '622f0f3004e667079cf3515c'
  }); */

  /* const users = await User
    .where('age')
    .gte(20)
    .lte(40)
    .sort({ name: -1 })
    .populate('bestFriend')
    .exec(); */

  //const user = await User.findByEmail('@gmail.com');
  // user.sayHi();

  const user = await User.findOne().byName('John');
  // console.log(user.namedEmail);
  user.age = 22;
  await user.save();

  console.log(user);
}

run();