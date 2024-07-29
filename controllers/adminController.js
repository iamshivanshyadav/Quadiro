const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Username or password is wrong');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, 'SECRET_KEY');
  res.header('Authorization', token).send(token);
};

exports.createItem = async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.send(items);
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.send('Item deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.dashboard = async (req, res) => {
  const itemCount = await Item.countDocuments();
  const userCount = await User.countDocuments();
  res.send({ itemCount, userCount });
};

exports.createAdmin = async (req, res) => {
  const { username, password } = req.body;

  const adminExists = await User.findOne({ isAdmin: true });
  if (adminExists) return res.status(400).send('Admin user already exists');


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAdmin = new User({
    username,
    password: hashedPassword,
    isAdmin: true
  });

  try {
    await newAdmin.save();
    res.send('Admin created');
  } catch (err) {
    res.status(400).send(err);
  }
};
