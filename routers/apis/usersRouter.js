const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
// logout the user
router.delete('/logout', usersController.handleUserLogout)

router.get('/all', usersController.getAllUsers)

router.get('/apiNews',usersController.handleNewsApiRequest)

router.delete('/delete/:username',usersController.deleteUsers)

module.exports = router;