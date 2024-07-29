// controllers/userController.js
const Item = require('../models/item');

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.send(items);
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addComment = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    item.comments.push({ body: req.body.comment, date: new Date() });
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addRating = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    item.rating = req.body.rating;
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
};
