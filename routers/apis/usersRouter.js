const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

// logout the user
router.get('/logout', usersController.handleUserLogout)

module.exports = router;