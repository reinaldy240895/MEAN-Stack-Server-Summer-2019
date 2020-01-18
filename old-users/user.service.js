if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const db = require('../_helpers/db');
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({
  email,
  password
}) {
  const {
    errors,
    isValid
  } = validateLoginInput({
    email,
    password
  });
  // Check validation
  if (!isValid) {
    throw errors;
    // throw new Error(errors);
  }

  const user = await User.findOne({
    email
  });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const {
      hash,
      ...userWithoutHash
    } = user.toObject();
    // Should use async callback?
    const token = jwt.sign({
      data: user.id
    }, process.env.SECRET_KEY, {
      expiresIn: 3600 // expires in an hour
    });
    return {
      ...userWithoutHash,
      token
    };
  } else {
    return null;
  }
}

async function getAll() {
  return await User.find().select('-hash');
}

async function getById(id) {
  return await User.findById(id).select('-hash');
}

async function create(userParam) {
  const {
    errors,
    isValid
  } = validateRegisterInput(userParam)

  // Check validation
  if (!isValid) {
    throw errors;
    // throw new Error(JSON.stringify(errors));
  }

  // validate
  if (await User.findOne({
    email: userParam.email
  })) {
    throw 'Email "' + userParam.email + '" is already taken';
    // throw new Error('Email "' + userParam.email + '" is already taken');
  }

  // if (userParam.password !== userParam.password2) {
  //   // "verify password" failed
  //   throw 'Passwords do not match';
  // }

  const user = new User({
    firstname: userParam.firstname,
    lastname: userParam.lastname,
    email: userParam.email,
    hash: ''
  });

  // hash password
  // if (userParam.password) {
  user.hash = bcrypt.hashSync(userParam.password, 10);
  // }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user)
    throw 'User not found';
  // throw new Error('User not found');
  if (user.email !== userParam.email && await User.findOne({
    email: userParam.email
  })) {
    throw 'Email "' + userParam.email + '" is already taken';
    // throw new Error('Email "' + userParam.email + '" is already taken');
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  // TODO: Check if working properly
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}