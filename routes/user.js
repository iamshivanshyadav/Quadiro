// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/items', userController.getItems);
router.get('/items/:id', userController.getItem);
router.post('/items/:id/comments', userController.addComment);
router.post('/items/:id/rating', userController.addRating);

module.exports = router;
