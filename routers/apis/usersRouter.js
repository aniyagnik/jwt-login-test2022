const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

// logout the user
router.get('/logout', usersController.handleUserLogout)

// delete users account
router.delete('/delete',usersController.deleteUser);

module.exports = router;