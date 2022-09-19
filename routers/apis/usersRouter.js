const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

// logout the user
router.delete('/logout', usersController.handleUserLogout)

module.exports = router;