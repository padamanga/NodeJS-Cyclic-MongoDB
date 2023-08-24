const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require("../utils/catchAsync");
const users = require('../controllers/users');              // Controllers route
const { storeReturnTo } = require('../middleware');


/*==============================================================*/
/*==============================================================*/

router.route('/register')
    // Register a user
    .get(users.registerUser)
    // Create a user
    .post(catchAsync(users.createUser))


router.route('/login')
    // Login user
    .get(users.loginUser)
    // Flashing user
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'} ), users.flashUser);


// Logout User
router.get('/logout', users.logoutUser);


module.exports = router;

/*==============================================================*/
/*==============================================================*/