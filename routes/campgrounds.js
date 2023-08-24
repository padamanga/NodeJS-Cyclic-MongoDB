const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');  // Controllers route
const catchAsync = require("../utils/catchAsync");      //utils route
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');    // Middleware route
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');


/*==============================================================*/
/*==============================================================*/

router.route('/')
    .get(catchAsync(campgrounds.index))
    // Create a campground
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    //image is same as in html file (Show.ejs)


// new Campground
router.get('/new', isLoggedIn, campgrounds.newCampgrounds);


router.route('/:id')
    // show route
    .get(catchAsync(campgrounds.showCampgrounds))
    // Update Campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    // Delete Campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


// Edit campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground));


module.exports = router;

/*==============================================================*/
/*==============================================================*/