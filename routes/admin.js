const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', adminController.login);
router.post('/items', auth, adminController.createItem);
router.get('/items', auth, adminController.getItems);
router.put('/items/:id', auth, adminController.updateItem);
router.delete('/items/:id', auth, adminController.deleteItem);
router.get('/dashboard', auth, adminController.dashboard);
router.post('/create-admin',  adminController.createAdmin);

module.exports = router;
